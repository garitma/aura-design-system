"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Nprogress() {
  return (
    <ProgressBar
      height="4px"
      color="#000012d3"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
