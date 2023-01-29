import React from "react";

import { useForm, useStatus } from "../../hooks/use-form";
import Input from "../../components/input";
import Button from "../../components/button";
import Alert from "../../components/alert";

export const WithHook = () => {
  const formData = useForm({
    firstName: "",
    lastName: "",
    email: "",
  });

  const status = useStatus();

  const { firstName, lastName, email }: any = formData;

  return (
    <div>
      <form>
        <Input placeholder="Name" {...firstName} />
        <Input placeholder="Last name" {...lastName} />
        <Input placeholder="Email" {...email} />
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
    status.setIsWaiting(true);

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
    status.setIsWaiting(false);
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
          <Button label="Submit" isLoadingText="Loading..." isLoading={status.state.isLoading} />
        </div>
      </form>
      <Alert {...status} isPushTop />
    </div>
  );
};
