import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

import CommandLine from "../components/CommandLine";

export default {
  title: "Tabs",
};

export const WithRadix = () => (
  <Tabs.Root className="flex  flex-col shadow" defaultValue="tab1">
    <Tabs.List
      className="flex shrink-0 border-b"
      aria-label="Manage your account"
    >
      <Tabs.Trigger
        className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-1 leading-none  outline-none first:rounded-tl-md last:rounded-tr-md hover:bg-snow data-[state=active]:bg-accents-1 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] "
        value="tab1"
      >
        Account
      </Tabs.Trigger>
      <Tabs.Trigger
        className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 leading-none  outline-none first:rounded-tl-md last:rounded-tr-md hover:bg-snow data-[state=active]:bg-accents-1  data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] "
        value="tab2"
      >
        Password
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      className="grow rounded-b-md bg-white p-1 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab1"
    >
      <p>Make changes to your account here. Click save when you're done.</p>
    </Tabs.Content>
    <Tabs.Content
      className="grow rounded-b-md bg-white p-1 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab2"
    >
      <p>Change your password here. After saving, you'll be logged out.</p>
    </Tabs.Content>
  </Tabs.Root>
);

WithRadix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-tabs" />
      <Component />
    </>
  ),
];
