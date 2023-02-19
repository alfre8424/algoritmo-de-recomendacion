import numpy as np


class PredictorModel:
    '''
    Modelo de rating de locales para determinar el que tiene la mejor canasta
    '''
    def __init__(
        self,
        k: np.ndarray,
        q: np.ndarray,
        eta: int,
        beta: int,
        s: np.ndarray,
        sk: float,
        bk: float,
        pp: float,
        pl: float,
        m: int,
        n: int
    ):
        '''
        k: np.array de ponderacion por pregunta
        q: np.array matriz de calidad obtenido del sistema
        eta: int valor maximo con que un usuario puede calificar la calidad
        beta: int valor minimo con que un usuario puede calificar la
            popularidad
        s: np.array reivews de popularidad recibida en el sistema
        sk: float impacto de la popularidad recibida en el sistema
        bk: flaot impacto de la popularidad recibida por encuestas
        pp: precio promedio de la canasta en otros locales
        pl: precio promedio de la canasta en el local
        m: int numero de productos no disponibles en el local
        n: int cantidad de productos disponibles en el local
        '''
        self.k = k
        self.q = q
        self.eta = eta
        self.beta = beta
        self.s = s
        self.sk = sk
        self.bk = bk
        self.pp = pp
        self.pl = pl
        self.m = m
        self.n = n

    def __quality(self) -> float:
        '''
        Calculo de la calidad de un determinado local
        '''
        # numero de preguntas sobre calidad recibidas
        n = self.q.shape[0]

        # amortiguador para evitar que el valor se dispare
        modificador = 1/n*self.eta*1e-1

        def suma_interna(qi): return sum(
            [ki*qij for ki, qij in zip(self.k, qi)]
        )

        psi = modificador*(sum([suma_interna(qi) for qi in self.q]))

        return psi

    def __popularidad(self) -> float:
        '''
        Calculo de la popularidad de un determinado local
        '''
        n = self.s.shape[0]
        alpha = (self.bk * self.beta + self.sk * sum(self.s)/n)

        return alpha/self.s.max()

    def score(self) -> float:
        '''
        Calcula el score final del local
        '''
        a = self.__popularidad() * self.__quality()

        # entre mas alta sean las canastas en otros locales entonces mayor sera
        # el score para el local actual
        b = (self.pp/(1 + self.pl)) if (self.pl != 0 and self.pp != 0)\
            else 1

        f = a*b*(1 + self.n) / (1 + self.m + self.n)

        print(f"Popularidad local: {self.__popularidad()}")
        print(f"Calidad local: {self.__quality()}")
        print("Precio canasta en local: ", self.pl)
        print("Precio canasta en otros locales: ", self.pp)
        print("Productos faltantes: ", self.m)

        return f
