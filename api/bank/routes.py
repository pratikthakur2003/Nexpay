from api.bank import bank
from flask import jsonify, render_template, redirect, url_for, request, session
from mysql.connector import pooling, Error
from api.bank.hash import decrypt
from datetime import datetime

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
        # Get a connection from the pool
        return pools[dbName].get_connection()
    except Error as e:
        print(f'Error: {e}')
        return None


def retrieve_data(data):
    params = data.split('&')
    data_dict = {key: value for key, value in (param.split('=') for param in params)}
    print(data_dict)
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

@bank.route('/', methods=['GET', 'POST'])
def login():
    details = None
    if request.method == 'GET':
        params = request.args.get('q')
        original_data = decrypt.decrypt_data(params)
        details = retrieve_data(original_data)
        
        session['data'] = details
        
        bankName = getBankName(details.get('data'))        
        expirationTime = getExpirationTime(details.get('expirationTime'))
        if expirationTime > datetime.now():
            return render_template('bankLogin.html',bankName=bankName)
        return jsonify({"status": "failed", "description": "Token Expired"}), 400
    
    if request.method == 'POST':
        name = request.form.get('username')
        pwd = request.form.get('password')
        session['user'] = name
        
        return redirect('/bank/api/main')
        
        

@bank.route('/main', methods=['GET','POST'])
def main():
    if request.method == 'GET':
        return render_template('bankMain.html', user = session['user'], amount = session['data'].get('amount'), bankName = getBankName(session['data'].get('data')))
    
    if request.method == 'POST':
        return "TO be done"
    

