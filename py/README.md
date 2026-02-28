# react-ubiquitous-put

> **Typed Pydantic models and fluent builders for [@nssivanitesh/react-ubiquitous](https://github.com/nssivanitesh/react-ubiquitous) UI configuration.**

[![PyPI version](https://img.shields.io/pypi/v/react-ubiquitous-put)](https://pypi.org/project/react-ubiquitous-put/)
[![Python](https://img.shields.io/pypi/pyversions/react-ubiquitous-put)](https://pypi.org/project/react-ubiquitous-put/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

`react-ubiquitous-put` lets you build `react-ubiquitous` UI configurations entirely in Python. It provides:

- **Validated models** — Pydantic v2 models for every element, section, page, and stage type.
- **CamelCase interop** — Python attributes use `snake_case`; JSON keys automatically use `camelCase` to match the TypeScript API.
- **Fluent builders** — immutable builder classes that make it easy to construct nested configs without mutation bugs.

---

## Installation

```bash
pip install react-ubiquitous-put
```

**Requirements:** Python ≥ 3.10, Pydantic ≥ 2.0

---

## Quick Start

```python
from react_ubiquitous_put import (
    ElementBuilder,
    SectionBuilder,
    PageBuilder,
    StageBuilder,
    InputElementConfig,
    GridSectionConfig,
)

# 1. Build an input element
email_field = (
    ElementBuilder(InputElementConfig)
    .with_id("email")
    .with_name("email")
    .with_field(input_type="email")
    .with_label("Email Address")
    .with_order(1)
    .with_required(True)
    .add_validation("required")
    .add_validation("email", message="Enter a valid email address.")
    .build()
)

# 2. Place it in a grid section
form_section = (
    SectionBuilder(GridSectionConfig)
    .with_id("contact-form")
    .with_title("Contact Details")
    .with_order(1)
    .with_field(grid_template_columns="repeat(2, 1fr)", gap="1rem")
    .add_element(email_field)
    .build()
)

# 3. Add the section to a page
contact_page = (
    PageBuilder()
    .with_id("contact")
    .with_title("Contact")
    .with_order(1)
    .add_section(form_section)
    .build()
)

# 4. Assemble the top-level stage
stage = (
    StageBuilder()
    .with_id("main")
    .with_title("My Application")
    .with_default_page_id("contact")
    .add_page(contact_page)
    .build()
)

# 5. Serialize to camelCase JSON (ready for react-ubiquitous)
payload = stage.model_dump(by_alias=True, exclude_none=True)
```

<details>
<summary>Example JSON output (click to expand)</summary>

```json
{
  "id": "main",
  "title": "My Application",
  "defaultPageId": "contact",
  "pages": [
    {
      "id": "contact",
      "title": "Contact",
      "order": 1,
      "sections": [
        {
          "id": "contact-form",
          "layout": "grid",
          "title": "Contact Details",
          "order": 1,
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "1rem",
          "elements": [
            {
              "id": "email",
              "name": "email",
              "type": "input",
              "inputType": "email",
              "label": "Email Address",
              "order": 1,
              "required": true,
              "validations": [
                { "rule": "required" },
                { "rule": "email", "message": "Enter a valid email address." }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

</details>

---

<details>
<summary><strong>Builders</strong></summary>

All builders follow the same immutable pattern — each `with_*` / `add_*` call returns a **new** builder, leaving the original unchanged.

### `ElementBuilder`

Builds any element config model.

```python
from react_ubiquitous_put import ElementBuilder, InputElementConfig, ButtonElementConfig

# Text input with validation
first_name = (
    ElementBuilder(InputElementConfig)
    .with_id("first-name")
    .with_name("firstName")
    .with_label("First Name")
    .with_order(1)
    .with_required(True)
    .with_tooltip("Enter your legal first name")
    .with_width(6)
    .with_class_name("form-input")
    .add_validation("required")
    .add_validation("maxLength", value=50)
    .build()
)

# Submit button
submit_btn = (
    ElementBuilder(ButtonElementConfig)
    .with_id("submit-btn")
    .with_name("submit")
    .with_field(text="Submit", button_type="submit", variant="primary")
    .with_order(99)
    .build()
)
```

| Method | Description |
|---|---|
| `with_id(id)` | Set element `id` |
| `with_name(name)` | Set element `name` |
| `with_label(label)` | Set display label |
| `with_label_position(position)` | Set label placement (`"top"`, `"left"`, …) |
| `with_order(order)` | Set render order |
| `with_tooltip(tooltip)` | Set tooltip/help text |
| `with_width(width)` | Set column width (string or int) |
| `with_class_name(class_name)` | Set CSS class |
| `with_style(style)` | Set inline style dict |
| `with_required(required)` | Mark element as required |
| `with_disabled(disabled)` | Mark element as disabled |
| `with_readonly(readonly)` | Mark element as read-only |
| `with_hidden(hidden)` | Hide the element |
| `add_validation(rule, value, message)` | Append a `ValidationRule` |
| `with_field(**kwargs)` | Set any model-specific fields |
| `build()` | Validate and return the model instance |

---

### `SectionBuilder`

Builds any section layout config model.

```python
from react_ubiquitous_put import SectionBuilder, GridSectionConfig, FlexSectionConfig

# Grid section
grid = (
    SectionBuilder(GridSectionConfig)
    .with_id("personal-info")
    .with_title("Personal Information")
    .with_order(1)
    .with_field(grid_template_columns="repeat(3, 1fr)", gap="1rem")
    .add_element(first_name)
    .add_element(submit_btn)
    .build()
)

# Flex toolbar
toolbar = (
    SectionBuilder(FlexSectionConfig)
    .with_id("toolbar")
    .with_field(flex_direction="row", justify_content="flex-end", gap="0.5rem")
    .add_element(submit_btn)
    .build()
)
```

| Method | Description |
|---|---|
| `with_id(id)` | Set section `id` |
| `with_title(title)` | Set section title |
| `with_description(description)` | Set section description |
| `with_order(order)` | Set render order |
| `with_class_name(class_name)` | Set CSS class |
| `with_style(style)` | Set inline style dict |
| `add_element(element)` | Append a built element |
| `with_field(**kwargs)` | Set any layout-specific fields |
| `build()` | Validate and return the model instance |

---

### `PageBuilder`

Builds a `UIPageConfig` (a single tab/page within a stage).

```python
from react_ubiquitous_put import PageBuilder

page = (
    PageBuilder()
    .with_id("settings")
    .with_title("Settings")
    .with_order(2)
    .with_icon("settings")
    .with_description("Application settings")
    .with_visible(True)
    .add_section(grid)
    .add_section(toolbar)
    .build()
)
```

| Method | Description |
|---|---|
| `with_id(id)` | Set page `id` |
| `with_title(title)` | Set page title |
| `with_description(description)` | Set page description |
| `with_icon(icon)` | Set page icon name |
| `with_order(order)` | Set tab order |
| `with_class_name(class_name)` | Set CSS class |
| `with_visible(visible)` | Show/hide the page tab |
| `add_section(section)` | Append a built section |
| `build()` | Validate and return a `UIPageConfig` |

---

### `StageBuilder`

Builds a `UIStageConfig` — the top-level container.

```python
from react_ubiquitous_put import StageBuilder

stage = (
    StageBuilder()
    .with_id("app")
    .with_title("My Application")
    .with_description("Powered by react-ubiquitous")
    .with_default_page_id("settings")
    .add_page(page)
    .build()
)
```

| Method | Description |
|---|---|
| `with_id(id)` | Set stage `id` |
| `with_title(title)` | Set stage title |
| `with_description(description)` | Set stage description |
| `with_default_page_id(page_id)` | Set the initially active page |
| `add_page(page)` | Append a built page |
| `build()` | Validate and return a `UIStageConfig` |

</details>

---

<details>
<summary><strong>Models</strong></summary>

All models inherit from `_CamelModel`, which:
- Accepts **both** `snake_case` and `camelCase` field names on input.
- Serializes to **camelCase** when `by_alias=True` is passed to `model_dump()` / `model_dump_json()`.

### Element Models

| Model | `type` | Key Fields |
|---|---|---|
| `InputElementConfig` | `"input"` | `input_type`, `placeholder`, `default_value`, `min`, `max`, `step`, `datalist_id` |
| `CheckboxElementConfig` | `"checkbox"` | `default_checked`, `checked`, `value` |
| `RadioElementConfig` | `"radio"` | `options: list[RadioOption]`, `default_value`, `orientation` |
| `TextareaElementConfig` | `"textarea"` | `placeholder`, `rows`, `cols`, `resize`, `max_length` |
| `SelectElementConfig` | `"select"` | `options: list[SelectOption \| SelectOptGroup]`, `multiple`, `size` |
| `ButtonElementConfig` | `"button"` | `text`, `button_type`, `variant`, `size`, `icon`, `icon_position` |
| `LabelElementConfig` | `"label"` | `text`, `html_for` |
| `FieldsetElementConfig` | `"fieldset"` | `legend`, `children: list[UIElementConfig]` |
| `DatalistElementConfig` | `"datalist"` | `options: list[str \| SelectOption]` |
| `OutputElementConfig` | `"output"` | `value`, `default_value`, `format`, `html_for` |
| `DatePickerElementConfig` | `"datepicker"` | `default_value`, `min`, `max`, `include_time`, `placeholder` |
| `MultiSelectElementConfig` | `"multiselect"` | `options: list[SelectOption]`, `default_value`, `max_items`, `placeholder` |
| `AutocompleteElementConfig` | `"autocomplete"` | `options: list[SelectOption]`, `default_value`, `placeholder` |
| `FileUploadElementConfig` | `"fileupload"` | `accept`, `multiple`, `max_size`, `placeholder` |
| `ColorPickerElementConfig` | `"colorpicker"` | `default_value`, `value`, `format` |
| `RangeSliderElementConfig` | `"rangeslider"` | `min`, `max`, `step`, `default_value: tuple[float, float]` |
| `RatingElementConfig` | `"rating"` | `max`, `default_value`, `allow_half` |
| `OtpInputElementConfig` | `"otpinput"` | `length`, `default_value`, `mask` |
| `PhoneInputElementConfig` | `"phoneinput"` | `default_country`, `default_value`, `placeholder` |
| `CustomElementConfig` | `"custom"` | `component`, `props: dict` |

#### Validation Rules

```python
from react_ubiquitous_put import ValidationRule

# Simple rule
required = ValidationRule(rule="required")

# Rule with value and message
min_length = ValidationRule(rule="minLength", value=8, message="At least 8 characters.")

# Custom async validator
custom = ValidationRule(
    rule="custom",
    validator="checkUsername",
    config={"endpoint": "/api/validate/username"},
)
```

### Section Models

| Model | `layout` | Key Fields |
|---|---|---|
| `FlexSectionConfig` | `"flex"` | `flex_direction`, `flex_wrap`, `justify_content`, `align_items`, `gap` |
| `GridSectionConfig` | `"grid"` | `grid_template_columns`, `grid_template_rows`, `gap`, `align_items`, `justify_items` |
| `HeroSectionConfig` | `"hero"` | `subtitle`, `background_type`, `gradient_from`, `gradient_to`, `overlay`, `link_url` |
| `MediaSectionConfig` | `"media"` | `items: list[MediaItem]`, `aspect_ratio`, `show_arrows`, `show_dots` |
| `ListDetailSectionConfig` | `"list-detail"` | `list_items`, `list_endpoint`, `filter_endpoint`, `detail_endpoint`, `detail_pages` |
| `TreeViewSectionConfig` | `"tree-view"` | `tree_nodes: list[TreeViewNode]`, `tree_title`, `tree_width`, `tree_mode`, `detail_pages` |
| `ChatSectionConfig` | `"chat"` | `conversations: list[ChatConversation]`, `list_title`, `current_user_name`, `input_placeholder` |
| `NavbarSectionConfig` | `"navbar"` | `logo_text`, `logo_url`, `links: list[NavLink]`, `position`, `theme` |
| `SidebarSectionConfig` | `"sidebar"` | `items: list[SidebarItem]`, `default_collapsed`, `collapsible`, `width` |
| `BreadcrumbsSectionConfig` | `"breadcrumbs"` | `items: list[BreadcrumbItem]`, `separator` |
| `PaginationSectionConfig` | `"pagination"` | `total_items`, `page_size`, `current_page`, `show_first_last`, `max_page_buttons` |
| `StepperSectionConfig` | `"stepper"` | `steps: list[StepperStep]`, `current_step`, `orientation` |
| `TabsSectionConfig` | `"tabs"` | `tabs: list[TabItem]`, `default_tab_id` |
| `AlertSectionConfig` | `"alert"` | `severity`, `dismissible`, `icon` |
| `ProgressSectionConfig` | `"progress"` | `variant`, `value`, `show_label`, `size`, `color`, `indeterminate` |
| `SkeletonSectionConfig` | `"skeleton"` | `shape`, `lines`, `avatar`, `width`, `height` |
| `ToastSectionConfig` | `"toast"` | `message`, `severity`, `duration`, `position`, `visible` |
| `ModalSectionConfig` | `"modal"` | `open`, `size`, `close_on_backdrop`, `show_close_button`, `confirm_label`, `cancel_label` |
| `DrawerSectionConfig` | `"drawer"` | `open`, `placement`, `size`, `close_on_backdrop`, `show_close_button` |
| `TooltipSectionConfig` | `"tooltip"` | `content`, `placement`, `trigger_label` |
| `PopoverSectionConfig` | `"popover"` | `placement`, `trigger_label`, `content` |
| `TableSectionConfig` | `"table"` | `columns: list[TableColumn]`, `rows`, `searchable`, `page_size`, `empty_message` |
| `BadgeSectionConfig` | `"badge"` | `badges: list[BadgeItem]`, `appearance`, `size` |
| `AvatarSectionConfig` | `"avatar"` | `avatars: list[AvatarItem]`, `size`, `stacked` |
| `TimelineSectionConfig` | `"timeline"` | `events: list[TimelineEvent]` |
| `StatSectionConfig` | `"stat"` | `stats: list[StatItem]`, `columns` |
| `EmptyStateSectionConfig` | `"empty-state"` | `heading`, `message`, `icon`, `action_label`, `action_href` |
| `CodeBlockSectionConfig` | `"code-block"` | `code`, `language`, `line_numbers`, `copyable` |
| `ChartSectionConfig` | `"chart"` | `chart_type`, `data`, `series: list[ChartSeries]`, `show_grid`, `show_legend`, `height` |
| `IframeSectionConfig` | `"iframe"` | `src`, `query_params`, `frame_width`, `frame_height`, `sandbox`, `frame_title` |
| `AccordionSectionConfig` | `"accordion"` | `panels: list[AccordionPanel]`, `allow_multiple` |
| `CollapseSectionConfig` | `"collapse"` | `label`, `default_open`, `icon` |
| `DividerSectionConfig` | `"divider"` | `label`, `orientation`, `variant` |
| `CardSectionConfig` | `"card"` | `bordered`, `shadow`, `padded`, `footer_elements` |

#### Example — Hero section

```python
from react_ubiquitous_put import HeroSectionConfig

hero = HeroSectionConfig(
    id="hero",
    title="Welcome to Our Platform",
    subtitle="Build better UIs faster",
    background_type="gradient",
    gradient_from="#6366f1",
    gradient_to="#1e293b",
    gradient_direction="to bottom right",
    overlay=True,
    overlay_opacity=40,
    min_height="60vh",
    text_align="center",
    link_text="Get Started",
    link_url="/signup",
)
```

#### Example — Accordion section

```python
from react_ubiquitous_put import (
    AccordionSectionConfig,
    AccordionPanel,
    LabelElementConfig,
)

faq = AccordionSectionConfig(
    id="faq",
    title="Frequently Asked Questions",
    allow_multiple=False,
    panels=[
        AccordionPanel(
            id="q1",
            label="What is react-ubiquitous?",
            default_open=True,
            elements=[
                LabelElementConfig(
                    id="a1",
                    name="answer1",
                    text="A declarative JSON-driven React UI library.",
                    order=1,
                )
            ],
        ),
    ],
)
```

#### Example — Card section

```python
from react_ubiquitous_put import CardSectionConfig, ButtonElementConfig

save_btn = ButtonElementConfig(
    id="save", name="save", text="Save Changes", button_type="submit", order=1
)

card = CardSectionConfig(
    id="profile-card",
    title="Profile",
    bordered=True,
    shadow="sm",
    padded=True,
    footer_elements=[save_btn],
)
```

#### Example — List-Detail section

```python
from react_ubiquitous_put import (
    ListDetailSectionConfig,
    ListItem,
    ListEndpoint,
    FilterEndpoint,
    DetailEndpoint,
)

contacts = ListDetailSectionConfig(
    id="contacts",
    list_title="Contacts",
    list_width="300px",
    page_size=20,
    list_items=[
        ListItem(id="c1", label="Alice Smith", sublabel="alice@example.com", badge="Admin"),
    ],
    list_endpoint=ListEndpoint(
        url="/api/contacts",
        from_param="offset",
        from_value=0,
        to_param="limit",
        to_value=20,
    ),
    filter_endpoint=FilterEndpoint(url="/api/contacts/search", query_param="q"),
    detail_endpoint=DetailEndpoint(url="/api/contacts/:id", selected_param="id"),
)
```

#### Example — Table section

```python
from react_ubiquitous_put import TableSectionConfig, TableColumn

users_table = TableSectionConfig(
    id="users-table",
    title="Users",
    columns=[
        TableColumn(key="name",  label="Name",  sortable=True, width="200px"),
        TableColumn(key="email", label="Email", sortable=True),
        TableColumn(key="role",  label="Role",  sortable=False),
    ],
    rows=[
        {"name": "Alice Smith", "email": "alice@acme.com", "role": "Admin"},
        {"name": "Bob Jones",   "email": "bob@acme.com",   "role": "Viewer"},
    ],
    searchable=True,
    page_size=10,
    empty_message="No users found.",
)
```

#### Example — Chart section

```python
from react_ubiquitous_put import ChartSectionConfig, ChartSeries

sales_chart = ChartSectionConfig(
    id="sales-chart",
    chart_type="bar",
    height=300,
    show_grid=True,
    show_legend=True,
    series=[
        ChartSeries(key="revenue",  label="Revenue",  color="#6366f1"),
        ChartSeries(key="expenses", label="Expenses", color="#f43f5e"),
    ],
    data=[
        {"label": "Jan", "revenue": 12000, "expenses": 8000},
        {"label": "Feb", "revenue": 15000, "expenses": 9500},
        {"label": "Mar", "revenue": 11000, "expenses": 7000},
    ],
)
```

#### Example — Tabs section

```python
from react_ubiquitous_put import TabsSectionConfig, TabItem, GridSectionConfig

info_tabs = TabsSectionConfig(
    id="info-tabs",
    default_tab_id="overview",
    tabs=[
        TabItem(
            id="overview",
            label="Overview",
            sections=[GridSectionConfig(id="overview-grid", order=1)],
        ),
        TabItem(
            id="settings",
            label="Settings",
            sections=[GridSectionConfig(id="settings-grid", order=1)],
        ),
    ],
)
```

#### Example — Alert section

```python
from react_ubiquitous_put import AlertSectionConfig

success_alert = AlertSectionConfig(
    id="save-success",
    title="Saved",
    description="Your changes have been saved successfully.",
    severity="success",
    dismissible=True,
    icon=True,
)
```

#### Example — Stepper section

```python
from react_ubiquitous_put import StepperSectionConfig, StepperStep

onboarding_steps = StepperSectionConfig(
    id="onboarding-steps",
    current_step=1,
    orientation="horizontal",
    steps=[
        StepperStep(id="s1", label="Account",  description="Create your account", status="complete"),
        StepperStep(id="s2", label="Profile",  description="Fill in profile details", status="current"),
        StepperStep(id="s3", label="Confirm",  description="Review and confirm"),
    ],
)
```

### `UIStageConfig` — top-level fields

| Field | Type | Description |
|---|---|---|
| `id` | `str` | Unique stage identifier |
| `title` | `str \| None` | Heading above the tab bar |
| `description` | `str \| None` | Stage subtitle |
| `default_page_id` | `str \| None` | ID of the tab to show first |
| `pages` | `list[UIPageConfig]` | Ordered list of pages / tabs |
| `theme` | `str \| None` | `"light"` \| `"dark"` \| `"html"` \| `"custom"` |
| `class_name` | `str \| None` | Extra CSS class on the stage wrapper |
| `page_transition` | `str \| None` | `"none"` \| `"fade"` \| `"slide-left"` \| `"slide-right"` |

```python
from react_ubiquitous_put import UIStageConfig, UIPageConfig

stage = UIStageConfig(
    id="app",
    title="My App",
    theme="light",
    page_transition="fade",
    class_name="my-app-wrapper",
    default_page_id="home",
    pages=[UIPageConfig(id="home", title="Home", order=1)],
)
```

</details>

---

<details>
<summary><strong>Framework Integration</strong></summary>

### Flask

Install Flask alongside the package:

```bash
pip install react-ubiquitous-put flask
```

Use the built-in `ui_response()` helper in any Flask route. It serialises the
model to camelCase JSON (omitting `None` values) and returns a proper
`application/json` response:

```python
from flask import Flask
from react_ubiquitous_put import (
    UIStageConfig, UIPageConfig,
    GridSectionConfig, FlexSectionConfig,
    InputElementConfig, ButtonElementConfig,
)
from react_ubiquitous_put.flask_utils import ui_response

app = Flask(__name__)


@app.get("/stages/<stage_id>")
def get_stage(stage_id: str):
    config = UIStageConfig(
        id=stage_id,
        title="My Application",
        default_page_id="home",
        theme="light",
        pages=[
            UIPageConfig(
                id="home",
                title="Home",
                order=1,
                sections=[
                    GridSectionConfig(
                        id="form",
                        order=1,
                        grid_template_columns="repeat(2, 1fr)",
                        gap="1rem",
                        elements=[
                            InputElementConfig(
                                id="name",
                                name="name",
                                input_type="text",
                                label="Full Name",
                                required=True,
                                order=1,
                            ),
                        ],
                    ),
                    FlexSectionConfig(
                        id="actions",
                        order=2,
                        flex_direction="row",
                        justify_content="flex-end",
                        gap="0.5rem",
                        elements=[
                            ButtonElementConfig(
                                id="submit",
                                name="submit",
                                text="Submit",
                                button_type="submit",
                                variant="default",
                                order=1,
                            ),
                        ],
                    ),
                ],
            ),
        ],
    )
    return ui_response(config)


if __name__ == "__main__":
    app.run(debug=True)
```

`ui_response(config, status=200)` accepts any Pydantic model and any HTTP
status code (useful for `201 Created`, `202 Accepted`, etc.).

---

### FastAPI

```python
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from react_ubiquitous_put import UIStageConfig, UIPageConfig, GridSectionConfig

app = FastAPI()


@app.get("/stages/{stage_id}")
async def get_stage(stage_id: str) -> JSONResponse:
    config = UIStageConfig(
        id=stage_id,
        title="My Application",
        pages=[
            UIPageConfig(id="home", title="Home", order=1, sections=[
                GridSectionConfig(id="form", order=1, grid_template_columns="repeat(2, 1fr)"),
            ]),
        ],
    )
    return JSONResponse(content=config.model_dump(by_alias=True, exclude_none=True))
```

</details>

---

<details>
<summary><strong>JSON Serialization</strong></summary>

Use `model_dump(by_alias=True, exclude_none=True)` to produce clean camelCase JSON:

```python
import json

payload = stage.model_dump(by_alias=True, exclude_none=True)
print(json.dumps(payload, indent=2))

# Or serialize directly to a JSON string:
json_str = stage.model_dump_json(by_alias=True)

# Round-trip from JSON:
from react_ubiquitous_put import UIStageConfig
restored = UIStageConfig.model_validate_json(json_str)
```

Models also accept camelCase keys on input, making it trivial to parse API responses:

```python
data = {
    "id": "s1",
    "defaultPageId": "home",
    "pages": [{"id": "home", "title": "Home", "order": 1}],
}
stage = UIStageConfig.model_validate(data)
assert stage.default_page_id == "home"
```

</details>

---

<details>
<summary><strong>Development</strong></summary>

```bash
# Install with dev dependencies
pip install -e ".[dev]"

# Run tests
pytest
```

</details>

---

## License

MIT © [nssivanitesh](https://github.com/nssivanitesh)
