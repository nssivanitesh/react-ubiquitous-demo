# react-ubiquitous-NuGet

[![NuGet](https://img.shields.io/nuget/v/react-ubiquitous-NuGet.svg)](https://www.nuget.org/packages/react-ubiquitous-NuGet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/)

.NET DTOs and fluent builders for [`@nssivanitesh/react-ubiquitous`](https://www.npmjs.com/package/@nssivanitesh/react-ubiquitous) — a JSON-driven React UI configuration library.

This package lets you compose type-safe UI configuration trees in C# and serialize them to the JSON format consumed by the `react-ubiquitous` React component.

---

## Table of Contents

- [Installation](#installation)
- [Core Concepts](#core-concepts)
- [Quick Start](#quick-start)
- [Builders](#builders)
  - [StageBuilder](#stagebuilder)
  - [PageBuilder](#pagebuilder)
  - [SectionBuilder\<T\>](#sectionbuildert)
  - [ElementBuilder\<T\>](#elementbuildert)
- [Section Types](#section-types)
  - [Flex](#flex-section)
  - [Grid](#grid-section)
  - [Card](#card-section)
  - [Hero](#hero-section)
  - [Accordion](#accordion-section)
  - [Collapse](#collapse-section)
  - [Divider](#divider-section)
  - [Media Carousel](#media-carousel-section)
  - [List-Detail](#list-detail-section)
  - [Tree-View](#tree-view-section)
  - [Chat](#chat-section)
  - [Navbar](#navbar-section)
  - [Sidebar](#sidebar-section)
  - [Breadcrumbs](#breadcrumbs-section)
  - [Pagination](#pagination-section)
  - [Stepper](#stepper-section)
  - [Tabs](#tabs-section)
  - [Alert](#alert-section)
  - [Progress](#progress-section)
  - [Skeleton](#skeleton-section)
  - [Toast](#toast-section)
  - [Modal](#modal-section)
  - [Drawer](#drawer-section)
  - [Tooltip](#tooltip-section)
  - [Popover](#popover-section)
  - [Table](#table-section)
  - [Badge](#badge-section)
  - [Avatar](#avatar-section)
  - [Timeline](#timeline-section)
  - [Stat](#stat-section)
  - [Empty State](#empty-state-section)
  - [Code Block](#code-block-section)
  - [Chart](#chart-sections)
  - [Iframe](#iframe-section)
- [Element Types](#element-types)
  - [input](#input-element)
  - [checkbox](#checkbox-element)
  - [radio](#radio-element)
  - [textarea](#textarea-element)
  - [select](#select-element)
  - [button](#button-element)
  - [label](#label-element)
  - [fieldset](#fieldset-element)
  - [datalist](#datalist-element)
  - [output](#output-element)
  - [datepicker](#datepicker-element)
  - [multiselect](#multiselect-element)
  - [autocomplete](#autocomplete-element)
  - [fileupload](#fileupload-element)
  - [colorpicker](#colorpicker-element)
  - [rangeslider](#rangeslider-element)
  - [rating](#rating-element)
  - [otpinput](#otpinput-element)
  - [phoneinput](#phoneinput-element)
  - [custom](#custom-element)
- [Validation Rules](#validation-rules)
- [JSON Serialization](#json-serialization)
- [License](#license)

---

## Installation

### NuGet (.NET)

```bash
dotnet add package react-ubiquitous-NuGet
```

Or add via the NuGet Package Manager in Visual Studio.

### npm (React front end)

This NuGet package targets feature parity with **v1.0.14** of the `react-ubiquitous` npm package. Install the matching version in your React project:

```bash
npm i react-ubiquitous
```

> Source: [https://github.com/nssivanitesh/react-ubiquitous](https://github.com/nssivanitesh/react-ubiquitous)

---

## Core Concepts

The configuration hierarchy mirrors how `react-ubiquitous` renders a UI:

```
UIStageConfig          ← top-level container (multi-page app / wizard)
  └─ UIPageConfig[]    ← individual pages / tabs
       └─ BaseSectionConfig[]  ← layout sections (grid, flex, card, …)
            └─ BaseElementConfig[]  ← form elements (input, select, button, …)
```

All models are serializable to/from JSON using `System.Text.Json` with polymorphic support via the `type` discriminator for elements and the `layout` discriminator for sections.

---

## Quick Start

```csharp
using System.Text.Json;
using ReactUbiquitous.NuGet.Builders;
using ReactUbiquitous.NuGet.Models.Elements;
using ReactUbiquitous.NuGet.Models.Sections;

// 1. Build elements
var firstNameInput = new ElementBuilder<InputElementConfig>()
    .WithId("first-name")
    .WithName("firstName")
    .WithLabel("First Name")
    .WithRequired()
    .Configure(e => e.Placeholder = "John")
    .Build();

var lastNameInput = new ElementBuilder<InputElementConfig>()
    .WithId("last-name")
    .WithName("lastName")
    .WithLabel("Last Name")
    .WithRequired()
    .Configure(e => e.Placeholder = "Doe")
    .Build();

// 2. Build a section containing the elements
var formSection = new SectionBuilder<GridSectionConfig>()
    .WithId("personal-info")
    .WithTitle("Personal Information")
    .AddElement(firstNameInput)
    .AddElement(lastNameInput)
    .Configure(s => { s.GridTemplateColumns = "1fr 1fr"; s.Gap = "16px"; })
    .Build();

// 3. Build a page
var page = new PageBuilder()
    .WithId("profile-page")
    .WithTitle("Profile")
    .WithOrder(0)
    .WithVisible(true)
    .AddSection(formSection)
    .Build();

// 4. Build the top-level stage
var stage = new StageBuilder()
    .WithId("my-app")
    .WithTitle("My Application")
    .WithDefaultPageId("profile-page")
    .AddPage(page)
    .Build();

// 5. Serialize to JSON
var json = JsonSerializer.Serialize(stage, new JsonSerializerOptions { WriteIndented = true });
Console.WriteLine(json);
```

<details>
<summary>Resulting JSON</summary>

```json
{
  "id": "my-app",
  "title": "My Application",
  "defaultPageId": "profile-page",
  "pages": [
    {
      "id": "profile-page",
      "title": "Profile",
      "order": 0,
      "visible": true,
      "sections": [
        {
          "layout": "grid",
          "id": "personal-info",
          "title": "Personal Information",
          "gridTemplateColumns": "1fr 1fr",
          "gap": "16px",
          "elements": [
            { "type": "input", "id": "first-name", "name": "firstName", "label": "First Name", "required": true, "placeholder": "John", "inputType": "text" },
            { "type": "input", "id": "last-name",  "name": "lastName",  "label": "Last Name",  "required": true, "placeholder": "Doe",  "inputType": "text" }
          ]
        }
      ]
    }
  ]
}
```

</details>

---

## Builders

All builders follow a fluent interface pattern and end with a `.Build()` call.

### StageBuilder

Builds a `UIStageConfig` — the top-level container.

```csharp
var stage = new StageBuilder()
    .WithId("wizard")
    .WithTitle("Setup Wizard")
    .WithDescription("Complete all steps")
    .WithDefaultPageId("step-1")
    .WithTheme("dark")             // "light" | "dark" | "html" | "custom"
    .WithClassName("my-stage")     // extra CSS classes (useful with theme: "custom")
    .WithPageTransition("fade")    // "none" | "fade" | "slide-left" | "slide-right"
    .AddPage(page1)
    .Build();
```

| Method | Description |
|--------|-------------|
| `WithId(string)` | Sets the unique identifier |
| `WithTitle(string)` | Sets the display title |
| `WithDescription(string)` | Sets the description |
| `WithDefaultPageId(string)` | Sets the ID of the page shown by default |
| `WithTheme(string)` | Sets the colour theme |
| `WithClassName(string)` | Adds extra CSS classes on the stage wrapper |
| `WithPageTransition(string)` | Sets the page-switch animation |
| `AddPage(UIPageConfig)` | Adds a page to the stage |

### PageBuilder

Builds a `UIPageConfig` — represents a single page or tab.

```csharp
var page = new PageBuilder()
    .WithId("step-1")
    .WithTitle("Step 1: Account")
    .WithDescription("Create your account")
    .WithIcon("user")
    .WithOrder(0)
    .WithVisible(true)
    .WithClassName("step-page")
    .AddSection(section)
    .Build();
```

| Method | Description |
|--------|-------------|
| `WithId(string)` | Sets the unique identifier |
| `WithTitle(string)` | Sets the tab label |
| `WithDescription(string)` | Sets the description / tooltip |
| `WithIcon(string)` | Sets a Lucide icon name |
| `WithOrder(int)` | Sets the display order |
| `WithVisible(bool)` | Controls tab visibility |
| `WithClassName(string)` | Appends a CSS class |
| `AddSection(BaseSectionConfig)` | Adds a section to the page |

### SectionBuilder\<T\>

Generic builder for any section type. `T` must extend `BaseSectionConfig`.

```csharp
var grid = new SectionBuilder<GridSectionConfig>()
    .WithId("my-grid")
    .WithTitle("My Grid")
    .WithOrder(0)
    .AddElement(inputElement)
    .Configure(s => { s.GridTemplateColumns = "repeat(3, 1fr)"; s.Gap = "16px"; })
    .Build();
```

| Method | Description |
|--------|-------------|
| `WithId(string)` | Sets the unique identifier |
| `WithTitle(string)` | Sets the section heading |
| `WithOrder(int)` | Sets the display order |
| `WithClassName(string)` | Appends a CSS class |
| `AddElement(BaseElementConfig)` | Adds an element |
| `Configure(Action<T>)` | Configures type-specific properties |

### ElementBuilder\<T\>

Generic builder for any element type. `T` must extend `BaseElementConfig`.

```csharp
var emailInput = new ElementBuilder<InputElementConfig>()
    .WithId("email").WithName("email").WithLabel("Email Address")
    .WithRequired()
    .WithTooltip("We'll never share your email")
    .Configure(e => { e.InputType = "email"; e.Placeholder = "user@example.com"; })
    .Build();
```

| Method | Description |
|--------|-------------|
| `WithId(string)` | Sets the unique identifier |
| `WithName(string)` | Sets the field name |
| `WithLabel(string)` | Sets the display label |
| `WithOrder(int)` | Sets the display order |
| `WithRequired(bool)` | Marks as required |
| `WithDisabled(bool)` | Disables the element |
| `WithReadonly(bool)` | Makes read-only |
| `WithHidden(bool)` | Hides the element |
| `WithTooltip(string)` | Sets a tooltip |
| `WithLabelPosition(string)` | Sets label position |
| `WithClassName(string)` | Appends a CSS class |
| `WithWidth(object)` | Sets a width (number or CSS string) |
| `WithValidation(ValidationRule)` | Adds a validation rule |
| `Configure(Action<T>)` | Configures type-specific properties |

---

## Section Types

| Type | Class | `layout` value |
|------|-------|----------------|
| Flex | `FlexSectionConfig` | `"flex"` |
| Grid | `GridSectionConfig` | `"grid"` |
| Card | `CardSectionConfig` | `"card"` |
| Hero | `HeroSectionConfig` | `"hero"` |
| Accordion | `AccordionSectionConfig` | `"accordion"` |
| Collapse | `CollapseSectionConfig` | `"collapse"` |
| Divider | `DividerSectionConfig` | `"divider"` |
| Media Carousel | `MediaSectionConfig` | `"media"` |
| List-Detail | `ListDetailSectionConfig` | `"list-detail"` |
| Tree-View | `TreeViewSectionConfig` | `"tree-view"` |
| Chat | `ChatSectionConfig` | `"chat"` |
| Navbar | `NavbarSectionConfig` | `"navbar"` |
| Sidebar | `SidebarSectionConfig` | `"sidebar"` |
| Breadcrumbs | `BreadcrumbsSectionConfig` | `"breadcrumbs"` |
| Pagination | `PaginationSectionConfig` | `"pagination"` |
| Stepper | `StepperSectionConfig` | `"stepper"` |
| Tabs | `TabsSectionConfig` | `"tabs"` |
| Alert | `AlertSectionConfig` | `"alert"` |
| Progress | `ProgressSectionConfig` | `"progress"` |
| Skeleton | `SkeletonSectionConfig` | `"skeleton"` |
| Toast | `ToastSectionConfig` | `"toast"` |
| Modal | `ModalSectionConfig` | `"modal"` |
| Drawer | `DrawerSectionConfig` | `"drawer"` |
| Tooltip | `TooltipSectionConfig` | `"tooltip"` |
| Popover | `PopoverSectionConfig` | `"popover"` |
| Table | `TableSectionConfig` | `"table"` |
| Badge | `BadgeSectionConfig` | `"badge"` |
| Avatar | `AvatarSectionConfig` | `"avatar"` |
| Timeline | `TimelineSectionConfig` | `"timeline"` |
| Stat | `StatSectionConfig` | `"stat"` |
| Empty State | `EmptyStateSectionConfig` | `"empty-state"` |
| Code Block | `CodeBlockSectionConfig` | `"code-block"` |
| Line Chart | `LineChartSectionConfig` | `"chart"` (`chartType:"line"`) |
| Area Chart | `AreaChartSectionConfig` | `"chart"` (`chartType:"area"`) |
| Bar Chart | `BarChartSectionConfig` | `"chart"` (`chartType:"bar"`) |
| Pie Chart | `PieChartSectionConfig` | `"chart"` (`chartType:"pie"`) |
| Donut Chart | `DonutChartSectionConfig` | `"chart"` (`chartType:"donut"`) |
| Radar Chart | `RadarChartSectionConfig` | `"chart"` (`chartType:"radar"`) |
| Scatter Chart | `ScatterChartSectionConfig` | `"chart"` (`chartType:"scatter"`) |
| Iframe | `IframeSectionConfig` | `"iframe"` |

---

### Flex Section

<details>
<summary>FlexSectionConfig example</summary>

```csharp
var flex = new SectionBuilder<FlexSectionConfig>()
    .WithId("toolbar")
    .Configure(s =>
    {
        s.FlexDirection  = "row";          // "row"|"column"|"row-reverse"|"column-reverse"
        s.FlexWrap       = "wrap";
        s.JustifyContent = "space-between";
        s.AlignItems     = "center";
        s.Gap            = "0.75rem";
    })
    .Build();
```

Key properties: `FlexDirection`, `FlexWrap`, `JustifyContent`, `AlignItems`, `AlignContent`, `Gap`, `RowGap`, `ColumnGap`.

</details>

---

### Grid Section

<details>
<summary>GridSectionConfig example</summary>

```csharp
var grid = new SectionBuilder<GridSectionConfig>()
    .WithId("details")
    .AddElement(firstNameInput)
    .AddElement(lastNameInput)
    .Configure(s =>
    {
        s.GridTemplateColumns = "repeat(3, 1fr)";
        s.Gap                 = "1rem";
        s.AlignItems          = "start";
    })
    .Build();
```

Key properties: `GridTemplateColumns`, `GridTemplateRows`, `Gap`, `RowGap`, `ColumnGap`, `AlignItems`, `JustifyItems`.

</details>

---

### Card Section

<details>
<summary>CardSectionConfig example</summary>

```csharp
var card = new SectionBuilder<CardSectionConfig>()
    .WithId("profile-card")
    .WithTitle("Profile")
    .AddElement(nameInput)
    .AddElement(emailInput)
    .Configure(s =>
    {
        s.Bordered       = true;
        s.Shadow         = "sm";   // false | "sm" | "md" | "lg"
        s.Padded         = true;
        s.FooterElements = [saveButton];
    })
    .Build();
```

Key properties: `Padded`, `Bordered`, `Shadow`, `FooterElements`.

</details>

---

### Hero Section

<details>
<summary>HeroSectionConfig example</summary>

```csharp
var hero = new SectionBuilder<HeroSectionConfig>()
    .WithId("banner")
    .Configure(s =>
    {
        s.Title              = "Welcome back";
        s.Subtitle           = "Here is what happened while you were away.";
        s.BackgroundType     = "gradient";   // "gradient"|"color"|"image"
        s.GradientFrom       = "#6366f1";
        s.GradientTo         = "#1e293b";
        s.GradientDirection  = "to bottom right";
        s.Overlay            = true;
        s.OverlayOpacity     = 40;
        s.MinHeight          = "320px";
        s.TextAlign          = "center";
        s.LinkText           = "Learn more";
        s.LinkUrl            = "https://example.com";
    })
    .Build();
```

Key properties: `Subtitle`, `BackgroundType`, `GradientFrom`, `GradientTo`, `BackgroundImage`, `Overlay`, `OverlayOpacity`, `MinHeight`, `TextAlign`, `VerticalAlign`, `LinkText`, `LinkUrl`.

</details>

---

### Accordion Section

<details>
<summary>AccordionSectionConfig example</summary>

```csharp
var infoLabel = new ElementBuilder<LabelElementConfig>()
    .WithId("body1").WithName("body1")
    .Configure(e => e.Text = "A JSON-driven UI renderer.")
    .Build();

var accordion = new SectionBuilder<AccordionSectionConfig>()
    .WithId("faq")
    .WithTitle("FAQ")
    .Configure(s =>
    {
        s.AllowMultiple = false;
        s.Panels =
        [
            new AccordionPanel
            {
                Id = "panel-1", Label = "What is react-ubiquitous?",
                Description = "A short teaser", DefaultOpen = true,
                Elements = [infoLabel]
            }
        ];
    })
    .Build();
```

Key properties: `AllowMultiple`, `Panels` (`AccordionPanel`: `Id`, `Label`, `Description`, `DefaultOpen`, `Elements`, `Sections`).

</details>

---

### Collapse Section

<details>
<summary>CollapseSectionConfig example</summary>

```csharp
var collapse = new SectionBuilder<CollapseSectionConfig>()
    .WithId("adv-opts")
    .Configure(s =>
    {
        s.Label       = "Advanced options";
        s.Description = "Rarely needed settings";
        s.DefaultOpen = false;
        s.Icon        = true;
    })
    .AddElement(timeoutInput)
    .Build();
```

Key properties: `Label`, `Description`, `DefaultOpen`, `Icon`.

</details>

---

### Divider Section

<details>
<summary>DividerSectionConfig example</summary>

```csharp
var divider = new SectionBuilder<DividerSectionConfig>()
    .WithId("divider-or")
    .Configure(s =>
    {
        s.Label       = "OR";
        s.Orientation = "horizontal";   // "horizontal" | "vertical"
        s.Variant     = "solid";        // "solid" | "dashed" | "dotted"
    })
    .Build();
```

</details>

---

### Media Carousel Section

<details>
<summary>MediaSectionConfig example</summary>

```csharp
var gallery = new SectionBuilder<MediaSectionConfig>()
    .WithId("gallery")
    .Configure(s =>
    {
        s.AspectRatio = "16/9";
        s.ShowArrows  = true;
        s.ShowDots    = true;
        s.Items =
        [
            new MediaItem { Id = "img-1", Type = "image", Url = "https://example.com/photo.jpg", Alt = "Photo", Caption = "Caption" },
            new MediaItem { Id = "vid-1", Type = "video", Url = "https://example.com/demo.mp4",  Caption = "Walkthrough" }
        ];
    })
    .Build();
```

Key properties: `Items` (list of `MediaItem`), `AspectRatio`, `ShowArrows`, `ShowDots`.

</details>

---

### List-Detail Section

<details>
<summary>ListDetailSectionConfig example</summary>

```csharp
var contacts = new SectionBuilder<ListDetailSectionConfig>()
    .WithId("contacts")
    .Configure(s =>
    {
        s.ListTitle = "Contacts";
        s.ListWidth = "280px";
        s.PageSize  = 50;
        s.ListItems =
        [
            new ListDetailItem { Id = "c1", Label = "Alice Smith", Sublabel = "alice@acme.com", Avatar = "AS", Badge = "Admin" },
            new ListDetailItem { Id = "c2", Label = "Bob Jones",   Sublabel = "bob@acme.com" }
        ];
        s.ListEndpoint   = new ListEndpointConfig   { Url = "https://api.example.com/contacts", FromParam = "from", FromValue = 1, ToParam = "to", ToValue = 50, SortParam = "sort", SortValue = "asc" };
        s.FilterEndpoint = new FilterEndpointConfig { Url = "https://api.example.com/contacts/search", QueryParam = "query" };
        s.DetailEndpoint = new DetailEndpointConfig { Url = "https://api.example.com/contacts", SelectedParam = "selected" };
    })
    .Build();
```

`ListDetailItem` fields: `Id`, `Label`, `Sublabel`, `Avatar` (URL or ≤2-char initials), `Badge`.

</details>

---

### Tree-View Section

<details>
<summary>TreeViewSectionConfig example</summary>

```csharp
var tree = new SectionBuilder<TreeViewSectionConfig>()
    .WithId("org-tree")
    .Configure(s =>
    {
        s.TreeTitle = "Organization";
        s.TreeWidth = "260px";
        s.TreeMode  = "easy";   // "compact" | "easy"
        s.TreeNodes =
        [
            new TreeViewNode
            {
                Id = "dept-eng", Label = "Engineering", Badge = "12",
                Children =
                [
                    new TreeViewNode { Id = "team-fe", Label = "Frontend", Sublabel = "4 members" },
                    new TreeViewNode { Id = "team-be", Label = "Backend",  Sublabel = "8 members" }
                ]
            }
        ];
        s.DetailEndpoint = new DetailEndpointConfig { Url = "https://api.example.com/departments", SelectedParam = "selected" };
    })
    .Build();
```

`TreeViewNode` fields: `Id`, `Label`, `Sublabel`, `Badge`, `Children`.

</details>

---

### Chat Section

<details>
<summary>ChatSectionConfig example</summary>

```csharp
var chat = new SectionBuilder<ChatSectionConfig>()
    .WithId("support-chat")
    .Configure(s =>
    {
        s.ListTitle       = "Conversations";
        s.CurrentUserName = "Support Agent";
        s.InputPlaceholder = "Type a reply…";
        s.SendButtonText  = "Send";
        s.Conversations =
        [
            new ChatConversation
            {
                Id = "conv-1", Label = "Alice Smith", Avatar = "AS", Badge = "2",
                Messages =
                [
                    new ChatMessage { Id = "m1", Text = "Hi!", Sender = "Alice Smith", Role = "other", Timestamp = "2025-01-15T10:30:00Z", Avatar = "AS" },
                    new ChatMessage { Id = "m2", Text = "Hello!", Sender = "Support Agent", Role = "me", Timestamp = "2025-01-15T10:31:00Z" }
                ]
            }
        ];
    })
    .Build();
```

`ChatMessage` fields: `Id`, `Text`, `Sender`, `Role` (`"me"` | `"other"`), `Timestamp`, `Avatar`.

</details>

---

### Navbar Section

<details>
<summary>NavbarSectionConfig example</summary>

```csharp
var navbar = new SectionBuilder<NavbarSectionConfig>()
    .WithId("top-nav")
    .Configure(s =>
    {
        s.Logo   = "https://example.com/logo.png";
        s.Sticky = true;
        s.Links  =
        [
            new NavbarLink { Id = "home",  Label = "Home",  Url = "/" },
            new NavbarLink { Id = "about", Label = "About", Url = "/about" }
        ];
    })
    .Build();
```

</details>

---

### Sidebar Section

<details>
<summary>SidebarSectionConfig example</summary>

```csharp
var sidebar = new SectionBuilder<SidebarSectionConfig>()
    .WithId("side-nav")
    .Configure(s =>
    {
        s.Width            = "260px";
        s.DefaultCollapsed = false;
        s.Collapsible      = true;
        s.Items =
        [
            new SidebarItem { Id = "dashboard", Label = "Dashboard", Href = "/dashboard", Icon = "layout-dashboard", Active = true },
            new SidebarItem
            {
                Id = "settings", Label = "Settings", Icon = "settings",
                Children = [new SidebarItem { Id = "profile", Label = "Profile", Href = "/settings/profile" }]
            }
        ];
    })
    .Build();
```

</details>

---

### Breadcrumbs Section

<details>
<summary>BreadcrumbsSectionConfig example</summary>

```csharp
var breadcrumbs = new SectionBuilder<BreadcrumbsSectionConfig>()
    .WithId("page-breadcrumbs")
    .Configure(s =>
    {
        s.Separator = "/";
        s.Items =
        [
            new BreadcrumbItem { Id = "home",     Label = "Home",     Href = "/" },
            new BreadcrumbItem { Id = "products", Label = "Products", Href = "/products" },
            new BreadcrumbItem { Id = "detail",   Label = "Widget Pro" }
        ];
    })
    .Build();
```

</details>

---

### Pagination Section

<details>
<summary>PaginationSectionConfig example</summary>

```csharp
var pagination = new SectionBuilder<PaginationSectionConfig>()
    .WithId("contacts-pagination")
    .Configure(s =>
    {
        s.TotalItems     = 500;
        s.PageSize       = 25;
        s.CurrentPage    = 1;
        s.ShowFirstLast  = true;
        s.ShowPrevNext   = true;
        s.SiblingCount   = 2;
    })
    .Build();
```

</details>

---

### Stepper Section

<details>
<summary>StepperSectionConfig example</summary>

```csharp
var stepper = new SectionBuilder<StepperSectionConfig>()
    .WithId("onboarding-steps")
    .Configure(s =>
    {
        s.CurrentStep = 1;
        s.Orientation = "horizontal";
        s.Steps =
        [
            new StepItem { Id = "s1", Label = "Account",  Description = "Create your account" },
            new StepItem { Id = "s2", Label = "Profile",  Description = "Fill in profile details" },
            new StepItem { Id = "s3", Label = "Confirm",  Description = "Review and confirm" }
        ];
    })
    .Build();
```

</details>

---

### Tabs Section

<details>
<summary>TabsSectionConfig example</summary>

```csharp
var tabs = new SectionBuilder<TabsSectionConfig>()
    .WithId("info-tabs")
    .Configure(s =>
    {
        s.DefaultTabId = "tab-overview";
        s.Tabs =
        [
            new TabItem { Id = "tab-overview", Label = "Overview", Elements = [overviewLabel] },
            new TabItem { Id = "tab-details",  Label = "Details",  Sections = [detailGrid]    }
        ];
    })
    .Build();
```

</details>

---

### Alert Section

<details>
<summary>AlertSectionConfig example</summary>

```csharp
var alert = new SectionBuilder<AlertSectionConfig>()
    .WithId("save-success")
    .WithTitle("Saved")
    .WithDescription("Your changes have been saved successfully.")
    .Configure(s =>
    {
        s.Severity    = "success";   // "info" | "success" | "warning" | "error"
        s.Dismissible = true;
        s.Icon        = "check-circle";
    })
    .Build();
```

</details>

---

### Progress Section

<details>
<summary>ProgressSectionConfig example</summary>

```csharp
var progress = new SectionBuilder<ProgressSectionConfig>()
    .WithId("upload-progress")
    .Configure(s =>
    {
        s.Variant       = "linear";   // "linear" | "circular"
        s.Value         = 65;
        s.ShowLabel     = true;
        s.Size          = "md";
        s.Color         = "#6366f1";
        s.Indeterminate = false;
    })
    .Build();
```

</details>

---

### Skeleton Section

<details>
<summary>SkeletonSectionConfig example</summary>

```csharp
var skeleton = new SectionBuilder<SkeletonSectionConfig>()
    .WithId("card-loader")
    .Configure(s =>
    {
        s.Shape  = "rect";   // "text" | "rect" | "circle"
        s.Lines  = 3;
        s.Width  = "100%";
        s.Height = "120px";
    })
    .Build();
```

</details>

---

### Toast Section

<details>
<summary>ToastSectionConfig example</summary>

```csharp
var toast = new SectionBuilder<ToastSectionConfig>()
    .WithId("notify-saved")
    .Configure(s =>
    {
        s.Message  = "Changes saved.";
        s.Severity = "success";
        s.Duration = 4000;
        s.Position = "bottom-right";
        s.Visible  = true;
    })
    .Build();
```

</details>

---

### Modal Section

<details>
<summary>ModalSectionConfig example</summary>

```csharp
var modal = new SectionBuilder<ModalSectionConfig>()
    .WithId("confirm-delete")
    .WithTitle("Delete item?")
    .WithDescription("This action cannot be undone.")
    .Configure(s =>
    {
        s.Open            = false;
        s.Size            = "sm";   // "sm" | "md" | "lg" | "xl" | "full"
        s.CloseOnBackdrop = true;
        s.ShowCloseButton = true;
        s.ConfirmLabel    = "Delete";
        s.CancelLabel     = "Cancel";
    })
    .Build();
```

</details>

---

### Drawer Section

<details>
<summary>DrawerSectionConfig example</summary>

```csharp
var drawer = new SectionBuilder<DrawerSectionConfig>()
    .WithId("filter-drawer")
    .WithTitle("Filters")
    .Configure(s =>
    {
        s.Open            = false;
        s.Placement       = "right";   // "left" | "right" | "top" | "bottom"
        s.Size            = "320px";
        s.CloseOnBackdrop = true;
        s.ShowCloseButton = true;
    })
    .Build();
```

</details>

---

### Tooltip Section

<details>
<summary>TooltipSectionConfig example</summary>

```csharp
var tooltip = new SectionBuilder<TooltipSectionConfig>()
    .WithId("help-tooltip")
    .Configure(s =>
    {
        s.Content      = "This field is required.";
        s.Placement    = "top";   // "top" | "bottom" | "left" | "right"
        s.TriggerLabel = "?";
    })
    .Build();
```

</details>

---

### Popover Section

<details>
<summary>PopoverSectionConfig example</summary>

```csharp
var popover = new SectionBuilder<PopoverSectionConfig>()
    .WithId("more-info")
    .Configure(s =>
    {
        s.Placement    = "bottom";
        s.TriggerLabel = "More info";
        s.Content      = "Here is some additional context.";
    })
    .Build();
```

</details>

---

### Table Section

<details>
<summary>TableSectionConfig example</summary>

```csharp
var table = new SectionBuilder<TableSectionConfig>()
    .WithId("users-table")
    .Configure(s =>
    {
        s.Searchable   = true;
        s.PageSize     = 10;
        s.EmptyMessage = "No users found.";
        s.Columns =
        [
            new TableColumn { Key = "name",  Label = "Name",  Sortable = true, Width = "200px" },
            new TableColumn { Key = "email", Label = "Email", Sortable = true  },
            new TableColumn { Key = "role",  Label = "Role",  Sortable = false }
        ];
        s.Rows =
        [
            new Dictionary<string, object> { ["name"] = "Alice Smith", ["email"] = "alice@acme.com", ["role"] = "Admin"  },
            new Dictionary<string, object> { ["name"] = "Bob Jones",   ["email"] = "bob@acme.com",   ["role"] = "Viewer" }
        ];
    })
    .Build();
```

</details>

---

### Badge Section

<details>
<summary>BadgeSectionConfig example</summary>

```csharp
var badges = new SectionBuilder<BadgeSectionConfig>()
    .WithId("tech-stack")
    .Configure(s =>
    {
        s.Badges =
        [
            new BadgeItem { Id = "ts",    Label = "TypeScript", Variant = "primary" },
            new BadgeItem { Id = "react", Label = "React",      Variant = "info"    }
        ];
    })
    .Build();
```

</details>

---

### Avatar Section

<details>
<summary>AvatarSectionConfig example</summary>

```csharp
var avatars = new SectionBuilder<AvatarSectionConfig>()
    .WithId("team-avatars")
    .Configure(s =>
    {
        s.Size    = "md";
        s.Stacked = true;
        s.Avatars =
        [
            new AvatarItem { Id = "a1", Initials = "AS", Src = "https://example.com/alice.jpg", Alt = "Alice", Name = "Alice" },
            new AvatarItem { Id = "a2", Initials = "BJ", Alt = "Bob", Name = "Bob" }
        ];
    })
    .Build();
```

</details>

---

### Timeline Section

<details>
<summary>TimelineSectionConfig example</summary>

```csharp
var timeline = new SectionBuilder<TimelineSectionConfig>()
    .WithId("project-history")
    .Configure(s =>
    {
        s.Events =
        [
            new TimelineEvent { Id = "e1", Title = "Project kicked off", Description = "Initial planning.", Timestamp = "Jan 2025", Icon = "🚀", Variant = "primary" },
            new TimelineEvent { Id = "e2", Title = "Beta released",      Timestamp = "Mar 2025",                                   Variant = "success" }
        ];
    })
    .Build();
```

</details>

---

### Stat Section

<details>
<summary>StatSectionConfig example</summary>

```csharp
var stats = new SectionBuilder<StatSectionConfig>()
    .WithId("dashboard-stats")
    .Configure(s =>
    {
        s.Stats =
        [
            new StatItem { Id = "s1", Label = "Total Users", Value = "1,234", Trend = "+12%", TrendDirection = "up",   Icon = "👥" },
            new StatItem { Id = "s2", Label = "Revenue",     Value = "$98,500", Trend = "-3%", TrendDirection = "down" }
        ];
    })
    .Build();
```

</details>

---

### Empty State Section

<details>
<summary>EmptyStateSectionConfig example</summary>

```csharp
var empty = new SectionBuilder<EmptyStateSectionConfig>()
    .WithId("no-results")
    .Configure(s =>
    {
        s.Heading     = "No results found";
        s.Message     = "Try adjusting your filters or search term.";
        s.Icon        = "🗂";
        s.ActionLabel = "Clear filters";
        s.ActionHref  = "/contacts";
    })
    .Build();
```

</details>

---

### Code Block Section

<details>
<summary>CodeBlockSectionConfig example</summary>

```csharp
var codeBlock = new SectionBuilder<CodeBlockSectionConfig>()
    .WithId("example-code")
    .Configure(s =>
    {
        s.Language    = "csharp";
        s.LineNumbers = true;
        s.Copyable    = true;
        s.Code        = "var greeting = $\"Hello, {name}!\";";
    })
    .Build();
```

</details>

---

### Chart Sections

<details>
<summary>LineChartSectionConfig / BarChartSectionConfig / PieChartSectionConfig examples</summary>

```csharp
// Line chart  (layout: "chart", chartType: "line")
var lineChart = new SectionBuilder<LineChartSectionConfig>()
    .WithId("sales-line")
    .Configure(s =>
    {
        s.Data       = [new ChartDataPoint { Label = "Jan", Value = 12000 }, new ChartDataPoint { Label = "Feb", Value = 15000 }, new ChartDataPoint { Label = "Mar", Value = 11000 }];
        s.Series     = [new ChartSeries { Key = "value", Label = "Revenue", Color = "#6366f1" }];
        s.ShowLegend = true;
        s.Height     = 300;
        s.Smooth     = true;
        s.ShowPoints = true;
    })
    .Build();

// Bar chart  (layout: "chart", chartType: "bar")
var barChart = new SectionBuilder<BarChartSectionConfig>()
    .WithId("sales-bar")
    .Configure(s =>
    {
        s.Data      = [new ChartDataPoint { Label = "Jan", Value = 12000 }, new ChartDataPoint { Label = "Feb", Value = 15000 }, new ChartDataPoint { Label = "Mar", Value = 11000 }];
        s.Series    = [new ChartSeries { Key = "value", Label = "Revenue" }];
        s.Horizontal = false;
        s.BarRadius  = 4;
    })
    .Build();

// Pie chart  (layout: "chart", chartType: "pie")
var pieChart = new SectionBuilder<PieChartSectionConfig>()
    .WithId("market-pie")
    .Configure(s =>
    {
        s.Data       = [new ChartDataPoint { Label = "Product A", Value = 45 }, new ChartDataPoint { Label = "Product B", Value = 30 }, new ChartDataPoint { Label = "Product C", Value = 25 }];
        s.ShowLabels = true;
    })
    .Build();

// Donut, Area, Radar, Scatter follow the same pattern with their respective classes.
```

Chart classes: `LineChartSectionConfig` (`chartType:"line"`), `AreaChartSectionConfig` (`chartType:"area"`), `BarChartSectionConfig` (`chartType:"bar"`), `PieChartSectionConfig` (`chartType:"pie"`), `DonutChartSectionConfig` (`chartType:"donut"`), `RadarChartSectionConfig` (`chartType:"radar"`), `ScatterChartSectionConfig` (`chartType:"scatter"`). All emit `"layout":"chart"` in JSON.

</details>

---

### Iframe Section

<details>
<summary>IframeSectionConfig example</summary>

```csharp
var iframe = new SectionBuilder<IframeSectionConfig>()
    .WithId("embedded-report")
    .Configure(s =>
    {
        s.Src             = "https://example.com/report";
        s.QueryParams     = new Dictionary<string, object> { ["tab"] = "sales", ["year"] = 2025 };
        s.FrameWidth      = "100%";
        s.FrameHeight     = "480px";
        s.Sandbox         = "allow-scripts allow-same-origin";
        s.FrameTitle      = "Sales report";
        s.AllowFullscreen = true;
        s.ShowLoader      = true;
    })
    .Build();
```

</details>

---

## Element Types

All element types share the following base properties from `BaseElementConfig`:

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `string` | Unique identifier |
| `Name` | `string` | Form field name |
| `Label` | `string?` | Display label |
| `LabelPosition` | `string?` | `"top"` \| `"left"` \| `"right"` \| `"hidden"` |
| `Tooltip` | `string?` | Tooltip text |
| `Order` | `int?` | Display order |
| `Width` | `object?` | CSS width string or column span `1`–`12` |
| `Units` | `string?` | Unit label (e.g. `"kg"`, `"$"`) |
| `UnitsPosition` | `string?` | `"prefix"` \| `"suffix"` |
| `Required` | `bool?` | Required validation flag |
| `Disabled` | `bool?` | Disabled state |
| `Readonly` | `bool?` | Read-only state |
| `Hidden` | `bool?` | Visibility toggle |
| `ClassName` | `string?` | Custom CSS class |
| `Style` | `Dictionary<string, object>?` | Inline styles |
| `Validations` | `List<ValidationRule>?` | Validation rules |

---

### `input` Element

<details>
<summary>InputElementConfig example</summary>

```csharp
var emailInput = new ElementBuilder<InputElementConfig>()
    .WithId("email").WithName("email").WithLabel("Email Address")
    .WithRequired()
    .Configure(e =>
    {
        e.InputType    = "email";   // "text"|"email"|"password"|"number"|"tel"|"url"|"date"|…
        e.Placeholder  = "user@example.com";
        e.Autocomplete = "email";
    })
    .Build();
```

Key properties: `InputType`, `Placeholder`, `DefaultValue`, `Value`, `Min`, `Max`, `Step`, `Multiple`, `Accept`, `Autocomplete`, `DatalistId`.

</details>

---

### `checkbox` Element

<details>
<summary>CheckboxElementConfig example</summary>

```csharp
var newsletter = new ElementBuilder<CheckboxElementConfig>()
    .WithId("newsletter").WithName("newsletter")
    .WithLabel("Subscribe to newsletter")
    .Configure(e => { e.DefaultChecked = true; e.Value = "yes"; e.LabelPosition = "right"; })
    .Build();
```

Key properties: `DefaultChecked`, `Checked`, `Value`.

</details>

---

### `radio` Element

<details>
<summary>RadioElementConfig example</summary>

```csharp
var accessLevel = new ElementBuilder<RadioElementConfig>()
    .WithId("access-level").WithName("accessLevel").WithLabel("Access Level")
    .Configure(e =>
    {
        e.Orientation  = "horizontal";
        e.DefaultValue = "viewer";
        e.Options      =
        [
            new RadioOption { Label = "Viewer", Value = "viewer" },
            new RadioOption { Label = "Editor", Value = "editor" },
            new RadioOption { Label = "Admin",  Value = "admin"  }
        ];
    })
    .Build();
```

Key properties: `Options`, `DefaultValue`, `Value`, `Orientation`.

</details>

---

### `textarea` Element

<details>
<summary>TextareaElementConfig example</summary>

```csharp
var bio = new ElementBuilder<TextareaElementConfig>()
    .WithId("bio").WithName("bio").WithLabel("Short Bio")
    .Configure(e => { e.Placeholder = "Tell us about yourself…"; e.Rows = 4; e.Resize = "vertical"; e.MaxLength = 500; })
    .Build();
```

Key properties: `Placeholder`, `DefaultValue`, `Value`, `Rows`, `Cols`, `Resize`, `MaxLength`.

</details>

---

### `select` Element

<details>
<summary>SelectElementConfig example (with option groups)</summary>

```csharp
var department = new ElementBuilder<SelectElementConfig>()
    .WithId("department").WithName("department").WithLabel("Department").WithRequired()
    .Configure(e =>
    {
        e.Placeholder = "Select a department";
        e.Options =
        [
            new SelectOptGroup
            {
                Label   = "Engineering",
                Options = [new SelectOption { Label = "Frontend", Value = "fe" }, new SelectOption { Label = "Backend", Value = "be" }]
            },
            new SelectOption { Label = "Marketing", Value = "marketing" }
        ];
    })
    .Build();
```

Key properties: `Options` (mix of `SelectOption` / `SelectOptGroup`), `Multiple`, `Size`, `DefaultValue`, `Value`, `Placeholder`.

</details>

---

### `button` Element

<details>
<summary>ButtonElementConfig example</summary>

```csharp
var submitBtn = new ElementBuilder<ButtonElementConfig>()
    .WithId("btn-submit").WithName("submit")
    .Configure(e =>
    {
        e.Text         = "Submit";
        e.ButtonType   = "submit";     // "button" | "submit" | "reset"
        e.Variant      = "default";    // "default"|"outline"|"ghost"|"destructive"|"secondary"|"link"
        e.Size         = "md";
        e.Icon         = "save";
        e.IconPosition = "left";
    })
    .Build();
```

</details>

---

### `label` Element

<details>
<summary>LabelElementConfig example</summary>

```csharp
var hint = new ElementBuilder<LabelElementConfig>()
    .WithId("hint").WithName("hint")
    .Configure(e => { e.Text = "All fields marked * are required."; e.HtmlFor = "email"; })
    .Build();
```

Key properties: `Text`, `HtmlFor`.

</details>

---

### `fieldset` Element

<details>
<summary>FieldsetElementConfig example</summary>

```csharp
var termsFieldset = new ElementBuilder<FieldsetElementConfig>()
    .WithId("terms-group").WithName("terms")
    .Configure(e =>
    {
        e.Legend   = "Terms & Conditions";
        e.Children =
        [
            new CheckboxElementConfig
            {
                Id = "accept-terms", Name = "acceptTerms",
                Label = "I accept the terms and conditions",
                LabelPosition = "right", Required = true
            }
        ];
    })
    .Build();
```

Key properties: `Legend`, `Children` (list of `BaseElementConfig`).

</details>

---

### `datalist` Element

<details>
<summary>DatalistElementConfig example</summary>

```csharp
var skillList = new ElementBuilder<DatalistElementConfig>()
    .WithId("skill-list").WithName("skillList")
    .Configure(e => e.Options = ["TypeScript", "React", "Node.js"])
    .Build();

// Reference it from an input element:
var skillInput = new ElementBuilder<InputElementConfig>()
    .WithId("skill-input").WithName("skill")
    .Configure(e => { e.DatalistId = "skill-list"; })
    .Build();
```

Key properties: `Options` (plain strings or `{ label, value }` pairs).

</details>

---

### `output` Element

<details>
<summary>OutputElementConfig example</summary>

```csharp
var total = new ElementBuilder<OutputElementConfig>()
    .WithId("total-display").WithName("totalDisplay").WithLabel("Total")
    .Configure(e =>
    {
        e.Format  = "currency";                  // "text" | "number" | "currency" | "percentage"
        e.Formula = "{price} * {quantity}";      // supports +, -, *, /
        e.HtmlFor = ["price", "quantity"];
    })
    .Build();
```

Key properties: `Value`, `DefaultValue`, `Format`, `HtmlFor`, `Formula`.

</details>

---

### `datepicker` Element

<details>
<summary>DatepickerElementConfig example</summary>

```csharp
var startDate = new ElementBuilder<DatepickerElementConfig>()
    .WithId("start-date").WithName("startDate").WithLabel("Start Date")
    .Configure(e => { e.Placeholder = "Pick a date"; e.Min = "2024-01-01"; e.Max = "2030-12-31"; e.IncludeTime = false; })
    .Build();
```

Key properties: `Value`, `DefaultValue`, `Placeholder`, `Min`, `Max`, `IncludeTime`.

</details>

---

### `multiselect` Element

<details>
<summary>MultiselectElementConfig example</summary>

```csharp
var skills = new ElementBuilder<MultiselectElementConfig>()
    .WithId("skills").WithName("skills").WithLabel("Skills")
    .Configure(e =>
    {
        e.Placeholder  = "Search skills…";
        e.MaxItems     = 5;
        e.DefaultValue = ["typescript"];
        e.Options      =
        [
            new SelectOption { Label = "TypeScript", Value = "typescript" },
            new SelectOption { Label = "React",      Value = "react"      }
        ];
    })
    .Build();
```

Key properties: `Options`, `Value`, `DefaultValue`, `Placeholder`, `MaxItems`.

</details>

---

### `autocomplete` Element

<details>
<summary>AutocompleteElementConfig example</summary>

```csharp
var city = new ElementBuilder<AutocompleteElementConfig>()
    .WithId("city").WithName("city").WithLabel("City")
    .Configure(e =>
    {
        e.Placeholder = "Start typing a city…";
        e.Options     =
        [
            new SelectOption { Label = "New York",    Value = "ny"  },
            new SelectOption { Label = "Los Angeles", Value = "la"  }
        ];
    })
    .Build();
```

Key properties: `Options`, `Value`, `DefaultValue`, `Placeholder`.

</details>

---

### `fileupload` Element

<details>
<summary>FileUploadElementConfig example</summary>

```csharp
var avatar = new ElementBuilder<FileUploadElementConfig>()
    .WithId("avatar").WithName("avatar").WithLabel("Profile Picture")
    .Configure(e => { e.Accept = "image/*"; e.Multiple = false; e.MaxSize = 5_242_880; e.Placeholder = "Drag a file here or click to browse"; })
    .Build();
```

Key properties: `Accept`, `Multiple`, `MaxSize`, `Placeholder`.

</details>

---

### `colorpicker` Element

<details>
<summary>ColorPickerElementConfig example</summary>

```csharp
var brandColor = new ElementBuilder<ColorPickerElementConfig>()
    .WithId("brand-color").WithName("brandColor").WithLabel("Brand Color")
    .Configure(e => { e.DefaultValue = "#6366f1"; e.Format = "hex"; })
    .Build();
```

Key properties: `Value`, `DefaultValue`, `Format` (`"hex"` | `"rgb"`).

</details>

---

### `rangeslider` Element

<details>
<summary>RangeSliderElementConfig example</summary>

```csharp
var priceRange = new ElementBuilder<RangeSliderElementConfig>()
    .WithId("price-range").WithName("priceRange").WithLabel("Price Range")
    .Configure(e => { e.Min = 0; e.Max = 1000; e.Step = 10; e.DefaultValue = [100, 500]; })
    .Build();
```

Key properties: `Min`, `Max`, `Step`, `Value` (`[min, max]`), `DefaultValue`.

</details>

---

### `rating` Element

<details>
<summary>RatingElementConfig example</summary>

```csharp
var rating = new ElementBuilder<RatingElementConfig>()
    .WithId("review-rating").WithName("reviewRating").WithLabel("Your Rating")
    .Configure(e => { e.Max = 5; e.DefaultValue = 3; e.AllowHalf = true; })
    .Build();
```

Key properties: `Max`, `Value`, `DefaultValue`, `AllowHalf`.

</details>

---

### `otpinput` Element

<details>
<summary>OtpInputElementConfig example</summary>

```csharp
var otp = new ElementBuilder<OtpInputElementConfig>()
    .WithId("otp").WithName("otp").WithLabel("One-Time Password")
    .Configure(e => { e.Length = 6; e.Mask = false; })
    .Build();
```

Key properties: `Length`, `Value`, `DefaultValue`, `Mask`.

</details>

---

### `phoneinput` Element

<details>
<summary>PhoneInputElementConfig example</summary>

```csharp
var phone = new ElementBuilder<PhoneInputElementConfig>()
    .WithId("mobile").WithName("mobile").WithLabel("Mobile Number")
    .Configure(e => { e.DefaultCountry = "US"; e.Placeholder = "+1 555 000 0000"; })
    .Build();
```

Key properties: `DefaultCountry`, `Value`, `DefaultValue`, `Placeholder`.

</details>

---

### `custom` Element

<details>
<summary>CustomElementConfig example</summary>

```csharp
var mapPicker = new ElementBuilder<CustomElementConfig>()
    .WithId("map-picker").WithName("location").WithLabel("Pick a location")
    .Configure(e =>
    {
        e.Component = "map-picker";   // must match a key in <UIStage customComponents={...} />
        e.Props     = new Dictionary<string, object>
        {
            ["defaultLat"] = 51.5074,
            ["defaultLng"] = -0.1278,
            ["zoom"]       = 12
        };
    })
    .Build();
```

Key properties: `Component` (key registered in the React host), `Props` (arbitrary forwarded data).

</details>

---

## Validation Rules

Attach validation rules to any element using `WithValidation` or the `Validations` property directly.

```csharp
var passwordInput = new ElementBuilder<InputElementConfig>()
    .WithId("password").WithName("password").WithLabel("Password").WithRequired()
    .WithValidation(new ValidationRule { Rule = "required",  Message = "Password is required" })
    .WithValidation(new ValidationRule { Rule = "minLength", Value = 8, Message = "At least 8 characters" })
    .WithValidation(new ValidationRule { Rule = "pattern",   Value = @"^(?=.*[A-Z])(?=.*\d).+$", Message = "Must contain one uppercase letter and one number" })
    .Configure(e => e.InputType = "password")
    .Build();
```

<details>
<summary>Logical group validation (AND / OR)</summary>

```csharp
var contactField = new ElementBuilder<InputElementConfig>()
    .WithId("contact").WithName("contact").WithLabel("Email or URL")
    .WithValidation(new ValidationRule { Rule = "required" })
    .WithValidation(new ValidationRule
    {
        Rule     = "group",
        Operator = "or",
        Rules    =
        [
            new ValidationRule { Rule = "email" },
            new ValidationRule { Rule = "url"   }
        ],
        Message  = "Must be a valid email or URL."
    })
    .Configure(e => e.InputType = "text")
    .Build();
```

</details>

| Rule | Extra field | Default error message |
|------|-------------|----------------------|
| `required` | — | "This field is required." |
| `min` | `Value: number \| string` | "Minimum value is {value}." |
| `max` | `Value: number \| string` | "Maximum value is {value}." |
| `minLength` | `Value: number` | "Minimum length is {value} characters." |
| `maxLength` | `Value: number` | "Maximum length is {value} characters." |
| `pattern` | `Value: string` (regex, no delimiters) | "Invalid format." |
| `email` | — | "Invalid email address." |
| `url` | — | "Invalid URL." |
| `phone` | — | "Invalid phone number." |
| `step` | `Value: number` | "Value must be a multiple of {value}." |
| `custom` | `Validator: string`, `Config?: object` | Resolved via the consumer's validator registry |
| `group` | `Operator: "and" \| "or"`, `Rules: ValidationRule[]` | Logical group |

---

## JSON Serialization

Models use `System.Text.Json` with built-in polymorphic serialization. Sections are discriminated by a `layout` field and elements by a `type` field, so round-trip serialization works out of the box.

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

var options = new JsonSerializerOptions
{
    WriteIndented          = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};

// Serialize
string json = JsonSerializer.Serialize(stage, options);

// Deserialize
UIStageConfig? restored = JsonSerializer.Deserialize<UIStageConfig>(json, options);

// Polymorphic section deserialization
string sectionJson = """{"layout":"grid","id":"g1","gridTemplateColumns":"1fr 1fr"}""";
BaseSectionConfig? section = JsonSerializer.Deserialize<BaseSectionConfig>(sectionJson);
// section is GridSectionConfig

// Polymorphic element deserialization
string elementJson = """{"type":"input","id":"e1","name":"email","inputType":"email"}""";
BaseElementConfig? element = JsonSerializer.Deserialize<BaseElementConfig>(elementJson);
// element is InputElementConfig
```

> **Tip:** Set `DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull` to omit null properties and keep the JSON compact.

---

## License

[MIT](LICENSE)
