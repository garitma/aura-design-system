import { useRef, useState } from "react";
import {
  Form,
  FormField,
  FormSubmit,
  FormSwitch,
  FormCheckbox,
  FormCheckboxGroup,
  FormAlert,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useFormDynamic } from "@/hooks/use-dynamic-form";
import { validateFormData } from "@/utils/web-validation";

export const FormDemo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    name: "text",
    email: "text",
  });

  const { name, email } = formData.getFields();

  const { isValid, errors } = validateFormData(
    defaultSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-default"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormField field={name} label="Name *">
        <Input type="text" placeholder="Enter your name" />
      </FormField>
      <FormField field={email} label="Email *">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-default"
      />
    </Form>
  );
};

export const FormDemoMultipleFields = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    name: "text",
    email: "text",
    message: "textarea",
    country: "select",
  });

  const { name, email, message, country } = formData.getFields();

  const { isValid, errors } = validateFormData(
    multipleFieldsSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-multiple"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormField field={name} label="Name *">
        <Input type="text" placeholder="Enter your name" />
      </FormField>
      <FormField field={email} label="Email *">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormField field={message} label="Message">
        <textarea placeholder="Enter your message" rows={4} />
      </FormField>
      <FormField field={country} label="Country">
        <select>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select>
      </FormField>
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-multiple"
      />
    </Form>
  );
};

export const FormDemoWithErrors = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    name: "text",
    email: "text",
  });

  const { name, email } = formData.getFields();

  const { isValid, errors } = validateFormData(
    defaultSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please fix the validation errors");
      return;
    }

    setFetchStatus("success");
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-errors"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormField field={name} label="Name *">
        <Input type="text" placeholder="Enter your name" />
      </FormField>
      <FormField field={email} label="Email *">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-errors"
      />
    </Form>
  );
};

export const FormDemoWithSwitch = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    notifications: "checkbox",
    marketing: "checkbox",
  });

  const { notifications, marketing } = formData.getFields();

  const { isValid, errors } = validateFormData(
    switchSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-switch"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormSwitch field={notifications} label="Enable notifications" />
      <FormSwitch field={marketing} label="Receive marketing emails" />
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-switch"
      />
    </Form>
  );
};

export const FormDemoWithCheckbox = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    terms: "checkbox",
    privacy: "checkbox",
  });

  const { terms, privacy } = formData.getFields();

  const { isValid, errors } = validateFormData(
    checkboxSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please accept all required agreements");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-checkbox"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormCheckbox
        field={terms}
        label="I agree to the terms and conditions *"
      />
      <FormCheckbox field={privacy} label="I agree to the privacy policy *" />
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-checkbox"
      />
    </Form>
  );
};

export const FormDemoWithCheckboxGroup = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    interests: "checkbox",
  });

  const { interests } = formData.getFields();

  const { isValid, errors } = validateFormData(
    checkboxGroupSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const interestsOptions = [
    {
      value: "react",
      label: "React",
      description: "A JavaScript library for building user interfaces",
    },
    {
      value: "typescript",
      label: "TypeScript",
      description: "JavaScript with syntax for types",
    },
    {
      value: "tailwind",
      label: "Tailwind CSS",
      description: "A utility-first CSS framework",
    },
    {
      value: "nextjs",
      label: "Next.js",
      description: "The React Framework for the Web",
    },
  ];

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please select at least one interest");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-checkbox-group"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormCheckboxGroup
        field={interests}
        label="Select your interests *"
        options={interestsOptions}
      />
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-checkbox-group"
      />
    </Form>
  );
};

export const FormDemoWithSelect = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    country: "select",
    city: "select",
  });

  const { country, city } = formData.getFields();

  const { isValid, errors } = validateFormData(
    selectSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please select both country and city");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-select"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormField field={country} label="Country *">
        <select>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select>
      </FormField>
      <FormField field={city} label="City *">
        <select>
          <option value="">Select a city</option>
          <option value="ny">New York</option>
          <option value="la">Los Angeles</option>
          <option value="ch">Chicago</option>
          <option value="sf">San Francisco</option>
        </select>
      </FormField>
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-select"
      />
    </Form>
  );
};

export const FormDemoWithLoading = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    name: "text",
    email: "text",
  });

  const { name, email } = formData.getFields();

  const { isValid, errors } = validateFormData(
    defaultSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-loading"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormField field={name} label="Name *">
        <Input type="text" placeholder="Enter your name" />
      </FormField>
      <FormField field={email} label="Email *">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-loading"
      />
    </Form>
  );
};

export const FormDemoCompleteForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formData = useFormDynamic({
    name: "text",
    email: "text",
    phone: "text",
    message: "textarea",
    country: "select",
    notifications: "checkbox",
    terms: "checkbox",
    interests: "checkbox",
  });

  const {
    name,
    email,
    phone,
    message,
    country,
    notifications,
    terms,
    interests,
  } = formData.getFields();

  const { isValid, errors } = validateFormData(
    completeFormSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const interestsOptions = [
    {
      value: "web",
      label: "Web Development",
      description: "Building websites and web applications",
    },
    {
      value: "mobile",
      label: "Mobile Development",
      description: "Creating mobile apps",
    },
    {
      value: "design",
      label: "UI/UX Design",
      description: "Designing user interfaces",
    },
  ];

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchStatus("loading");

    if (!isValid) {
      setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-complete"
      className="flex flex-col gap-1 smash"
    >
      <FormAlert formData={formDataForAlert} />
      <FormField field={name} label="Full Name *">
        <Input type="text" placeholder="Enter your full name" />
      </FormField>
      <FormField field={email} label="Email Address *">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      <FormField field={phone} label="Phone Number">
        <Input type="tel" placeholder="Enter your phone number" />
      </FormField>
      <FormField field={country} label="Country">
        <select>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select>
      </FormField>
      <FormField field={message} label="Message">
        <textarea placeholder="Enter your message" rows={4} />
      </FormField>
      <FormSwitch field={notifications} label="Enable email notifications" />
      <FormCheckboxGroup
        field={interests}
        label="Select your interests *"
        options={interestsOptions}
        className="bg-gray-1 p-2 border border-gray-a6 rounded-sm my-1"
      />
      <FormCheckbox
        field={terms}
        label="I agree to the terms and conditions *"
      />
      
      <FormSubmit
        fetchStatus={fetchStatus}
        buttonProps={{ children: "Submit Form" }}
        form="form-complete"
      />
    </Form>
  );
};