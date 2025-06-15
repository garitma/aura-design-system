import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuItem> & {
  type: "item";
  label: string;
};

type DropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof DropdownMenuCheckboxItem
> & {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

type DropdownMenuRadioItemProps = React.ComponentProps<
  typeof DropdownMenuRadioItem
> & {
  type: "radio";
  label: string;
  value: string;
  onSelect?: () => void;
};

type DropdownMenuLabelProps = React.ComponentProps<
  typeof DropdownMenuLabel
> & {
  type: "label";
  label: string;
};

type DropdownMenuSeparatorProps = React.ComponentProps<
  typeof DropdownMenuSeparator
> & {
  type: "separator";
};

type DropdownMenuSubProps = React.ComponentProps<typeof DropdownMenuSub> & {
  type: "sub";
  trigger: string;
  items: DropdownMenuItemType[];
};

type DropdownMenuRadioGroupWrapperProps = React.ComponentProps<typeof DropdownMenuRadioGroup> & {
  type: "radio-group";
  items: DropdownMenuRadioItemProps[];
};

export type DropdownMenuItemType = 
  | DropdownMenuItemProps
  | DropdownMenuCheckboxItemProps
  | DropdownMenuRadioItemProps
  | DropdownMenuLabelProps
  | DropdownMenuSeparatorProps
  | DropdownMenuSubProps
  | DropdownMenuRadioGroupWrapperProps;

type DropdownMenuListProps = {
  trigger: React.ReactNode;
  items: DropdownMenuItemType[];
} & React.ComponentProps<typeof DropdownMenu>;

const renderMenuItem = (item: DropdownMenuItemType) => {
  switch (item.type) {
    case "item":
      return <DropdownMenuItem key={item.label} onSelect={item.onSelect}>{item.label}</DropdownMenuItem>;
    case "checkbox":
      return (
        <DropdownMenuCheckboxItem
          key={item.label}
          checked={item.checked}
          onCheckedChange={item.onCheckedChange}
        >
          {item.label}
        </DropdownMenuCheckboxItem>
      );
    case "radio":
      return (
        <DropdownMenuRadioItem key={item.label} value={item.value} onSelect={item.onSelect}>
          {item.label}
        </DropdownMenuRadioItem>
      );
    case "label":
      return <DropdownMenuLabel key={item.label}>{item.label}</DropdownMenuLabel>;
    case "separator":
      return <DropdownMenuSeparator key={`separator-${Math.random()}`} />;
    case "sub":
      return (
        <DropdownMenuSub key={item.trigger}>
          <DropdownMenuSubTrigger>{item.trigger}</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {item.items.map(renderMenuItem)}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    case "radio-group":
      const { items: radioGroupChildren, ...radioGroupProps } = item;
      return (
        <DropdownMenuRadioGroup
          key="radio-group"
          {...radioGroupProps}
        >
          {radioGroupChildren.map(renderMenuItem)}
        </DropdownMenuRadioGroup>
      );
    default:
      return null;
  }
};

const DropdownMenuList = ({
  trigger,
  items,
  ...props
}: DropdownMenuListProps) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent>
          {items.map(renderMenuItem)}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default DropdownMenuList; 