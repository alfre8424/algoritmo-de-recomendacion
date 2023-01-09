'''
Extraction stage for Casanova ETL
'''
# information about where to query the data
import mysql.connector
from mysql.connector import errorcode

# reading host from environment variable
import os

host = 'clan_del_dragon_mysql'
user = 'root'
password = '12345678'
database = 'gonzalozambrano'
table = 'producto1'

try:
    conx = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=database
    )

    cursor = conx.cursor()
    query = cursor.execute("SELECT * FROM {}".format(table))
    
    # get the column names
    fields = cursor.description
    field_names = [i[0] for i in fields]

    # giveng feedback about the present columns
    print('Columns present in the table: {}'.format(field_names))
    print('Starting the process of ETL')

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
else:
    conx.close()
