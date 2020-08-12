import { pick as _pick } from 'lodash';

import ajv from '../../providers/validation';

const properties = {
  email: {
    type: 'string',
    format: 'email',
    minLength: 1,
    maxLength: 255,
  },
  firstName: {
    type: ['string', 'null'],
    minLength: 3,
    maxLength: 20,
  },
  lastName: {
    type: ['string', 'null'],
    minLength: 3,
    maxLength: 20,
  },
  phone: {
    type: ['string', 'null'],
    minLength: 6,
    maxLength: 20,
  },
  password: {
    type: ['string', 'null'],
    minLength: 6,
    maxLength: 32,
  },
};

export const UserSchema = ajv.compile({
  properties,
  additionalProperties: false,
  require: ['email', 'firstName', 'lastName', 'phone', 'password'],
});

export const LoginSchema = ajv.compile({
  properties: _pick(properties, ['email', 'password']),
  additionalProperties: false,
  require: ['email', 'password'],
});
