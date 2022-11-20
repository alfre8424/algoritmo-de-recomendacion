from abc import ABC, abstractmethod


class ProductEntity(ABC):
    @abstractmethod
    def __init__(
        self,
        id: str,
        name: str,
        description: str,
        enabled: bool,
        popularity: float,
        unit: str
    ):
        self.id = id
        self.name = name
        self.description = description
        self.enabled = enabled
        self.popularity = popularity
        self.unit = unit
