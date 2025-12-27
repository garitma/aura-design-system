import type { ReactNode } from 'react';

export function Steps({ children }: { children: ReactNode }) {
  return <div className="fd-steps ml-2 pl-3">{children}</div>;
}

export function Step({ children }: { children: ReactNode }) {
  return <div className="fd-step">{children}</div>;
}
