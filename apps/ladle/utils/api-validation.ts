import Ajv from "ajv";
import addFormats from "ajv-formats";
import { NextResponse } from "next/server";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function withValidation(
  schema: object,
  handler: (request: Request) => Promise<Response>
) {
  return async (request: Request) => {
    try {
      // Parse the request body
      const body = await request.json();

      // Validate the body against the schema
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (!isValid) {
        return NextResponse.json({ errors: validate.errors }, { status: 400 });
      }

      return await handler(request);
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Handle invalid JSON
        return NextResponse.json(
          { error: "Invalid JSON in request body" },
          { status: 400 }
        );
      }
      // Handle other unexpected errors
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
