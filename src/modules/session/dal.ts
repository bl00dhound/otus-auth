import db from '../../providers/db';
import IUser from '../../interfaces/IUser';
import Utils from '../../utils';

const GET_PROPERTIES = [
  'id',
  'first_name as firstName',
  'last_name as lastName',
  'email',
  'phone',
  'password',
  'created_at as createdAt',
  'updated_at as updatedAt',
];

const Dal = {
  create: (user: Omit<IUser, 'id'>): Promise<IUser> => db('users')
    .insert(Utils.toSnakeCase(user))
    .returning(GET_PROPERTIES.filter((prop) => prop !== 'password'))
    .then((users) => users[0]),
  getByEmail: (email: string): Promise<IUser> => db('users')
    .first(...GET_PROPERTIES)
    .where('email', email),
  getUserById: (id: number) => db('users')
    .first(...GET_PROPERTIES)
    .where('id', id),
};

export default Dal;
