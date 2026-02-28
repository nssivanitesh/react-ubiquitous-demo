"""
Pydantic models for react-ubiquitous UI configuration.

JSON keys follow camelCase (matching the TypeScript API).
Python attribute names follow snake_case; the alias_generator handles
the mapping automatically so both names are accepted on input.
"""
from __future__ import annotations

from typing import Annotated, Any, Literal, Union

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


# ---------------------------------------------------------------------------
# Base mixin
# ---------------------------------------------------------------------------

class _CamelModel(BaseModel):
    """BaseModel with camelCase alias generation and extra fields allowed."""

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        extra="allow",
    )


# ---------------------------------------------------------------------------
# Validation rules
# ---------------------------------------------------------------------------

class ValidationRule(_CamelModel):
    """A single validation rule attached to an element."""

    rule: str
    value: Any = None
    message: str | None = None
    validator: str | None = None
    config: dict[str, Any] | None = None


# ---------------------------------------------------------------------------
# Element configs — base
# ---------------------------------------------------------------------------

class BaseElementConfig(_CamelModel):
    """Common fields shared by every element type."""

    id: str
    name: str
    type: str
    order: int | None = None
    width: str | int | None = None
    label: str | None = None
    label_position: str | None = None
    tooltip: str | None = None
    units: str | None = None
    units_position: str | None = None
    disabled: bool | None = None
    readonly: bool | None = None
    required: bool | None = None
    hidden: bool | None = None
    class_name: str | None = None
    style: dict[str, Any] | None = None
    validations: list[ValidationRule] | None = None


# ---------------------------------------------------------------------------
# Concrete element configs
# ---------------------------------------------------------------------------

class InputElementConfig(BaseElementConfig):
    """Wraps <input> with all HTML type variants."""

    type: Literal["input"] = "input"
    input_type: str = "text"
    placeholder: str | None = None
    default_value: str | float | None = None
    value: str | float | None = None
    min: float | str | None = None
    max: float | str | None = None
    step: float | None = None
    multiple: bool | None = None
    accept: str | None = None
    autocomplete: str | None = None
    datalist_id: str | None = None


class CheckboxElementConfig(BaseElementConfig):
    """Wraps <input type="checkbox">."""

    type: Literal["checkbox"] = "checkbox"
    default_checked: bool | None = None
    checked: bool | None = None
    value: str | None = None


class RadioOption(_CamelModel):
    """A single option in a radio group."""

    label: str
    value: str
    disabled: bool | None = None


class RadioElementConfig(BaseElementConfig):
    """Renders a group of <input type="radio"> controls."""

    type: Literal["radio"] = "radio"
    options: list[RadioOption] = Field(default_factory=list)
    default_value: str | None = None
    value: str | None = None
    orientation: str | None = None


class TextareaElementConfig(BaseElementConfig):
    """Wraps <textarea>."""

    type: Literal["textarea"] = "textarea"
    placeholder: str | None = None
    default_value: str | None = None
    value: str | None = None
    rows: int | None = None
    cols: int | None = None
    resize: str | None = None
    max_length: int | None = None


class SelectOption(_CamelModel):
    """A single <option> inside a <select>."""

    label: str
    value: str
    disabled: bool | None = None


class SelectOptGroup(_CamelModel):
    """An <optgroup> inside a <select>."""

    group: Literal[True] = True
    label: str
    options: list[SelectOption]


class SelectElementConfig(BaseElementConfig):
    """Wraps <select>."""

    type: Literal["select"] = "select"
    options: list[Union[SelectOptGroup, SelectOption]] = Field(default_factory=list)
    multiple: bool | None = None
    size: int | None = None
    default_value: str | list[str] | None = None
    value: str | list[str] | None = None
    placeholder: str | None = None


class ButtonElementConfig(BaseElementConfig):
    """Renders a clickable button."""

    type: Literal["button"] = "button"
    text: str | None = None
    button_type: str = "button"
    variant: str | None = None
    size: str | None = None
    icon: str | None = None
    icon_position: str | None = None


class LabelElementConfig(BaseElementConfig):
    """Renders a standalone <label> element."""

    type: Literal["label"] = "label"
    text: str | None = None
    html_for: str | None = None


class FieldsetElementConfig(BaseElementConfig):
    """Renders <fieldset> + <legend> as a named grouping container."""

    type: Literal["fieldset"] = "fieldset"
    legend: str | None = None
    children: list[UIElementConfig] = Field(default_factory=list)


