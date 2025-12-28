import * as React from "react"

// Component demos
import { 
  AccordionDemo,
  AccordionDemoMultiple,
  AccordionDemoDefaultValue,
  AccordionDemoDisabled,
  AccordionDemoDisabledItem
} from "@/components/demos/accordion-demo"
import { 
  AlertDemoDefault,
  AlertDemo,
  AlertStatusStatusesDemo
} from "@/components/demos/alert-demo"
import { 
  AlertDialogDemo
} from "@/components/demos/alert-dialog-demo"
import { 
  AspectRatioDemoDefault,
  AspectRatioDemo
} from "@/components/demos/aspect-ratio-demo"
import { 
  AutocompleteDemo
} from "@/components/demos/autocomplete-demo"
import { 
  AvatarDemo,
  AvatarDemoWithFallback,
  AvatarDemoFallbackOnly,
  AvatarDemoCustomSize,
  AvatarGroupDemo,
  AvatarDemoWithStatus,
  AvatarDemoDifferentShapes,
  AvatarDemoCustomFallbackStyles
} from "@/components/demos/avatar-demo"
import { 
  ButtonDemoFill,
  ButtonDemoPill,
  ButtonDemoLink,
  ButtonDemoMenu,
  ButtonDemoSizes,
  ButtonDemo,
  ButtonDemoDisabled,
  ButtonDemoLoading,
  ButtonDemoStates,
  ButtonDemoModeProp
} from "@/components/demos/button-demo"
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
} from "@/components/demos/card-demo"
import { 
  CheckboxDemo,
  CheckboxDemoChecked,
  CheckboxDemoUnchecked,
  CheckboxDemoDisabled,
  CheckboxDemoWithDescription,
  CheckboxDemoGroup,
  CheckboxDemoIndeterminate
} from "@/components/demos/checkbox-demo"
import { 
  CollapsibleDemoDefaultOpen,
  CollapsibleDemoWithRichContent,
  CollapsibleDemoCustomTrigger,
  CollapsibleDemo,
  CollapsibleDemoDisabled
} from "@/components/demos/collapsible-demo"
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
} from "@/components/demos/combobox-demo"
import { 
  CommandDemo
} from "@/components/demos/command-demo"
import { 
  ContextMenuDemo,
  ContextMenuDemoWithSubmenu,
  ContextMenuDemoWithCheckboxes,
  ContextMenuDemoWithRadioGroup,
  ContextMenuDemoComplexMenu
} from "@/components/demos/context-menu-demo"
import { 
  DialogDemo,
  DialogDemoCustomContent
} from "@/components/demos/dialog-demo"
import { 
  DrawerDemo
} from "@/components/demos/drawer-demo"
import { 
  DropdownMenuDemo,
  DropdownMenuDemoWithCheckboxes,
  DropdownMenuDemoWithRadioGroup,
  DropdownMenuDemoComplex
} from "@/components/demos/dropdown-menu-demo"
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
  FormDemoWithSignaturePad,
  FormDemoWithSortableList
} from "@/components/demos/form-demo"
import { 
  HoverCardDemo
} from "@/components/demos/hover-card-demo"
import { 
  KbdDemo,
  KbdDemoSingleKey,
  KbdDemoModifierKeys,
  KbdDemoKeyboardShortcuts,
  KbdDemoWithIcons,
  KbdDemoComplexShortcuts,
  KbdDemoGroup
} from "@/components/demos/kbd-demo"
import { 
  MenubarDemo
} from "@/components/demos/menubar-demo"
import { 
  NavigationMenuDemoDefault,
  NavigationMenuDemo
} from "@/components/demos/navigation-menu-demo"
import { 
  PopoverDemo,
  PopoverDemoWithCloseButton,
  PopoverDemoWithArrow,
  PopoverDemoControlled,
  PopoverDemoWithAnchor,
  PopoverDemoPositioning
} from "@/components/demos/popover-demo"
import { 
  ProgressDemo,
  ProgressDemoZero,
  ProgressDemoComplete,
  ProgressDemoSimulated
} from "@/components/demos/progress-demo"
import { 
  RadioGroupDemo,
  RadioGroupDemoWithDefaultValue,
  RadioGroupDemoDisabled,
  RadioGroupDemoWithDescription,
  RadioGroupDemoPaymentMethod,
  RadioGroupDemoNotificationPreferences,
  RadioGroupDemoHorizontal
} from "@/components/demos/radio-group-demo"
import { 
  ScrollAreaDemo
} from "@/components/demos/scroll-area-demo"
import { 
  SectionDemo
} from "@/components/demos/section-demo"
import { 
  SelectDemo,
  SelectDemoWithDefaultValue,
  SelectDemoWithGroups,
  SelectDemoWithDisabledItems,
  SelectDemoDisabled,
  SelectDemoWithLongList,
  SelectDemoComplex
} from "@/components/demos/select-demo"
import { 
  SeparatorDemo
} from "@/components/demos/separator-demo"
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
} from "@/components/demos/signature-pad-demo"
import { 
  SliderDemo,
  SliderDemoDisabled,
  SliderDemoWithSteps
} from "@/components/demos/slider-demo"
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
} from "@/components/demos/sortable-demo"
import { 
  StepperDemo
} from "@/components/demos/stepper-demo"
import { 
  SwitchDemo,
  SwitchDemoChecked,
  SwitchDemoUnchecked,
  SwitchDemoDisabled,
  SwitchDemoWithDescription,
  SwitchGroupDemo
} from "@/components/demos/switch-demo"
import { 
  TabsDemo
} from "@/components/demos/tabs-demo"
import { 
  ToggleDemo,
  ToggleIconsDemo
} from "@/components/demos/toggle-demo"
import { 
  ToggleGroupDemo
} from "@/components/demos/toggle-group-demo"
import { 
  TooltipDemo
} from "@/components/demos/tooltip-demo"

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
  "autocomplete-demo": {
    component: AutocompleteDemo,
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
  "button-demo": {
    component: ButtonDemo,
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
  "form-demo-with-sortable-list": {
    component: FormDemoWithSortableList,
  },
  "hover-card-demo": {
    component: HoverCardDemo,
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
  "navigation-menu-demo": {
    component: NavigationMenuDemoDefault,
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
  "scroll-area-demo": {
    component: ScrollAreaDemo,
  },
  "section-demo": {
    component: SectionDemo,
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
  "separator-demo": {
    component: SeparatorDemo,
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
  "slider-demo": {
    component: SliderDemo,
  },
  "slider-demo-disabled": {
    component: SliderDemoDisabled,
  },
  "slider-demo-with-steps": {
    component: SliderDemoWithSteps,
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
  "tabs-demo": {
    component: TabsDemo,
  },
  "toggle-demo": {
    component: ToggleDemo,
  },
  "toggle-demo-toggle-icons": {
    component: ToggleIconsDemo,
  },
  "toggle-group-demo": {
    component: ToggleGroupDemo,
  },
  "tooltip-demo": {
    component: TooltipDemo,
  },
} as const

export type RegistryItem = {
  component: React.ComponentType<any>
}

export type RegistryName = keyof typeof Registry
