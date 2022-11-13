import os 

def getEnv(key: str, default: str = None) -> str:
    """Obtener una variable de entorno o devolver un valor por defecto."""
    return os.environ.get(key, default)
