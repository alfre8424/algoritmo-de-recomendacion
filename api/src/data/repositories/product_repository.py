from src.data.repositories.product_repository import IProductRepository

class ProductRepository(IProductRepository):

    def getByFilter(self, filters: list(str))->list(ProductEntity):
        return 'jollaaa'
