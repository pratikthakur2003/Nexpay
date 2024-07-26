from api.nexpay import nexpay
from flask import jsonify, request, redirect, render_template, url_for, session
from mysql.connector import pooling, Error
import datetime
import secrets
import logging
import datetime
from api.nexpay.hash import encrypt

db_configs = {
    "users_db": {
        "host": "localhost",
        "user": "root",
        "password": "pratik",
        "database": "users_db"
    },
    "banks_db": {
        "host": "localhost",
        "user": "root",
        "password": "pratik",
        "database": "banks_db"  
    }
}

pools = {
    "users": pooling.MySQLConnectionPool(pool_name="users_pool", pool_size=10, **db_configs["users_db"]),
    "banks": pooling.MySQLConnectionPool(pool_name="banks_pool", pool_size=10, **db_configs["banks_db"]),
}

def get_db_connection(dbName):
    try:
        # Get a connection from the pool
        return pools[dbName].get_connection()
    except Error as e:
        print(f'Error: {e}')
        return None
    

def generate_api_key():
    return secrets.token_hex(16)

def generate_token(cursor, orderID):
    token = secrets.token_urlsafe(16)
    expirationTime = datetime.datetime.now() + datetime.timedelta(minutes=15)
    tokenSql = "INSERT INTO tokens (orderID, token, expirationTime) VALUES (%s, %s, %s)"
    cursor.execute(tokenSql, (orderID, token, expirationTime))
    
def updateMerchantBalance(merchantID, amount):
    conn = get_db_connection("users")
    cursor = conn.cursor()
    
    sql = f"UPDATE merchant SET merchantBalance = merchantBalance + {amount} WHERE merchantID = %s"
    cursor.execute(sql, (merchantID,))
    conn.commit()
    cursor.close()
    conn.close()

def createLedgerEntry(status):
    conn = get_db_connection('users')
    cursor = conn.cursor()
    
    orderID = session['mode_info'].get('orderID')
    amount = session['mode_info'].get('amount')
    mode = session['mode_info'].get('mode')
    
    cursor.execute('SELECT apiKey, callbackURL from orders WHERE orderID = %s', (orderID,))
    res = cursor.fetchone()
    apiKey = res[0]
    callbackURL = res[1]
    
    cursor.execute('SELECT merchantID from merchant WHERE apiKey = %s', (apiKey,))
    merchantID = cursor.fetchone()[0]
    
    tableName = 'ledger'
    insertSQL = f"INSERT INTO {tableName} (orderID, merchantID, amount, mode, status) VALUES (%s, %s, %s, %s, %s)"
    
    cursor.execute(insertSQL, (orderID, merchantID, amount, mode, status))
    conn.commit()
    
    cursor.execute(f"SELECT transactionTime from {tableName} where orderID = %s", (orderID,))
    transactionTime = cursor.fetchone()[0]
    
    closeCurrentSession()
    
    conn.commit()
    cursor.close()
    conn.close()
    
    if status == "success":
        return {"merchantID": merchantID, "amount": amount, "callbackURL": callbackURL, "orderID": orderID, "transactionTime": transactionTime}
    return {"merchantID": merchantID, "amount": amount, "callbackURL": callbackURL}


def closeCurrentSession():
    session['mode_info'] = None
    session['status'] = None
    session['bankName'] = None
    session['attempts'] = None

@nexpay.route('/')
def testing():
    return jsonify({"test": "NexPay API"})



