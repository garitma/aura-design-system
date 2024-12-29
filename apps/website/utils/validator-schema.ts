import * as regex from "@/lib/shared/regex";

export const newsletterSchema = (fields: { [key: string]: any }) => {
  const { email } = fields;

  if (!email.value) {
    email.dialog("El correo es obligatorio.");
  } else if (!regex.email.test(email.value)) {
    email.dialog("Escribe un correo electrónico válido.");
  } else {
    email.dialog(null);
  }
};
