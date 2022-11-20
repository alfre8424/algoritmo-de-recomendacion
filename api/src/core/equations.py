import math 

class EngineEquations:
    def __init__(self):
        pass 

    def balance_impact(self, x: float, price: float, quality: float, pm: float, qm: float)->float:
        '''
        Calcula el impacto que tiene el balance precio/calidad en la recomendacion 
        final. @x es la entrada de preferencia de usuario para este apartad, @price
        es el precio del producto a calcular el impacto, y @pm es la mediana de 
        todos los precios de la linea del producto, y @qm la mediana de la calidad
        de todos los posibles productos de la linea a buscar.
        '''
        ro = lambda x: (x - math.e**x) * (math.log(price + 1e-16, pm) - 1) # precio
        psi = lambda x: (x + math.e**x)*(math.log(quality + 1e-16, qm) - 1) # calidad

        eta = lambda x: x if x <= 0 else -x * 1e-1
        alpha = lambda x: x if x >= 0 else -x * 1e-1
        print(f"ro: {ro(eta(x))} | psi: {psi(alpha(x))}")
        return math.atan(ro(eta(x)) + psi(alpha(x)))

    def popularity_impact(self, x, s, ms, mp, p, n, q)->float:
        '''
        Calcula el impacto de la popularidad. @X es la entrada del usuario, @s es la 
        cantidad de encuestas asociadas al producto, @p es el precio del producto, @n
        es la cantidad de veces que el producto aparece en las canastas predichas, y 
        @q es la calidad del producto. @ms es la media de encuestas y mp es la media 
        del precio.
        '''
        phi = lambda x: -x / ((ms - s) * n + math.log(p, mp)) # nuevos
        lam = lambda x: n*s*x / p # populares

        alpha = lambda x: x if x < 0 else (1 if x==0 else -x*10e-16)
        eta = lambda x: x if x > 0 else (1 if x == 0 else -x*10e-16)

        print(f"phi {phi(alpha(x))}, lam {lam(eta(x))}")

        return math.atan(phi(alpha(x)) + lam(eta(x)))
