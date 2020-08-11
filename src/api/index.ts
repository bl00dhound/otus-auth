import express from 'express';

import Service from '../modules/session';
import IUser from '../interfaces/IUser';

const router = express.Router();

router.use('/register', (req, res) => Service.create(req.body as IUser)
  .then((data) => res.status(201).json(data))
  .catch((err) => res.status(400).send(err?.message || 'Error')));

export default router;
