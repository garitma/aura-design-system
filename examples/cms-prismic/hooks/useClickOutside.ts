import React, { useEffect, useRef } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void): void => {
  const handleClick = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useClickOutside;
