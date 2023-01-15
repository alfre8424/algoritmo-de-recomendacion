'''
Extraction stage for Casanova ETL
'''
# information about where to query the data
import mysql.connector
import uuid
from mysql.connector import errorcode

# reading host from environment variable
import os

host = 'clan_del_dragon_mysql'
user = 'root'
password = '12345678'
database = 'gonzalozambrano'
table = 'producto1'

# the ID of the commerce on DB
target_commerce_id = 'gonzalozambrano'

# the name of the main database of the system
main_database_name = 'clan_del_dragon'
main_database_commerce_table = 'commerce'
main_database_product_table = 'product'

try:
    commerce_conx = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=database
    )

    main_conx = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=main_database_name
    )

    #---------------------------------------------------------------------------------------
    commerce = main_conx.cursor()
    commerce_query = "SELECT * FROM {} where id = '{}'".format(main_database_commerce_table, target_commerce_id)
    commerce.execute(commerce_query)
    commerce = commerce.fetchone()
    #---------------------------------------------------------------------------------------
    # extracting data from the commerce datasource to add it to 
    # the main database
    print("\n\nIniciando proceso de extraccion para el comercio: " + commerce[1])
    commerce_cursor = commerce_conx.cursor()
    commerce_product_query = commerce_cursor.execute("SELECT * FROM {}".format(table))
    
    # get the column names
    commerce_product_fields = commerce_cursor.description
    commerce_products = set()
    for row in commerce_cursor:
        commerce_products.add(row)
    commerce_fields = [i[0] for i in commerce_product_fields]

    # giveng feedback about the present columns
    print('Campos disponibles en la tabla de la fuente de datos: {}'.format(commerce_fields))
    print('Numero de productos encontrados: {}'.format(len(commerce_products)))
    #---------------------------------------------------------------------------------------
    print("\n\nIniciando proceso de transformacion para {} registros en el comercio: ".format(len(commerce_products)) + commerce[1])
    transformed_products = []
    for product, index in zip(commerce_products, range(len(commerce_products))):
        print("Transformando producto {} de {}".format(index + 1, len(commerce_products)), end='\r')
        transformed_products.append({
            'id': str(uuid.uuid4()),
            'name': product[1],
            'description': '',
            'unit': product[3],
        })
    print("{} productos transformados".format(len(transformed_products)))
    print("Preparando la carga de {} productos en el comercio: ".format(len(transformed_products)) + commerce[1])
    for product, index in zip(transformed_products, range(len(transformed_products))):
        print("Verificando si el producto {} no existe en la base de datos".format(product['name']))
        product_query = "SELECT * FROM {} where name = '{}' AND unit = '{}'".format(main_database_product_table, product['name'], product['unit'], end='\r')
        product_cursor = main_conx.cursor()
        product_cursor.execute(product_query)
        product_from_db = product_cursor.fetchone()
        if product_from_db is None:
            print("El producto {} no existe en la base de datos, creando...".format(product['name']))
            product_query = "INSERT INTO {} (id, name, description, unit) VALUES ('{}', '{}', '{}', '{}')".format(
                main_database_product_table,
                product['id'],
                product['name'],
                product['description'],
                product['unit']
            )
            product_cursor = main_conx.cursor()
            product_cursor.execute(product_query)
            # main_conx.commit()
            print("Producto creado")
        else:
            print("El producto ya existe en la base de datos, no se crea")
            # actualizando el id del producto
            product['id'] = product_from_db[0]
    print("Realizando commit")
    main_conx.commit()
    print("Carga de productos finalizada\n\n#--------------------------------------")
    print("Iniciando proceso de enlace con el comercio: " + commerce[1])
    for product, index in zip(transformed_products, range(len(transformed_products))):
        print("Verificando si el producto {} no existe en la base de datos".format(product['name']))
        product_query = "SELECT * FROM {} where product_id = '{}' AND commerce_id = '{}'".format('commerce_product', product['id'], target_commerce_id)
        product_cursor = main_conx.cursor()
        product_cursor.execute(product_query)
        product_from_db = product_cursor.fetchone()
        if product_from_db is None:
            print("El producto {} no existe en la base de datos, creando...".format(product['name']))
            product_query = "INSERT INTO {} (id, product_code, price, stock, product_id, commerce_id, created_at, updated_at) VALUES ('{}', '{}', {}, {}, '{}', '{}', '{}', '{}')".format(
                    str(uuid.uuid4()),
                    '',
                    product['price'],
                    product['stock'],

                'commerce_product',
                product['id'],
                target_commerce_id
            )
            product_cursor = main_conx.cursor()
            # product_cursor.execute(product


except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
    commerce_conx.close()
    main_conx.close()
