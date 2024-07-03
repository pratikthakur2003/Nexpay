from flask import Blueprint
from flask_cors import CORS

bank = Blueprint('bank', __name__, template_folder="templates", static_folder="static")
CORS(bank)
from api.bank import routes