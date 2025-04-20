import Ajv from "ajv";
import addFormats from "ajv-formats";
import { NextResponse } from "next/server";
import addErrors from "ajv-errors";

// import { getUserByEmail } from "@/utils/prisma-client";
import { getSession } from "@/utils/auth-client";

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
 * Type definition for an enhanced request handler that receives the request, body, and user.
 */
type EnhancedHandler = (
  request: Request,
  context: {
    body: any;
    user: any; // Replace 'any' with your user type if available
  }
) => Promise<Response>;

/**
 * Middleware to validate the request body against a JSON schema.
 *
 * @param schema - The JSON schema to validate against.
 * @param handler - The enhanced request handler to call if the validation is successful.
 * @returns An async function that handles the request and performs validation.
 */
export function withValidation(schema: object, handler: EnhancedHandler) {
  return async (request: Request, context: { user: any }) => {
    try {
      // Parse the request body
      const body = await request.json();

      // Validate the body against the schema
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (!isValid) {
        // Return a 400 error with the validation errors
        return NextResponse.json({ errors: validate.errors }, { status: 400 });
      }

      // Pass the parsed body and user to the handler
      return await handler(request, { body, user: context.user });
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Handle invalid JSON
        return NextResponse.json(
          { error: "Invalid JSON in request body" },
          { status: 400 }
        );
      }
      // Handle other unexpected errors
      console.error("Unexpected error in withValidation:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

/**
 * Middleware to authenticate the request and attach the user to the context.
 *
 * @param handler - The enhanced request handler to call if the authentication is successful.
 * @returns An async function that handles the request and performs authentication.
 */
export function withAuth(handler: EnhancedHandler) {
  return async (request: Request, context: { body: any }) => {
    const session = await getSession();

    if (!session?.user?.email) {
      // Return a 401 error if the user is not authenticated
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // TODO: Get user 
    //const user = await getUserByEmail({ email: session.user.email });
    const user = {}

    // Pass the user to the handler
    return await handler(request, { ...context, user: user });
  };
}

/**
 * Middleware to validate the user's role against a list of allowed roles.
 *
 * @param roles - An array of allowed roles.
 * @param handler - The enhanced request handler to call if the role is valid.
 * @returns An async function that handles the request and performs role validation.
 */
export function withRoleValidation(roles: string[], handler: EnhancedHandler) {
  return async (request: Request, context: { body: any; user: any }) => {
    const { user } = context;

    if (!user || !roles.includes(user.role)) {
      // Return a 403 error if the user does not have the required role
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Pass the context to the handler
    return await handler(request, context);
  };
}

/**
 * Composes the `withAuth`, `withRoleValidation`, and `withValidation` middlewares.
 *
 * @param schema - The JSON schema to validate against.
 * @param roles - An array of allowed roles.
 * @param handler - The enhanced request handler to call if all validations are successful.
 * @returns An async function that handles the request and performs all validations.
 */
export function withMiddleware(
  schema: object,
  roles: string[],
  handler: EnhancedHandler
) {
  return withAuth(withRoleValidation(roles, withValidation(schema, handler)));
}
