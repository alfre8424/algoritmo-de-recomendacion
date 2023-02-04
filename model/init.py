import pandas as pd
import math 
import numpy as np

class Predictor:
    def __init__(self):
        # It will come from the ETL container using shared volumes
        self.data_dir = 'data.csv'
        self.data = pd.read_csv(self.data_dir)

    def balance_impact(self, user_preference: float, price: float, quality: float, pm: float):
        '''
        The params are:
        @user_preference: float - The user preference for the balance of price & quality
        '''
