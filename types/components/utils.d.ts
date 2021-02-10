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

export type AuraIcons = "bag" |
"bag-add" |
"box" |
"close" |
"facebook" |
"giphy" |
"heart" |
"heart-fill" |
"heart-fill-black" |
"instagram" |
"key" |
"link" |
"location" |
"mail" |
"menu" |
"pay" |
"search" |
"store" |
"twitter" |
"user" |
"youtube" 