export const userSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    acceptTerms: { type: "boolean", const: true },
  },
};

export const signUpSchema = {
  type: "object",
  properties: {
    ...userSchema.properties,
    confirmPassword: {
      type: "string",
      const: { $data: "1/password" },
    },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword",
    "acceptTerms",
  ],
};

export const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      minLength: 1,
      format: "email",
      errorMessage: {
        format: "Please enter a valid email address",
        minLength: "Email is required",
      },
    },
    password: { type: "string", minLength: 1, errorMessage: {
        minLength: "Password is required"
    } },
  },
  required: ["email", "password"],
};
