import React, { useEffect, useRef } from "react";

import { createTicketSchema } from "@/schemas/ticketSchema";
import { signUpSchema, loginSchema } from "@/schemas/userSchema";
import { validateFormData } from "@/utils/web-validation";
import { useFormDynamic } from "@/hooks/use-dynamic-form";
import {
  Form,
  FormField,
  FormCheckbox,
  FormSwitch,
  FormSubmit,
  FormAlert,
} from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

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

  const { isValid, errors } = validateFormData(
    createTicketSchema,
    formData.getValues()
  );

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please fill in all fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch("http://localhost:61001/api/tickets", {
        method: "POST",
        body: JSON.stringify(formData.getValues()),
      });

      if (res.ok) {
        formData.setFetchStatus("success");
        toast.success("Ticket created successfully");
      } else {
        formData.setFetchStatus("error");
        formData.setError("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      formData.setFetchStatus("error");
      formData.setError("Something went wrong");
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

  const handleOnInit = () => {
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
      handleOnInit();
    }
  }, []);

  return (
    <Form
      className="grid gap-2 p-4 max-w-2xl mx-auto"
      onSubmit={handleOnSubmit}
      ref={formRef}
      errors={errors}
    >
      <div className="grid grid-cols-2 gap-2">
        <FormField label="First Name" field={firstName} />
        <FormField label="Last Name" field={lastName} />
      </div>

      <FormField label="Email Address" field={email} />

      <FormField label="Department" field={department}>
        <select>
          <option value="">Select a department</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="support">Customer Support</option>
        </select>
      </FormField>

      <FormField label="Priority Level" field={priority}>
        <select>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </FormField>

      <FormField label="Issue Description" field={description}>
        <textarea
          placeholder="Please describe your issue in detail..."
          className="min-h-[120px]"
        />
      </FormField>
      <div className="border border-black-4 rounded-1 p-2 space-y-2 bg-black-1">
        <FormSwitch label="Enable notifications" field={notifications} />
        <FormSwitch label="Enable auto-replies" field={autoReply} />
        <FormSwitch
          label="Enable ticket tracking"
          name="tracking"
          field={tracking}
        />
        <FormSwitch label="Enable status updates" field={statusUpdates} />
      </div>

      <div className="space-y-2">
        <FormCheckbox
          label="I have verified this information is correct"
          field={verified}
        />
        <FormCheckbox
          label="Send me email updates about this ticket"
          field={updates}
        />
        <FormCheckbox
          label="I agree to the terms and conditions"
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
      <FormAlert formData={formData} />
    </Form>
  );
};

export const FormSignUp = () => {
  const formRef = useRef(null);
  const formData = useFormDynamic({
    firstName: "text",
    lastName: "text",
    email: "text",
    password: "select",
    confirmPassword: "select",
    acceptTerms: "checkbox",
  });

  const { firstName, lastName, email, password, confirmPassword, acceptTerms } =
    formData.getFields();

  const { isValid, errors } = validateFormData(
    signUpSchema,
    formData.getValues()
  );

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please fill in all fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch("http://localhost:61001/api/auth/registe", {
        method: "POST",
        body: JSON.stringify(formData.getValues()),
      });

      if (res.ok) {
        formData.setFetchStatus("success");
        toast.success("Ticket created successfully");
      } else {
        formData.setFetchStatus("error");
        formData.setError("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      formData.setFetchStatus("error");
      formData.setError("Something went wrong");
    }
  };

  return (
    <Form
      className="grid gap-2 p-4 max-w-2xl mx-auto"
      onSubmit={handleOnSubmit}
      ref={formRef}
      errors={errors}
    >
      <div className="grid grid-cols-2 gap-2">
        <FormField label="First Name" field={firstName} />
        <FormField label="Last Name" field={lastName} />
      </div>
      <FormField label="Email" field={email} />
      <FormField label="Password" field={password}>
        <input type="password" />
      </FormField>
      <FormField label="Confirm Password" field={confirmPassword}>
        <input type="password" />
      </FormField>
      <FormCheckbox label="Accept Terms" field={acceptTerms} />
      <FormSubmit
        fetchStatus={formData.fetchStatus}
        buttonProps={{ label: "Create Account" }}
      />
      <FormAlert formData={formData} />
    </Form>
  );
};

export const FormLogin = () => {
  const formRef = useRef(null);
  const formData = useFormDynamic({
    email: "text",
    password: "text",
  });

  const { email, password } = formData.getFields();

  const { isValid, errors } = validateFormData(
    loginSchema,
    formData.getValues()
  );

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please fill in all fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.getValues()),
      });

      if (res.ok) {
        formData.setFetchStatus("success");
        toast.success("Logged in successfully");
      } else {
        const errorData = await res.json();
        formData.setFetchStatus("error");
        formData.setError(errorData.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      formData.setFetchStatus("error");
      formData.setError("Something went wrong");
    }
  };

  return (
    <Form
      className="grid gap-2 p-4 max-w-md mx-auto"
      onSubmit={handleOnSubmit}
      ref={formRef}
      errors={errors}
    >
      <FormField label="Email" field={email} />
      <FormField label="Password" field={password}>
        <input type="password" />
      </FormField>

      <FormSubmit
        fetchStatus={formData.fetchStatus}
        buttonProps={{ label: "Sign In" }}
      />

      <FormAlert formData={formData} />
    </Form>
  );
};
