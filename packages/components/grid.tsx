import { SharedBasic, AuraGrid } from "../types/global";

/**
 * Grid
 */

export interface GridProps extends SharedBasic {
  col: AuraGrid;
  isFixed?: boolean;
}

const Grid = ({ children, className, col, isFixed, ...props }: GridProps): JSX.Element => {
  const classConnect: string[] = ["aureole", className!]

  if (col) {
    classConnect.push(col);
  }
  if (isFixed) {
    classConnect.push("fixed");
  }

  return (
    <div className={classConnect.join(" ").trim()} {...props}>
      {children}
    </div>
  );
};

export default Grid;
