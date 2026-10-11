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
  AngleSliderDemo,
  AngleSliderDemoControlled,
  AngleSliderDemoRangeSelection,
  AngleSliderDemoThemes,
  AngleSliderDemoWithForm
} from "./angle-slider-demo"
import { 
  AreaChartDemo,
  AreaChartDemoNatural,
  AreaChartDemoLinear,
  AreaChartDemoStep,
  AreaChartDemoStacked,
  AreaChartDemoExpanded,
  AreaChartDemoLegend,
  AreaChartDemoIcons,
  AreaChartDemoGradient,
  AreaChartDemoAxes,
  AreaChartDemoInteractive
} from "./area-chart-demo"
import { 
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
  AvatarDemoWithStatus,
  AvatarDemoDifferentShapes,
  AvatarDemoCustomFallbackStyles
} from "./avatar-demo"
import { 
  AvatarGroupDemo,
  AvatarGroupDemoWithTruncation,
  AvatarGroupDemoVertical,
  AvatarGroupDemoRtl,
  AvatarGroupDemoCustomOverflow,
  AvatarGroupDemoReverse,
  AvatarGroupDemoSquare,
  AvatarGroupDemoWithIcons
} from "./avatar-group-demo"
import { 
  BadgeDemo,
  BadgeDemoVariants,
  BadgeDemoStatus
} from "./badge-demo"
import { 
  BadgeOverflowDemo,
  BadgeOverflowDemoWithObjects,
  BadgeOverflowDemoMultiLine,
  BadgeOverflowDemoCustomOverflow,
  BadgeOverflowDemoInteractiveTags
} from "./badge-overflow-demo"
import { 
  BannerDemo,
  BannerDemoMobile,
  BannerDemoDismissStates,
  BannerDemoTones,
  BannerDemoRichMessage
} from "./banner-demo"
import { 
  BarChartDemo,
  BarChartDemoVertical,
  BarChartDemoHorizontal,
  BarChartDemoMultiple,
  BarChartDemoStacked,
  BarChartDemoLabel,
  BarChartDemoCustomLabel,
  BarChartDemoMixed,
  BarChartDemoActive,
  BarChartDemoNegative
} from "./bar-chart-demo"
import { 
  BreadcrumbDemo,
  BreadcrumbDemoCustomSeparator,
  BreadcrumbDemoCollapsed,
  BreadcrumbDemoMobile
} from "./breadcrumb-demo"
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
  ChartDemo
} from "./chart-demo"
import { 
  ChartTooltipsDemo,
  ChartTooltipsDemoDot,
  ChartTooltipsDemoLine,
  ChartTooltipsDemoDashed,
  ChartTooltipsDemoNoIndicator,
  ChartTooltipsDemoLabel,
  ChartTooltipsDemoIcons,
  ChartTooltipsDemoFormatter,
  ChartTooltipsDemoMultiple
} from "./chart-tooltips-demo"
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
  ChipDemo,
  ChipDemoFilter,
  ChipDemoInput
} from "./chip-demo"
import { 
  CircularProgressDemo
} from "./circular-progress-demo"
import { 
  ClientOnlyDemo
} from "./client-only-demo"
import { 
  CollapsibleDemo
} from "./collapsible-demo"
import { 
  ColorPickerDemo
} from "./color-picker-demo"
import { 
  ColorSwatchDemo
} from "./color-swatch-demo"
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
  CompareSliderDemo
} from "./compare-slider-demo"
import { 
  ContextMenuDemo,
  ContextMenuDemoWithSubmenu,
  ContextMenuDemoWithCheckboxes,
  ContextMenuDemoWithRadioGroup,
  ContextMenuDemoComplexMenu
} from "./context-menu-demo"
import { 
  CropperDemo
} from "./cropper-demo"
import { 
  DatePickerDemo
} from "./date-picker-demo"
import { 
  DialogDemo,
  DialogDemoCustomContent
} from "./dialog-demo"
import { 
  DirectionDemo,
  DirectionDemoRtl
} from "./direction-demo"
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
  EditableDemo,
  EditableDemoWithTrigger,
  EditableDemoDoubleClick,
  EditableDemoAutosize,
  EditableDemoTodoList,
  EditableDemoWithForm
} from "./editable-demo"
import { 
  EmptyDemo,
  EmptyDemoWithActions
} from "./empty-demo"
import { 
  ExpressiveCarouselDemo
} from "./expressive-carousel-demo"
import { 
  FabDemo,
  FabDemoExtended
} from "./fab-demo"
import { 
  FabMenuDemo
} from "./fab-menu-demo"
import { 
  FieldDemo
} from "./field-demo"
import { 
  FileUploadDemo,
  FileUploadDemoWithValidation,
  FileUploadDemoDirectUpload,
  FileUploadDemoCircularProgress,
  FileUploadDemoFillProgress
} from "./file-upload-demo"
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
  FpsDemo
} from "./fps-demo"
import { 
  GaugeDemo
} from "./gauge-demo"
import { 
  GridDemo
} from "./grid-demo"
import { 
  HitboxDemo
} from "./hitbox-demo"
import { 
  HoverCardDemo
} from "./hover-card-demo"
import { 
  IconDemo
} from "./icon-demo"
import { 
  InputDemo
} from "./input-demo"
import { 
  InputGroupDemo,
  InputGroupDemoInlineEnd,
  InputGroupDemoText,
  InputGroupDemoWithKbd,
  InputGroupDemoBlockStart,
  InputGroupDemoTextareaWithFooter
} from "./input-group-demo"
import { 
  InputOTPDemo
} from "./input-otp-demo"
import { 
  ItemDemo
} from "./item-demo"
import { 
  KanbanDemo
} from "./kanban-demo"
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
  KeyValueDemo
} from "./key-value-demo"
import { 
  LabelDemo
} from "./label-demo"
import { 
  LineChartDemo,
  LineChartDemoNatural,
  LineChartDemoLinear,
  LineChartDemoStep,
  LineChartDemoMultiple,
  LineChartDemoDots,
  LineChartDemoCustomDots,
  LineChartDemoLabel,
  LineChartDemoInteractive
} from "./line-chart-demo"
import { 
  ListboxDemo
} from "./listbox-demo"
import { 
  LoadingIndicatorDemo
} from "./loading-indicator-demo"
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
  MarqueeDemo
} from "./marquee-demo"
import { 
  MaskInputDemo,
  MaskInputDemoBuiltInPatterns,
  MaskInputDemoCustomPattern,
  MaskInputDemoValidationModes,
  MaskInputDemoCardInformation
} from "./mask-input-demo"
import { 
  MasonryDemo
} from "./masonry-demo"
import { 
  MediaPlayerDemo
} from "./media-player-demo"
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
  NativeSelectDemo
} from "./native-select-demo"
import { 
  NavigationBarDemo
} from "./navigation-bar-demo"
import { 
  NavigationMenuDemoDefault,
  NavigationMenuDemo
} from "./navigation-menu-demo"
import { 
  NavigationRailDemo,
  NavigationRailDemoExpanded
} from "./navigation-rail-demo"
import { 
  PaginationDemo,
  PaginationDemoSimple,
  PaginationDemoIconsOnly,
  PaginationDemoWithEllipsis
} from "./pagination-demo"
import { 
  PendingDemo
} from "./pending-demo"
import { 
  PhoneInputDemo
} from "./phone-input-demo"
import { 
  PieChartDemo,
  PieChartDemoPie,
  PieChartDemoJoined,
  PieChartDemoLabel,
  PieChartDemoLegend,
  PieChartDemoDonut,
  PieChartDemoActive,
  PieChartDemoText,
  PieChartDemoStacked
} from "./pie-chart-demo"
import { 
  PopoverDemo,
  PopoverDemoWithCloseButton,
  PopoverDemoWithArrow,
  PopoverDemoControlled,
  PopoverDemoWithAnchor,
  PopoverDemoPositioning
} from "./popover-demo"
import { 
  PortalDemo
} from "./portal-demo"
import { 
  PresenceDemo
} from "./presence-demo"
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
  QrCodeDemo
} from "./qr-code-demo"
import { 
  QuestionnaireDemo,
  QuestionnaireDemoShell
} from "./questionnaire-demo"
import { 
  RadarChartDemo,
  RadarChartDemoDefaultGrid,
  RadarChartDemoDots,
  RadarChartDemoLines,
  RadarChartDemoMultiple,
  RadarChartDemoLegend,
  RadarChartDemoCircle,
  RadarChartDemoFilled,
  RadarChartDemoIcons
} from "./radar-chart-demo"
import { 
  RadialChartDemo,
  RadialChartDemoRings,
  RadialChartDemoLabel,
  RadialChartDemoGrid,
  RadialChartDemoText,
  RadialChartDemoShape,
  RadialChartDemoStacked
} from "./radial-chart-demo"
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
  RatingDemo
} from "./rating-demo"
import { 
  RelativeTimeCardDemo
} from "./relative-time-card-demo"
import { 
  ResizableDemo,
  ResizableDemoVertical
} from "./resizable-demo"
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
  ScrollSpyDemo
} from "./scroll-spy-demo"
import { 
  ScrollerDemo
} from "./scroller-demo"
import { 
  SearchDemo
} from "./search-demo"
import { 
  SectionDemo
} from "./section-demo"
import { 
  SegmentedInputDemo,
  SegmentedInputDemoFormInput,
  SegmentedInputDemoRgbColor,
  SegmentedInputDemoVertical,
  SegmentedInputDemoSizes,
  SegmentedInputDemoInvalid
} from "./segmented-input-demo"
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
  SelectionToolbarDemo,
  SelectionToolbarDemoSelectionInfo,
  SelectionToolbarDemoScopedContainer
} from "./selection-toolbar-demo"
import { 
  SeparatorDemo
} from "./separator-demo"
import { 
  ShapeDemo,
  ShapeDemoMask
} from "./shape-demo"
import { 
  SheetDemo
} from "./sheet-demo"
import { 
  SideSheetDemo
} from "./side-sheet-demo"
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
  SnackbarDemo
} from "./snackbar-demo"
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
  SpeedDialDemo
} from "./speed-dial-demo"
import { 
  SpinnerDemo
} from "./spinner-demo"
import { 
  SplitButtonDemo
} from "./split-button-demo"
import { 
  StackDemo
} from "./stack-demo"
import { 
  StatDemo,
  StatDemoIndicatorVariants,
  StatDemoTrends,
  StatDemoWithDescription
} from "./stat-demo"
import { 
  StatusDemo
} from "./status-demo"
import { 
  StatusDotDemo,
  StatusDotDemoWithRing,
  StatusDotDemoCustomLabel
} from "./status-dot-demo"
import { 
  StepperDemo
} from "./stepper-demo"
import { 
  SwapDemo
} from "./swap-demo"
import { 
  SwitchDemo,
  SwitchDemoChecked,
  SwitchDemoUnchecked,
  SwitchDemoDisabled,
  SwitchDemoWithDescription,
  SwitchGroupDemo
} from "./switch-demo"
import { 
  TableDemo
} from "./table-demo"
import { 
  TabsDemo
} from "./tabs-demo"
import { 
  TagsInputDemo
} from "./tags-input-demo"
import { 
  TextareaDemo
} from "./textarea-demo"
import { 
  TimePickerDemo
} from "./time-picker-demo"
import { 
  TimelineDemo
} from "./timeline-demo"
import { 
  ToggleDemo,
  ToggleIconsDemo
} from "./toggle-demo"
import { 
  ToggleGroupDemo
} from "./toggle-group-demo"
import { 
  ToastDemo
} from "./toast-demo"
import { 
  ToolbarDemo
} from "./toolbar-demo"
import { 
  TooltipDemo
} from "./tooltip-demo"
import { 
  TourDemo
} from "./tour-demo"
import { 
  VisuallyHiddenDemo
} from "./visually-hidden-demo"
import { 
  VisuallyHiddenInputDemo
} from "./visually-hidden-input-demo"

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
  "angle-slider-demo": {
    component: AngleSliderDemo,
  },
  "angle-slider-demo-controlled": {
    component: AngleSliderDemoControlled,
  },
  "angle-slider-demo-range-selection": {
    component: AngleSliderDemoRangeSelection,
  },
  "angle-slider-demo-themes": {
    component: AngleSliderDemoThemes,
  },
  "angle-slider-demo-with-form": {
    component: AngleSliderDemoWithForm,
  },
  "area-chart-demo": {
    component: AreaChartDemo,
  },
  "area-chart-demo-natural": {
    component: AreaChartDemoNatural,
  },
  "area-chart-demo-linear": {
    component: AreaChartDemoLinear,
  },
  "area-chart-demo-step": {
    component: AreaChartDemoStep,
  },
  "area-chart-demo-stacked": {
    component: AreaChartDemoStacked,
  },
  "area-chart-demo-expanded": {
    component: AreaChartDemoExpanded,
  },
  "area-chart-demo-legend": {
    component: AreaChartDemoLegend,
  },
  "area-chart-demo-icons": {
    component: AreaChartDemoIcons,
  },
  "area-chart-demo-gradient": {
    component: AreaChartDemoGradient,
  },
  "area-chart-demo-axes": {
    component: AreaChartDemoAxes,
  },
  "area-chart-demo-interactive": {
    component: AreaChartDemoInteractive,
  },
  "aspect-ratio-demo": {
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
  "avatar-demo-with-status": {
    component: AvatarDemoWithStatus,
  },
  "avatar-demo-different-shapes": {
    component: AvatarDemoDifferentShapes,
  },
  "avatar-demo-custom-fallback-styles": {
    component: AvatarDemoCustomFallbackStyles,
  },
  "avatar-group-demo": {
    component: AvatarGroupDemo,
  },
  "avatar-group-demo-with-truncation": {
    component: AvatarGroupDemoWithTruncation,
  },
  "avatar-group-demo-vertical": {
    component: AvatarGroupDemoVertical,
  },
  "avatar-group-demo-rtl": {
    component: AvatarGroupDemoRtl,
  },
  "avatar-group-demo-custom-overflow": {
    component: AvatarGroupDemoCustomOverflow,
  },
  "avatar-group-demo-reverse": {
    component: AvatarGroupDemoReverse,
  },
  "avatar-group-demo-square": {
    component: AvatarGroupDemoSquare,
  },
  "avatar-group-demo-with-icons": {
    component: AvatarGroupDemoWithIcons,
  },
  "badge-demo": {
    component: BadgeDemo,
  },
  "badge-demo-variants": {
    component: BadgeDemoVariants,
  },
  "badge-demo-status": {
    component: BadgeDemoStatus,
  },
  "badge-overflow-demo": {
    component: BadgeOverflowDemo,
  },
  "badge-overflow-demo-with-objects": {
    component: BadgeOverflowDemoWithObjects,
  },
  "badge-overflow-demo-multi-line": {
    component: BadgeOverflowDemoMultiLine,
  },
  "badge-overflow-demo-custom-overflow": {
    component: BadgeOverflowDemoCustomOverflow,
  },
  "badge-overflow-demo-interactive-tags": {
    component: BadgeOverflowDemoInteractiveTags,
  },
  "banner-demo": {
    component: BannerDemo,
  },
  "banner-demo-mobile": {
    component: BannerDemoMobile,
  },
  "banner-demo-dismiss-states": {
    component: BannerDemoDismissStates,
  },
  "banner-demo-tones": {
    component: BannerDemoTones,
  },
  "banner-demo-rich-message": {
    component: BannerDemoRichMessage,
  },
  "bar-chart-demo": {
    component: BarChartDemo,
  },
  "bar-chart-demo-vertical": {
    component: BarChartDemoVertical,
  },
  "bar-chart-demo-horizontal": {
    component: BarChartDemoHorizontal,
  },
  "bar-chart-demo-multiple": {
    component: BarChartDemoMultiple,
  },
  "bar-chart-demo-stacked": {
    component: BarChartDemoStacked,
  },
  "bar-chart-demo-label": {
    component: BarChartDemoLabel,
  },
  "bar-chart-demo-custom-label": {
    component: BarChartDemoCustomLabel,
  },
  "bar-chart-demo-mixed": {
    component: BarChartDemoMixed,
  },
  "bar-chart-demo-active": {
    component: BarChartDemoActive,
  },
  "bar-chart-demo-negative": {
    component: BarChartDemoNegative,
  },
  "breadcrumb-demo": {
    component: BreadcrumbDemo,
  },
  "breadcrumb-demo-custom-separator": {
    component: BreadcrumbDemoCustomSeparator,
  },
  "breadcrumb-demo-collapsed": {
    component: BreadcrumbDemoCollapsed,
  },
  "breadcrumb-demo-mobile": {
    component: BreadcrumbDemoMobile,
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
  "chart-demo": {
    component: ChartDemo,
  },
  "chart-tooltips-demo": {
    component: ChartTooltipsDemo,
  },
  "chart-tooltips-demo-dot": {
    component: ChartTooltipsDemoDot,
  },
  "chart-tooltips-demo-line": {
    component: ChartTooltipsDemoLine,
  },
  "chart-tooltips-demo-dashed": {
    component: ChartTooltipsDemoDashed,
  },
  "chart-tooltips-demo-no-indicator": {
    component: ChartTooltipsDemoNoIndicator,
  },
  "chart-tooltips-demo-label": {
    component: ChartTooltipsDemoLabel,
  },
  "chart-tooltips-demo-icons": {
    component: ChartTooltipsDemoIcons,
  },
  "chart-tooltips-demo-formatter": {
    component: ChartTooltipsDemoFormatter,
  },
  "chart-tooltips-demo-multiple": {
    component: ChartTooltipsDemoMultiple,
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
  "chip-demo": {
    component: ChipDemo,
  },
  "chip-demo-filter": {
    component: ChipDemoFilter,
  },
  "chip-demo-input": {
    component: ChipDemoInput,
  },
  "circular-progress-demo": {
    component: CircularProgressDemo,
  },
  "client-only-demo": {
    component: ClientOnlyDemo,
  },
  "collapsible-demo": {
    component: CollapsibleDemo,
  },
  "color-picker-demo": {
    component: ColorPickerDemo,
  },
  "color-swatch-demo": {
    component: ColorSwatchDemo,
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
  "compare-slider-demo": {
    component: CompareSliderDemo,
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
  "cropper-demo": {
    component: CropperDemo,
  },
  "date-picker-demo": {
    component: DatePickerDemo,
  },
  "dialog-demo": {
    component: DialogDemo,
  },
  "dialog-demo-custom-content": {
    component: DialogDemoCustomContent,
  },
  "direction-demo": {
    component: DirectionDemo,
  },
  "direction-demo-rtl": {
    component: DirectionDemoRtl,
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
  "editable-demo": {
    component: EditableDemo,
  },
  "editable-demo-with-trigger": {
    component: EditableDemoWithTrigger,
  },
  "editable-demo-double-click": {
    component: EditableDemoDoubleClick,
  },
  "editable-demo-autosize": {
    component: EditableDemoAutosize,
  },
  "editable-demo-todo-list": {
    component: EditableDemoTodoList,
  },
  "editable-demo-with-form": {
    component: EditableDemoWithForm,
  },
  "empty-demo": {
    component: EmptyDemo,
  },
  "empty-demo-with-actions": {
    component: EmptyDemoWithActions,
  },
  "expressive-carousel-demo": {
    component: ExpressiveCarouselDemo,
  },
  "fab-demo": {
    component: FabDemo,
  },
  "fab-demo-extended": {
    component: FabDemoExtended,
  },
  "fab-menu-demo": {
    component: FabMenuDemo,
  },
  "field-demo": {
    component: FieldDemo,
  },
  "file-upload-demo": {
    component: FileUploadDemo,
  },
  "file-upload-demo-with-validation": {
    component: FileUploadDemoWithValidation,
  },
  "file-upload-demo-direct-upload": {
    component: FileUploadDemoDirectUpload,
  },
  "file-upload-demo-circular-progress": {
    component: FileUploadDemoCircularProgress,
  },
  "file-upload-demo-fill-progress": {
    component: FileUploadDemoFillProgress,
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
  "fps-demo": {
    component: FpsDemo,
  },
  "gauge-demo": {
    component: GaugeDemo,
  },
  "grid-demo": {
    component: GridDemo,
  },
  "hitbox-demo": {
    component: HitboxDemo,
  },
  "hover-card-demo": {
    component: HoverCardDemo,
  },
  "icon-demo": {
    component: IconDemo,
  },
  "input-demo": {
    component: InputDemo,
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
  "input-otp-demo": {
    component: InputOTPDemo,
  },
  "item-demo": {
    component: ItemDemo,
  },
  "kanban-demo": {
    component: KanbanDemo,
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
  "key-value-demo": {
    component: KeyValueDemo,
  },
  "label-demo": {
    component: LabelDemo,
  },
  "line-chart-demo": {
    component: LineChartDemo,
  },
  "line-chart-demo-natural": {
    component: LineChartDemoNatural,
  },
  "line-chart-demo-linear": {
    component: LineChartDemoLinear,
  },
  "line-chart-demo-step": {
    component: LineChartDemoStep,
  },
  "line-chart-demo-multiple": {
    component: LineChartDemoMultiple,
  },
  "line-chart-demo-dots": {
    component: LineChartDemoDots,
  },
  "line-chart-demo-custom-dots": {
    component: LineChartDemoCustomDots,
  },
  "line-chart-demo-label": {
    component: LineChartDemoLabel,
  },
  "line-chart-demo-interactive": {
    component: LineChartDemoInteractive,
  },
  "listbox-demo": {
    component: ListboxDemo,
  },
  "loading-indicator-demo": {
    component: LoadingIndicatorDemo,
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
  "marquee-demo": {
    component: MarqueeDemo,
  },
  "mask-input-demo": {
    component: MaskInputDemo,
  },
  "mask-input-demo-built-in-patterns": {
    component: MaskInputDemoBuiltInPatterns,
  },
  "mask-input-demo-custom-pattern": {
    component: MaskInputDemoCustomPattern,
  },
  "mask-input-demo-validation-modes": {
    component: MaskInputDemoValidationModes,
  },
  "mask-input-demo-card-information": {
    component: MaskInputDemoCardInformation,
  },
  "masonry-demo": {
    component: MasonryDemo,
  },
  "media-player-demo": {
    component: MediaPlayerDemo,
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
  "native-select-demo": {
    component: NativeSelectDemo,
  },
  "navigation-bar-demo": {
    component: NavigationBarDemo,
  },
  "navigation-menu-demo": {
    component: NavigationMenuDemoDefault,
  },
  "navigation-menu-demo-navigation-menu-demo": {
    component: NavigationMenuDemo,
  },
  "navigation-rail-demo": {
    component: NavigationRailDemo,
  },
  "navigation-rail-demo-expanded": {
    component: NavigationRailDemoExpanded,
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
  "pending-demo": {
    component: PendingDemo,
  },
  "phone-input-demo": {
    component: PhoneInputDemo,
  },
  "pie-chart-demo": {
    component: PieChartDemo,
  },
  "pie-chart-demo-pie": {
    component: PieChartDemoPie,
  },
  "pie-chart-demo-joined": {
    component: PieChartDemoJoined,
  },
  "pie-chart-demo-label": {
    component: PieChartDemoLabel,
  },
  "pie-chart-demo-legend": {
    component: PieChartDemoLegend,
  },
  "pie-chart-demo-donut": {
    component: PieChartDemoDonut,
  },
  "pie-chart-demo-active": {
    component: PieChartDemoActive,
  },
  "pie-chart-demo-text": {
    component: PieChartDemoText,
  },
  "pie-chart-demo-stacked": {
    component: PieChartDemoStacked,
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
  "portal-demo": {
    component: PortalDemo,
  },
  "presence-demo": {
    component: PresenceDemo,
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
  "qr-code-demo": {
    component: QrCodeDemo,
  },
  "questionnaire-demo": {
    component: QuestionnaireDemo,
  },
  "questionnaire-demo-shell": {
    component: QuestionnaireDemoShell,
  },
  "radar-chart-demo": {
    component: RadarChartDemo,
  },
  "radar-chart-demo-default-grid": {
    component: RadarChartDemoDefaultGrid,
  },
  "radar-chart-demo-dots": {
    component: RadarChartDemoDots,
  },
  "radar-chart-demo-lines": {
    component: RadarChartDemoLines,
  },
  "radar-chart-demo-multiple": {
    component: RadarChartDemoMultiple,
  },
  "radar-chart-demo-legend": {
    component: RadarChartDemoLegend,
  },
  "radar-chart-demo-circle": {
    component: RadarChartDemoCircle,
  },
  "radar-chart-demo-filled": {
    component: RadarChartDemoFilled,
  },
  "radar-chart-demo-icons": {
    component: RadarChartDemoIcons,
  },
  "radial-chart-demo": {
    component: RadialChartDemo,
  },
  "radial-chart-demo-rings": {
    component: RadialChartDemoRings,
  },
  "radial-chart-demo-label": {
    component: RadialChartDemoLabel,
  },
  "radial-chart-demo-grid": {
    component: RadialChartDemoGrid,
  },
  "radial-chart-demo-text": {
    component: RadialChartDemoText,
  },
  "radial-chart-demo-shape": {
    component: RadialChartDemoShape,
  },
  "radial-chart-demo-stacked": {
    component: RadialChartDemoStacked,
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
  "rating-demo": {
    component: RatingDemo,
  },
  "relative-time-card-demo": {
    component: RelativeTimeCardDemo,
  },
  "resizable-demo": {
    component: ResizableDemo,
  },
  "resizable-demo-vertical": {
    component: ResizableDemoVertical,
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
  "scroll-spy-demo": {
    component: ScrollSpyDemo,
  },
  "scroller-demo": {
    component: ScrollerDemo,
  },
  "search-demo": {
    component: SearchDemo,
  },
  "section-demo": {
    component: SectionDemo,
  },
  "segmented-input-demo": {
    component: SegmentedInputDemo,
  },
  "segmented-input-demo-form-input": {
    component: SegmentedInputDemoFormInput,
  },
  "segmented-input-demo-rgb-color": {
    component: SegmentedInputDemoRgbColor,
  },
  "segmented-input-demo-vertical": {
    component: SegmentedInputDemoVertical,
  },
  "segmented-input-demo-sizes": {
    component: SegmentedInputDemoSizes,
  },
  "segmented-input-demo-invalid": {
    component: SegmentedInputDemoInvalid,
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
  "selection-toolbar-demo": {
    component: SelectionToolbarDemo,
  },
  "selection-toolbar-demo-selection-info": {
    component: SelectionToolbarDemoSelectionInfo,
  },
  "selection-toolbar-demo-scoped-container": {
    component: SelectionToolbarDemoScopedContainer,
  },
  "separator-demo": {
    component: SeparatorDemo,
  },
  "shape-demo": {
    component: ShapeDemo,
  },
  "shape-demo-mask": {
    component: ShapeDemoMask,
  },
  "sheet-demo": {
    component: SheetDemo,
  },
  "side-sheet-demo": {
    component: SideSheetDemo,
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
  "snackbar-demo": {
    component: SnackbarDemo,
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
  "speed-dial-demo": {
    component: SpeedDialDemo,
  },
  "spinner-demo": {
    component: SpinnerDemo,
  },
  "split-button-demo": {
    component: SplitButtonDemo,
  },
  "stack-demo": {
    component: StackDemo,
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
  "status-demo": {
    component: StatusDemo,
  },
  "status-dot-demo": {
    component: StatusDotDemo,
  },
  "status-dot-demo-with-ring": {
    component: StatusDotDemoWithRing,
  },
  "status-dot-demo-custom-label": {
    component: StatusDotDemoCustomLabel,
  },
  "stepper-demo": {
    component: StepperDemo,
  },
  "swap-demo": {
    component: SwapDemo,
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
  "table-demo": {
    component: TableDemo,
  },
  "tabs-demo": {
    component: TabsDemo,
  },
  "tags-input-demo": {
    component: TagsInputDemo,
  },
  "textarea-demo": {
    component: TextareaDemo,
  },
  "time-picker-demo": {
    component: TimePickerDemo,
  },
  "timeline-demo": {
    component: TimelineDemo,
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
  "toast-demo": {
    component: ToastDemo,
  },
  "toolbar-demo": {
    component: ToolbarDemo,
  },
  "tooltip-demo": {
    component: TooltipDemo,
  },
  "tour-demo": {
    component: TourDemo,
  },
  "visually-hidden-demo": {
    component: VisuallyHiddenDemo,
  },
  "visually-hidden-input-demo": {
    component: VisuallyHiddenInputDemo,
  },
} as const

export type RegistryItem = {
  component: React.ComponentType<any>
}

export type RegistryName = keyof typeof Registry