class DatalistElementConfig(BaseElementConfig):
    """Renders <datalist> for autocomplete suggestions."""

    type: Literal["datalist"] = "datalist"
    options: list[Union[str, SelectOption]] = Field(default_factory=list)


class OutputElementConfig(BaseElementConfig):
    """Renders <output> — a read-only computed display field."""

    type: Literal["output"] = "output"
    value: str | float | None = None
    default_value: str | None = None
    format: str | None = None
    html_for: list[str] | None = None


class DatePickerElementConfig(BaseElementConfig):
    """Date (and optionally time) picker."""

    type: Literal["datepicker"] = "datepicker"
    value: str | None = None
    default_value: str | None = None
    placeholder: str | None = None
    min: str | None = None
    max: str | None = None
    include_time: bool | None = None


class MultiSelectElementConfig(BaseElementConfig):
    """Multi-value select with chips."""

    type: Literal["multiselect"] = "multiselect"
    options: list[SelectOption] = Field(default_factory=list)
    value: list[str] | None = None
    default_value: list[str] | None = None
    placeholder: str | None = None
    max_items: int | None = None


class AutocompleteElementConfig(BaseElementConfig):
    """Free-text input with filtered suggestion dropdown."""

    type: Literal["autocomplete"] = "autocomplete"
    options: list[SelectOption] = Field(default_factory=list)
    value: str | None = None
    default_value: str | None = None
    placeholder: str | None = None


class FileUploadElementConfig(BaseElementConfig):
    """File upload input."""

    type: Literal["fileupload"] = "fileupload"
    accept: str | None = None
    multiple: bool | None = None
    max_size: int | None = None
    placeholder: str | None = None


class ColorPickerElementConfig(BaseElementConfig):
    """Color picker input."""

    type: Literal["colorpicker"] = "colorpicker"
    value: str | None = None
    default_value: str | None = None
    format: str | None = None


class RangeSliderElementConfig(BaseElementConfig):
    """Dual-handle range slider."""

    type: Literal["rangeslider"] = "rangeslider"
    min: float | None = None
    max: float | None = None
    step: float | None = None
    value: tuple[float, float] | None = None
    default_value: tuple[float, float] | None = None


class RatingElementConfig(BaseElementConfig):
    """Star / numeric rating input."""

    type: Literal["rating"] = "rating"
    max: int | None = None
    value: float | None = None
    default_value: float | None = None
    allow_half: bool | None = None


class OtpInputElementConfig(BaseElementConfig):
    """One-time password input with individual digit boxes."""

    type: Literal["otpinput"] = "otpinput"
    length: int | None = None
    value: str | None = None
    default_value: str | None = None
    mask: bool | None = None


class PhoneInputElementConfig(BaseElementConfig):
    """International phone number input with country-code selector."""

    type: Literal["phoneinput"] = "phoneinput"
    default_country: str | None = None
    value: str | None = None
    default_value: str | None = None
    placeholder: str | None = None


class CustomElementConfig(BaseElementConfig):
    """Escape-hatch for custom / third-party elements."""

    type: Literal["custom"] = "custom"
    component: str | None = None
    props: dict[str, Any] | None = None


# ---------------------------------------------------------------------------
# UIElementConfig — discriminated union on `type`
# ---------------------------------------------------------------------------

UIElementConfig = Annotated[
    Union[
        InputElementConfig,
        CheckboxElementConfig,
        RadioElementConfig,
        TextareaElementConfig,
        SelectElementConfig,
        ButtonElementConfig,
        LabelElementConfig,
        FieldsetElementConfig,
        DatalistElementConfig,
        OutputElementConfig,
        DatePickerElementConfig,
        MultiSelectElementConfig,
        AutocompleteElementConfig,
        FileUploadElementConfig,
        ColorPickerElementConfig,
        RangeSliderElementConfig,
        RatingElementConfig,
        OtpInputElementConfig,
        PhoneInputElementConfig,
        CustomElementConfig,
    ],
    Field(discriminator="type"),
]


# ---------------------------------------------------------------------------
# Section configs — base
# ---------------------------------------------------------------------------

