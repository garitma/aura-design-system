export type AnyFn = (...args: any[]) => any

export interface SharedBasic {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export type AuraColors =
  | "blue"
  | "teal-green"
  | "snow"
  | "purple"
  | "orange"
  | "orange-rose"
  | "pink"
  | "pink-purple"
  | "lemon-green"
  | "green"
  | "yellow"

export type AuraIcons =
  | "search"
  | "arrowDown"
  | "arrowRight"
  | "arrowLeft"
  | "arrowUp"
  | "mail"
  | "user"
  | "bag"
  | "bagAdd"
  | "gift"
  | "link"
  | "close"
  | "menu"
  | "box"
  | "heart"
  | "heartFill"
  | "heartFillBlack"
  | "shop"
  | "pay"
  | "location"
  | "key"
  | "arrowAltLeft"
  | "arrowAltRigth"
  | "check"
  | "circle"
  | "poweroff"
  | "secure"
  | "openLink"
  | "view"
  | "viewOff"
  | "copy"
  | "delete"
  | "edit"
  | "bell"
  | "github"
  | "youtube"
  | "instagram"
  | "twitter"
  | "facebook"
  | "giphly"
  | "stock"

export type HelpType = "warning" | "info" | "danger" | "success"

export type ButtonType = "link" | "fill" | "pill" | "menu" 

export type Target = "_self" | "_blank" | "_parent" | "_top" | "framename"

export type Space = "p0" | "pad" | "inside-pad" | "aura" | "wall-pad"

export type Container = "smash" | "smesh" | "smish" | "smosh" | "smush"
