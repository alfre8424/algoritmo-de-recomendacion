import UserEntity from "../../domain/entities/entity.user";

/**
 * A model for the [UserEntity] loaded from mysql output.
 */
export default class UserMySQLModel extends UserEntity {
  constructor(mysqlOutput: any) {
    super({
      id: mysqlOutput.id,
      email: mysqlOutput.email,
      name: mysqlOutput.name,
      enabled: mysqlOutput.enabled,
      securityQuestion: mysqlOutput.securityQuestion,
      securityAnswer: mysqlOutput.securityAnswer,
      createdAt: mysqlOutput.createdAt,
      updatedAt: mysqlOutput.updatedAt,
    });
  }
}
