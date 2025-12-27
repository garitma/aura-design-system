import { useRef } from "react";
import {
  Form,
  FormField,
  FormSubmit,
  FormSwitch,
  FormCheckbox,
  FormCheckboxGroup,
  FormAlert,
} from "../registry/default/components/ui/Form";
import { Input } from "../registry/default/components/ui/Input";
import { FormFieldCombobox } from "../registry/default/components/FormFieldCombobox";
import { FormFieldSelect } from "../registry/default/components/FormFieldSelect";
import { FormFieldSignaturePad } from "../registry/default/components/FormFieldSignaturePad";
import { useFormDynamic } from "../registry/default/hooks/use-dynamic-form";
import { validateFormData } from "../registry/default/utils/web-validation";

// Schema definitions
const defaultSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Name is required",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Please enter a valid email address",
      },
    },
  },
  required: ["name", "email"],
};

const multipleFieldsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Name is required",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Please enter a valid email address",
      },
    },
    message: {
      type: "string",
    },
    country: {
      type: "string",
    },
  },
  required: ["name", "email"],
};

const switchSchema = {
  type: "object",
  properties: {
    notifications: {
      type: "boolean",
    },
    marketing: {
      type: "boolean",
    },
  },
};

const checkboxSchema = {
  type: "object",
  properties: {
    terms: {
      type: "boolean",
      const: true,
      errorMessage: {
        const: "You must agree to the terms and conditions",
      },
    },
    privacy: {
      type: "boolean",
      const: true,
      errorMessage: {
        const: "You must agree to the privacy policy",
      },
    },
  },
  required: ["terms", "privacy"],
};

const checkboxGroupSchema = {
  type: "object",
  properties: {
    interests: {
      type: "array",
      minItems: 1,
      errorMessage: {
        minItems: "Please select at least one interest",
      },
    },
  },
  required: ["interests"],
};

const selectSchema = {
  type: "object",
  properties: {
    country: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Please select a country",
      },
    },
    city: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Please select a city",
      },
    },
  },
  required: ["country", "city"],
};

const completeFormSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Full name is required",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Please enter a valid email address",
      },
    },
    phone: {
      type: "string",
      pattern:
        "^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,9}$",
      errorMessage: {
        pattern: "Please enter a valid phone number",
      },
    },
    country: {
      type: "string",
    },
    message: {
      type: "string",
    },
    notifications: {
      type: "boolean",
    },
    terms: {
      type: "boolean",
      const: true,
      errorMessage: {
        const: "You must agree to the terms and conditions",
      },
    },
    interests: {
      type: "array",
      minItems: 1,
      errorMessage: {
        minItems: "Please select at least one interest",
      },
    },
  },
  required: ["name", "email", "terms", "interests"],
};

export const Default = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-default"
      />
    </Form>
  );
};

export const MultipleFields = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-multiple"
      />
    </Form>
  );
};

export const WithErrors = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please fix the validation errors");
      return;
    }

    formData.setFetchStatus("success");
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-errors"
      />
    </Form>
  );
};

export const WithSwitch = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-switch"
      />
    </Form>
  );
};

export const WithCheckbox = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please accept all required agreements");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-checkbox"
      />
    </Form>
  );
};

export const WithCheckboxGroup = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please select at least one interest");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-checkbox-group"
      />
    </Form>
  );
};

export const WithSelect = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const formData = useFormDynamic({
    country: "text",
    city: "text",
  });

  const { country, city } = formData.getFields();

  const { isValid, errors } = validateFormData(
    selectSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
  ];

  const cityOptions = [
    { label: "New York", value: "ny" },
    { label: "Los Angeles", value: "la" },
    { label: "Chicago", value: "ch" },
    { label: "San Francisco", value: "sf" },
  ];

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please select both country and city");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
      <FormFieldSelect
        field={country}
        label="Country *"
        options={countryOptions}
        placeholder="Select a country"
      />
      <FormFieldSelect
        field={city}
        label="City *"
        options={cityOptions}
        placeholder="Select a city"
      />
      <FormSubmit
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-select"
      />
    </Form>
  );
};

export const WithLoading = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-loading"
      />
    </Form>
  );
};

export const CompleteForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please complete all required fields");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
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
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit Form" }}
        form="form-complete"
      />
    </Form>
  );
};

const comboboxSingleSchema = {
  type: "object",
  properties: {
    country: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Please select a country",
      },
    },
  },
  required: ["country"],
};

const comboboxMultipleSchema = {
  type: "object",
  properties: {
    interests: {
      type: "array",
      minItems: 1,
      errorMessage: {
        minItems: "Please select at least one interest",
      },
    },
  },
  required: ["interests"],
};

const comboboxOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "China", value: "cn" },
];

const comboboxInterestsOptions = [
  { label: "Web Development", value: "web" },
  { label: "Mobile Development", value: "mobile" },
  { label: "UI/UX Design", value: "design" },
  { label: "Data Science", value: "data" },
  { label: "Machine Learning", value: "ml" },
  { label: "DevOps", value: "devops" },
];

export const WithComboboxSingle = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const formData = useFormDynamic({
    country: "text",
  });

  const { country } = formData.getFields();

  const { isValid, errors } = validateFormData(
    comboboxSingleSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please select a country");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-combobox-single"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormFieldCombobox
        field={country}
        label="Country *"
        options={comboboxOptions}
        placeholder="Select a country"
      />
      <FormSubmit
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-combobox-single"
      />
    </Form>
  );
};

export const WithComboboxMultiple = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const formData = useFormDynamic({
    interests: "text",
  }, formRef);

  const { interests } = formData.getFields();

  const { isValid, errors } = validateFormData(
    comboboxMultipleSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please select at least one interest");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
    error: formData.error,
  };


  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-combobox-multiple"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormFieldCombobox
        field={interests}
        label="Select your interests *"
        options={comboboxInterestsOptions}
        multiple
        placeholder="Select one or more interests"
      />
      <FormSubmit
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-combobox-multiple"
      />
    </Form>
  );
};

const signaturePadSchema = {
  type: "object",
  properties: {
    signature: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Please provide your signature",
      },
    },
  },
  required: ["signature"],
};

export const WithSignaturePad = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const formData = useFormDynamic({
    signature: "text",
  });

  const { signature } = formData.getFields();

  const { isValid, errors } = validateFormData(
    signaturePadSchema,
    formData.getValues()
  );
  const formErrors = errors || undefined;

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.setFetchStatus("loading");

    if (!isValid) {
      formData.setFetchStatus("error");
      formData.touchForm();
      formData.setError("Please provide your signature");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formData.setFetchStatus("success");
    console.log("Form submitted:", formData.getValues());
  };

  const formDataForAlert = {
    fetchStatus: formData.fetchStatus,
    error: formData.error,
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleOnSubmit}
      errors={formErrors}
      id="form-signature-pad"
      className="flex flex-col gap-1"
    >
      <FormAlert formData={formDataForAlert} />
      <FormFieldSignaturePad
        field={signature}
        label="Signature *"
        variant="default"
        size="md"
      />
      <FormSubmit
        fetchStatus={formData.fetchStatus}
        buttonProps={{ children: "Submit" }}
        form="form-signature-pad"
      />
    </Form>
  );
};
