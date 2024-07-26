from flask import session
from mysql.connector import pooling, Error
import datetime
import secrets
import datetime

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
