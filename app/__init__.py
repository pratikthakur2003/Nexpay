from flask import Flask

app = Flask(__name__)

from flask_login import LoginManager
from app.models import abcBankUser, mnoBankUser, xyzBankUser
login_manager = LoginManager()
login_manager.init_app(app)

from api.bank import bank
from api.nexpay import nexpay
app.register_blueprint(bank, url_prefix='/bank/api')
app.register_blueprint(nexpay, url_prefix='/nexpay/api')


from flask_session import Session
app.config["SESSION_PERMANENT"] = False 
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = 'MY_SECRET_KEY'
Session(app)


# User = create_user_model(session['mode_info'].get('data'))

@login_manager.user_loader
def load_user(user_id):
    print(f"Received user_id: {user_id}") 
    user_type, particular_id = user_id.split('-')
    
    if user_type == "abc":
        print(f"Particular_id: {particular_id}")
        return abcBankUser.query.get(particular_id)
    elif user_type == "mno":
        print(f"Particular_id: {particular_id}")
        return mnoBankUser.query.get(particular_id)
    elif user_type == "xyz":
        print(f"Particular_id: {particular_id}")
        return xyzBankUser.query.get(particular_id)
    else:
        return None


from app import routes, models