import { UserDocument } from '../../users/users.schema';

export class UserUtil {
  static normalizeUser(user: UserDocument) {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
