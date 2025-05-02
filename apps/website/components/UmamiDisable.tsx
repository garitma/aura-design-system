"use client"
import React, { useEffect } from 'react';

interface UmamiDisableProps {
  children: any
}

const UmamiDisable: React.FC<UmamiDisableProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('umami.disabled', '1');
    }
  }, []);

  return <>{children}</>;
};

export default UmamiDisable;
