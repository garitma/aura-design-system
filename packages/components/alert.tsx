// Importing the SharedBasic type from "../types/global"
import { SharedBasic } from "../types/global";

// Defining the props for the Alert component
export interface AlertProps extends SharedBasic {
  state?: { // Object containing information about the state of the alert (optional)
    info?: { // Object containing the actual information about the alert (optional)
      message?: string | null; // Message to be displayed in the alert (optional)
      isError?: boolean; // Flag to indicate if the alert is an error (optional)
    };
  };
  isPushBottom?: boolean; // Flag to push content below the alert downwards (optional)
  isPushTop?: boolean; // Flag to push content above the alert upwards (optional)
  message?: string; // Message to be displayed in the alert (optional)
}

// Defining the Alert component using a function component syntax
const Alert = ({
  message,
  state,
  isPushBottom,
  isPushTop,
  className,
}: AlertProps): JSX.Element => {
  
  // Determining if the alert is active based on the presence of the message in props
  const isActive = state?.info?.message || message;
  
  // Creating an array of CSS classes to be applied to the alert element
  const classConnect: string[] = [className!, "mod", "aura"];

  // Adding color classes to classConnect based on the isError flag in state
  if (state?.info?.isError) {
    classConnect.push("danger-text danger");
  } else {
    classConnect.push("info-text info");
  }

  // Rendering the Alert component
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

// Exporting the Alert component as the default export
export default Alert;
