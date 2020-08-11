import db from '../../providers/db';
import IUser from '../../interfaces/IUser';
import toSnakeCase from '../../utils';

const RETURNING = [
  'id',
  'first_name as firstName',
  'last_name as lastName',
  'email',
  'phone',
  'created_at as createdAt',
  'updated_at as updatedAt',
];

const Dal = {
  create: (user: Omit<IUser, 'id'>): Promise<IUser> => db('users')
    .insert(toSnakeCase(user))
    .returning(RETURNING)
    .then((users) => users[0]),
};

export default Dal;
