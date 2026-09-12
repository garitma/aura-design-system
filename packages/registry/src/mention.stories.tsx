"use client";

import * as React from "react";

import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
  MentionLabel,
  MentionPortal,
} from "../registry/default/components/ui/Mention";
import { Textarea } from "../registry/default/components/ui/Textarea";

const users = [
  { id: "1", name: "Olivia Martin", email: "olivia@email.com" },
  { id: "2", name: "Isabella Nguyen", email: "isabella@email.com" },
  { id: "3", name: "Emma Wilson", email: "emma@email.com" },
  { id: "4", name: "Jackson Lee", email: "jackson@email.com" },
  { id: "5", name: "William Kim", email: "will@email.com" },
];

const commands = [
  { name: "help", description: "Show available commands" },
  { name: "clear", description: "Clear the console" },
  { name: "restart", description: "Restart the application" },
  { name: "reload", description: "Reload the current page" },
  { name: "quit", description: "Exit the application" },
];

export const Default = () => {
  return (
    <Mention className="smosh">
      <MentionLabel>Mention users</MentionLabel>
      <MentionInput placeholder="Type @ to mention someone…" asChild>
        <Textarea />
      </MentionInput>
      <MentionPortal>
        <MentionContent>
          {users.map((user) => (
            <MentionItem
              key={user.id}
              value={user.name}
              className="flex-col items-start"
            >
              <span className="text-sm">{user.name}</span>
              <span className="text-xs text-gray-11">{user.email}</span>
            </MentionItem>
          ))}
        </MentionContent>
      </MentionPortal>
    </Mention>
  );
};

export const CustomTrigger = () => {
  return (
    <Mention trigger="#" className="smosh">
      <MentionLabel>Mention a topic</MentionLabel>
      <MentionInput placeholder="Type # to mention a topic…" asChild>
        <Textarea />
      </MentionInput>
      <MentionPortal>
        <MentionContent>
          {users.map((user) => (
            <MentionItem key={user.id} value={user.name}>
              {user.name}
            </MentionItem>
          ))}
        </MentionContent>
      </MentionPortal>
    </Mention>
  );
};

export const CustomFilter = () => {
  const [value, setValue] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const filterCommands = React.useCallback(
    (options: string[], term: string) =>
      options.filter((option) =>
        option.toLowerCase().startsWith(term.toLowerCase()),
      ),
    [],
  );

  return (
    <Mention
      className="smosh"
      inputValue={inputValue}
      onFilter={filterCommands}
      onInputValueChange={setInputValue}
      onValueChange={setValue}
      trigger="/"
      value={value}
    >
      <MentionLabel>Run a command</MentionLabel>
      <MentionInput placeholder="Type / to use a command…" asChild>
        <Textarea />
      </MentionInput>
      <MentionPortal>
        <MentionContent>
          {commands.map((command) => (
            <MentionItem
              key={command.name}
              label={command.name}
              value={command.name}
              className="flex-col items-start"
            >
              <span className="font-mono text-sm">{command.name}</span>
              <span className="text-xs text-gray-11">
                {command.description}
              </span>
            </MentionItem>
          ))}
        </MentionContent>
      </MentionPortal>
    </Mention>
  );
};
