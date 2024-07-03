from app import app
from flask import jsonify


@app.route('/')
def index():
    return jsonify({
        "project": "NexPay - Payment Gateway Simulation",
        "status": "🚧 Currently under Construction 🚧"
    })