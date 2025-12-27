import * as React from "react"

// Component demos
import { 
  AccordionDemo,
  AccordionDemoMultiple,
  AccordionDemoDefaultValue,
  AccordionDemoDisabled,
  AccordionDemoDisabledItem
} from "./accordion-demo"
import { 
  AlertDemoDefault,
  AlertDemo,
  AlertStatusStatusesDemo
} from "./alert-demo"
import { 
  AlertDialogDemo
} from "./alert-dialog-demo"
import { 
  AspectRatioDemoDefault,
  AspectRatioDemo
} from "./aspect-ratio-demo"
import { 
  AvatarDemo,
  AvatarDemoWithFallback,
  AvatarDemoFallbackOnly,
  AvatarDemoCustomSize,
  AvatarGroupDemo,
  AvatarDemoWithStatus,
  AvatarDemoDifferentShapes,
  AvatarDemoCustomFallbackStyles
} from "./avatar-demo"
import { 
  ButtonDemo,
  ButtonDemoFill,
  ButtonDemoPill,
  ButtonDemoLink,
  ButtonDemoMenu,
  ButtonDemoSizes,
  ButtonDemoVariants,
  ButtonDemoDisabled,
  ButtonDemoLoading,
  ButtonDemoStates,
  ButtonDemoModeProp
} from "./button-demo"
import { 
  CardDemoWithFooter,
  CardDemoWithActions,
  CardDemoSimpleCard,
  CardDemoMultipleCards,
  CardDemoNestedCards,
  CardDemoInteractiveCard,
  CardGridDemo,
  CardDemo,
  CardDemoImageGrid
} from "./card-demo"
import { 
  CheckboxDemo,
  CheckboxDemoChecked,
  CheckboxDemoUnchecked,
  CheckboxDemoDisabled,
  CheckboxDemoWithDescription,
  CheckboxDemoGroup,
  CheckboxDemoIndeterminate
} from "./checkbox-demo"
import { 
  CollapsibleDemoDefaultOpen,
  CollapsibleDemoWithRichContent,
  CollapsibleDemoCustomTrigger,
  CollapsibleDemo,
  CollapsibleDemoDisabled
} from "./collapsible-demo"
import { 
  ComboboxDemo,
  ComboboxDemoWithClearButton,
  ComboboxDemoWithTriggerButton,
  ComboboxDemoWithChips,
  ComboboxDemoWithGroups,
  ComboboxDemoWithSeparator,
  ComboboxDemoControlled,
  ComboboxDemoDisabled,
  ComboboxDemoPositioning
} from "./combobox-demo"
import { 
  CommandDemo
} from "./command-demo"
import { 
  ContextMenuDemo,
  ContextMenuDemoWithSubmenu,
  ContextMenuDemoWithCheckboxes,
  ContextMenuDemoWithRadioGroup,
  ContextMenuDemoComplexMenu
} from "./context-menu-demo"
import { 
  DialogDemo,
  DialogDemoCustomContent
} from "./dialog-demo"
import { 
  DrawerDemo
} from "./drawer-demo"
import { 
  DropdownMenuDemo,
  DropdownMenuDemoWithCheckboxes,
  DropdownMenuDemoWithRadioGroup,
  DropdownMenuDemoComplex
} from "./dropdown-menu-demo"
import { 
  FormDemo,
  FormDemoMultipleFields,
  FormDemoWithErrors,
  FormDemoWithSwitch,
  FormDemoWithCheckbox,
  FormDemoWithCheckboxGroup,
  FormDemoWithSelect,
  FormDemoWithLoading,
  FormDemoCompleteForm,
  FormDemoWithComboboxSingle,
  FormDemoWithComboboxMultiple,
  FormDemoWithSignaturePad
} from "./form-demo"
import { 
  HoverCardDemo,
  HoverCardDemoProfilePreview
} from "./hover-card-demo"
import { 
  KbdDemo,
  KbdDemoSingleKey,
  KbdDemoModifierKeys,
  KbdDemoKeyboardShortcuts,
  KbdDemoWithIcons,
  KbdDemoComplexShortcuts,
  KbdDemoGroup
} from "./kbd-demo"
import { 
  MenubarDemo
} from "./menubar-demo"
import { 
  NavigationMenuDemo
} from "./navigation-menu-demo"
import { 
  PopoverDemo,
  PopoverDemoWithCloseButton,
  PopoverDemoWithArrow,
  PopoverDemoControlled,
  PopoverDemoWithAnchor,
  PopoverDemoPositioning
} from "./popover-demo"
import { 
  ProgressDemo,
  ProgressDemoZero,
  ProgressDemoComplete,
  ProgressDemoSimulated
} from "./progress-demo"
import { 
  RadioGroupDemo,
  RadioGroupDemoWithDefaultValue,
  RadioGroupDemoDisabled,
  RadioGroupDemoWithDescription,
  RadioGroupDemoPaymentMethod,
  RadioGroupDemoNotificationPreferences,
  RadioGroupDemoHorizontal
} from "./radio-group-demo"
import { 
  SelectDemo,
  SelectDemoWithDefaultValue,
  SelectDemoWithGroups,
  SelectDemoWithDisabledItems,
  SelectDemoDisabled,
  SelectDemoWithLongList,
  SelectDemoComplex
} from "./select-demo"
import { 
  SignaturePadDemo,
  SignaturePadDemoWithoutButtons,
  SignaturePadDemoVariants,
  SignaturePadDemoSizes,
  SignaturePadDemoCustomPenColor,
  SignaturePadDemoCustomLineWidth,
  SignaturePadDemoWithCustomIcons,
  SignaturePadDemoWithOnSave,
  SignaturePadDemoWithOnChange,
  SignaturePadDemoWithRefMethods,
  SignaturePadDemoCombinedExample
} from "./signature-pad-demo"
import { 
  SortableDemo,
  SortableDemoHorizontal,
  SortableDemoWithHandle,
  SortableDemoWithOverlay,
  SortableDemoWithHandleAndOverlay,
  SortableDemoDisabledItems,
  SortableDemoWithObjects,
  SortableDemoFlatCursor,
  SortableDemoCardList,
  SortableDemoNumberedList,
  SortableDemoMixedOrientation,
  SortableDemoWithOnMove
} from "./sortable-demo"
import { 
  StepperDemo
} from "./stepper-demo"
import { 
  SwitchDemo,
  SwitchDemoChecked,
  SwitchDemoUnchecked,
  SwitchDemoDisabled,
  SwitchDemoWithDescription,
  SwitchGroupDemo
} from "./switch-demo"

