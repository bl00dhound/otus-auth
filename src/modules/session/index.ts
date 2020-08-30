import { UserSchema, LoginSchema } from './validate';
import User from './dal';
import Utils from '../../utils';
import bus from '../../providers/bus';
import logger from '../../providers/logger';

import IUser from '../../interfaces/IUser';
import ILoginData from '../../interfaces/ILoginData';

const Service = {
  create: async (data: Omit<IUser, 'id'>): Promise<IUser> => {
    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    const password = await Utils.generateHash(data.password);
    const user = { ...data, password };
    const createdUser = await User.create(user);

    try {
      await bus.publish<IUser>('user:createUser', createdUser);
    } catch (err) {
      logger.err('[Bus publish error]: ', err);
    }

    return createdUser;
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
