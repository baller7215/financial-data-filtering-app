from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

API_URL = os.getenv("API_URL")
API_KEY = os.getenv("API_KEY")  # Access the API_KEY from the .env file

def fetch_financial_data():
    print("url:", f"{API_URL}{API_KEY}")
    response = requests.get(f"{API_URL}{API_KEY}")
    print('response', response)
    if response.status_code == 200:
        return response.json()
    return []

@app.route('/financial-data', methods=['GET'])
def get_financial_data():
    data = fetch_financial_data()

    # Filter by query parameters
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    min_revenue = request.args.get('minRevenue', type=int)
    max_revenue = request.args.get('maxRevenue', type=int)
    min_net_income = request.args.get('minNetIncome', type=int)
    max_net_income = request.args.get('maxNetIncome', type=int)

    # print('start_date', start_date)
    # print('end_date', end_date)
    # print('min_revenue', min_revenue)
    # print('max_revenue', max_revenue)
    # print('min_net_income', min_net_income)
    # print('max_net_income', max_net_income)

    filtered_data = [
        item for item in data
        if (not start_date or item['date'] >= start_date)
        and (not end_date or item['date'] <= end_date)
        and (not min_revenue or item['revenue'] >= min_revenue)
        and (not max_revenue or item['revenue'] <= max_revenue)
        and (not min_net_income or item['netIncome'] >= min_net_income)
        and (not max_net_income or item['netIncome'] <= max_net_income)
    ]

    return jsonify(filtered_data)

    # return data


if __name__ == '__main__':
    app.run(debug=True)