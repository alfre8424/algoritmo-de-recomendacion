/**
 * Creates a new user entity based on form data
 */
import UserEntity from "domain/entities/entity.user";

class UserForm implements UserEntity {
  name: string;
  email: string;
  password: string;
  securityQuestion?: string;
  securityAnswer?: string;
  id: string;
  enabled: boolean;
  token?: string;

  constructor(data: any) {
    this.id = data.id ?? 'ya llevame diosito';
    this.enabled = data.enabled ?? true;
    this.name = data.name;
    this.email = data.email;
    this.securityQuestion = data.securityQuestion;
    this.securityAnswer = data.securityAnswer;
    this.password = data.password;
    this.token = data.token;
  }
}

export default UserForm;