class BaseSectionConfig(_CamelModel):
    """Common fields shared by every section layout."""

    id: str
    layout: str
    title: str | None = None
    description: str | None = None
    order: int | None = None
    class_name: str | None = None
    style: dict[str, Any] | None = None
    elements: list[UIElementConfig] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# Concrete section configs
# ---------------------------------------------------------------------------

class FlexSectionConfig(BaseSectionConfig):
    """Renders children in a CSS flexbox."""

    layout: Literal["flex"] = "flex"
    flex_direction: str | None = None
    flex_wrap: str | None = None
    justify_content: str | None = None
    align_items: str | None = None
    align_content: str | None = None
    gap: str | None = None
    row_gap: str | None = None
    column_gap: str | None = None


class GridSectionConfig(BaseSectionConfig):
    """Renders children in a CSS grid."""

    layout: Literal["grid"] = "grid"
    grid_template_columns: str | None = None
    grid_template_rows: str | None = None
    gap: str | None = None
    row_gap: str | None = None
    column_gap: str | None = None
    align_items: str | None = None
    justify_items: str | None = None


class HeroSectionConfig(BaseSectionConfig):
    """A full-width banner with background, title, and optional CTA link."""

    layout: Literal["hero"] = "hero"
    subtitle: str | None = None
    background_type: str | None = None
    gradient_from: str | None = None
    gradient_to: str | None = None
    gradient_direction: str | None = None
    background_color: str | None = None
    background_image: str | None = None
    overlay: bool | None = None
    overlay_opacity: int | None = None
    min_height: str | None = None
    text_align: str | None = None
    vertical_align: str | None = None
    link_text: str | None = None
    link_url: str | None = None
    link_relative: bool | None = None


class MediaItem(_CamelModel):
    """A single image or video item in a media carousel."""

    id: str
    type: Literal["image", "video"]
    url: str
    alt: str | None = None
    caption: str | None = None


class MediaSectionConfig(BaseSectionConfig):
    """An accessible image/video carousel."""

    layout: Literal["media"] = "media"
    aspect_ratio: str | None = None
    show_arrows: bool | None = None
    show_dots: bool | None = None
    items: list[MediaItem] = Field(default_factory=list)


class ListEndpoint(_CamelModel):
    """Pagination endpoint config for the list pane."""

    url: str
    from_param: str | None = None
    from_value: int | None = None
    to_param: str | None = None
    to_value: int | None = None
    sort_param: str | None = None
    sort_value: str | None = None


class FilterEndpoint(_CamelModel):
    """Search/filter endpoint config for the list pane."""

    url: str
    query_param: str | None = None


class DetailEndpoint(_CamelModel):
    """Detail-fetch endpoint config for the detail pane."""

    url: str
    selected_param: str | None = None


class ListItem(_CamelModel):
    """A row item displayed in the list pane."""

    id: str
    label: str
    sublabel: str | None = None
    badge: str | None = None


class AccordionPanel(_CamelModel):
    """A single expand/collapse panel inside an accordion section."""

    id: str
    label: str
    description: str | None = None
    default_open: bool | None = None
    sections: list[UISectionConfig] = Field(default_factory=list)
    elements: list[UIElementConfig] = Field(default_factory=list)


class AccordionSectionConfig(BaseSectionConfig):
    """Expand/collapse panels; only one open at a time by default."""

    layout: Literal["accordion"] = "accordion"
    allow_multiple: bool | None = None
    panels: list[AccordionPanel] = Field(default_factory=list)


class CollapseSectionConfig(BaseSectionConfig):
    """A single expand/collapse toggle for one content region."""

    layout: Literal["collapse"] = "collapse"
    label: str | None = None
    default_open: bool | None = None
    icon: bool | None = None


class DividerSectionConfig(BaseSectionConfig):
    """A visual separator with an optional centered label."""

    layout: Literal["divider"] = "divider"
    label: str | None = None
    orientation: str | None = None
    variant: str | None = None


class CardSectionConfig(BaseSectionConfig):
    """A bordered content container with optional header and footer slots."""

    layout: Literal["card"] = "card"
    bordered: bool | None = None
    shadow: str | bool | None = None
    padded: bool | None = None
    footer_elements: list[UIElementConfig] = Field(default_factory=list)


