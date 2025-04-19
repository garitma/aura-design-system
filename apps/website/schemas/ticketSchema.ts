export const ticketSchema = {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        minLength: 1,
        errorMessage: {
          minLength: "First name is required",
        },
      },
      lastName: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      department: {
        type: "string",
        enum: ["sales", "marketing", "engineering", "support"],
      },
      accept: { type: "boolean" },
      priority: { type: "string", enum: ["low", "medium", "high", "urgent"] },
      description: { type: "string", minLength: 1 },
      verified: { type: "boolean" },
      updates: { type: "boolean" },
      notifications: { type: "boolean" },
      autoReply: { type: "boolean" },
      tracking: { type: "boolean" },
      statusUpdates: { type: "boolean" },
    },
  };
  
  export const createTicketSchema = {
    type: "object",
    properties: {
      ...ticketSchema.properties,
      notifications: {
        type: "boolean",
        const: true,
        errorMessage: {
          const: "Notifications are required.",
        },
      },
      accept: {
        type: "boolean",
        const: true,
        errorMessage: {
          const: "Accept terms and conditions is required.",
        },
      },
      verified: { type: "boolean", const: true },
      updates: { type: "boolean", const: true },
    },
    required: [
      "firstName",
      "lastName",
      "email",
      "department",
      "accept",
      "priority",
      "description",
      "verified",
      "updates",
      "notifications",
      "autoReply",
      "tracking",
      "statusUpdates",
    ],
    additionalProperties: false,
  };
  