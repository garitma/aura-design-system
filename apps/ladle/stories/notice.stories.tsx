import React from "react";
import { Toaster, toast } from "sonner";

import Button from "@aura-design/system/button";

export const Sonner = () => {
  return (
    <div>
      <p>
        <span className="info info-text wall-pad">
          External library <span className="font-bold">$ pnpm i sonner</span>
        </span>{" "}
        An opinionated toast component for React.
        <a
          href="https://sonner.emilkowal.ski/"
          className="underline"
          target="_blank"
        >
          All documentaiton
        </a>{" "}
        made by{" "}
        <a href="https://emilkowal.ski/" className="underline" target="_blank">
          Emil Kowalski
        </a>
      </p>
      <Toaster position="top-center" />
      <Button onClick={() => toast.success("My first toast")}>
        Give me a toast
      </Button>
    </div>
  );
};
