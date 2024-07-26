from flask import redirect, session
from mysql.connector import pooling, Error
from flask_login import logout_user
from datetime import datetime
from decimal import Decimal


db_configs = {
    "banks_db": {
        "host": "localhost",
        "user": "root",
        "password": "pratik",
        "database": "banks_db"  
    },
    "othermodes_db": {
        "host": "localhost",
        "user": "root",
        "password": "pratik",
        "database": "othermodes_db"
    }
}

pools = {
    "banks": pooling.MySQLConnectionPool(pool_name="banks_pool", pool_size=10, **db_configs["banks_db"]),
    "othermodes": pooling.MySQLConnectionPool(pool_name="othermodes_pool", pool_size=10, **db_configs["othermodes_db"]),
}

def get_db_connection(dbName):
    try:
        return pools[dbName].get_connection()
    except Error as e:
        print(f'Error: {e}')
        return None

def retrieve_data(data):
    params = data.split('&')
    data_dict = {key: value for key, value in (param.split('=') for param in params)}
    return data_dict

def getBankName(bankID):
    banks = {
        "abc": "ABC Bank",
        "mno": "MNO Bank",
        "xyz": "XYZ Bank",
    }
    return banks.get(bankID)

def getExpirationTime(expirationTime):
    return datetime.strptime(expirationTime, '%Y-%m-%d %H:%M:%S')

def createBankTransactionEntry(userName = "-", bankID = "-"):
    conn = get_db_connection("banks")
    cursor = conn.cursor()
    
    orderID = session['mode_info'].get('orderID')
    token = session['mode_info'].get('token')
    amount = Decimal(session['mode_info'].get('amount'))
    mode = session['mode_info'].get('mode')
    bankName = getBankName(bankID) if bankID != "-" else "-"
    tableName = "transactions"
    status = "pending"
    
    transactionSql = f"INSERT INTO {tableName} (orderID, token, amount, username, mode, bankID, bankName, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(transactionSql, (orderID, token, amount, userName, mode, bankID, bankName, status))
    
    conn.commit()
    cursor.close()
    conn.close()

def updateBankTransactionEntry(status):
    conn = get_db_connection("banks")
    cursor = conn.cursor()
    
    token = session["mode_info"].get('token')
    
    transactionSql = "UPDATE transactions SET status = %s WHERE token = %s"
    cursor.execute(transactionSql, (status, token))
    
    conn.commit()
    cursor.close()
    conn.close()

def notifyNexpay(status):
    
    session['status'] = status
    return redirect('/nexpay/api/recieve_from_bank')
    

def handleWithdrawal(mode,
    mode_name,
    mode_no,
    current_balance,
    amount,
    tableName,
    columnName = "accountBalance"
):
    conn = get_db_connection(f"{mode}")
    cursor = conn.cursor()

    new_balance = current_balance - amount
    cursor.execute(f"UPDATE {tableName} SET {columnName} = {new_balance} WHERE {mode_name} = {mode_no}")
    conn.commit()
    cursor.close()
    conn.close()

    updateBankTransactionEntry(status = "success")

    logout_user()

    return notifyNexpay(status = "success")

def getCardDetails(
    tableName,
    inputCardNo,
    inputExpiryDate,
    inputCVV
):
    conn = get_db_connection('othermodes')
    cursor = conn.cursor(dictionary=True)
    
    columnName = "debitCardNo" if tableName == "debitcard" else "creditCardNo"
    
    sql = f"SELECT * FROM {tableName} WHERE {columnName} = %s AND expiryDate = %s AND cvv = %s"
    
    cursor.execute(sql, (inputCardNo, inputExpiryDate, inputCVV))
    
    res = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    return res

def getCurrentBalanceAndUserName(mode, mode_no, bankName):
    conn = get_db_connection('banks')
    cursor = conn.cursor(dictionary=True)
    
    sql = f"SELECT username, accountBalance FROM {bankName} WHERE {mode} = {mode_no}"
    
    cursor.execute(sql)
    
    res = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if not res:
        return None
    
    return {"userName": res['username'], "accountBalance": res['accountBalance']}
    
        
