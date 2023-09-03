// Importing the ChevronDownIcon component from "../icons" and some types from "../types/global"
import { ChevronDownIcon } from "../icons";
import { SharedBasic, AuraHeadline, AuraColors } from "../types/global";

// Defining the props for the Accordion component
export interface AccordionProps extends SharedBasic {
  title?: string | React.ReactNode; // Title of the accordion (optional)
  headerSize?: AuraHeadline; // Size of the header title (optional)
  color?: AuraColors; // Color of the header section (optional)
}

// Defining the Accordion component using a function component syntax
const Accordion = ({
  title,
  children,
  headerSize = "h6", // Default value for headerSize prop is "h6"
  color,
  className,
}: AccordionProps): JSX.Element => {

  // Creating an array of CSS classes to be applied to the summary element
  const classNameConnect: string[] = [
    className!,
    "aura",
    "anchor",
    "lefttxt",
    "b0",
    "fluid",
    "pointer",
    headerSize,
  ];

  // Adding the color class to classNameConnect if the color prop is provided
  if (color) {
    classNameConnect.push(color);
  }

  // Rendering the Accordion component
  return (
    <details>
      <summary className={classNameConnect.join(" ").trim()}>
        {title}
        <div className="dropdown disable notevent">
          {/* Adding the ChevronDownIcon component to create the toggleable icon */}
          <ChevronDownIcon
            className="icon"
            role="presentation"
            focusable="false"
          />
        </div>
      </summary>
      {children}
    </details>
  );
};

// Exporting the Accordion component as the default export
export default Accordion;
