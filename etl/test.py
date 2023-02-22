import pandas as pd
import mysql.connector

with open('/etl/error.txt', 'w') as f:
    f.write(str("enter"))

    f.close()
try:

    host = 'mysql_clan_del_dragon'
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
    query = "SELECT p.id, p.name, p.popularity, s.quality, p.unit, c.id \
    as commerce_id,\
    c.name as commerce_name, cp.price as price, cp.id as id_pro_com, \
    c.popularity as \
    commerce_popularity from product p join commerce_product cp on(\
    p.id = cp.product_id) join commerce c on (c.id = cp.commerce_id) \
    join (select avg(rating) as quality, commerce_id from commerce_surveys \
    group by commerce_id) as s on (s.commerce_id = c.id) \
    where p.enabled = 1 and c.enabled = 1;"

    cursor.execute(query)
    products = cursor.fetchall()

    df = pd.DataFrame(
        products,
        columns=[
            'id',
            'name',
            'popularity',
            'quality',
            'unit',
            'commerce_id',
            'commerce_name',
            'price',
            'id_producto_comercio',
            'commerce_popularity'
        ],
    )

    # writing a csv file with the data
    df.to_csv('/etl/products.csv', index=False)


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
