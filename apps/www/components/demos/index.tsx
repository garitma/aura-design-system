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
  ActionBarDemo,
  ActionBarDemoTopAligned,
  ActionBarDemoVertical
} from "./action-bar-demo"
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
  AutocompleteDemo
} from "./autocomplete-demo"
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
  BubbleDemo,
  BubbleDemoVariants,
  BubbleDemoAlignment,
  BubbleDemoGroup,
  BubbleDemoAsLink,
  BubbleDemoReactions
} from "./bubble-demo"
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
} from "./button-demo"
import { 
  ButtonGroupDemo,
  ButtonGroupDemoVertical
} from "./button-group-demo"
import { 
  CalendarDemo
} from "./calendar-demo"
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
  CarouselDemo
} from "./carousel-demo"
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
  CollapsibleDemo
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
  EmptyDemo,
  EmptyDemoWithActions
} from "./empty-demo"
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
  FormDemoWithSortableList,
  FormDemoWithEditor
} from "./form-demo"
import { 
  GridDemo
} from "./grid-demo"
import { 
  HoverCardDemo
} from "./hover-card-demo"
import { 
  InputGroupDemo,
  InputGroupDemoInlineEnd,
  InputGroupDemoText,
  InputGroupDemoWithKbd,
  InputGroupDemoBlockStart,
  InputGroupDemoTextareaWithFooter
} from "./input-group-demo"
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
  MarkerDemo,
  MarkerDemoVariants,
  MarkerDemoStatus,
  MarkerDemoSeparator,
  MarkerDemoBorder,
  MarkerDemoWithIcon,
  MarkerDemoAsLink
} from "./marker-demo"
import {
  MentionDemo,
  MentionDemoCustomTrigger,
  MentionDemoCustomFilter
} from "./mention-demo"
import { 
  MenubarDemo
} from "./menubar-demo"
import { 
  MessageDemo,
  MessageDemoAlignment,
  MessageDemoGroup,
  MessageDemoHeaderAndFooter,
  MessageDemoActions
} from "./message-demo"
import { 
  MessageScrollerDemo,
  MessageScrollerDemoAnchoredTurns
} from "./message-scroller-demo"
import { 
  NavigationMenuDemoDefault,
  NavigationMenuDemo
} from "./navigation-menu-demo"
import { 
  PaginationDemo,
  PaginationDemoSimple,
  PaginationDemoIconsOnly,
  PaginationDemoWithEllipsis
} from "./pagination-demo"
import { 
  PopoverDemo,
  PopoverDemoWithCloseButton,
  PopoverDemoWithArrow,
  PopoverDemoControlled,
  PopoverDemoWithAnchor,
  PopoverDemoPositioning
} from "./popover-demo"
import { 
  PresentationDemo,
  PresentationDemoEditing
} from "./presentation-demo"
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
  ResponsiveDialogDemo,
  ResponsiveDialogDemoConfirmation,
  ResponsiveDialogDemoCustomBreakpoint
} from "./responsive-dialog-demo"
import {
  ResponsiveDropdownMenuDemo,
  ResponsiveDropdownMenuDemoCustomBreakpoint
} from "./responsive-dropdown-menu-demo"
import { 
  ScrollAreaDemo
} from "./scroll-area-demo"
import { 
  SectionDemo
} from "./section-demo"
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
  SeparatorDemo
} from "./separator-demo"
import { 
  SheetDemo
} from "./sheet-demo"
import { 
  SidebarDemo
} from "./sidebar-demo"
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
  SkeletonDemo
} from "./skeleton-demo"
import { 
  SliderDemo,
  SliderDemoDisabled,
  SliderDemoWithSteps
} from "./slider-demo"
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
  StatDemo,
  StatDemoIndicatorVariants,
  StatDemoTrends,
  StatDemoWithDescription
} from "./stat-demo"
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
import { 
  TabsDemo
} from "./tabs-demo"
import { 
  ToggleDemo,
  ToggleIconsDemo
} from "./toggle-demo"
import { 
  ToggleGroupDemo
} from "./toggle-group-demo"
import { 
  TooltipDemo
} from "./tooltip-demo"

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
  "action-bar-demo": {
    component: ActionBarDemo,
  },
  "action-bar-demo-top-aligned": {
    component: ActionBarDemoTopAligned,
  },
  "action-bar-demo-vertical": {
    component: ActionBarDemoVertical,
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
  "bubble-demo": {
    component: BubbleDemo,
  },
  "bubble-demo-variants": {
    component: BubbleDemoVariants,
  },
  "bubble-demo-alignment": {
    component: BubbleDemoAlignment,
  },
  "bubble-demo-group": {
    component: BubbleDemoGroup,
  },
  "bubble-demo-as-link": {
    component: BubbleDemoAsLink,
  },
  "bubble-demo-reactions": {
    component: BubbleDemoReactions,
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
  "button-group-demo": {
    component: ButtonGroupDemo,
  },
  "button-group-demo-vertical": {
    component: ButtonGroupDemoVertical,
  },
  "calendar-demo": {
    component: CalendarDemo,
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
  "carousel-demo": {
    component: CarouselDemo,
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
  "collapsible-demo": {
    component: CollapsibleDemo,
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
  "empty-demo": {
    component: EmptyDemo,
  },
  "empty-demo-with-actions": {
    component: EmptyDemoWithActions,
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
  "form-demo-with-editor": {
    component: FormDemoWithEditor,
  },
  "grid-demo": {
    component: GridDemo,
  },
  "hover-card-demo": {
    component: HoverCardDemo,
  },
  "input-group-demo": {
    component: InputGroupDemo,
  },
  "input-group-demo-inline-end": {
    component: InputGroupDemoInlineEnd,
  },
  "input-group-demo-text": {
    component: InputGroupDemoText,
  },
  "input-group-demo-with-kbd": {
    component: InputGroupDemoWithKbd,
  },
  "input-group-demo-block-start": {
    component: InputGroupDemoBlockStart,
  },
  "input-group-demo-textarea-with-footer": {
    component: InputGroupDemoTextareaWithFooter,
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
  "marker-demo": {
    component: MarkerDemo,
  },
  "marker-demo-variants": {
    component: MarkerDemoVariants,
  },
  "marker-demo-status": {
    component: MarkerDemoStatus,
  },
  "marker-demo-separator": {
    component: MarkerDemoSeparator,
  },
  "marker-demo-border": {
    component: MarkerDemoBorder,
  },
  "marker-demo-with-icon": {
    component: MarkerDemoWithIcon,
  },
  "marker-demo-as-link": {
    component: MarkerDemoAsLink,
  },
  "mention-demo": {
    component: MentionDemo,
  },
  "mention-demo-custom-trigger": {
    component: MentionDemoCustomTrigger,
  },
  "mention-demo-custom-filter": {
    component: MentionDemoCustomFilter,
  },
  "menubar-demo": {
    component: MenubarDemo,
  },
  "message-demo": {
    component: MessageDemo,
  },
  "message-demo-alignment": {
    component: MessageDemoAlignment,
  },
  "message-demo-group": {
    component: MessageDemoGroup,
  },
  "message-demo-header-and-footer": {
    component: MessageDemoHeaderAndFooter,
  },
  "message-demo-actions": {
    component: MessageDemoActions,
  },
  "message-scroller-demo": {
    component: MessageScrollerDemo,
  },
  "message-scroller-demo-anchored-turns": {
    component: MessageScrollerDemoAnchoredTurns,
  },
  "navigation-menu-demo": {
    component: NavigationMenuDemoDefault,
  },
  "navigation-menu-demo-navigation-menu-demo": {
    component: NavigationMenuDemo,
  },
  "pagination-demo": {
    component: PaginationDemo,
  },
  "pagination-demo-simple": {
    component: PaginationDemoSimple,
  },
  "pagination-demo-icons-only": {
    component: PaginationDemoIconsOnly,
  },
  "pagination-demo-with-ellipsis": {
    component: PaginationDemoWithEllipsis,
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
  "presentation-demo": {
    component: PresentationDemo,
  },
  "presentation-demo-editing": {
    component: PresentationDemoEditing,
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
  "responsive-dialog-demo": {
    component: ResponsiveDialogDemo,
  },
  "responsive-dialog-demo-confirmation": {
    component: ResponsiveDialogDemoConfirmation,
  },
  "responsive-dialog-demo-custom-breakpoint": {
    component: ResponsiveDialogDemoCustomBreakpoint,
  },
  "responsive-dropdown-menu-demo": {
    component: ResponsiveDropdownMenuDemo,
  },
  "responsive-dropdown-menu-demo-custom-breakpoint": {
    component: ResponsiveDropdownMenuDemoCustomBreakpoint,
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
  "sheet-demo": {
    component: SheetDemo,
  },
  "sidebar-demo": {
    component: SidebarDemo,
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
  "skeleton-demo": {
    component: SkeletonDemo,
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
  "stat-demo": {
    component: StatDemo,
  },
  "stat-demo-indicator-variants": {
    component: StatDemoIndicatorVariants,
  },
  "stat-demo-trends": {
    component: StatDemoTrends,
  },
  "stat-demo-with-description": {
    component: StatDemoWithDescription,
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