# {
#   "name": "Pratik Thakur",
#   "email": "pramin.pt@gmail.com",
#   "passwordHash": "mypassword"
# }
@nexpay.route('/create_merchant_account', methods=['POST', 'GET'])
def create_merchant_account():
    conn = get_db_connection("users")
    if not conn:
        return jsonify({"status": "failed", "description": "Database Connection Failed"}), 500

    cursor = conn.cursor()
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "failed", "description": "Invalid input"}), 400
        
        email = data.get('email')
        name = data.get('name')
        password = data.get('passwordHash')
        
        if not email or not name or not password:
            return jsonify({"status": "failed", "description": "Email, Name, and Password are required"}), 400
        
        sql = "SELECT * FROM merchant WHERE merchantEmail = %s"
        cursor.execute(sql, (email,))
        results = cursor.fetchone()
        
        if results:
            return jsonify({"status": "failed", "description": "Email already exists"}), 400
        else:
            while True:
                apiKey = generate_api_key()
                sql = "SELECT * FROM merchant WHERE apiKey = %s"
                cursor.execute(sql, (apiKey,))
                isPresent = cursor.fetchone()
                if not isPresent:
                    break
            sql = "INSERT INTO merchant (apiKey, merchantName, merchantEmail, merchantPasswordHash, merchantBalance) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (apiKey, name, email, password, 0.0))
            conn.commit()
            return jsonify({"status": "success", "description": "Merchant Account Successfully created", "apiKey": apiKey}), 200
    except Error as e:
        logging.error(f"Database error: {e}")
        return jsonify({"status": "failed", "description": "Database error"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"status": "failed", "description": "An unexpected error occurred"}), 500
    finally:
        cursor.close()
        conn.close()
  

# {
#   "amount": 50000,
#   "currency": "INR",
#   "apiKey": "41a93ccd7f41e83683fab96cc2a85c4b"
#   "callbackURL": "https://example.com/callback"
# } 

@nexpay.route('/generate_order_id', methods=['POST','GET'])
def generate_order_id():
    conn = get_db_connection("users")
    if not conn:
        return jsonify({"status": "failed", "description": "Database Connection Failed"}), 500
    cursor = conn.cursor()
    try:
            data = request.get_json()
            if not data:
                return jsonify({"status": "failed", "description": "Invalid input"}), 400
            amount = data.get('amount')
            apiKey = data.get('apiKey')
            currency = data.get('currency')
            callbackURL = data.get('callbackURL')
            if not amount or not apiKey or not currency:
                return jsonify({"status": "failed", "description": "Amount, Currency and API Key are required"}), 400
            
            cursor.execute("SELECT * from merchant WHERE apiKey = %s", (apiKey,))
            results = cursor.fetchone()
            if not results:
                return jsonify({"status": "failed", "description": "Invalid API Key"}), 400
            
            orderID = secrets.token_urlsafe(16)
            amount = int(amount) / 100
            orderSql = "INSERT INTO orders (orderID, apiKey, amount, currency, callbackURL) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(orderSql, (orderID, apiKey, amount, currency, callbackURL))
            
            generate_token(cursor, orderID)
            
            conn.commit()
            
            return jsonify({"status": "success", "description": "OrderID Successfully created", "orderID": orderID, "amount": amount, "currency": currency}), 200
  
    except Error as e:
        logging.error(f"Database error: {e}")
        return jsonify({"status": "failed", "description": "Database error"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"status": "failed", "description": "An unexpected error occurred"}), 500
    finally:
        cursor.close()
        conn.close()

