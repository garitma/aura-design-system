import React, { useState, useEffect, useRef } from "react";

import { useFormDynamic } from "../utils/forms";
import { Form, FormField, FormSubmit } from "../components/ui/Form";
import Button from "../components/ui/Button";
import { FormCheckbox } from "../components/ui/Checkbox";

export const FormDemo = () => {
  const formRef = useRef(null);
  const formData = useFormDynamic({
    email: "text",
    category: "select",
    question: "textarea",
    accept: "checkbox",
  });

  const { email, question, accept, category } = formData.getFields();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (formRef?.current) {
      accept.setFormFieldValue(formRef, true);
    }
  }, []);

  return (
    <Form className="grid gap-1.5 px-1" onSubmit={handleOnSubmit} ref={formRef}>
      <FormField label="Email" name="email" field={email} />
      <FormField label="Question" name="category" field={category}>
        <select>
          <option value="Holi">Holi</option>
          <option value="Hola">Hola</option>
        </select>
      </FormField>
      <FormField label="Question" name="question" field={question}>
        <textarea />
      </FormField>
      <FormCheckbox
        label="Accept terms and conditions."
        name="accept"
        field={accept}
      />
      <FormSubmit asChild>
        <Button>Post question</Button>
      </FormSubmit>
    </Form>
  );
};
