import numpy as np
from flask import Flask, jsonify, request

from model import PredictorModel
app = Flask(__name__)

# definiendo rutas
@app.route('/test')
def test():
    return 'Hola Mundo'

@app.route('/api/v1/recomendar', methods=['POST'])
def recomendar():
    if 'canasta' in request.json:
        # decodificando json
        canasta = request.json['canasta']
        # TODO: remove it
        available = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        model = PredictorModel(
            k = np.array([0.2, 0.7, 0.1]),
            q = np.array([[4, 3, 4], [5, 3, 5], [1, 4, 3]]),
            eta = 5,
            beta = 3,
            s = np.array([3, 3, 2, 1, 3, 2, 2, 3, 3, 1, 2, 3]),
            sk = 0.8,
            bk = 0.2,
            pp = 10.2,
            pl = 9.8,
            m = [x for x in canasta if x not in available]
        )

        score = model.score()

        return jsonify({
            'canasta': canasta,
            'mejor_local': 'Gonzalo Zambrano',
            'score': score,
            'precio': 9.8,
            'productos_faltantes': ['12312312']
        })

    return 'no se ha recibido la canasta'

if __name__ == '__main__':
    app.run(debug=True, port=8300, host='0.0.0.0')
