import UserSchema from './validate';
import User from './dal';
import IUser from '../../interfaces/IUser';

const Service = {
  create: (data: Omit<IUser, 'id'>) => {
    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    return User.create(data);
  },
};

export default Service;