class ListDetailSectionConfig(BaseSectionConfig):
    """Master-list / detail-panel layout."""

    layout: Literal["list-detail"] = "list-detail"
    list_title: str | None = None
    list_width: str | None = None
    page_size: int | None = None
    list_items: list[ListItem] = Field(default_factory=list)
    list_endpoint: ListEndpoint | None = None
    filter_endpoint: FilterEndpoint | None = None
    detail_endpoint: DetailEndpoint | None = None
    detail_pages: list[UIPageConfig] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# Tree-View section
# ---------------------------------------------------------------------------

class TreeViewNode(_CamelModel):
    """A node in the tree-view hierarchy."""

    id: str
    label: str
    sublabel: str | None = None
    badge: str | None = None
    children: list[TreeViewNode] = Field(default_factory=list)


class TreeViewSectionConfig(BaseSectionConfig):
    """Expandable tree pane with a detail panel for the selected node."""

    layout: Literal["tree-view"] = "tree-view"
    tree_title: str | None = None
    tree_width: str | None = None
    tree_mode: str | None = None
    tree_nodes: list[TreeViewNode] = Field(default_factory=list)
    detail_endpoint: DetailEndpoint | None = None
    detail_pages: list[UIPageConfig] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# Chat section
# ---------------------------------------------------------------------------

class ChatMessage(_CamelModel):
    """A single message in a chat conversation."""

    id: str
    text: str
    sender: str
    role: str
    timestamp: str | None = None
    avatar: str | None = None


class ChatConversation(_CamelModel):
    """A conversation entry in the chat list pane."""

    id: str
    label: str
    sublabel: str | None = None
    avatar: str | None = None
    badge: str | None = None
    messages: list[ChatMessage] = Field(default_factory=list)


class ChatSectionConfig(BaseSectionConfig):
    """Two-pane messaging UI — conversation list + message thread."""

    layout: Literal["chat"] = "chat"
    conversations: list[ChatConversation] = Field(default_factory=list)
    list_title: str | None = None
    list_width: str | None = None
    input_placeholder: str | None = None
    send_button_text: str | None = None
    current_user_name: str | None = None


# ---------------------------------------------------------------------------
# Navbar section
# ---------------------------------------------------------------------------

class NavLink(_CamelModel):
    """A single navigation link in a navbar."""

    id: str
    label: str
    href: str | None = None
    active: bool | None = None


class NavbarSectionConfig(BaseSectionConfig):
    """Top app bar with logo and navigation links."""

    layout: Literal["navbar"] = "navbar"
    logo_text: str | None = None
    logo_url: str | None = None
    links: list[NavLink] = Field(default_factory=list)
    position: str | None = None
    theme: str | None = None


# ---------------------------------------------------------------------------
# Sidebar section
# ---------------------------------------------------------------------------

class SidebarItem(_CamelModel):
    """A navigation item (possibly nested) in a sidebar."""

    id: str
    label: str
    href: str | None = None
    icon: str | None = None
    active: bool | None = None
    children: list[SidebarItem] = Field(default_factory=list)


class SidebarSectionConfig(BaseSectionConfig):
    """Collapsible side-navigation panel."""

    layout: Literal["sidebar"] = "sidebar"
    items: list[SidebarItem] = Field(default_factory=list)
    default_collapsed: bool | None = None
    collapsible: bool | None = None
    width: str | None = None


# ---------------------------------------------------------------------------
# Breadcrumbs section
# ---------------------------------------------------------------------------

class BreadcrumbItem(_CamelModel):
    """A single crumb in the breadcrumbs trail."""

    id: str
    label: str
    href: str | None = None


class BreadcrumbsSectionConfig(BaseSectionConfig):
    """Hierarchical location trail."""

    layout: Literal["breadcrumbs"] = "breadcrumbs"
    items: list[BreadcrumbItem] = Field(default_factory=list)
    separator: str | None = None


# ---------------------------------------------------------------------------
# Pagination section
# ---------------------------------------------------------------------------

class PaginationSectionConfig(BaseSectionConfig):
    """Page-number controls for navigating long lists."""

    layout: Literal["pagination"] = "pagination"
    total_items: int
    page_size: int | None = None
    current_page: int | None = None
    show_first_last: bool | None = None
    show_prev_next: bool | None = None
    max_page_buttons: int | None = None


# ---------------------------------------------------------------------------
# Stepper section
# ---------------------------------------------------------------------------

class StepperStep(_CamelModel):
    """A single step in a multi-step stepper."""

    id: str
    label: str
    description: str | None = None
    status: str | None = None


