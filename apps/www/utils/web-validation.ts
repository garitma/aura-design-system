import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

/**
 * Creates a new Ajv instance with specific configurations.
 * - `allErrors: true`: Enables reporting of all validation errors, not just the first one.
 * - `$data: true`: Allows the use of `$data` references in schemas, enabling dynamic validation.
 */
const ajv = new Ajv({ allErrors: true, $data: true });

/**
 * Adds format validation keywords to the Ajv instance.
 * This includes common formats like 'date', 'time', 'email', etc.
 */
addFormats(ajv);

/**
 * Adds error message customization to the Ajv instance.
 * This allows for more descriptive and user-friendly error messages.
 */
addErrors(ajv);

/**
 * Validates form data against a provided JSON schema.
 *
 * @param schema - The JSON schema to validate against.
 * @param data - The data to validate.
 * @returns An object indicating whether the data is valid and any validation errors.
 *
 * @example
 * const schema = {
 *   type: "object",
 *   properties: {
 *     name: { type: "string" },
 *     age: { type: "integer", minimum: 0 },
 *   },
 *   required: ["name", "age"],
 * };
 *
 * const validData = { name: "John Doe", age: 30 };
 * const invalidData = { name: "Jane Doe", age: -5 };
 *
 * const validResult = validateFormData(schema, validData);
 * console.log(validResult); // Output: { isValid: true, errors: null }
 *
 * const invalidResult = validateFormData(schema, invalidData);
 * console.log(invalidResult); // Output: { isValid: false, errors: [...] }
 */
export function validateFormData(schema: object, data: unknown) {
  /**
   * Compiles the schema into a validation function.
   * This function can then be used to validate data against the schema.
   */
  const validate = ajv.compile(schema);

  /**
   * Validates the data against the compiled schema.
   * @returns boolean - true if the data is valid, false otherwise.
   */
  const isValid = validate(data);

  /**
   * If the data is not valid, return an object with isValid set to false
   * and the errors array from the validation.
   */
  if (!isValid) {
    return {
      isValid: false,
      errors: validate.errors,
    };
  }

  /**
   * If the data is valid, return an object with isValid set to true
   * and errors set to null.
   */
  return {
    isValid: true,
    errors: null,
  };
}