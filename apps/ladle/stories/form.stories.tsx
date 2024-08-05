import React, { FormEvent } from "react";

import {
  useForm,
  useStatus,
  useFormIsValid,
  isInvalidSchema,
} from "@aura-design/hooks/form";
import Input from "@aura-design/ui/input";
import Select from "@aura-design/ui/select";
import Textarea from "@aura-design/ui/textarea"
import Button from "@aura-design/ui/button";
import Alert from "@aura-design/ui/alert";
import Grid from "@aura-design/ui/grid";
import Checkbox from "@aura-design/ui/checkbox";

export const WithHook = () => {
  const formData = useForm({
    firstName: "",
    lastName: "",
    email: "",
    options: "",
    message: "",
    accept: false,
  });

  const { firstName, lastName, email, options, accept, message } = formData;

  return (
    <div>
      <form>
        <Input placeholder="Name" {...firstName} />
        <Input placeholder="Last name" {...lastName} />
        <Input placeholder="Email" {...email} />
        <Select {...options}>
          <option>Foo</option>
          <option>Foo2</option>
        </Select>
        <Textarea {...message}/>
        <Checkbox label="Accept terms and conditions." {...accept} />
      </form>
    </div>
  );
};

export const WithGrid = () => {
  const formData = useForm({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { firstName, lastName, email } = formData;

  return (
    <div>
      <form>
        <Grid col="two">
          <Input placeholder="Name" {...firstName} />
          <Input placeholder="Last name" {...lastName} />
          <Input placeholder="Email" {...email} classNameContainer="span-2" />
        </Grid>
      </form>
    </div>
  );
};

export const WithStatus = () => {
  const status = useStatus();
  const formData = useForm({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { firstName, lastName, email } = formData;

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    status.resetStatus();
    status.setIsLoading(true);

    const fakeFetch = new Promise((resolve, reject) => {
      setTimeout(() => {
        const random_boolean = Math.random() < 0.5;
        resolve({ ok: random_boolean });
      }, 600);
    });

    const res = await fakeFetch;

    handleOnResponse(res);
  };

  const handleOnResponse = (res: any) => {
    status.setIsLoading(false);
    status.setSubmited(true);
    if (!res.ok) {
      status.setIsError(true);
      status.setMessage("An unexpected error has occurred.");
      return;
    }

    status.setMessage("Everything has gone well.");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Input placeholder="Name" {...firstName} />
        <Input placeholder="Last name" {...lastName} />
        <Input placeholder="Email" {...email} />
        <div className="inputer">
          <Button
            label="Submit"
            isLoadingText="Loading..."
            isLoading={status.state.isLoading}
          />
        </div>
      </form>
      <Alert state={status.state} isPushTop />
    </div>
  );
};

export const WithValidator = () => {
  const status = useStatus();
  const formData = useForm({
    firstName: "",
    lastName: "",
    email: "",
    options: "",
  });

  const { firstName, lastName, email, options } = formData;

  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const validatorSchema = ({
    firstName,
    lastName,
    email,
    options,
  }: {
    [key: string]: any;
  }) => {
    let schema: { [key: string]: boolean } = {};

    if (!firstName.value) {
      firstName.dialog("Name is required.");
      schema.firstName = false;
    } else {
      schema.firstName = true;
      firstName.dialog(null);
    }

    if (!lastName.value) {
      lastName.dialog("Name is required.");
      schema.lastName = false;
    } else {
      schema.lastName = true;
      lastName.dialog(null);
    }

    if (!options.value) {
      options.dialog("Options is required.");
      schema.options = false;
    } else {
      schema.options = true;
      options.dialog(null);
    }

    if (!email.value) {
      email.dialog("Email is required.");
      schema.email = false;
    } else if (!regexEmail.test(email.value)) {
      email.dialog("Email is not valid.");
      schema.email = false;
    } else {
      schema.email = true;
      email.dialog(null);
    }

    if (isInvalidSchema(schema)) {
      return false;
    } else {
      return true;
    }
  };

  const isValid = useFormIsValid(formData, validatorSchema);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    status.resetStatus();
    status.setIsLoading(true);

    const fakeFetch = new Promise((resolve, reject) => {
      setTimeout(() => {
        const random_boolean = Math.random() < 0.5;
        resolve({ ok: random_boolean });
      }, 600);
    });

    const res = await fakeFetch;

    handleOnResponse(res);
  };

  const handleOnResponse = (res: any) => {
    status.setIsLoading(false);
    status.setSubmited(true);
    if (!res.ok) {
      status.setIsError(true);
      status.setMessage("An unexpected error has occurred.");
      return;
    }

    status.setMessage("Everything has gone well.");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Input placeholder="Name" {...firstName} />
        <Input placeholder="Last name" {...lastName} />
        <Input placeholder="Email" {...email} />
        <Select placeholder="Select an option" {...options}>
          <option>Foo</option>
          <option>Foo2</option>
        </Select>

        <div className="inputer">
          <Button
            label="Submit"
            isLoadingText="Loading..."
            isLoading={status.state.isLoading}
            isDisabled={!isValid}
          />
        </div>
      </form>
      <Alert state={status.state} isPushTop />
    </div>
  );
};
