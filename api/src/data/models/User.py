from src.domain.entities.User import UserEntity


class UserModel(UserEntity):
    def __init__(self, id, email, name, enabled):
        super().__init__(id, email, name, enabled)
        self.required_fields = ["id", "email", "name"]

    @staticmethod
    def fromJson(self, json: dict) -> UserEntity:
        '''Lee un json proveniente de la base de datos'''
        if not all(field in json for field in self.required_fields):
            raise Exception(f"Missing fields in json: {json}")

        return UserModel(
            json["id"],
            json["email"],
            json["name"],
            json["enabled"] if "enabled" in json else True
        )
