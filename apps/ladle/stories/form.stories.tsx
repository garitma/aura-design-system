import React, { useState, useEffect, useRef } from "react";

import { useFormDynamic } from "../utils/forms";
import {
  Form,
  FormField,
  FormCheckbox,
  FormSwitch,
  FormSubmit,
} from "../components/ui/Form";
import Button from "../components/ui/Button";
import { validateFormData } from "../utils/web-validation";
import { createTicketSchema } from "../schemas/ticketSchema";

export const FormDemo = () => {
  const formRef = useRef(null);
  const formData = useFormDynamic({
    firstName: "text",
    lastName: "text",
    email: "text",
    department: "select",
    accept: "checkbox",
    priority: "select",
    description: "textarea",
    verified: "checkbox",
    updates: "checkbox",
    notifications: "checkbox",
    autoReply: "checkbox",
    tracking: "checkbox",
    statusUpdates: "checkbox",
  });

  const {
    firstName,
    lastName,
    email,
    department,
    accept,
    priority,
    description,
    verified,
    updates,
    notifications,
    autoReply,
    tracking,
    statusUpdates,
  } = formData.getFields();

  const { valid, errors } = validateFormData(createTicketSchema, formData.getValues());

  console.log(errors);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");
    try{
      const bodyParams = formData.getValues()
      console.log(bodyParams)
      const response = await fetch("http://localhost:61001/api/tickets", {
        method: "POST",
        body: JSON.stringify(formData.getValues()),
      });
      console.log(await response.json());
      formData.setFetchStatus("idle");
    } catch (error) {
      //console.error(error);
      formData.setFetchStatus("error");
    }
  };

  const handleOnReset = () => {
    if (formData.fetchStatus === "loading") return;

    formData.resetForm(formRef, {
      verified: true,
      notifications: true,
      autoReply: true,
      priority: "low",
    });
  };

  useEffect(() => {
    if (formRef?.current) {
      handleOnReset();
    }
  }, []);

  

  return (
    <Form
      className="grid gap-2 p-4 max-w-2xl mx-auto"
      onSubmit={handleOnSubmit}
      ref={formRef}
    >
      <div className="grid grid-cols-2 gap-2">
        <FormField label="First Name" name="firstName" field={firstName} />
        <FormField label="Last Name" name="lastName" field={lastName} />
      </div>

      <FormField label="Email Address" name="email" field={email} />

      <FormField label="Department" name="department" field={department}>
        <select>
          <option value="">Select a department</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="support">Customer Support</option>
        </select>
      </FormField>

      <FormField label="Priority Level" name="priority" field={priority}>
        <select>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </FormField>

      <FormField
        label="Issue Description"
        name="description"
        field={description}
      >
        <textarea
          placeholder="Please describe your issue in detail..."
          className="min-h-[120px]"
        />
      </FormField>
      <div className="border border-black-4 rounded-1 p-2 space-y-2 bg-black-1">
        <FormSwitch
          label="Enable notifications"
          name="notifications"
          field={notifications}
        />
        <FormSwitch
          label="Enable auto-replies"
          name="autoReply"
          field={autoReply}
        />
        <FormSwitch
          label="Enable ticket tracking"
          name="tracking"
          field={tracking}
        />
        <FormSwitch
          label="Enable status updates"
          name="statusUpdates"
          field={statusUpdates}
        />
      </div>

      <div className="space-y-2">
        <FormCheckbox
          label="I have verified this information is correct"
          name="verified"
          field={verified}
        />
        <FormCheckbox
          label="Send me email updates about this ticket"
          name="updates"
          field={updates}
        />
        <FormCheckbox
          label="I agree to the terms and conditions"
          name="accept"
          field={accept}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          mode="pill"
          label="Reset Form"
          type="button"
          onClick={handleOnReset}
        />
        <FormSubmit
          asChild
          fetchStatus={formData.fetchStatus}
          buttonProps={{ label: "Submit Ticket" }}
        />
      </div>
    </Form>
  );
};
