'''
Este archivo contendra todas las funciones necesarias para procesar el
texto del nombre de los productos y la descripcion
'''
import spacy
import string
import unidecode
import re
import json

from spacy.matcher import Matcher
from quantulum3 import parser

# cargando las processing_rules.json para indicar las reglas de procesado
# en spacy. Esto ayuda a completar por ejemplo 'fav' con 'favorita'
with open('processing_rules.json') as f:
    processing_rules = json.load(f)


def extract_measure(text: str) -> tuple:
    '''
    Esta funcion extrae la unidad de medida de un texto, por ejemplo 
    si un string pone 'Aceite de 1kg', esta funcion extrae '1 kg' y 
    '1kg', es decir, la unidad procesada y la unidad extraida sin 
    procesar (fijarse en el espacio)
    '''
    unit = parser.parse(text)
    # extrayendo la unidad de medida solamente
    surface = unit[0].unit.original_dimensions[0]['surface']
    # extrayendo el valor de la unidad de medida
    value = unit[0].value
    # extrayendo la medida original (sin procesar)
    original_surface = unit[0].surface
    # estandarizando el espacio entre el valor y la unidad de medida
    product_measure = f'{value} {surface}'

    return product_measure, original_surface


def standardize_text(text: str) -> str:
    '''
    Estandariza el texto transformandolo a minusculas, quitando acentos,
    signos de puntuacion, unidades de medida, etc.
    '''
    processed_text = text.lower()

    # almacena los lemas del texto
    splitted_text = []

    # Eligiendo reglas de autocompletado
    replacements = processing_rules

    # replacing the non complete text
    for word in processed_text.split(' '):
        new_word = word
        if word in replacements.keys():
            new_word = replacements[word]
        splitted_text.append(new_word)

    # uniendo el texto
    processed_text = ' '.join(splitted_text)

    measure, surface = None, None

    try:
        # [measure] hace referencia a la unidad de medida procesada y
        # [original_measure] a la unidad de medida original
        measure, surface = extract_measure(processed_text)
    except:
        pass

    # quitando la unidad de medida del texto
    processed_text = processed_text.replace(
        surface if surface is not None else '', ''
    )

    # eliminando comas, puntos, puntos y comas, etc.
    processed_text = processed_text.translate(
        str.maketrans('', '', string.punctuation),
    )
    # eliminando acentos
    processed_text = unidecode.unidecode(processed_text)
    processed_text = processed_text.strip()

    return processed_text, measure if measure is not None else 'NA'

