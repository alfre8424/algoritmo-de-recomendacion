import mysql.connector

from ETL.etl import ETL

class ETLCasanova(ETL):
    '''
    ETL para el local Casanova
    '''
    def __init__(self, host, user, password, database, target_table, commerce_name):
        super().__init__(host, user, password, database, target_table, commerce_name)

    def process():
        pass

