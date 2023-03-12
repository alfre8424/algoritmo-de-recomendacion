export default abstract class UserEntity {
  id: string | null;
  email: string;
  name: string;
  enabled?: boolean;
  securityQuestion?: string;
  securityAnswer?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    email,
    name,
    enabled,
    createdAt,
    updatedAt,
    securityQuestion,
    securityAnswer,
  }: UserEntity) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.enabled = enabled;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.securityQuestion = securityQuestion;
    this.securityAnswer = securityAnswer;
  }
}
