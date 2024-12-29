import React, { FormEvent, Fragment, useEffect } from "react";
import { SymbolIcon } from "@radix-ui/react-icons";

import {
  useForm,
  useFormDynamic,
  useStatus,
  useFormIsValid,
  useFormValues,
  isInvalidSchema,
} from "@aura-design/system/form";
import Input from "@aura-design/system/input";
import Select from "@aura-design/system/select";
import Textarea from "@aura-design/system/textarea";
import Button from "@aura-design/system/button";
import Alert from "@aura-design/system/alert";
import Grid from "@aura-design/system/grid";
import Checkbox from "@aura-design/system/checkbox";

export const WithDynamicForm = () => {
  const status = useStatus();

  const { field, ...formData } = useFormDynamic({
    firstName: "",
    about: "",
  });

  const { firstName, about } = formData.getFields();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    status.resetStatus();
    status.setIsLoading(true);
    formData.validateValues();

    if (!formData.isValid) {
      status.setIsError(true);
      status.setIsLoading(false);
      status.setMessage("Please validate all the fields");
      return;
    }

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
        <Input placeholder="Name" {...firstName} isLabelable />
        <Textarea placeholder="About" {...about} isLabelable />
        <div className="inputer">
          <Button
            label="Submit"
            isLoadingText={
              <>
                <SymbolIcon className="icon animate-spin" />{" "}
              </>
            }
            isLoading={status.state.isLoading}
            isFluid
          />
        </div>
        <Alert state={status.state} />
      </form>
    </div>
  );
};

export const WithValidator = () => {
  const status = useStatus();

  const validatorSchema = (fields) => {
    const { firstName, password, email, repeatPassword } = fields;
    status.setMessage(null);

    if (!firstName.value) {
      firstName.dialog("Name is required.");
    } else {
      firstName.dialog(null);
    }

    if(!email.value) {
      email.dialog("Email is required.");
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
      email.dialog("Email is not valid.");
    } else {
      email.dialog(null);
    }

    if (!password.value) {
      password.dialog("Password is required.");
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password.value)
    ) {
      password.dialog(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      password.dialog(null);
    }

    if(!repeatPassword.value){
      repeatPassword.dialog("Repeat password is required.");
    } else if (repeatPassword.value !== password.value) {
      repeatPassword.dialog("Passwords do not match.");
    } else {
      repeatPassword.dialog(null);
    }
  };

  const { field, ...formData } = useFormDynamic(
    {
      email: "",
      firstName: "",
      password: "",
      repeatPassword: "",
    },
    validatorSchema
  );

  const { firstName, email, password, repeatPassword } = formData.getFields();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    status.resetStatus();
    status.setIsLoading(true);
    formData.validateValues();

    if (!formData.isValid) {
      status.setIsError(true);
      status.setIsLoading(false);
      status.setMessage("Please validate all the fields");
      return;
    }

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

  console.log(formData.value)

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Input placeholder="Name" {...firstName} isLabelable />
        <Input placeholder="Email" {...email} isLabelable />
        <Input placeholder="Password" {...password} isLabelable type="password"/>
        <Input placeholder="Repeat password" {...repeatPassword} isLabelable type="password"/>

        <div className="inputer">
          <Button
            label="Submit"
            isLoadingText={
              <>
                <SymbolIcon className="icon animate-spin" />{" "}
              </>
            }
            isLoading={status.state.isLoading}
            isFluid
          />
        </div>
        <Alert state={status.state} />
      </form>
    </div>
  );
};