@nexpay.route('/process_payment', methods = ['POST','GET'])
def process_payment():
    conn = get_db_connection("users")
    if not conn:
        return jsonify({"status": "failed", "description": "Database Connection Failed"}), 500
    cursor = conn.cursor()
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "failed", "description": "Invalid input"}), 400
        
        apiKey = data.get('apiKey')
        cursor.execute("SELECT * from merchant where apiKey = %s", (apiKey,))
        apiKeyFound = cursor.fetchone()

        if not apiKeyFound:
            return jsonify({"status": "failed", "description": "Invalid API Key"}), 400
        amount = data.get('amount')
        orderID = data.get('orderID')
        currency = data.get('currency')
        
        
        cursor.execute("SELECT * from orders where orderID = %s and apiKey = %s and currency = %s",(orderID, apiKey, currency))
        orderFound = cursor.fetchone()
        if not orderFound:
            return jsonify({"status": "failed", "description": "Order Not Found"}), 400
        
        cursor.execute("SELECT * from tokens where orderID = %s", (orderID,))
        tokenFound = cursor.fetchone()
        if not tokenFound:
            return jsonify({"status": "failed", "description": "Token Not Found"}), 400
        
        tokenExpirationTime = tokenFound[4]
        
        if tokenExpirationTime < datetime.datetime.now():
            # generate_token(cursor, orderID)
            return jsonify({"status": "failed", "description": "Token Expired"}), 400
        
        
        # TODO: Change the URL later
        return jsonify({"payment_url": "http://localhost:5000/nexpay/api/open_window?orderID="+orderID+"&token="+tokenFound[2]+"&amount="+str(amount)+"&currency="+currency}), 200
        # return render_template('paymentForm.html', orderID = orderID, amount = amount, currency = currency, token = tokenFound[2])
        # redirect("/bank/api/process_payment?orderID=" + orderID + "&amount=" + str(amount) + "&currency=" + "&token" + "=" + tokenFound[2])

        
    
    except Error as e:
        logging.error(f"Database error: {e}")
        return jsonify({"status": "failed", "description": "Database error"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"status": "failed", "description": "An unexpected error occurred", "error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()
    

@nexpay.route('/open_window')
def open_window():
    orderID = request.args.get('orderID')
    amount = request.args.get('amount')
    token = request.args.get('token')
    currency = request.args.get('currency')
    return render_template('paymentForm.html', orderID = orderID, amount = amount, currency = currency, token = token)


@nexpay.route('/contact_bank', methods=['POST', 'GET'])
def contact_bank():
    if request.method == 'POST':
        mode = request.form.get('mode')
        data = request.form.get('data')
        token = request.form.get('token')
        orderID = request.form.get('orderID')
        amount = request.form.get('amount')

        conn = get_db_connection("users")
        cursor = conn.cursor()
        
        cursor.execute("SELECT expirationTime from tokens where token = %s", (token,))
        expirationTime = cursor.fetchone()
        
        if expirationTime[0] < datetime.datetime.now():
            return jsonify({"status": "failed", "description": "Token Expired"}), 400
        
        url = f'token={token}&orderID={orderID}&amount={amount}&mode={mode}&data={data}&expirationTime={expirationTime[0]}'
        encryptedUrl = encrypt.encrypt_data(url)
        return redirect(f'/bank/api?q={encryptedUrl}')  
    else:
        return "<h2> Unauthorized Access Restricted </h2>", 405

@nexpay.route('/recieve_from_bank', methods=['GET', 'POST'])
def recieveFromBank():
    status = session['status']
    
    ledgerEntry = createLedgerEntry(status=status)
    
    if status == "success":
        updateMerchantBalance(merchantID = ledgerEntry['merchantID'], amount = ledgerEntry['amount'])
        return render_template('paymentSuccess.html', orderID = ledgerEntry['orderID'], amount = ledgerEntry['amount'], transactionTime = ledgerEntry['transactionTime'], callbackURL = ledgerEntry['callbackURL'])
    else:
        return render_template('paymentFailure.html', callbackURL = ledgerEntry['callbackURL'])


@nexpay.route('/show')
def show():
    conn = get_db_connection('users')
    cursor = conn.cursor()
    
    bankConn = get_db_connection('banks')
    bankCursor = bankConn.cursor()
    
    cursor.execute('SELECT * FROM merchant')
    merchantData = cursor.fetchall()
    
    cursor.execute('SELECT * FROM ledger')
    ledger = cursor.fetchall()
    
    cursor.execute('SELECT * FROM orders')
    orders = cursor.fetchall()
    
    cursor.execute('SELECT * FROM tokens')
    tokens = cursor.fetchall()
    
    bankCursor.execute('SELECT * FROM abc')
    abcBank = bankCursor.fetchall()
    
    bankCursor.execute('SELECT * FROM mno')
    mnoBank = bankCursor.fetchall()
    
    bankCursor.execute('SELECT * FROM xyz')
    xyzBank = bankCursor.fetchall()
    
    bankCursor.execute('SELECT * FROM transactions')
    transactions = bankCursor.fetchall()
    
    
    cursor.close()
    bankCursor.close()
    conn.close()
    bankConn.close()
    
    return render_template('allTables.html', merchantData = merchantData, ledger = ledger, orders = orders, tokens = tokens, abcBank = abcBank,mnoBank = mnoBank, xyzBank = xyzBank, transactions = transactions)

