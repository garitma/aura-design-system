import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu";

type ContextMenuItemProps = React.ComponentProps<typeof ContextMenuItem> & {
  type: "item";
  label: string;
};

type ContextMenuCheckboxItemProps = React.ComponentProps<
  typeof ContextMenuCheckboxItem
> & {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

type ContextMenuRadioItemProps = React.ComponentProps<
  typeof ContextMenuRadioItem
> & {
  type: "radio";
  label: string;
  value: string;
  onSelect?: () => void;
};

type ContextMenuLabelProps = React.ComponentProps<
  typeof ContextMenuLabel
> & {
  type: "label";
  label: string;
};

type ContextMenuSeparatorProps = React.ComponentProps<
  typeof ContextMenuSeparator
> & {
  type: "separator";
};

type ContextMenuSubProps = React.ComponentProps<typeof ContextMenuSub> & {
  type: "sub";
  trigger: string;
  items: ContextMenuItemType[];
};

type ContextMenuRadioGroupWrapperProps = React.ComponentProps<
  typeof ContextMenuRadioGroup
> & {
  type: "radio-group";
  items: ContextMenuRadioItemProps[];
  value: string;
  onValueChange: (value: string) => void;
};

export type ContextMenuItemType = 
  | ContextMenuItemProps
  | ContextMenuCheckboxItemProps
  | ContextMenuRadioItemProps
  | ContextMenuLabelProps
  | ContextMenuSeparatorProps
  | ContextMenuSubProps
  | ContextMenuRadioGroupWrapperProps;

type ContextMenuListProps = React.ComponentProps<typeof ContextMenu> & {
  trigger: React.ReactNode;
  items: ContextMenuItemType[];
};

const renderContextMenuItem = (item: ContextMenuItemType) => {
  switch (item.type) {
    case "item":
      return (
        <ContextMenuItem key={item.label} onSelect={item.onSelect}>
          {item.label}
        </ContextMenuItem>
      );
    case "checkbox":
      return (
        <ContextMenuCheckboxItem
          key={item.label}
          checked={item.checked}
          onCheckedChange={item.onCheckedChange}
        >
          {item.label}
        </ContextMenuCheckboxItem>
      );
    case "radio":
      return (
        <ContextMenuRadioItem key={item.label} value={item.value} onSelect={item.onSelect}>
          {item.label}
        </ContextMenuRadioItem>
      );
    case "label":
      return <ContextMenuLabel key={item.label}>{item.label}</ContextMenuLabel>;
    case "separator":
      return <ContextMenuSeparator key={`separator-${Math.random()}`} />;
    case "sub":
      return (
        <ContextMenuSub key={item.trigger}>
          <ContextMenuSubTrigger>{item.trigger}</ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              {item.items.map(renderContextMenuItem)}
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
      );
    case "radio-group":
      const { items: radioGroupChildren, ...radioGroupProps } = item;
      return (
        <ContextMenuRadioGroup key="radio-group" {...radioGroupProps}>
          {radioGroupChildren.map(renderContextMenuItem)}
        </ContextMenuRadioGroup>
      );
    default:
      return null;
  }
};

const ContextMenuList = ({
  trigger,
  items,
  ...props
}: ContextMenuListProps) => {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>

      <ContextMenuPortal>
        <ContextMenuContent>{items.map(renderContextMenuItem)}</ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export default ContextMenuList; 