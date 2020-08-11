import Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: 'failing',
  coerceTypes: true,
  useDefaults: true,
  $data: true,
});

export default ajv;
