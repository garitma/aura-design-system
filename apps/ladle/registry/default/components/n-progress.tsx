"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Nprogress() {
  return (
    <ProgressBar
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