export const Registry = {
  "accordion-demo": {
    component: AccordionDemo,
  },
  "accordion-demo-multiple": {
    component: AccordionDemoMultiple,
  },
  "accordion-demo-default-value": {
    component: AccordionDemoDefaultValue,
  },
  "accordion-demo-disabled": {
    component: AccordionDemoDisabled,
  },
  "accordion-demo-disabled-item": {
    component: AccordionDemoDisabledItem,
  },
  "alert-demo": {
    component: AlertDemoDefault,
  },
  "alert-demo-alert-demo": {
    component: AlertDemo,
  },
  "alert-demo-alert-status-statuses-demo": {
    component: AlertStatusStatusesDemo,
  },
  "alert-dialog-demo": {
    component: AlertDialogDemo,
  },
  "aspect-ratio-demo": {
    component: AspectRatioDemoDefault,
  },
  "aspect-ratio-demo-aspect-ratio-demo": {
    component: AspectRatioDemo,
  },
  "avatar-demo": {
    component: AvatarDemo,
  },
  "avatar-demo-with-fallback": {
    component: AvatarDemoWithFallback,
  },
  "avatar-demo-fallback-only": {
    component: AvatarDemoFallbackOnly,
  },
  "avatar-demo-custom-size": {
    component: AvatarDemoCustomSize,
  },
  "avatar-demo-avatar-group": {
    component: AvatarGroupDemo,
  },
  "avatar-demo-with-status": {
    component: AvatarDemoWithStatus,
  },
  "avatar-demo-different-shapes": {
    component: AvatarDemoDifferentShapes,
  },
  "avatar-demo-custom-fallback-styles": {
    component: AvatarDemoCustomFallbackStyles,
  },
  "button-demo": {
    component: ButtonDemo,
  },
  "button-demo-fill": {
    component: ButtonDemoFill,
  },
  "button-demo-pill": {
    component: ButtonDemoPill,
  },
  "button-demo-link": {
    component: ButtonDemoLink,
  },
  "button-demo-menu": {
    component: ButtonDemoMenu,
  },
  "button-demo-sizes": {
    component: ButtonDemoSizes,
  },
  "button-demo-variants": {
    component: ButtonDemoVariants,
  },
  "button-demo-disabled": {
    component: ButtonDemoDisabled,
  },
  "button-demo-loading": {
    component: ButtonDemoLoading,
  },
  "button-demo-states": {
    component: ButtonDemoStates,
  },
  "button-demo-mode-prop": {
    component: ButtonDemoModeProp,
  },
  "card-demo-with-footer": {
    component: CardDemoWithFooter,
  },
  "card-demo-with-actions": {
    component: CardDemoWithActions,
  },
  "card-demo-simple-card": {
    component: CardDemoSimpleCard,
  },
  "card-demo-multiple-cards": {
    component: CardDemoMultipleCards,
  },
  "card-demo-nested-cards": {
    component: CardDemoNestedCards,
  },
  "card-demo-interactive-card": {
    component: CardDemoInteractiveCard,
  },
  "card-demo-card-grid": {
    component: CardGridDemo,
  },
  "card-demo": {
    component: CardDemo,
  },
  "card-demo-image-grid": {
    component: CardDemoImageGrid,
  },
  "checkbox-demo": {
    component: CheckboxDemo,
  },
  "checkbox-demo-checked": {
    component: CheckboxDemoChecked,
  },
  "checkbox-demo-unchecked": {
    component: CheckboxDemoUnchecked,
  },
  "checkbox-demo-disabled": {
    component: CheckboxDemoDisabled,
  },
  "checkbox-demo-with-description": {
    component: CheckboxDemoWithDescription,
  },
  "checkbox-demo-group": {
    component: CheckboxDemoGroup,
  },
  "checkbox-demo-indeterminate": {
    component: CheckboxDemoIndeterminate,
  },
  "collapsible-demo-default-open": {
    component: CollapsibleDemoDefaultOpen,
  },
  "collapsible-demo-with-rich-content": {
    component: CollapsibleDemoWithRichContent,
  },
  "collapsible-demo-custom-trigger": {
    component: CollapsibleDemoCustomTrigger,
  },
  "collapsible-demo": {
    component: CollapsibleDemo,
  },
  "collapsible-demo-disabled": {
    component: CollapsibleDemoDisabled,
  },
  "combobox-demo": {
    component: ComboboxDemo,
  },
  "combobox-demo-with-clear-button": {
    component: ComboboxDemoWithClearButton,
  },
  "combobox-demo-with-trigger-button": {
    component: ComboboxDemoWithTriggerButton,
  },
  "combobox-demo-with-chips": {
    component: ComboboxDemoWithChips,
  },
  "combobox-demo-with-groups": {
    component: ComboboxDemoWithGroups,
  },
  "combobox-demo-with-separator": {
    component: ComboboxDemoWithSeparator,
  },
  "combobox-demo-controlled": {
    component: ComboboxDemoControlled,
  },
  "combobox-demo-disabled": {
    component: ComboboxDemoDisabled,
  },
  "combobox-demo-positioning": {
    component: ComboboxDemoPositioning,
  },
  "command-demo": {
    component: CommandDemo,
  },
  "context-menu-demo": {
    component: ContextMenuDemo,
  },
  "context-menu-demo-with-submenu": {
    component: ContextMenuDemoWithSubmenu,
  },
  "context-menu-demo-with-checkboxes": {
    component: ContextMenuDemoWithCheckboxes,
  },
  "context-menu-demo-with-radio-group": {
    component: ContextMenuDemoWithRadioGroup,
  },
  "context-menu-demo-complex-menu": {
    component: ContextMenuDemoComplexMenu,
  },
  "dialog-demo": {
    component: DialogDemo,
  },
  "dialog-demo-custom-content": {
    component: DialogDemoCustomContent,
  },
  "drawer-demo": {
    component: DrawerDemo,
  },
  "dropdown-menu-demo": {
    component: DropdownMenuDemo,
  },
  "dropdown-menu-demo-with-checkboxes": {
    component: DropdownMenuDemoWithCheckboxes,
  },
  "dropdown-menu-demo-with-radio-group": {
    component: DropdownMenuDemoWithRadioGroup,
  },
  "dropdown-menu-demo-complex": {
    component: DropdownMenuDemoComplex,
  },
  "form-demo": {
    component: FormDemo,
  },
  "form-demo-multiple-fields": {
    component: FormDemoMultipleFields,
  },
  "form-demo-with-errors": {
    component: FormDemoWithErrors,
  },
  "form-demo-with-switch": {
    component: FormDemoWithSwitch,
  },
  "form-demo-with-checkbox": {
    component: FormDemoWithCheckbox,
  },
  "form-demo-with-checkbox-group": {
    component: FormDemoWithCheckboxGroup,
  },
  "form-demo-with-select": {
    component: FormDemoWithSelect,
  },
  "form-demo-with-loading": {
    component: FormDemoWithLoading,
  },
  "form-demo-complete-form": {
    component: FormDemoCompleteForm,
  },
  "form-demo-with-combobox-single": {
    component: FormDemoWithComboboxSingle,
  },
  "form-demo-with-combobox-multiple": {
    component: FormDemoWithComboboxMultiple,
  },
  "form-demo-with-signature-pad": {
    component: FormDemoWithSignaturePad,
  },
  "hover-card-demo": {
    component: HoverCardDemo,
  },
  "hover-card-demo-profile-preview": {
    component: HoverCardDemoProfilePreview,
  },
  "kbd-demo": {
    component: KbdDemo,
  },
  "kbd-demo-single-key": {
    component: KbdDemoSingleKey,
  },
  "kbd-demo-modifier-keys": {
    component: KbdDemoModifierKeys,
  },
  "kbd-demo-keyboard-shortcuts": {
    component: KbdDemoKeyboardShortcuts,
  },
  "kbd-demo-with-icons": {
    component: KbdDemoWithIcons,
  },
  "kbd-demo-complex-shortcuts": {
    component: KbdDemoComplexShortcuts,
  },
  "kbd-demo-group": {
    component: KbdDemoGroup,
  },
  "menubar-demo": {
    component: MenubarDemo,
  },
  "navigation-menu-demo-navigation-menu-demo": {
    component: NavigationMenuDemo,
  },
  "popover-demo": {
    component: PopoverDemo,
  },
  "popover-demo-with-close-button": {
    component: PopoverDemoWithCloseButton,
  },
  "popover-demo-with-arrow": {
    component: PopoverDemoWithArrow,
  },
  "popover-demo-controlled": {
    component: PopoverDemoControlled,
  },
  "popover-demo-with-anchor": {
    component: PopoverDemoWithAnchor,
  },
  "popover-demo-positioning": {
    component: PopoverDemoPositioning,
  },
  "progress-demo": {
    component: ProgressDemo,
  },
  "progress-demo-zero": {
    component: ProgressDemoZero,
  },
  "progress-demo-complete": {
    component: ProgressDemoComplete,
  },
  "progress-demo-simulated": {
    component: ProgressDemoSimulated,
  },
  "radio-group-demo": {
    component: RadioGroupDemo,
  },
  "radio-group-demo-with-default-value": {
    component: RadioGroupDemoWithDefaultValue,
  },
  "radio-group-demo-disabled": {
    component: RadioGroupDemoDisabled,
  },
  "radio-group-demo-with-description": {
    component: RadioGroupDemoWithDescription,
  },
  "radio-group-demo-payment-method": {
    component: RadioGroupDemoPaymentMethod,
  },
  "radio-group-demo-notification-preferences": {
    component: RadioGroupDemoNotificationPreferences,
  },
  "radio-group-demo-horizontal": {
    component: RadioGroupDemoHorizontal,
  },
  "select-demo": {
    component: SelectDemo,
  },
  "select-demo-with-default-value": {
    component: SelectDemoWithDefaultValue,
  },
  "select-demo-with-groups": {
    component: SelectDemoWithGroups,
  },
  "select-demo-with-disabled-items": {
    component: SelectDemoWithDisabledItems,
  },
  "select-demo-disabled": {
    component: SelectDemoDisabled,
  },
  "select-demo-with-long-list": {
    component: SelectDemoWithLongList,
  },
  "select-demo-complex": {
    component: SelectDemoComplex,
  },
  "signature-pad-demo": {
    component: SignaturePadDemo,
  },
  "signature-pad-demo-without-buttons": {
    component: SignaturePadDemoWithoutButtons,
  },
  "signature-pad-demo-variants": {
    component: SignaturePadDemoVariants,
  },
  "signature-pad-demo-sizes": {
    component: SignaturePadDemoSizes,
  },
  "signature-pad-demo-custom-pen-color": {
    component: SignaturePadDemoCustomPenColor,
  },
  "signature-pad-demo-custom-line-width": {
    component: SignaturePadDemoCustomLineWidth,
  },
  "signature-pad-demo-with-custom-icons": {
    component: SignaturePadDemoWithCustomIcons,
  },
  "signature-pad-demo-with-on-save": {
    component: SignaturePadDemoWithOnSave,
  },
  "signature-pad-demo-with-on-change": {
    component: SignaturePadDemoWithOnChange,
  },
  "signature-pad-demo-with-ref-methods": {
    component: SignaturePadDemoWithRefMethods,
  },
  "signature-pad-demo-combined-example": {
    component: SignaturePadDemoCombinedExample,
  },
  "sortable-demo": {
    component: SortableDemo,
  },
  "sortable-demo-horizontal": {
    component: SortableDemoHorizontal,
  },
  "sortable-demo-with-handle": {
    component: SortableDemoWithHandle,
  },
  "sortable-demo-with-overlay": {
    component: SortableDemoWithOverlay,
  },
  "sortable-demo-with-handle-and-overlay": {
    component: SortableDemoWithHandleAndOverlay,
  },
  "sortable-demo-disabled-items": {
    component: SortableDemoDisabledItems,
  },
  "sortable-demo-with-objects": {
    component: SortableDemoWithObjects,
  },
  "sortable-demo-flat-cursor": {
    component: SortableDemoFlatCursor,
  },
  "sortable-demo-card-list": {
    component: SortableDemoCardList,
  },
  "sortable-demo-numbered-list": {
    component: SortableDemoNumberedList,
  },
  "sortable-demo-mixed-orientation": {
    component: SortableDemoMixedOrientation,
  },
  "sortable-demo-with-on-move": {
    component: SortableDemoWithOnMove,
  },
  "stepper-demo": {
    component: StepperDemo,
  },
  "switch-demo": {
    component: SwitchDemo,
  },
  "switch-demo-checked": {
    component: SwitchDemoChecked,
  },
  "switch-demo-unchecked": {
    component: SwitchDemoUnchecked,
  },
  "switch-demo-disabled": {
    component: SwitchDemoDisabled,
  },
  "switch-demo-with-description": {
    component: SwitchDemoWithDescription,
  },
  "switch-demo-switch-group": {
    component: SwitchGroupDemo,
  },
} as const

export type RegistryItem = {
  component: React.ComponentType<any>
}

export type RegistryName = keyof typeof Registry
