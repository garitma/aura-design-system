import Ajv from "ajv";
import addFormats from "ajv-formats";
import { NextResponse } from "next/server";
import addErrors from "ajv-errors";

import { getUserByEmail } from "@/utils/prisma-client";
import { getSession } from "@/utils/auth-client";

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
addErrors(ajv);

// Type for your enhanced handler that receives body and user
type EnhancedHandler = (
  request: Request,
  context: {
    body: any;
    user: any; // Replace 'any' with your user type if available
  }
) => Promise<Response>;

export function withValidation(schema: object, handler: EnhancedHandler) {
  return async (request: Request, context: { user: any }) => {
    try {
      // Parse the request body
      const body = await request.json();

      // Validate the body against the schema
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (!isValid) {
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
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

// Alternatively, keep them separate but compose them
export function withAuth(handler: EnhancedHandler) {
  return async (request: Request, context: { body: any }) => {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail({ email: session.user.email });

    return await handler(request, { ...context, user: user });
  };
}

export function withRoleValidation(roles: string[], handler: EnhancedHandler) {
  return async (request: Request, context: { body: any; user: any }) => {
    const { user } = context;

    if (!user || !roles.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return await handler(request, context);
  };
}

export function withMiddleware(
  schema: object,
  roles: string[],
  handler: EnhancedHandler
) {
  return withAuth(withRoleValidation(roles, withValidation(schema, handler)));
}
