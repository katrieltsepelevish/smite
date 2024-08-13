import { User } from '../../users/user.entity';

export class UserUtil {
  static normalizeUser(user: User) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  }
}
