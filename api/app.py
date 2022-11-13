from flask import Flask, jsonify
from src.data.local.main_database import MainDatabaseConn

app = Flask(__name__)

# routes
@app.route('/login', methods=['POST'])
def login():
    response = jsonify({'message': 'Hello, World!'})
    return response

@app.route('/', methods=['GET'])
def index():
    response = jsonify({'message': 'Hello, World!'})
    response.status_code = 200
    return response

if __name__ == '__main__':
    # corriendo en el puerto 8000
    instance = MainDatabaseConn.getInstance()
    app.run(debug=True, host='0.0.0.0', port=8000)
