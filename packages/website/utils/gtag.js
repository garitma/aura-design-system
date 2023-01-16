export const GTM_ID = "GTM-P3SNBL5";

export const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
