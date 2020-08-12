import { Response } from 'express';
import IUser from '../interfaces/IUser';

export const decorateResponseByUser = (response: Response, user: IUser) => {
  response.set('X-UserId', String(user.id));
  response.set('X-Email', user.email);
  response.set('X-FirstName', user.firstName);
  response.set('X-LastName', user.lastName);
  return response;
};
