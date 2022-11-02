const isInvalidSchema = (schema) =>
  Object.values(schema).some((item) => item === false);

export const authLoginSchema = ({ email }) => {
  let schema = {};

  if (email.value === "") {
    email.dialog("Ooops, you must write an email 😅");
    schema.email = false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    email.dialog("Oh, write a valid email 🧐");
    schema.email = false;
  } else {
    schema.email = true;
    email.dialog(null);
  }

  return !isInvalidSchema(schema);
};