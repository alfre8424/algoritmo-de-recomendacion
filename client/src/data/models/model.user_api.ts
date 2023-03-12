import UserEntity from "domain/entities/entity.user";

class UserAPI implements UserEntity {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
  securityQuestion?: string | undefined;
  securityAnswer?: string | undefined;
  /**
   * If the token does not exist then the session has been finished
   */
  token?: string | undefined;

  constructor(data: any) {
    this.id = data.user.id;
    this.name = data.user.name;
    this.email = data.user.email;
    this.enabled = data.user.enabled;
    this.token = data.token;
    this.securityQuestion = data.user.securityQuestion;
    this.securityAnswer = data.user.securityAnswer;
  }
}

export default UserAPI;
