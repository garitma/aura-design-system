"use client";

import * as React from "react";
import { CheckIcon, Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";

import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
  EditableTrigger,
} from "../registry/default/components/ui/Editable";
import { Button } from "../registry/default/components/ui/Button";

export const Default = () => (
  <Editable defaultValue="Untitled document" placeholder="Enter a title…">
    <EditableLabel>Title</EditableLabel>
    <EditableArea className="flex w-full items-center gap-0.5">
      <EditablePreview />
      <EditableInput />
    </EditableArea>
    <EditableToolbar>
      <EditableSubmit asChild>
        <Button type="button" variant="pill" size="sm">
          Save
        </Button>
      </EditableSubmit>
      <EditableCancel asChild>
        <Button type="button" variant="pill" size="sm">
          Cancel
        </Button>
      </EditableCancel>
    </EditableToolbar>
  </Editable>
);

export const WithTrigger = () => (
  <Editable defaultValue="Click the pencil to edit" placeholder="Empty…">
    <EditableLabel>Project name</EditableLabel>
    <div className="flex items-center gap-0.5">
      <EditableArea className="flex min-w-0 flex-1 items-center">
        <EditablePreview />
        <EditableInput />
      </EditableArea>
      <EditableTrigger asChild>
        <Button type="button" variant="pill" size="icon" aria-label="Edit">
          <Pencil1Icon className="icon" />
        </Button>
      </EditableTrigger>
      <EditableToolbar>
        <EditableSubmit asChild>
          <Button type="button" variant="pill" size="icon" aria-label="Save">
            <CheckIcon className="icon" />
          </Button>
        </EditableSubmit>
        <EditableCancel asChild>
          <Button type="button" variant="pill" size="icon" aria-label="Cancel">
            <Cross2Icon className="icon" />
          </Button>
        </EditableCancel>
      </EditableToolbar>
    </div>
  </Editable>
);

export const DoubleClick = () => (
  <Editable
    defaultValue="Double-click to edit"
    placeholder="Enter a value…"
    triggerMode="dblclick"
  >
    <EditableLabel>Nickname</EditableLabel>
    <EditableArea className="flex w-full items-center gap-0.5">
      <EditablePreview />
      <EditableInput />
    </EditableArea>
    <EditableToolbar>
      <EditableSubmit asChild>
        <Button type="button" variant="pill" size="sm">
          Save
        </Button>
      </EditableSubmit>
      <EditableCancel asChild>
        <Button type="button" variant="pill" size="sm">
          Cancel
        </Button>
      </EditableCancel>
    </EditableToolbar>
  </Editable>
);

export const Autosize = () => (
  <Editable
    defaultValue="Aura"
    placeholder="Type…"
    autosize
  >
    <EditableLabel>Short label</EditableLabel>
    <EditableArea className="flex items-center gap-0.5">
      <EditablePreview />
      <EditableInput />
    </EditableArea>
    <EditableToolbar>
      <EditableSubmit asChild>
        <Button type="button" variant="pill" size="sm">
          Save
        </Button>
      </EditableSubmit>
      <EditableCancel asChild>
        <Button type="button" variant="pill" size="sm">
          Cancel
        </Button>
      </EditableCancel>
    </EditableToolbar>
  </Editable>
);

export const TodoList = () => {
  const [todos, setTodos] = React.useState([
    { id: "1", text: "Ship Editable to the registry" },
    { id: "2", text: "Write Ladle stories" },
    { id: "3", text: "Verify form submission" },
  ]);

  return (
    <ul className="flex w-full max-w-md flex-col gap-1">
      {todos.map((todo) => (
        <li key={todo.id}>
          <Editable
            value={todo.text}
            onValueChange={(text) => {
              setTodos((current) =>
                current.map((item) =>
                  item.id === todo.id ? { ...item, text } : item,
                ),
              );
            }}
            placeholder="Todo…"
          >
            <EditableArea className="flex w-full items-center gap-0.5">
              <EditablePreview className="w-full" />
              <EditableInput />
            </EditableArea>
          </Editable>
        </li>
      ))}
    </ul>
  );
};

export const WithForm = () => {
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-1"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get("displayName") ?? ""));
      }}
    >
      <Editable
        name="displayName"
        defaultValue="Ada Lovelace"
        placeholder="Display name…"
        required
      >
        <EditableLabel>Display name</EditableLabel>
        <EditableArea className="flex w-full items-center gap-0.5">
          <EditablePreview />
          <EditableInput />
        </EditableArea>
        <EditableToolbar>
          <EditableSubmit asChild>
            <Button type="button" variant="pill" size="sm">
              Apply
            </Button>
          </EditableSubmit>
          <EditableCancel asChild>
            <Button type="button" variant="pill" size="sm">
              Revert
            </Button>
          </EditableCancel>
        </EditableToolbar>
      </Editable>
      <Button type="submit" variant="pill" size="sm">
        Submit form
      </Button>
      {submitted ? (
        <p className="text-xs text-gray-11">Submitted: {submitted}</p>
      ) : null}
    </form>
  );
};
