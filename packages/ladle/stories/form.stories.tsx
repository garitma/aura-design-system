import React from "react";

import { useForm, useStatus, useFormIsValid } from "../../hooks/use-form";
import Input from "../../components/input";
import Button from "../../components/button";
import Alert from "../../components/alert";
import Grid from "../../components/grid";
import Checkbox from "../../components/checkbox";

export const WithHook = () => {
  const formData = useForm({
    firstName: "",
    lastName: "",
    email: "",
    accept: false,
  });

  const { firstName, lastName, email, accept }: any = formData;

  return (
    <div>
      <form>
        <Input placeholder="Name" {...firstName} />
        <Input placeholder="Last name" {...lastName} />
        <Input placeholder="Email" {...email} />
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

  const { firstName, lastName, email }: any = formData;

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

  const { firstName, lastName, email }: any = formData;

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
  });

  const { firstName, lastName, email }: any = formData;

  const isInvalidSchema = (schema) =>
    Object.values(schema).some((item) => item === false);

  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const validatorSchema = ({ firstName, lastName, email }) => {
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
