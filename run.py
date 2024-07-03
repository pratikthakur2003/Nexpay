from api.bank import bank
from api.nexpay import nexpay
from app import app
from flask_session import Session
import secrets

app.config["SESSION_PERMANENT"] = False 
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = secrets.token_hex(16)

Session(app)

app.register_blueprint(bank, url_prefix='/bank/api')
app.register_blueprint(nexpay, url_prefix='/nexpay/api')


if __name__ == '__main__':
    app.run(debug=True)


