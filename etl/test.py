with open('/etl/feedback.txt', 'w') as f:
    f.write('starting qweqweqweqw')
f.close()

import pandas as pd
import numpy as np
import mysql.connector
from mysql.connector import errorcode

try:

    host = 'clan_del_dragon_mysql'
    user = 'root'
    password = '12345678'
    database = 'clan_del_dragon'

    conx = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=database
    )

    cursor = conx.cursor()
    query = "SELECT p.id, p.name, p.popularity, p.unit, c.id as commerce_id, c.name as commerce_name, c.popularity as commerce_popularity from product p join commerce_product cp on(p.id = cp.product_id) join commerce c on (c.id = cp.commerce_id) where p.enabled = 1 and c.enabled = 1;"

    cursor.execute(query)
    products = cursor.fetchall()

    df = pd.DataFrame(products, columns=['id', 'name', 'popularity', 'unit', 'commerce_id', 'commerce_name', 'commerce_popularity'])

    # writing a csv file with the data
    df.to_csv('/etl/products.csv', index=False)

    # writting a feedback file
    with open('/etl/feedback.txt', 'w') as f:
        f.write('success')
    f.close()


except mysql.connector.Error as err:
    # write the rror in a file (create if not exists)
    with open('/etl/error.txt', 'w') as f:
        f.write(str(err))

    f.close()
except Exception as err:
    # write the rror in a file (create if not exists)
    with open('/etl/error.txt', 'w') as f:
        f.write(str(err))

    f.close()
except:
    # write the rror in a file (create if not exists)
    with open('/etl/error.txt', 'w') as f:
        f.write('Unknown error')

    f.close()
