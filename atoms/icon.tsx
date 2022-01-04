import {SharedBasic, AuraIcons} from "../types/global"

/**
 * Icon component
 */

export interface IconProps extends SharedBasic {
  sprite?: AuraIcons;
  className?: string;
}

const Icon = ({ sprite, className, ...props }: IconProps) => {
  const classConnect: string[] = ["icon", sprite!, className!]

  return <i className={classConnect.join(" ").trim()} {...props}></i>
}



export default Icon
