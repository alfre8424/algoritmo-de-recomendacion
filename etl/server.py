import numpy as np
import pandas as pd
from flask import Flask, jsonify, request

from model import PredictorModel
from preprocessor import Commerce, Preprocessor

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
        processor = Preprocessor()
        gz: Commerce = processor.gonzalozambrano
        gz_data: pd.DataFrame = gz.data

        productos_disponibles = []
        productos_no_disponibles = []

        for id in canasta:
            x = gz_data[gz_data['id'] == id]
            if x.shape[0] == 0:
                productos_no_disponibles.append(id)
            else:
                productos_disponibles.append(x.iloc[0, 1:])

        # extrayendo el precio global de la canasta
        print("Accediendo a productos disponibles")
        print(productos_disponibles)
        precio_global_gz = sum([x['price'] for x in productos_disponibles])

        model = PredictorModel(
            k = np.array([0.2, 0.7, 0.1]),
            q = np.array([[4, 3, 4], [5, 3, 5], [1, 4, 3]]),
            eta = 5,
            beta = 3,
            s = np.array([3, 3, 2, 1, 3, 2, 2, 3, 3, 1, 2, 3]),
            sk = 0.8,
            bk = 0.2,
            pp = precio_global_gz, # TODO: change it
            pl = precio_global_gz,
            m = [x for x in canasta if x not in available]
        )

        score = model.score()

        return jsonify({
            'canasta': canasta,
            'mejor_local': 'Gonzalo Zambrano',
            'score': score,
            'precio': precio_global_gz,
            'mensaje': f'Hay {len(productos_no_disponibles)} productos no disponibles en el local',
            'productos_faltantes': productos_no_disponibles
        })

    return 'no se ha recibido la canasta'

if __name__ == '__main__':
    app.run(debug=True, port=8300, host='0.0.0.0')
