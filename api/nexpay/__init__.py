from flask import Blueprint
from flask_cors import CORS
nexpay = Blueprint('nexpay', __name__, template_folder="templates", static_folder="static")
CORS(nexpay)


from api.nexpay import routes
from api.nexpay import utils