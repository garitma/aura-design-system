import * as React from "react";

function Label({ ...props }: React.ComponentProps<"label">) {
  return <label data-slot="input" {...props} />;
}

export { Label };
