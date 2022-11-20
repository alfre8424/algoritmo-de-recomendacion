from abc import ABC, abstractmethod


class UserEntity(ABC):
    @abstractmethod
    def __init__(
        self,
        id: str,
        email: str,
        name: str,
        enabled: bool
    ):
        self.id = id
        self.email = email
        self.name = name
        self.enabled = enabled
