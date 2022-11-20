from abc import ABC, abstractmethod
from src.domain.entities.Product import ProductEntity

class IProductRepository(ABC):
    def __init__(self):
        self.allowed_filters = ["id", "name", "unit", "unit_quantity"]
        
    @abstractmethod
    def getByFilter(self, filters: list(str))->list(ProductEntity):
        '''
        @param name: Nombre del producto a buscar 

        Obtiene una lista de productos que coincidan con el nombre ingresado 
        recibido desde el cliente.
        '''
        pass
