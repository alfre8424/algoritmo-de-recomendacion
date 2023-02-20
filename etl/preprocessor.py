import pandas as pd


class Commerce:
    def __init__(
        self,
        key: str,
        data: pd.DataFrame | None = None,
        popularity: float = 0,
        quality: float = 0
    ):
        self.key = key
        self.popularity = popularity
        self.quality = quality
        self.data = data


# -----------------------------------------------------------------------------------
class Preprocessor:
    def __init__(self):
        self.data = pd.read_csv('products.csv')

        # GONZALO ZAMBRANO
        self.gonzalozambrano = Commerce(key='gonzalozambrano')
        self.gonzalozambrano.data = self.data[
            self.data['commerce_id'] == self.gonzalozambrano.key
        ]

        gz_data = self.gonzalozambrano.data
        gz_popularity = gz_data.loc[0, ['commerce_popularity']].values[0]
        self.gonzalozambrano.popularity = gz_popularity
        self.gonzalozambrano.data = self.gonzalozambrano.data.drop([
            'commerce_id',
            'commerce_name',
            'commerce_popularity',
        ], axis=1)
