import { withValidation } from "@/utils/api-validation";
import { createTicketSchema } from "@/schemas/ticketSchema";

export const POST = withValidation(createTicketSchema, async (request) => {

  return Response.json({ foo: "holi" });
});
