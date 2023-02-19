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
    if 'canasta' in list(request.json if request.json else []):
        # decodificando json
        canasta = list(request.json['canasta'] if request.json else [])
        processor = Preprocessor()
        gz: Commerce = processor.gonzalozambrano
        gz_data: pd.DataFrame = gz.data if gz.data is not None \
            else pd.DataFrame()

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
            k=np.array([0.2, 0.7, 0.1]),
            q=np.array([[5, 5, 5], [5, 5, 5], [5, 5, 5]]),
            eta=5,
            beta=3,
            s=np.array([3] * 10),
            sk=0.8,
            bk=0.2,
            pp=precio_global_gz,  # TODO: change it
            pl=precio_global_gz,
            m=len(productos_no_disponibles),
            n=len(productos_disponibles)
        )

        score = model.score()

        return jsonify({
            'canasta': canasta,
            'mejor_local': 'Gonzalo Zambrano',
            'score': score,
            'precio': precio_global_gz,
            'mensaje': f'Hay {len(productos_no_disponibles)} productos no \
                disponibles en el local',
            'productos_faltantes': productos_no_disponibles
        })

    return 'no se ha recibido la canasta'


if __name__ == '__main__':
    app.run(debug=True, port=8300, host='0.0.0.0')
