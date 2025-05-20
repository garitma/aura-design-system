import * as React from "react";

function label({ ...props }: React.ComponentProps<"label">) {
  return <label data-slot="input" {...props} />;
}

export { label };