class StepperSectionConfig(BaseSectionConfig):
    """Multi-step wizard progress indicator."""

    layout: Literal["stepper"] = "stepper"
    steps: list[StepperStep] = Field(default_factory=list)
    current_step: int | None = None
    orientation: str | None = None


# ---------------------------------------------------------------------------
# Tabs section
# ---------------------------------------------------------------------------

class TabItem(_CamelModel):
    """A single tab with its content."""

    id: str
    label: str
    sections: list[UISectionConfig] = Field(default_factory=list)
    elements: list[UIElementConfig] = Field(default_factory=list)


class TabsSectionConfig(BaseSectionConfig):
    """General-purpose tabbed content container."""

    layout: Literal["tabs"] = "tabs"
    tabs: list[TabItem] = Field(default_factory=list)
    default_tab_id: str | None = None


# ---------------------------------------------------------------------------
# Alert section
# ---------------------------------------------------------------------------

class AlertSectionConfig(BaseSectionConfig):
    """Inline contextual message (error, warning, info, or success)."""

    layout: Literal["alert"] = "alert"
    severity: str | None = None
    dismissible: bool | None = None
    icon: bool | None = None


# ---------------------------------------------------------------------------
# Progress section
# ---------------------------------------------------------------------------

class ProgressSectionConfig(BaseSectionConfig):
    """Linear or circular loading / progress indicator."""

    layout: Literal["progress"] = "progress"
    variant: str | None = None
    value: float | None = None
    show_label: bool | None = None
    size: str | None = None
    color: str | None = None
    indeterminate: bool | None = None


# ---------------------------------------------------------------------------
# Skeleton section
# ---------------------------------------------------------------------------

class SkeletonSectionConfig(BaseSectionConfig):
    """Animated loading placeholder."""

    layout: Literal["skeleton"] = "skeleton"
    shape: str | None = None
    lines: int | None = None
    avatar: bool | None = None
    width: str | None = None
    height: str | None = None


# ---------------------------------------------------------------------------
# Toast section
# ---------------------------------------------------------------------------

class ToastSectionConfig(BaseSectionConfig):
    """Ephemeral notification that auto-dismisses after a delay."""

    layout: Literal["toast"] = "toast"
    message: str | None = None
    severity: str | None = None
    duration: int | None = None
    position: str | None = None
    visible: bool | None = None


# ---------------------------------------------------------------------------
# Modal section
# ---------------------------------------------------------------------------

class ModalSectionConfig(BaseSectionConfig):
    """Blocking overlay dialog with optional action buttons."""

    layout: Literal["modal"] = "modal"
    open: bool | None = None
    size: str | None = None
    close_on_backdrop: bool | None = None
    show_close_button: bool | None = None
    confirm_label: str | None = None
    cancel_label: str | None = None


# ---------------------------------------------------------------------------
# Drawer section
# ---------------------------------------------------------------------------

class DrawerSectionConfig(BaseSectionConfig):
    """Panel that slides in from any edge of the viewport."""

    layout: Literal["drawer"] = "drawer"
    open: bool | None = None
    placement: str | None = None
    size: str | None = None
    close_on_backdrop: bool | None = None
    show_close_button: bool | None = None


# ---------------------------------------------------------------------------
# Tooltip section
# ---------------------------------------------------------------------------

class TooltipSectionConfig(BaseSectionConfig):
    """Hover-triggered floating label attached to a trigger element."""

    layout: Literal["tooltip"] = "tooltip"
    content: str | None = None
    placement: str | None = None
    trigger_label: str | None = None


# ---------------------------------------------------------------------------
# Popover section
# ---------------------------------------------------------------------------

class PopoverSectionConfig(BaseSectionConfig):
    """Click-triggered floating panel with richer content than a tooltip."""

    layout: Literal["popover"] = "popover"
    placement: str | None = None
    trigger_label: str | None = None
    content: str | None = None


# ---------------------------------------------------------------------------
# Table section
# ---------------------------------------------------------------------------

class TableColumn(_CamelModel):
    """A column definition in a table section."""

    key: str
    label: str
    sortable: bool | None = None
    width: str | None = None


class TableSectionConfig(BaseSectionConfig):
    """Data table with optional search, sorting, and pagination."""

    layout: Literal["table"] = "table"
    columns: list[TableColumn] = Field(default_factory=list)
    rows: list[dict[str, Any]] = Field(default_factory=list)
    searchable: bool | None = None
    page_size: int | None = None
    empty_message: str | None = None


