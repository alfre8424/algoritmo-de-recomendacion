import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

from model import PredictorModel
from preprocessor import Commerce, Preprocessor

app = Flask(__name__)
CORS(app)


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

        productos_disponibles_gz = []
        productos_no_disponibles_gz = []

        for id in canasta:
            x = gz_data[gz_data['id'] == id]
            if x.shape[0] == 0:
                productos_no_disponibles_gz.append(id)
            else:
                productos_disponibles_gz.append(x.iloc[0, 1:])

        # extrayendo el precio global de la canasta
        print("Accediendo a productos disponibles")
        print(productos_disponibles_gz)
        precio_global_gz = sum([x['price'] for x in productos_disponibles_gz])


        # --------------------- CASANOVA ---------------------
        cn: Commerce = processor.casanova
        cn_data: pd.DataFrame = cn.data if cn.data is not None \
            else pd.DataFrame()

        productos_disponibles_cn = []
        productos_no_disponibles_cn = []

        for id in canasta:
            x = cn_data[cn_data['id'] == id]
            if x.shape[0] == 0:
                productos_no_disponibles_cn.append(id)
            else:
                productos_disponibles_cn.append(x.iloc[0, 1:])

        # extrayendo el precio global de la canasta
        print("Accediendo a productos disponibles")
        print(productos_disponibles_cn)
        precio_global_cn = sum([x['price'] for x in productos_disponibles_cn])

        model_cn = PredictorModel(
            k=np.array([0.2, 0.7, 0.1]),
            q=np.array([[5, 5, 5], [5, 5, 5], [5, 5, 5]]),
            eta=5,
            beta=3,
            s=np.array([3] * 10),
            sk=0.8,
            bk=0.2,
            pp=sum([precio_global_gz, precio_global_cn])/2,  # TODO: change it
            pl=precio_global_cn,
            m=len(productos_no_disponibles_cn),
            n=len(productos_disponibles_cn)
        )

        model_gz = PredictorModel(
            k=np.array([0.2, 0.7, 0.1]),
            q=np.array([[5, 5, 5], [5, 5, 5], [5, 5, 5]]),
            eta=5,
            beta=3,
            s=np.array([3] * 10),
            sk=0.8,
            bk=0.2,
            pp=sum([precio_global_cn, precio_global_gz])/2,
            pl=precio_global_gz,
            m=len(productos_no_disponibles_gz),
            n=len(productos_disponibles_gz)
        )

        score_gz = model_gz.score()

        gz_available_pro = [
            ({
                "id": x[0],
                "name": x[1],
                "unit": x[4] if x[4] is not np.nan else '-',
                "price": x[7] if x[7] is not np.nan else 1e10
            }
                if x[0] in canasta else None
            )
            for x in gz_data.values
        ]

        # removing all the None values
        gz_available_pro = [x for x in gz_available_pro if x is not None]


        score_cn = model_cn.score()

        cn_available_pro = [
            ({
                "id": x[0],
                "name": x[1],
                "unit": x[4] if x[4] is not np.nan else '-',
                "price": x[7] if x[7] is not np.nan else 1e10
            }
                if x[0] in canasta else None
            )
            for x in cn_data.values
        ]

        # removing all the None values
        cn_available_pro = [x for x in cn_available_pro if x is not None]

        print("Commerce prices: ", precio_global_gz, precio_global_cn)
        print("Commerce scores: ", score_gz, score_cn)

        # ----------------- MEJOR COMERCIO -------------------
        best_commerce_index = [score_gz, score_cn].index(
            max(score_gz, score_cn)
        )
        best_commerce = [gz_data, cn_data][best_commerce_index]

        best_commerce_available_pro = [
            gz_available_pro,
            cn_available_pro
        ][best_commerce_index]

        best_commerce_score = [
            score_gz, score_cn
        ][best_commerce_index]

        best_commerce_no_disponibles = [
            productos_no_disponibles_gz,
            productos_no_disponibles_cn
        ][best_commerce_index]

        best_commerce_price = [
            precio_global_gz,
            precio_global_cn
        ][best_commerce_index]

        return jsonify({
            'canasta': best_commerce_available_pro,
            'mejor_local': best_commerce['commerce_name'].values[0],
            'comercio_id': best_commerce['commerce_id'].values[0],
            'comercio_calidad': best_commerce['quality'].values[0],
            'score': best_commerce_score,
            'precio': best_commerce_price,
            'mensaje': f'Hay {len(best_commerce_no_disponibles)} productos no \
                disponibles en el local',
            'productos_faltantes': best_commerce_no_disponibles
        })

    return 'no se ha recibido la canasta'


if __name__ == '__main__':
    app.run(debug=True, port=8300, host='0.0.0.0')
