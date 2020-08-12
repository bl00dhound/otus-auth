import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import Config from '../config';
import IUser from '../interfaces/IUser';

export const generateHash = (password: string): Promise<string> =>
  new Promise((res, rej) =>
    hash(password, Config.bcryptRounds, (err, resultHash) => {
      if (err) return rej(err);

      return res(resultHash);
    }));

export const compareHash = (password: string, hashedPassword: string): Promise<boolean> =>
  new Promise((res, rej) =>
    compare(password, hashedPassword, (err, result) => {
      if (err) return rej(err);

      return res(result);
    }));

export const jwtSign = ({ id, email }: IUser): string => sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    data: { id, email },
  },
  Config.secret,
);

export const jwtVerify = (token: string) => verify(token, Config.secret);
