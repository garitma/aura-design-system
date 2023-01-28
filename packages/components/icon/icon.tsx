import { SharedBasic } from "../../types/global";

export interface IconProps extends SharedBasic {
  displayName?: string;
  viewBox: string;
  focusable?: boolean;
}

const Icon = ({
  displayName = "Icon",
  viewBox,
  children,
  focusable = false,
  className,
}: IconProps) => {
  const classConnect: string[] = [className!, "icon"];

  const fallbackIcon = {
    path: (
      <g stroke="currentColor">
        <path
          strokeLinecap="round"
          fill="none"
          d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
        />
        <path
          fill="currentColor"
          strokeLinecap="round"
          d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
        />
        <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
      </g>
    ),
    viewBox: "0 0 24 24",
  };

  const _path = (children ?? fallbackIcon.path) as React.ReactNode;

  return (
    <svg
      className={classConnect.join(" ").trim()}
      focusable={focusable}
      viewBox={viewBox ?? fallbackIcon.viewBox}
    >
      {displayName && <title>{displayName}</title>}
      {_path}
    </svg>
  );
};

export default Icon;
