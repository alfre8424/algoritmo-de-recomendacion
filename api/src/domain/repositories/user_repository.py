from abc import ABC, abstractmethod
from src.domain.entities.User import UserEntity

class IRepository(ABC):
    @abstractmethod
    def signIn(self, email: str, password: str)-> bool or str:
        '''
        @param email: Email del usuario
        @param password: Password del usuario
        @return: True si el usuario existe y la contraseña es correcta, 
        o un string si existe error.

        Ingresa al sistema usando usuario y password, si existe una sesion
        activa entonces esta sera cerrada y se creara una nueva, inhabilitando
        el token en Redis y almacenando la IP de la maquina que inicio la 
        nueva sesion. 
        '''
        pass

    @abstractmethod
    def signOut(self, token: str)->bool or str:
        '''
        @param token: Token de la sesion
        @return: True si la sesion fue cerrada, o un string si existe error.

        Cierra la sesion actual, invalidando el token en Redis. Retorna True
        si el cierre de sesion fue exitoso, o un string con el error en caso
        contrario.
        '''
        pass

    @abstractmethod
    def signUp(self, user: UserEntity, password: str)->bool or str:
        '''
        @param user: Usuario a registrar
        @param password: Password del usuario
        @return: True si el usuario fue registrado, o un string si existe error.

        Registra un nuevo usuario en la base de datos, si el usuario ya existe
        entonces retorna un string con el error.
        '''
        pass

    @abstractmethod
    def checkToken(self, token: str)->bool:
        '''
        @param token: Token de la sesion
        @return: True si el token es valido, False si no lo es.

        Verifica si el token es valido, es decir, si existe en Redis.
        '''
        pass
