import numpy as np

replacements = {
    'acei': 'aceite',
    'gã¼itig': 'guitig',
    'aliã±o': 'aliño',
    'alio': 'aliño',
    'chic': 'chicles',
    'chicle': 'chicles',
    'fant': 'fanta',
    'desod': 'desodorante',
    'ciclã³n': 'ciclón',
    'limã³n': 'limón',
    'primav': 'primavera',
    'gitig': 'guitig',
    'rica': 'ricacao',
    'caf': 'caffe',
    'roy': 'royal',
    'ajinomot': 'ajinomoto',
    'enveje': 'envejecido',
    'fresc': 'fresco',
    'integ': 'integral',
    'aven': 'avena',
    'descrem': 'descremada',
    'galletas': 'galleta',
    'atn': 'atún',
    'atãºn': 'atún',
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

    return (' '.join(new_sentence)).strip()
