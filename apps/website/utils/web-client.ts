export const createSubscriber = async ({ email }) => {
  const bodyParams = {
    email,
  };

  const res = await fetch("/api/suscribers", {
    method: "POST",
    body: JSON.stringify(bodyParams),
  });

  return res;
};
