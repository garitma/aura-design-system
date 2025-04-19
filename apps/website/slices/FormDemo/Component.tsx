"use client";

import { Form as FormRadix } from "radix-ui";
import {
  Form,
  FormField,
  FormCheckbox,
  FormSwitch,
  FormSubmit,
  FormAlert,
} from "@/components/ui/Form";
import Button from "@/components/ui/Button";


export const importString = `
import {
  Form,
  FormField,
  FormCheckbox,
  FormSwitch,
  FormSubmit,
  FormAlert,
} from "@/components/ui/Form";
import Button from "@/components/ui/Button";`;

const Component = () => {
  return (
    <Form className="grid gap-2" data-display-name="Form">
      <div className="grid grid-cols-2 gap-2">
        <FormField label="First Name" data-display-name="FormField" />
        <FormField label="Last Name" data-display-name="FormField" />
      </div>

      <FormField label="Email Address" data-display-name="FormField" />

      <FormField label="Department" data-display-name="FormField">
        <select>
          <option value="">Select a department</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="support">Customer Support</option>
        </select>
      </FormField>

      <FormField label="Priority Level" data-display-name="FormField">
        <select>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </FormField>

      <FormField label="Issue Description" data-display-name="FormField">
        <textarea
          placeholder="Please describe your issue in detail..."
          className="min-h-[120px]"
        />
      </FormField>
      <div className="border border-black-4 rounded-1 p-2 space-y-2 bg-black-1">
        <FormSwitch
          label="Enable notifications"
          data-display-name="FormSwitch"
        />
        <FormSwitch
          label="Enable auto-replies"
          data-display-name="FormSwitch"
        />
        <FormSwitch
          label="Enable ticket tracking"
          name="tracking"
          data-display-name="FormSwitch"
        />
        <FormSwitch
          label="Enable status updates"
          data-display-name="FormSwitch"
        />
      </div>

      <div className="space-y-2">
        <FormCheckbox
          label="I have verified this information is correct"
          data-display-name="FormCheckbox"
        />
        <FormCheckbox
          label="Send me email updates about this ticket"
          data-display-name="FormCheckbox"
        />
        <FormCheckbox
          label="I agree to the terms and conditions"
          data-display-name="FormCheckbox"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          mode="pill"
          label="Reset Form"
          type="button"
          data-display-name="Button"
        />
        <FormSubmit
          asChild
          buttonProps={{ label: "Submit Ticket" }}
          data-display-name="FormSubmit"
        />
      </div>
    </Form>
  );
};

export default Component;
