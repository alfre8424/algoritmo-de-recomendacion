/**
 * Entity to manage the user along with the session token
 */
interface UserEntity {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
  securityQuestion?: string;
  securityAnswer?: string;
  token?: string;
  password?: string;
}

export default UserEntity;
