import { UserSchema, LoginSchema } from './validate';
import User from './dal';
import IUser from '../../interfaces/IUser';
import ILoginData from '../../interfaces/ILoginData';
import Utils from '../../utils';

const Service = {
  create: async (data: Omit<IUser, 'id'>): Promise<IUser> => {
    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    const password = await Utils.generateHash(data.password);
    const user = { ...data, password };

    return User.create(user);
  },
  login: async (data: ILoginData): Promise<IUser> => {
    const isValid = LoginSchema(data);

    if (!isValid) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    const user = await User.getByEmail(data.email);

    if (!data.password) throw Error('Wrong user email');

    delete user.password;
    return user;
  },
  getUserById: async (id: number): Promise<IUser> => {
    if (!id) throw Error('No userId');

    return User.getUserById(id);
  },
};

export default Service;
