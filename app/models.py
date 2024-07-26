from flask import session
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from app import app

# TODO: Add a Config File and use data from it
username = 'root'
password = 'pratik'
hostAddress = 'localhost'
dbName = 'banks_db'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{username}:{password}@{hostAddress}/{dbName}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class abcBankUser(db.Model, UserMixin):
    __tablename__ = "abc"
    accountID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    accountPassword = db.Column(db.String(150), unique=True, nullable=False)
    accountName = db.Column(db.String(150), unique=True, nullable=False)
    accountNo = db.Column(db.String(150), unique=True, nullable=False)
    transactionPassword = db.Column(db.String(150), unique=True, nullable=False)
    accountBalance = db.Column(db.DECIMAL(15,2), nullable=False)
    def get_id(self):
        return f'abc-{self.accountID}'

    def __repr__(self):
        return f'<User {self.username}>'

class mnoBankUser(db.Model, UserMixin):
    __tablename__ = "mno"
    accountID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    accountPassword = db.Column(db.String(150), unique=True, nullable=False)
    accountName = db.Column(db.String(150), unique=True, nullable=False)
    accountNo = db.Column(db.String(150), unique=True, nullable=False)
    transactionPassword = db.Column(db.String(150), unique=True, nullable=False)
    accountBalance = db.Column(db.DECIMAL(15,2), nullable=False)
    def get_id(self):
        return f'mno-{self.accountID}'

    def __repr__(self):
        return f'<User {self.username}>'

class xyzBankUser(db.Model, UserMixin):
    __tablename__ = "xyz"
    accountID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    accountPassword = db.Column(db.String(150), unique=True, nullable=False)
    accountName = db.Column(db.String(150), unique=True, nullable=False)
    accountNo = db.Column(db.String(150), unique=True, nullable=False)
    transactionPassword = db.Column(db.String(150), unique=True, nullable=False)
    accountBalance = db.Column(db.DECIMAL(15,2), nullable=False)

    def get_id(self):
        return f'xyz-{self.accountID}'

    def __repr__(self):
        return f'<User {self.username}>'
    
    
    
# class BaseUser(db.Model, UserMixin):
#     __abstract__ = True
#     accountID = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(150), unique=True, nullable=False)
#     password = db.Column(db.String(150), nullable=False)

#     def get_id(self):
#         return str(self.accountID)

#     def __repr__(self):
#         return f'<User {self.username}>'

# def create_user_model(table_name):
#     class User(BaseUser):
#         __tablename__ = table_name
#     return User
