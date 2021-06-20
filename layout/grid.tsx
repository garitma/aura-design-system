import { SharedBasic, AuraGrid } from "../utils/types"

/**
 * Grid
 */

 export interface GridProps extends SharedBasic {
  col: AuraGrid
  isFixed: boolean
 }

const Grid = ({ children, className, col,isFixed, ...props }: GridProps) => {
  const classConnect = ["aureole", className]

  if (col) {
    classConnect.push(col)
  }
  if (isFixed) {
    classConnect.push("fixed")
  }

  return (
    <div className={classConnect.join(" ")} {...props}>
      {children}
    </div>
  )
}


export default Grid
