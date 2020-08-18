import express from 'express';
import { isEmpty as _isEmpty } from 'lodash';

import Service from '../modules/session';
import IUser from '../interfaces/IUser';
import Utils from '../utils';

const router = express.Router();

router.post('/register', (req, res) => Service.create(req.body as IUser)
  .then((data) => {
    const token = Utils.jwtSign(data);
    res.cookie('jwt', token, {
      secure: true,
      maxAge: 60000 * 60 * 24,
    });
    return res.status(201).json(data);
  })
  .catch((err) => res.status(400).send(err?.message || 'Error')));

router.post('/login', (req, res) => Service.login(req.body)
  .then((data) => {
    const token = Utils.jwtSign(data);
    res.cookie('jwt', token, {
      secure: true,
      maxAge: 60000 * 60 * 24,
    });
    return res.status(200).json(data);
  })
  .catch(() => res.status(401).send('Authorization error')));

router.post('/logout', (_req, res) => {
  res.cookie('jwt', '', { expires: new Date() });
  return res.status(200).send('OK');
});

router.get('/signin', (_req, res) => res.send('<h2>Please, login</h2>'));

router.use('/auth', async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];
  let result = null;
  try {
    result = Utils.jwtVerify(token);
  } catch (e) {
    return res.send(403);
  }
  const { id } = result.data;
  const user = await Service.getUserById(id);

  if (_isEmpty(user)) return res.send(403);

  const decoratedResponse = Utils.decorateResponseByUser(res, user);
  return decoratedResponse.send(200).send('OK');
});

export default router;
