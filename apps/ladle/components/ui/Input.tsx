import * as React from "react";

function Input({ ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" {...props} />;
}

export { Input };
