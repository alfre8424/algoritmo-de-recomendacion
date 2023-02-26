'''
Extraction stage for Gonzalo Zambrano ETL
'''
# information about where to query the data
import mysql.connector
from mysql.connector import errorcode
import uuid

import numpy as np


# reading host from environment variable

host = 'mysql_clan_del_dragon'
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

# List of words to be replaced
replacements = {
    'acei': 'aceite',
    'azu': 'azucar',
    'chan': 'chanchito',
    'cerv': 'cerveza',
    'choc': 'chocolate',
    'coc': 'coca',
    'col': 'cola',
    'comp': 'completa',
    'crio': 'criollo',
    'fav': 'favorita',
    'fior': 'fioravanti',
    'gall': 'galleta',
    'gel': 'gelatina',
    'gira': 'girasol',
    'gatora': 'gatorade',
    'lec': 'leche',
    'mante': 'mantequilla',
    'mons': 'monster',
    'more': 'morena',
    'pas': 'pasta',
    'pep': 'pepsi',
    'power': 'powerade',
    'spri': 'sprite',
    'unive': 'universal',
    'viv': 'vive',
    'spora': 'sporade',
    'mag': 'maggi',
    'malt': 'malta',
    'most': 'mostaza',
    'pimi': 'pimienta',
    'sals': 'salsa',
    'sazon': 'sazonador',
    'agu': 'agua',
    'higie': 'higienico',
    'det': 'detergente',
    'cabel': 'cabello',
    'hari': 'harina',
    'trig': 'trigo',
    'jab': 'jabon',
    '  ': ' ',

    # measures
    'gr': 'g',
    'lts': 'l',
    'lt': 'l',
    'mls': 'ml',
    'k': 'kg',
    'mt': 'm',
    'mts': 'm'
}

# list of the words to be deleted from the string
stopwords = ['c/u']


def transform_only_text(x):
    '''
    Transforms a string to lowercase and complete broken words
    '''
    if x is None or x is np.nan:
        return (np.nan, np.nan,)
    # estandarizando todo en minusculas
    example_text = str(x).lower()

    new_sentence = []
    # replacing the non complete text
    for word in example_text.split(' '):
        new_word = word
        new_word = word.replace(',', '.')
        if word in replacements.keys():
            new_word = replacements[word]
        if word in stopwords:
            new_word = ''
        new_sentence.append(new_word)

    return ' '.join(new_sentence)
# ----------------------------------------------------------------------------------


try:
    # connection to extract products from the commerce DB
    commerce_conx = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=database
    )

    # connection to insert products into the main DB
    main_conx = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=main_database_name
    )

    # ---------------------------------------------------------------------------------------
    commerce = main_conx.cursor()
    commerce_query = "SELECT * FROM {} where id = '{}'".format(
        main_database_commerce_table, target_commerce_id)
    commerce.execute(commerce_query)
    commerce = commerce.fetchone()
    # ---------------------------------------------------------------------------------------
    # extracting data from the commerce datasource to add it to
    # the main database
    print(
        "\n\nIniciando proceso de extraccion para el comercio: ", commerce[1])
    commerce_cursor = commerce_conx.cursor()
    commerce_product_query = commerce_cursor.execute(
        "SELECT * FROM {}".format(table))

    # get the column names
    commerce_product_fields = commerce_cursor.description
    commerce_products = set()
    for row in commerce_cursor:
        commerce_products.add(row)
    commerce_fields = [i[0] for i in commerce_product_fields]

    # giveng feedback about the present columns
    print('Campos disponibles en la tabla de la fuente de datos: {}'.format(
        commerce_fields))
    print('Numero de productos encontrados: {}'.format(len(commerce_products)))
    # ---------------------------------------------------------------------------------------
    print("\n\nIniciando proceso de transformacion para {} registros en el comercio: ".format(
        len(commerce_products)) + commerce[1])
    transformed_products = []
    for product, index in zip(commerce_products, range(len(commerce_products))):
        print("Transformando producto {} de {}".format(
            index + 1, len(commerce_products)), end='\r')
        transformed_products.append({
            'id': str(uuid.uuid4()),
            'name': transform_only_text(product[1]),
            'price': product[2],
            'product_id': product[0],
            'description': '',
            'stock': product[4],
            'unit': product[3],
        })
    print("{} productos transformados".format(len(transformed_products)))
    print("Preparando la carga de {} productos en el comercio: ".format(
        len(transformed_products)) + commerce[1])
    for product, index in zip(transformed_products, range(len(transformed_products))):
        print("Verificando si el producto {} no existe en la base de datos".format(
            product['name']))
        product_query = "SELECT * FROM {} where name = '{}' AND unit = '{}'".format(
            main_database_product_table, product['name'], product['unit'], end='\r')
        product_cursor = main_conx.cursor()
        product_cursor.execute(product_query)
        product_from_db = product_cursor.fetchone()
        if product_from_db is None:
            print("El producto {} no existe en la base de datos, creando...".format(
                product['name']))
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
    # ---------------------------------------------------------------------------------------
    print("Iniciando proceso de enlace con el comercio: ", commerce[1])
    for product, index in zip(transformed_products, range(len(transformed_products))):
        print("Verificando si el producto {} no existe en la base de datos".format(
            product['name']))
        product_query = "SELECT * FROM {} where product_id = '{}' AND commerce_id = '{}'".format(
            'commerce_product', product['id'], target_commerce_id)
        product_cursor = main_conx.cursor()
        product_cursor.execute(product_query)
        product_from_db = product_cursor.fetchone()
        if product_from_db is None:
            print("El producto {} no existe en la base de datos, creando...".format(
                product['name']))
            product_query = "INSERT INTO {} (id, product_code, price, stock, product_id, commerce_id, created_at, updated_at) VALUES ('{}', '{}', {}, {}, '{}', '{}', '{}', '{}')".format(
                'commerce_product',
                str(uuid.uuid4()),
                product['product_id'],
                product['price'],
                product['stock'],
                product['id'],
                target_commerce_id,
                '2020-01-01 00:00:00',
                '2020-01-01 00:00:00'
            )
            product_cursor = main_conx.cursor()
            product_cursor.execute(product_query)
        else:
            print("El producto ya existe en la base de datos, actualizando...")
            product_query = "UPDATE {} SET price = {}, stock = {} WHERE id = '{}'".format(
                'commerce_product',
                product['price'],
                product['stock'],
                product_from_db[0]
            )
            update_cursor = main_conx.cursor()
            update_cursor.execute(product_query)
    print("Realizando commit")
    main_conx.commit()
    print("Carga de productos en el comercio finalizada\n\n#--------------------------------------")


except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
    # commerce_conx.close()
    # main_conx.close()
