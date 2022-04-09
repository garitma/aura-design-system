import { useEffect } from "react";

import { SharedBasic } from "../types/global";

const WithMotionObserver = ({ children }: SharedBasic) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const motions = document.querySelectorAll("[class~='motion']");

      motions.forEach((element) => element.classList.remove("mounted"));
      const observer = new window.IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          entries[0].target.classList.add("mounted");
        } else {
          entries[0].target.classList.remove("mounted");
        }
      });
      motions.forEach((element) => observer.observe(element));
    }
  });

  return <>{children}</>;
};

export default WithMotionObserver;
