import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
addErrors(ajv);

export function validateFormData(schema: object, data: unknown) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    return {
      isValid: false,
      errors: validate.errors
    };
  }

  return {
    isValid: true,
    errors: null
  };
}
