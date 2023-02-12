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
        m: list
    ):
        '''
        k: np.array de ponderacion por pregunta
        q: np.array matriz de calidad obtenido del sistema
        eta: int valor maximo con que un usuario puede calificar la calidad
        beta: int valor minimo con que un usuario puede calificar la popularidad
        s: np.array reivews de popularidad recibida en el sistema
        sk: float impacto de la popularidad recibida en el sistema
        bk: flaot impacto de la popularidad recibida por encuestas
        pp: precio promedio de la canasta en otros locales
        pl: precio promedio de la canasta en el local
        m: list de productos no disponibles en el local que si estan en la canasta
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

    def score(self)->float:
        '''
        Calcula el score final del local
        '''
        a = self.__popularidad() * self.__quality()
        b = self.pl/(self.pp + 1e-16) if self.pl != 0 and self.pp != 0 else 1e10
        dr = len(self.m)

        f = a/((b*(dr + 1) + 1e-16))

        return f
