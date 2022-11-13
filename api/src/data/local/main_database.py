from src.data.local.mysql_connector import MySQLConn
from src.core.utils.environment import getEnv

class MainDatabaseConn:
    '''Singleton clase para la conexión a la base de datos principal'''
    __instance = None
    @staticmethod
    def getInstance():
        if MainDatabaseConn.__instance == None:
            MainDatabaseConn()
        return MainDatabaseConn.__instance

    def __init__(self):
        if MainDatabaseConn.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            pass
            # MainDatabaseConn.__instance = MySQLConn(
            #     host=getEnv('DB_HOST'),
            #     user=getEnv('DB_USERNAME'),
            #     password=getEnv('DB_PASSWORD'),
            #     database=getEnv('DB_DATABASE')
            # )
