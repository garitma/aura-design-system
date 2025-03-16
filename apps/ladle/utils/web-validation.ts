import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateFormData(schema: object, data: unknown) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    return {
      valid: false,
      errors: validate.errors
    };
  }

  return {
    valid: true,
    errors: null
  };
}
