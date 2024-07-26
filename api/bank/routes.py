from flask import jsonify, render_template, redirect, url_for, request, session, flash
from flask_login import login_user, logout_user, current_user, login_required
from datetime import datetime
from api.bank import bank
from api.bank.hash import decrypt
from app.models import abcBankUser, mnoBankUser, xyzBankUser
from decimal import Decimal
import api.bank.utils as utils

@bank.route('/')
def index():
    details = None
    if request.method == 'GET':
        try:
            params = request.args.get('q')
            original_data = decrypt.decrypt_data(params)
            details = utils.retrieve_data(original_data)
            print(details)
            
            if not details:
                return jsonify({"status": "failed", "description": "Payment Details Not Found"}), 400
            
            session['mode_info'] = details
            sessionMode = session['mode_info'].get('mode')
            
            if sessionMode == "netbanking":
                return redirect('/bank/api/netbanking_login')
            elif sessionMode == "debitcard":
                return redirect('/bank/api/debitcard')
            elif sessionMode == "creditcard":
                return redirect('/bank/api/creditcard')
            
            else:
                return jsonify({"status": "failed", "description": "Payment Mode Unspecified"}), 400
        except:
            return jsonify({"description" : "Official Bank API"}), 500
    
    return jsonify({"status": "failed", "description": "Error connecting to Bank..."}), 400

@bank.route('/netbanking_login', methods=['GET', 'POST'])
def netBankingLogin():
    if 'mode_info' not in session:
        return jsonify({"status": "failed", "description": "Session data missing"}), 400
    
    if request.method == 'GET':
        bankName = utils.getBankName(session['mode_info'].get('data'))
        session['bankName'] = bankName
                
        expirationTime = utils.getExpirationTime(session['mode_info'].get('expirationTime'))
        if expirationTime > datetime.now():
            return render_template('bankLogin.html', bankName = session['bankName'])
        return jsonify({"status": "failed", "description": "Token Expired"}), 400
    
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        conn = utils.get_db_connection("banks")
        cursor = conn.cursor(dictionary=True)
        
        table_name = session['mode_info'].get('data')
        
        cursor.execute(f"SELECT * FROM {table_name} WHERE username = '{username}'")
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user and password == user['accountPassword']:
            if table_name == 'abc':    
                user_obj = abcBankUser(
                    accountID=user['accountID'],
                    username=user['username'],
                    accountPassword=user['accountPassword'],
                    accountNo = user['accountNo'],
                    accountName = user['accountName'],
                    transactionPassword = user['transactionPassword'],
                    accountBalance = user['accountBalance']
                )
            elif table_name == 'mno':    
                user_obj = mnoBankUser(
                    accountID=user['accountID'],
                    username=user['username'],
                    accountPassword=user['accountPassword'],
                    accountNo = user['accountNo'],
                    accountName = user['accountName'],
                    transactionPassword = user['transactionPassword'],
                    accountBalance = user['accountBalance']
                )
            elif table_name == 'xyz':    
                user_obj = xyzBankUser(
                    accountID=user['accountID'],
                    username=user['username'],
                    accountPassword=user['accountPassword'],
                    accountNo = user['accountNo'],
                    accountName = user['accountName'],
                    transactionPassword = user['transactionPassword'],
                    accountBalance = user['accountBalance']
                )
            else:
                user_obj = None
                
            login_user(user_obj)
            utils.createBankTransactionEntry(userName = current_user.username, bankID=session['mode_info'].get('data'))
            return redirect(url_for('bank.netBankingMain'))
        else:
            flash('Invalid credentials')
            return render_template('bankLogin.html', bankName=session['bankName'])

@bank.route('/netbanking_main', methods=['GET', 'POST'])
@login_required
def netBankingMain():
    if request.method == 'GET':
        session['attempts'] = 3  # Initialize attempt counter
        return render_template('bankMain.html', user=current_user.accountName, amount=session['mode_info'].get('amount'), bankName=session['bankName'])

    if request.method == 'POST':
        expirationTime = utils.getExpirationTime(session['mode_info'].get('expirationTime'))
        if expirationTime < datetime.now():
            return jsonify({"status": "failed", "description": "Token Expired"}), 400
            
            
        if 'attempts' not in session:
            session['attempts'] = 3

        inputAccountNo = request.form.get('accountNo')
        inputTransactionPassword = request.form.get('transactionPassword')
        amount = Decimal(session['mode_info'].get('amount'))


        condition1 = inputAccountNo == current_user.accountNo
        condition2 = inputTransactionPassword == current_user.transactionPassword
        condition3 = current_user.accountBalance >= amount
        
        if condition1 and condition2 and condition3:

            return utils.handleWithdrawal(mode="banks",
                                    mode_name="accountID",
                                    mode_no = current_user.accountID, 
                                    current_balance=current_user.accountBalance,
                                    amount=amount,
                                    tableName=session['mode_info'].get('data')
                                    )
            
            
            
        else:
            session['attempts'] -= 1
            if session['attempts'] <= 0:
                utils.updateBankTransactionEntry(status = "failed")
                return utils.notifyNexpay(status="failed")
            
            if not condition1 or not condition2:
                error_message = f"Incorrect credentials. Attempts left: {session['attempts']}"
            else:
                error_message = f"Insufficient balance. Please check your account balance and try again. Attempts left: {session['attempts']}"
            
            
            return render_template('bankMain.html', user=current_user.accountName, amount=session['mode_info'].get('amount'), bankName=session['bankName'], error=error_message)
    
    return utils.notifyNexpay(status="failed")
    # return jsonify({"status": "failed", "description": "Unexpected Error Occurred", "Location": "NetbankingMain"})

