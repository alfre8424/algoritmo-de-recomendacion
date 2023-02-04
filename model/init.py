import pandas as pd
import math 
import numpy as np

class Predictor:
    def __init__(self, promedio_calidad_locales: float, promedio_popularidad_locales: float):
        # It will come from the ETL container using shared volumes
        self.data_dir = 'data.csv'
        self.data = pd.read_csv(self.data_dir)
        self.promedio_calidad_locales = promedio_calidad_locales
        self.promedio_popularidad_locales = promedio_popularidad_locales

    def predict_score(self, popularidad_local: float, calidad_local: float, productosDict: dict):
        '''
        Esta funcion se encarga de predecir un score para un local. En el proceso final de 
        recomendacion, cada local tendra un score calculado por esta funcion, permitiendo 
        asi seleccionar el local con mejor score para realizar la compra.

        @param popularidad_local: float - Popularidad del local donde realizar la prediccion
        @param calidad_local: float - Calidad del local donde realizar la prediccion
        @param productos: dict - Diccionario con los productos a comprar. Cada producto tiene un ID

        @return retorna el score asi como la lista de productos disponibles en el local
        '''

        # obteniendo los productos que hacen match con el nombre y tamaño de los productos a comprar
        productos: pd.DataFrame = pd.DataFrame(columns=self.data.columns)

        for producto in productosDict:
            producto = self.data.loc[(self.data['name'] == producto['name']) & (self.data['unit'] == producto['unit'])]
            productos = productos.append(producto)


        # el dataframe tendra una columna llamada "popularidad" que indica la popularidad de cada producto
        # esta columna sera utilizada como promedio de popularidad de la canasta a comprar
        popularidad_productos: float = productos['popularity'].mean()
        valor_canasta: float = productos['price'].sum()
        
        # calculando que tanto se despega la calidad del local de la calidad promedio de los locales,
        # amortiguando el efecto de la calidad del local en el score final
        calidad_desviacion: float = (calidad_local - self.promedio_calidad_locales)

        # calculando que tanto se despega la popularidad del local de la popularidad promedio de los locales,
        # amortiguando el efecto de la popularidad del local en el score final
        popularidad_desviacion: float = (popularidad_local - self.promedio_popularidad_locales)

        # penalizando al local en proporcion con la cantidad de productos que no tiene. El score se 
        # calcula tomando en cuenta los [productos] y [productosDict] como conjuntos, por lo que
        # el score se penaliza en proporcion a la cantidad de productos que no tiene el local
        score_penalizacion: float = 1 - (len(productos) / len(productosDict))


        # calculando el score final
        score: float = (popularidad_productos * 0.5) + (valor_canasta * 0.2) + (calidad_desviacion * 0.1) + (popularidad_desviacion * 0.1) + (score_penalizacion * 0.1)

        return score, productos