# ---------------------------------------------------------------------------
# Badge section
# ---------------------------------------------------------------------------

class BadgeItem(_CamelModel):
    """A single badge / tag / chip item."""

    id: str
    label: str
    variant: str | None = None


class BadgeSectionConfig(BaseSectionConfig):
    """A collection of badge / tag / chip items."""

    layout: Literal["badge"] = "badge"
    badges: list[BadgeItem] = Field(default_factory=list)
    appearance: str | None = None
    size: str | None = None


# ---------------------------------------------------------------------------
# Avatar section
# ---------------------------------------------------------------------------

class AvatarItem(_CamelModel):
    """A single avatar image."""

    id: str
    initials: str | None = None
    src: str | None = None
    alt: str | None = None
    name: str | None = None


class AvatarSectionConfig(BaseSectionConfig):
    """One or more avatar images with optional stacking."""

    layout: Literal["avatar"] = "avatar"
    avatars: list[AvatarItem] = Field(default_factory=list)
    size: str | None = None
    stacked: bool | None = None


# ---------------------------------------------------------------------------
# Timeline section
# ---------------------------------------------------------------------------

class TimelineEvent(_CamelModel):
    """A single event in a timeline."""

    id: str
    title: str
    description: str | None = None
    timestamp: str | None = None
    variant: str | None = None
    icon: str | None = None


class TimelineSectionConfig(BaseSectionConfig):
    """Vertical list of time-ordered events."""

    layout: Literal["timeline"] = "timeline"
    events: list[TimelineEvent] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# Stat section
# ---------------------------------------------------------------------------

class StatItem(_CamelModel):
    """A single metric / KPI card."""

    id: str
    value: str
    label: str
    sub_label: str | None = None
    trend: str | None = None
    trend_direction: str | None = None
    icon: str | None = None


class StatSectionConfig(BaseSectionConfig):
    """Grid of metric / KPI cards."""

    layout: Literal["stat"] = "stat"
    stats: list[StatItem] = Field(default_factory=list)
    columns: int | None = None


# ---------------------------------------------------------------------------
# Empty-state section
# ---------------------------------------------------------------------------

class EmptyStateSectionConfig(BaseSectionConfig):
    """Placeholder shown when a list or data set has no content."""

    layout: Literal["empty-state"] = "empty-state"
    heading: str | None = None
    message: str | None = None
    icon: str | None = None
    action_label: str | None = None
    action_href: str | None = None


# ---------------------------------------------------------------------------
# Code-block section
# ---------------------------------------------------------------------------

class CodeBlockSectionConfig(BaseSectionConfig):
    """Syntax-highlighted, copyable code snippet."""

    layout: Literal["code-block"] = "code-block"
    code: str
    language: str | None = None
    line_numbers: bool | None = None
    copyable: bool | None = None


# ---------------------------------------------------------------------------
# Chart section
# ---------------------------------------------------------------------------

class ChartSeries(_CamelModel):
    """A named series configuration for a chart."""

    key: str
    label: str | None = None
    color: str | None = None


class ChartSectionConfig(BaseSectionConfig):
    """Data visualisation chart (line, bar, pie, etc.)."""

    layout: Literal["chart"] = "chart"
    chart_type: str
    data: list[dict[str, Any]] = Field(default_factory=list)
    series: list[ChartSeries] = Field(default_factory=list)
    show_grid: bool | None = None
    show_legend: bool | None = None
    show_labels: bool | None = None
    height: int | None = None


# ---------------------------------------------------------------------------
# Iframe section
# ---------------------------------------------------------------------------

class IframeSectionConfig(BaseSectionConfig):
    """Embeds an external URL inside an <iframe>."""

    layout: Literal["iframe"] = "iframe"
    src: str
    query_params: dict[str, Any] | None = None
    frame_width: str | None = None
    frame_height: str | None = None
    sandbox: str | None = None
    frame_title: str | None = None
    allow_fullscreen: bool | None = None
    show_loader: bool | None = None


# ---------------------------------------------------------------------------
# UISectionConfig — discriminated union on `layout`
# ---------------------------------------------------------------------------