@bank.route('/debitcard', methods=['GET', 'POST'])
def debitCard():
    if request.method == 'GET':
        session['attempts'] = 3
        return render_template('card.html', amount = session['mode_info'].get('amount'), cardBrand = session['mode_info'].get('data'), cardNo = "debitCardNo")
    
    if request.method == 'POST':
        expirationTime = utils.getExpirationTime(session['mode_info'].get('expirationTime'))
        if expirationTime < datetime.now():
            return jsonify({"status": "failed", "description": "Token Expired"}), 400
        
        if 'attempts' not in session:
            session['attempts'] = 3

        inputDebitCardNo = request.form.get('debitCardNo')
        inputExpiryDate = request.form.get('expiryDate')
        inputCVV = request.form.get('cvv')
        amount = Decimal(session['mode_info'].get('amount'))

        print(inputDebitCardNo, inputExpiryDate, inputCVV)
        
        user = utils.getCardDetails(tableName=session['mode_info'].get('mode'),
                              inputCardNo=inputDebitCardNo,
                              inputExpiryDate=inputExpiryDate,
                              inputCVV=inputCVV
                              )
        
        if user:
            currentUserDetails = utils.getCurrentBalanceAndUserName(mode = "debitCardNo",
                                                              mode_no = inputDebitCardNo,
                                                              bankName = user['bankName']
                                                              )
            
            currentBalance = currentUserDetails['accountBalance']
            userName = currentUserDetails['userName']
            
            utils.createBankTransactionEntry(userName=userName, bankID=user['bankName'])
            
        if user and currentBalance >= amount:

            return utils.handleWithdrawal(mode="banks",
                                    mode_name="debitCardNo",
                                    mode_no = inputDebitCardNo, 
                                    current_balance=currentBalance,
                                    amount=amount,
                                    tableName=user['bankName']
                                    )
            
            
            
        else:
            session['attempts'] -= 1
            if session['attempts'] <= 0:
                utils.createBankTransactionEntry()
                utils.updateBankTransactionEntry(status = "failed")
                logout_user()
                return utils.notifyNexpay(status="failed")         
            if not user:
                error_message = f"Incorrect credentials. Attempts left: {session['attempts']}"
            else:
                error_message = f"Insufficient balance. Please check your account balance and try again. Attempts left: {session['attempts']}"
            return render_template('card.html', amount = session['mode_info'].get('amount'), cardBrand = session['mode_info'].get('data'), cardNo = "debitCardNo", error=error_message)
    return utils.notifyNexpay(status="failed")
    # return jsonify({"status": "failed", "description": "Unexpected Error Occurred", "Location": "debitCard"})


@bank.route('/creditcard', methods=['GET', 'POST'])
def creditCard():
    if request.method == 'GET':
        session['attempts'] = 3
        return render_template('card.html', amount = session['mode_info'].get('amount'), cardBrand = session['mode_info'].get('data'), cardNo = "creditCardNo")
    
    if request.method == 'POST':
        expirationTime = utils.getExpirationTime(session['mode_info'].get('expirationTime'))
        if expirationTime < datetime.now():
            return jsonify({"status": "failed", "description": "Token Expired"}), 400
        
        if 'attempts' not in session:
            session['attempts'] = 3

        inputCreditCardNo = request.form.get('creditCardNo')
        inputExpiryDate = request.form.get('expiryDate')
        inputCVV = request.form.get('cvv')
        amount = Decimal(session['mode_info'].get('amount'))

        print(inputCreditCardNo, inputExpiryDate, inputCVV)
        
        user = utils.getCardDetails(tableName=session['mode_info'].get('mode'),
                              inputCardNo=inputCreditCardNo,
                              inputExpiryDate=inputExpiryDate,
                              inputCVV=inputCVV
                              )
        
        if user:
            currentUserDetails = utils.getCurrentBalanceAndUserName(mode = "creditCardNo",
                                                              mode_no = inputCreditCardNo,
                                                              bankName = user['bankName']
                                                              )
            
            currentBalance = user['creditBalance']
            userName = currentUserDetails['userName']
            
            utils.createBankTransactionEntry(userName=userName, bankID=user['bankName'])
            
        if user and currentBalance >= amount:

            return utils.handleWithdrawal(mode="othermodes",
                                    mode_name="creditCardNo",
                                    mode_no = inputCreditCardNo, 
                                    current_balance=currentBalance,
                                    amount=amount,
                                    tableName="creditCard",
                                    columnName="creditBalance"
                                    )
            
            
            
        else:
            session['attempts'] -= 1
            if session['attempts'] <= 0:
                utils.createBankTransactionEntry()
                utils.updateBankTransactionEntry(status = "failed")
                logout_user()
                return utils.notifyNexpay(status="failed")         
            if not user:
                error_message = f"Incorrect credentials. Attempts left: {session['attempts']}"
            else:
                error_message = f"Insufficient Credit Balance. Please check your Credit balance and try again. Attempts left: {session['attempts']}"
            return render_template('card.html', amount = session['mode_info'].get('amount'), cardBrand = session['mode_info'].get('data'), cardNo = "creditCardNo", error=error_message)
    return utils.notifyNexpay(status="failed")


@bank.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('bank.netBankingLogin'))
