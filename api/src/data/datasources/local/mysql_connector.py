import mysql.connector
from src.core.utils.environment import getEnv

class MySQLConn:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            passwd=password,
            database=database
        )

    def execute(self, query):
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return result

    def execute_with_params(self, query, params):
        cursor = self.conn.cursor()
        cursor.execute(query, params)
        result = cursor.fetchall()
        cursor.close()
        return result

    def commit(self):
        self.conn.commit()

    def close(self):
        self.conn.close()