UISectionConfig = Annotated[
    Union[
        FlexSectionConfig,
        GridSectionConfig,
        HeroSectionConfig,
        MediaSectionConfig,
        ListDetailSectionConfig,
        TreeViewSectionConfig,
        ChatSectionConfig,
        NavbarSectionConfig,
        SidebarSectionConfig,
        BreadcrumbsSectionConfig,
        PaginationSectionConfig,
        StepperSectionConfig,
        TabsSectionConfig,
        AlertSectionConfig,
        ProgressSectionConfig,
        SkeletonSectionConfig,
        ToastSectionConfig,
        ModalSectionConfig,
        DrawerSectionConfig,
        TooltipSectionConfig,
        PopoverSectionConfig,
        TableSectionConfig,
        BadgeSectionConfig,
        AvatarSectionConfig,
        TimelineSectionConfig,
        StatSectionConfig,
        EmptyStateSectionConfig,
        CodeBlockSectionConfig,
        ChartSectionConfig,
        IframeSectionConfig,
        AccordionSectionConfig,
        CollapseSectionConfig,
        DividerSectionConfig,
        CardSectionConfig,
    ],
    Field(discriminator="layout"),
]


# ---------------------------------------------------------------------------
# Page and Stage configs
# ---------------------------------------------------------------------------

class UIPageConfig(_CamelModel):
    """A single page/tab within a stage."""

    id: str
    title: str
    description: str | None = None
    icon: str | None = None
    order: int
    sections: list[UISectionConfig] = Field(default_factory=list)
    class_name: str | None = None
    visible: bool | None = None


class UIStageConfig(_CamelModel):
    """Top-level stage that contains one or more pages/tabs."""

    id: str
    title: str | None = None
    description: str | None = None
    default_page_id: str | None = None
    pages: list[UIPageConfig]
    theme: str | None = None
    class_name: str | None = None
    page_transition: str | None = None


# ---------------------------------------------------------------------------
# Rebuild models that contain forward references
# ---------------------------------------------------------------------------

FieldsetElementConfig.model_rebuild()
MultiSelectElementConfig.model_rebuild()
AutocompleteElementConfig.model_rebuild()
DatePickerElementConfig.model_rebuild()
FileUploadElementConfig.model_rebuild()
ColorPickerElementConfig.model_rebuild()
RangeSliderElementConfig.model_rebuild()
RatingElementConfig.model_rebuild()
OtpInputElementConfig.model_rebuild()
PhoneInputElementConfig.model_rebuild()
CustomElementConfig.model_rebuild()
AccordionPanel.model_rebuild()
AccordionSectionConfig.model_rebuild()
TreeViewNode.model_rebuild()
TreeViewSectionConfig.model_rebuild()
ChatConversation.model_rebuild()
ChatSectionConfig.model_rebuild()
NavbarSectionConfig.model_rebuild()
SidebarItem.model_rebuild()
SidebarSectionConfig.model_rebuild()
BreadcrumbsSectionConfig.model_rebuild()
PaginationSectionConfig.model_rebuild()
StepperSectionConfig.model_rebuild()
TabItem.model_rebuild()
TabsSectionConfig.model_rebuild()
AlertSectionConfig.model_rebuild()
ProgressSectionConfig.model_rebuild()
SkeletonSectionConfig.model_rebuild()
ToastSectionConfig.model_rebuild()
ModalSectionConfig.model_rebuild()
DrawerSectionConfig.model_rebuild()
TooltipSectionConfig.model_rebuild()
PopoverSectionConfig.model_rebuild()
TableSectionConfig.model_rebuild()
BadgeSectionConfig.model_rebuild()
AvatarSectionConfig.model_rebuild()
TimelineSectionConfig.model_rebuild()
StatSectionConfig.model_rebuild()
EmptyStateSectionConfig.model_rebuild()
CodeBlockSectionConfig.model_rebuild()
ChartSectionConfig.model_rebuild()
IframeSectionConfig.model_rebuild()
ListDetailSectionConfig.model_rebuild()
CardSectionConfig.model_rebuild()
CollapseSectionConfig.model_rebuild()
DividerSectionConfig.model_rebuild()
FlexSectionConfig.model_rebuild()
GridSectionConfig.model_rebuild()
HeroSectionConfig.model_rebuild()
MediaSectionConfig.model_rebuild()
UIPageConfig.model_rebuild()
UIStageConfig.model_rebuild()
