export type AnyFn = (...args: any[]) => any;

export interface SharedBasic {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export type AuraColors = 
  'blue' | 
  'teal-green' |
  "snow" | 
  "purple" | 
  "orange" | 
  "orange-rose" | 
  "pink" |
  "pink-purple" |
  "lemon-green" |
  "green" |
  "yellow"