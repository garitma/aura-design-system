import { SharedBasic } from "../types/global";

export interface AlertProps extends SharedBasic {
  state?: {
    info?: {
      message?: string | null;
      isError?: boolean;
    };
  };
  isPushBottom?: boolean;
  isPushTop?: boolean;
  message?: string;
}

const Alert = ({
  message,
  state,
  isPushBottom,
  isPushTop,
  className,
}: AlertProps) => {
  const isActive = state?.info?.message || message;
  const classConnect: string[] = [className!, "mod", "aura"];

  if (state?.info?.isError) {
    classConnect.push("danger-text danger");
  } else {
    classConnect.push("info-text info");
  }

  return (
    <>
      {isPushTop && state?.info?.message && <div className="aura" />}

      {isActive && (
        <div className="centertxt">
          <div className={classConnect.join(" ").trim()}>
            <span>{message || state?.info?.message}</span>
          </div>
        </div>
      )}
      {isPushBottom && isActive && <div className="aura" />}
    </>
  );
};

export default Alert;
