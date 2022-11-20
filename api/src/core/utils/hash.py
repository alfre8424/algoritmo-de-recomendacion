from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph

class Hasher:
    """
    Clase para hacer hash de passwords. En spanglish porque esta cosa
    no quiere aceptar acentos :(
    """
    def __init__(self):
        # Si un hacker intenta vulnerar la API, hay que rezar que sea koketa
        # y se deprima con la clave del hash, si no ya fue.
        self.hash_clave = genph("5-0koketa")

    def 

