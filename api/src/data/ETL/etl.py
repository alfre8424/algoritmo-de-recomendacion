import mysql.connector
from src.data.local.mysql_connector import MySQLConn

class ETL:
    '''
    Conexion a una base de datos MySQL usando la libreria mysql.connector
    siendo el host, user, password, database y target_table los parametros
    de conexion. La target_table es la tabla/vista de donde se obtendran 
    los datos para cargarlos en el sistema. El commerce_name es el nombre
    del comercio a registrar.
    '''
    def __init__(self, host, user, password, database, target_table, commerce_name):
        self.conn = MySQLConn(host, user, password, database)
        # tabla a realizar el ETL
        self.table_name = target_table

    def process(self):
        pass
