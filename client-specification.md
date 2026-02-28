# client-specification.md — react-ubiquitous-NuGet

**Package:** `react-ubiquitous-NuGet` v1.0.7 · **Target framework:** .NET 8.0  
**Matches npm package:** `react-ubiquitous` (v1.0.14)

> **This document is the authoritative reference for the .NET NuGet package.**  
> You can use it without reading the README or examining the source code.  
> Every C# class, property, and JSON field name listed here is exactly what the package ships.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture Overview](#architecture-overview)
3. [Builders](#builders)
4. [Serialization](#serialization)
5. [Section Reference](#section-reference)
   - [Layout Sections](#layout-sections): Flex, Grid, Card, Hero, Accordion, Collapse, Divider
   - [Media & Content](#media--content): Media Carousel, Code Block, Iframe
   - [Navigation](#navigation): Navbar, Sidebar, Breadcrumbs, Pagination, Stepper, Tabs
   - [Data Display](#data-display): Table, Badge, Avatar, Timeline, Stat, List-Detail, Tree-View, Chat, Empty State
   - [Charts](#charts): Line, Area, Bar, Pie, Donut, Radar, Scatter
   - [Feedback & Overlays](#feedback--overlays): Alert, Progress, Skeleton, Toast, Modal, Drawer, Tooltip, Popover
6. [Element Reference](#element-reference)
7. [Validation Rules](#validation-rules)

---

## Getting Started

```bash
dotnet add package react-ubiquitous-NuGet
```

```csharp
using System.Text.Json;
using ReactUbiquitous.NuGet.Builders;
using ReactUbiquitous.NuGet.Models.Sections;
using ReactUbiquitous.NuGet.Models.Elements;

var stage = new StageBuilder()
    .WithId("my-app")
    .WithTitle("My Application")
    .WithDefaultPageId("home")
    .AddPage(
        new PageBuilder()
            .WithId("home").WithTitle("Home").WithOrder(0)
            .AddSection(
                new SectionBuilder<GridSectionConfig>()
                    .WithId("grid-1")
                    .Configure(s => s.GridTemplateColumns = "1fr 1fr")
                    .AddElement(new ElementBuilder<InputElementConfig>()
                        .WithId("name").WithName("name").WithLabel("Name").Build())
                    .Build())
            .Build())
    .Build();

var json = JsonSerializer.Serialize(stage, new JsonSerializerOptions { WriteIndented = true });
```

---

## Architecture Overview

```
UIStageConfig              ← top-level container
  └─ UIPageConfig[]        ← pages / tabs
       └─ BaseSectionConfig[]   ← layout sections
            └─ BaseElementConfig[]  ← form elements
```

The `layout` JSON field is the **type discriminator** for sections.  
The `type` JSON field is the **type discriminator** for elements.  
Both support polymorphic JSON serialization and deserialization out of the box.

---

## Builders

All builders are fluent and end with `.Build()`.

### `StageBuilder`

```csharp
var stage = new StageBuilder()
    .WithId("my-app")
    .WithTitle("My Application")
    .WithDescription("Description")
    .WithDefaultPageId("page-1")
    .WithTheme("dark")              // "light" | "dark" | "html" | "custom"
    .WithClassName("extra-class")
    .WithPageTransition("fade")     // "none" | "fade" | "slide-left" | "slide-right"
    .AddPage(page)
    .Build();
```

### `PageBuilder`

```csharp
var page = new PageBuilder()
    .WithId("page-1")
    .WithTitle("Page Title")
    .WithDescription("Description")
    .WithIcon("home")
    .WithOrder(0)
    .WithVisible(true)
    .WithClassName("extra-class")
    .AddSection(section)
    .Build();
```

### `SectionBuilder<T>`

```csharp
var section = new SectionBuilder<GridSectionConfig>()
    .WithId("my-grid")
    .WithTitle("Section Title")
    .WithOrder(0)
    .WithClassName("extra-class")
    .AddElement(element)
    .Configure(s => { s.GridTemplateColumns = "1fr 1fr"; s.Gap = "16px"; })
    .Build();
```

### `ElementBuilder<T>`

```csharp
var element = new ElementBuilder<InputElementConfig>()
    .WithId("email")
    .WithName("email")
    .WithLabel("Email Address")
    .WithRequired()
    .WithDisabled()
    .WithHidden()
    .WithOrder(0)
    .WithWidth(6)
    .WithClassName("extra-class")
    .WithTooltip("Enter your email")
    .WithValidation(new ValidationRule { Rule = "required", Message = "Required" })
    .Configure(e => { e.InputType = "email"; e.Placeholder = "user@example.com"; })
    .Build();
```

---

## Serialization

Use `System.Text.Json` directly — no additional configuration needed:

```csharp
var options = new JsonSerializerOptions
{
    WriteIndented          = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};

// Serialize
var json = JsonSerializer.Serialize(stage, options);

// Deserialize (full polymorphic support)
var stage = JsonSerializer.Deserialize<UIStageConfig>(json, options);
```

---

## Section Reference

All sections share these base properties from `BaseSectionConfig`:

| C# Property | JSON Field | Type | Description |
|---|---|---|---|
| `Id` | `"id"` | `string` | Unique identifier |
| `Title` | `"title"` | `string?` | Section heading |
| `Description` | `"description"` | `string?` | Supporting text |
| `Order` | `"order"` | `int?` | Display order |
| `ClassName` | `"className"` | `string?` | Extra CSS classes |
| `Style` | `"style"` | `Dictionary<string,object>?` | Inline styles |
| `Elements` | `"elements"` | `List<BaseElementConfig>?` | Child form elements |

---

### Layout Sections

#### `FlexSectionConfig` — `"layout":"flex"`

| C# Property | JSON Field | Type |
|---|---|---|
| `FlexDirection` | `"flexDirection"` | `string?` — `"row"` \| `"column"` |
| `FlexWrap` | `"flexWrap"` | `string?` |
| `JustifyContent` | `"justifyContent"` | `string?` |
| `AlignItems` | `"alignItems"` | `string?` |
| `Gap` | `"gap"` | `string?` |

#### `GridSectionConfig` — `"layout":"grid"`

| C# Property | JSON Field | Type |
|---|---|---|
| `GridTemplateColumns` | `"gridTemplateColumns"` | `string?` |
| `GridTemplateRows` | `"gridTemplateRows"` | `string?` |
| `Gap` | `"gap"` | `string?` |
| `AutoRows` | `"autoRows"` | `string?` |

#### `CardSectionConfig` — `"layout":"card"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Variant` | `"variant"` | `string?` — `"outlined"` \| `"elevated"` \| `"filled"` |
| `Padding` | `"padding"` | `string?` |
| `Shadow` | `"shadow"` | `string?` |

#### `HeroSectionConfig` — `"layout":"hero"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Heading` | `"heading"` | `string?` |
| `Subheading` | `"subheading"` | `string?` |
| `BackgroundImage` | `"backgroundImage"` | `string?` |
| `Overlay` | `"overlay"` | `bool?` |
| `MinHeight` | `"minHeight"` | `string?` |
| `Align` | `"align"` | `string?` — `"left"` \| `"center"` \| `"right"` |

#### `AccordionSectionConfig` — `"layout":"accordion"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Items` | `"items"` | `List<AccordionItem>?` |
| `Multiple` | `"multiple"` | `bool?` |

**`AccordionItem`**: `Id`, `Label`, `Description`, `DefaultOpen` (bool?), `Sections`, `Elements`

#### `CollapseSectionConfig` — `"layout":"collapse"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Label` | `"label"` | `string?` |
| `Description` | `"description"` | `string?` |
| `DefaultOpen` | `"defaultOpen"` | `bool?` |
| `Icon` | `"icon"` | `bool?` |

#### `DividerSectionConfig` — `"layout":"divider"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Label` | `"label"` | `string?` |
| `Orientation` | `"orientation"` | `string?` |
| `Variant` | `"variant"` | `string?` |

---

### Media & Content

#### `MediaSectionConfig` — `"layout":"media"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Items` | `"items"` | `List<MediaItem>?` |
| `AutoPlay` | `"autoPlay"` | `bool?` |
| `ShowDots` | `"showDots"` | `bool?` |
| `ShowArrows` | `"showArrows"` | `bool?` |
| `Height` | `"height"` | `string?` |

**`MediaItem`**: `Id`, `Src`, `Alt`, `Type` (`"image"` \| `"video"`), `Caption`

#### `CodeBlockSectionConfig` — `"layout":"code-block"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Code` | `"code"` | `string?` |
| `Language` | `"language"` | `string?` |
| `LineNumbers` | `"lineNumbers"` | `bool?` |
| `Copyable` | `"copyable"` | `bool?` |

#### `IframeSectionConfig` — `"layout":"iframe"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Src` | `"src"` | `string?` |
| `QueryParams` | `"queryParams"` | `Dictionary<string,object>?` |
| `FrameWidth` | `"frameWidth"` | `string?` |
| `FrameHeight` | `"frameHeight"` | `string?` |
| `FrameTitle` | `"frameTitle"` | `string?` |
| `Sandbox` | `"sandbox"` | `string?` |
| `AllowFullscreen` | `"allowFullscreen"` | `bool?` |
| `ShowLoader` | `"showLoader"` | `bool?` |

---

### Navigation

#### `NavbarSectionConfig` — `"layout":"navbar"`

| C# Property | JSON Field | Type |
|---|---|---|
| `LogoText` | `"logoText"` | `string?` |
| `LogoUrl` | `"logoUrl"` | `string?` |
| `Links` | `"links"` | `List<NavLink>?` |
| `Position` | `"position"` | `string?` — `"static"` \| `"sticky"` \| `"fixed"` |
| `Theme` | `"theme"` | `string?` |

**`NavLink`**: `Id`, `Label`, `Href` (`"href"`), `Active` (bool?)

#### `SidebarSectionConfig` — `"layout":"sidebar"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Items` | `"items"` | `List<SidebarItem>?` |
| `Collapsible` | `"collapsible"` | `bool?` |
| `DefaultCollapsed` | `"defaultCollapsed"` | `bool?` |
| `Width` | `"width"` | `string?` |
| `Position` | `"position"` | `string?` |
| `Variant` | `"variant"` | `string?` |

**`SidebarItem`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string` |
| `Label` | `"label"` | `string` |
| `Href` | `"href"` | `string?` |
| `Icon` | `"icon"` | `string?` |
| `Badge` | `"badge"` | `string?` |
| `Active` | `"active"` | `bool?` |
| `Children` | `"children"` | `List<SidebarItem>?` |

```csharp
s.Items =
[
    new SidebarItem { Id = "dashboard", Label = "Dashboard", Href = "/dashboard", Icon = "layout-dashboard", Active = true },
    new SidebarItem
    {
        Id = "settings", Label = "Settings", Icon = "settings",
        Children = [new SidebarItem { Id = "profile", Label = "Profile", Href = "/settings/profile" }]
    }
];
```

#### `BreadcrumbsSectionConfig` — `"layout":"breadcrumbs"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Items` | `"items"` | `List<BreadcrumbItem>?` |
| `Separator` | `"separator"` | `string?` |

**`BreadcrumbItem`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string?` |
| `Label` | `"label"` | `string` |
| `Href` | `"href"` | `string?` |
| `Icon` | `"icon"` | `string?` |

```csharp
s.Items =
[
    new BreadcrumbItem { Id = "home",     Label = "Home",     Href = "/" },
    new BreadcrumbItem { Id = "products", Label = "Products", Href = "/products" },
    new BreadcrumbItem { Id = "detail",   Label = "Widget Pro" }   // no Href → current page
];
```

#### `PaginationSectionConfig` — `"layout":"pagination"`

| C# Property | JSON Field | Type |
|---|---|---|
| `TotalItems` | `"totalItems"` | `int?` |
| `CurrentPage` | `"currentPage"` | `int?` |
| `PageSize` | `"pageSize"` | `int?` |
| `ShowFirstLast` | `"showFirstLast"` | `bool?` |
| `ShowPrevNext` | `"showPrevNext"` | `bool?` |
| `SiblingCount` | `"siblingCount"` | `int?` |
| `Variant` | `"variant"` | `string?` |

> **Note:** The React component calculates `totalPages` as `Math.ceil(totalItems / pageSize)`.  
> Always set `TotalItems` (not total pages).

```csharp
s.TotalItems   = 500;
s.PageSize     = 25;
s.CurrentPage  = 1;
s.ShowPrevNext = true;
```

#### `StepperSectionConfig` — `"layout":"stepper"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Steps` | `"steps"` | `List<StepItem>?` |
| `CurrentStep` | `"currentStep"` | `int?` |
| `Orientation` | `"orientation"` | `string?` |
| `Variant` | `"variant"` | `string?` |
| `Linear` | `"linear"` | `bool?` |

**`StepItem`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string` |
| `Label` | `"label"` | `string` |
| `Description` | `"description"` | `string?` |
| `Icon` | `"icon"` | `string?` |
| `Optional` | `"optional"` | `bool?` |
| `Sections` | `"sections"` | `List<BaseSectionConfig>?` |
| `Elements` | `"elements"` | `List<BaseElementConfig>?` |

```csharp
s.CurrentStep = 1;
s.Steps =
[
    new StepItem { Id = "s1", Label = "Account",  Description = "Create your account" },
    new StepItem { Id = "s2", Label = "Profile",  Description = "Fill in profile details" },
    new StepItem { Id = "s3", Label = "Confirm",  Description = "Review and confirm" }
];
```

#### `TabsSectionConfig` — `"layout":"tabs"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Tabs` | `"tabs"` | `List<TabItem>?` |
| `DefaultTabId` | `"defaultTabId"` | `string?` |
| `Variant` | `"variant"` | `string?` |
| `Orientation` | `"orientation"` | `string?` |

**`TabItem`**: `Id`, `Label`, `Icon`, `Disabled` (bool?), `Sections`, `Elements`

---

### Data Display

#### `TableSectionConfig` — `"layout":"table"`

Key fields: `Columns: List<TableColumn>?`, `Rows: List<Dictionary<string, object>>?`, `Searchable: bool?`, `PageSize: int?`, `EmptyMessage: string?`.

See full column/row configuration in the source or README.

#### `BadgeSectionConfig` — `"layout":"badge"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Badges` | `"badges"` | `List<BadgeItem>?` |
| `Appearance` | `"appearance"` | `string?` — `"subtle"` \| `"solid"` \| `"outline"` |
| `Size` | `"size"` | `string?` — `"sm"` \| `"md"` \| `"lg"` |

**`BadgeItem`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string?` |
| `Label` | `"label"` | `string?` |
| `Variant` | `"variant"` | `string?` |

```csharp
s.Badges =
[
    new BadgeItem { Id = "ts",    Label = "TypeScript", Variant = "primary" },
    new BadgeItem { Id = "react", Label = "React",      Variant = "info"    }
];
```

#### `AvatarSectionConfig` — `"layout":"avatar"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Avatars` | `"avatars"` | `List<AvatarItem>?` |
| `Size` | `"size"` | `string?` |
| `Stacked` | `"stacked"` | `bool?` |

**`AvatarItem`**: `Id`, `Initials`, `Src`, `Alt`, `Name`

#### `TimelineSectionConfig` — `"layout":"timeline"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Events` | `"events"` | `List<TimelineEvent>?` |
| `Orientation` | `"orientation"` | `string?` |
| `Alternating` | `"alternating"` | `bool?` |

**`TimelineEvent`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string` |
| `Title` | `"title"` | `string` |
| `Description` | `"description"` | `string?` |
| `Timestamp` | `"timestamp"` | `string?` |
| `Icon` | `"icon"` | `string?` |
| `Variant` | `"variant"` | `string?` — `"default"` \| `"primary"` \| `"success"` \| `"warning"` \| `"danger"` |

```csharp
s.Events =
[
    new TimelineEvent { Id = "e1", Title = "Project kicked off", Description = "Initial planning.", Timestamp = "Jan 2025", Icon = "🚀", Variant = "primary" },
    new TimelineEvent { Id = "e2", Title = "Beta released",      Timestamp = "Mar 2025", Variant = "success" }
];
```

#### `StatSectionConfig` — `"layout":"stat"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Stats` | `"stats"` | `List<StatItem>?` |
| `Columns` | `"columns"` | `int?` — grid column count (default: auto min 2) |

**`StatItem`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string?` |
| `Value` | `"value"` | `string?` — big primary value (e.g. `"1,234"`, `"98%"`) |
| `Label` | `"label"` | `string?` |
| `SubLabel` | `"subLabel"` | `string?` — optional supporting sub-label |
| `TrendDirection` | `"trendDirection"` | `string?` — `"up"` \| `"down"` \| `"neutral"` |
| `Trend` | `"trend"` | `string?` — display string e.g. `"+12%"` |
| `Icon` | `"icon"` | `string?` |

```csharp
s.Stats =
[
    new StatItem { Id = "s1", Label = "Total Users", Value = "1,234", Trend = "+12%", TrendDirection = "up",   Icon = "👥" },
    new StatItem { Id = "s2", Label = "Revenue",     Value = "$98,500", Trend = "-3%", TrendDirection = "down" }
];
```

#### `ListDetailSectionConfig` — `"layout":"list-detail"`

See full configuration in the source or README.

#### `TreeViewSectionConfig` — `"layout":"tree-view"`

See full configuration in the source or README.

#### `ChatSectionConfig` — `"layout":"chat"`

See full configuration in the source or README.

#### `EmptyStateSectionConfig` — `"layout":"empty-state"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Heading` | `"heading"` | `string?` |
| `Message` | `"message"` | `string?` |
| `Icon` | `"icon"` | `string?` |
| `ActionLabel` | `"actionLabel"` | `string?` |
| `ActionHref` | `"actionHref"` | `string?` |

---

### Charts

All chart section classes emit **`"layout":"chart"`** in JSON, plus a `"chartType"` field.  
Use the strongly-typed subclass for IDE support; the correct `chartType` is set automatically.

| C# Class | `chartType` value |
|---|---|
| `LineChartSectionConfig` | `"line"` |
| `AreaChartSectionConfig` | `"area"` |
| `BarChartSectionConfig` | `"bar"` |
| `PieChartSectionConfig` | `"pie"` |
| `DonutChartSectionConfig` | `"donut"` |
| `RadarChartSectionConfig` | `"radar"` |
| `ScatterChartSectionConfig` | `"scatter"` |

You can also use `ChartSectionConfig` directly and set `ChartType` manually.

**`ChartSectionConfig`** fields (all chart types):

| C# Property | JSON Field | Type | Description |
|---|---|---|---|
| `ChartType` | `"chartType"` | `string?` | Set automatically by subclass constructors |
| `Data` | `"data"` | `List<ChartDataPoint>?` | Flat array of data points (x-axis labels + values) |
| `Series` | `"series"` | `List<ChartSeries>?` | Named series configuration |
| `ShowGrid` | `"showGrid"` | `bool?` | Show horizontal grid lines |
| `ShowLegend` | `"showLegend"` | `bool?` | Show series legend |
| `ShowLabels` | `"showLabels"` | `bool?` | Slice/bar value labels |
| `Height` | `"height"` | `object?` | Chart height (px or CSS string) |
| `Colors` | `"colors"` | `List<string>?` | Override palette |
| `Stacked` | `"stacked"` | `bool?` | Stack series |
| `Smooth` | `"smooth"` | `bool?` | Smooth curves (line / area) |
| `ShowPoints` | `"showPoints"` | `bool?` | Show data-point markers (line) |
| `FillOpacity` | `"fillOpacity"` | `double?` | Fill transparency 0–1 (area) |
| `Horizontal` | `"horizontal"` | `bool?` | Horizontal bars (bar) |
| `BarRadius` | `"barRadius"` | `int?` | Bar corner radius (bar) |
| `InnerRadius` | `"innerRadius"` | `object?` | Donut hole size (donut) |
| `CenterLabel` | `"centerLabel"` | `string?` | Center text (donut) |
| `Filled` | `"filled"` | `bool?` | Fill area (radar) |
| `ShowLine` | `"showLine"` | `bool?` | Draw line through points (scatter) |
| `XAxisLabel` | `"xAxisLabel"` | `string?` | x-axis title |
| `YAxisLabel` | `"yAxisLabel"` | `string?` | y-axis title |
| `ShowTooltip` | `"showTooltip"` | `bool?` | Show hover tooltips |

**`ChartSeries`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Key` | `"key"` | `string` — matches a numeric property in each `ChartDataPoint` |
| `Label` | `"label"` | `string?` — legend label |
| `Color` | `"color"` | `string?` — CSS color override |

**`ChartDataPoint`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Label` | `"label"` | `string` — category axis value (e.g. `"Jan"`) |
| `Value` | `"value"` | `double?` — primary numeric value |

```csharp
// Bar chart
var barChart = new SectionBuilder<BarChartSectionConfig>()
    .WithId("sales")
    .Configure(s =>
    {
        s.Data =
        [
            new ChartDataPoint { Label = "Jan", Value = 12000 },
            new ChartDataPoint { Label = "Feb", Value = 15000 },
            new ChartDataPoint { Label = "Mar", Value = 11000 }
        ];
        s.Series     = [new ChartSeries { Key = "value", Label = "Revenue", Color = "#6366f1" }];
        s.ShowLegend = true;
        s.Height     = 300;
        s.BarRadius  = 4;
    })
    .Build();

// Produces JSON:
// { "layout":"chart", "chartType":"bar", "data":[{"label":"Jan","value":12000},...], "series":[{"key":"value","label":"Revenue","color":"#6366f1"}], ... }
```

---

### Feedback & Overlays

#### `AlertSectionConfig` — `"layout":"alert"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Message` | `"message"` | `string?` |
| `Severity` | `"severity"` | `string?` — `"info"` \| `"success"` \| `"warning"` \| `"error"` |
| `Dismissible` | `"dismissible"` | `bool?` |
| `Icon` | `"icon"` | `string?` |
| `Variant` | `"variant"` | `string?` |

```csharp
s.Severity    = "success";
s.Dismissible = true;
s.Icon        = "check-circle";
```

#### `ProgressSectionConfig` — `"layout":"progress"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Variant` | `"variant"` | `string?` — `"linear"` \| `"circular"` |
| `Value` | `"value"` | `double?` |
| `ShowLabel` | `"showLabel"` | `bool?` |
| `Size` | `"size"` | `string?` |
| `Color` | `"color"` | `string?` |
| `Indeterminate` | `"indeterminate"` | `bool?` |

#### `SkeletonSectionConfig` — `"layout":"skeleton"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Shape` | `"shape"` | `string?` — `"text"` \| `"rect"` \| `"circle"` |
| `Lines` | `"lines"` | `int?` |
| `Animation` | `"animation"` | `string?` — `"pulse"` \| `"wave"` \| `"none"` |
| `Width` | `"width"` | `object?` |
| `Height` | `"height"` | `object?` |

```csharp
s.Shape  = "rect";
s.Lines  = 3;
s.Width  = "100%";
s.Height = "120px";
```

#### `ToastSectionConfig` — `"layout":"toast"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Message` | `"message"` | `string?` |
| `Severity` | `"severity"` | `string?` |
| `Duration` | `"duration"` | `int?` |
| `Position` | `"position"` | `string?` |
| `Dismissible` | `"dismissible"` | `bool?` |

#### `ModalSectionConfig` — `"layout":"modal"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Title` | `"title"` | `string?` |
| `Trigger` | `"trigger"` | `string?` |
| `Size` | `"size"` | `string?` |
| `DefaultOpen` | `"defaultOpen"` | `bool?` |
| `Sections` | `"sections"` | `List<BaseSectionConfig>?` |

#### `DrawerSectionConfig` — `"layout":"drawer"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Title` | `"title"` | `string?` |
| `Anchor` | `"anchor"` | `string?` — `"left"` \| `"right"` \| `"top"` \| `"bottom"` |
| `Width` | `"width"` | `string?` |
| `DefaultOpen` | `"defaultOpen"` | `bool?` |
| `Sections` | `"sections"` | `List<BaseSectionConfig>?` |

#### `TooltipSectionConfig` — `"layout":"tooltip"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Content` | `"content"` | `string?` |
| `Placement` | `"placement"` | `string?` |
| `Trigger` | `"trigger"` | `string?` |

#### `PopoverSectionConfig` — `"layout":"popover"`

| C# Property | JSON Field | Type |
|---|---|---|
| `Content` | `"content"` | `string?` |
| `Title` | `"title"` | `string?` |
| `Trigger` | `"trigger"` | `string?` |
| `Placement` | `"placement"` | `string?` |

---

## Element Reference

All elements share these base properties from `BaseElementConfig`:

| C# Property | JSON Field | Type |
|---|---|---|
| `Id` | `"id"` | `string` |
| `Name` | `"name"` | `string` |
| `Type` | `"type"` | `string` — discriminant, set by constructor |
| `Label` | `"label"` | `string?` |
| `LabelPosition` | `"labelPosition"` | `string?` |
| `Tooltip` | `"tooltip"` | `string?` |
| `Order` | `"order"` | `int?` |
| `Width` | `"width"` | `object?` |
| `Required` | `"required"` | `bool?` |
| `Disabled` | `"disabled"` | `bool?` |
| `Readonly` | `"readonly"` | `bool?` |
| `Hidden` | `"hidden"` | `bool?` |
| `ClassName` | `"className"` | `string?` |
| `Style` | `"style"` | `Dictionary<string,object>?` |
| `Validations` | `"validations"` | `List<ValidationRule>?` |

### Element Types Quick Reference

| C# Class | `type` value | Key extra properties |
|---|---|---|
| `InputElementConfig` | `"input"` | `InputType`, `Placeholder`, `DefaultValue`, `Min`, `Max`, `Autocomplete` |
| `CheckboxElementConfig` | `"checkbox"` | `DefaultChecked`, `Checked`, `Value` |
| `RadioElementConfig` | `"radio"` | `Options` (`List<RadioOption>`) |
| `TextareaElementConfig` | `"textarea"` | `Placeholder`, `Rows`, `MaxLength` |
| `SelectElementConfig` | `"select"` | `Options` (`List<SelectOption>`), `Multiple` |
| `ButtonElementConfig` | `"button"` | `ButtonType`, `Variant`, `OnClick` |
| `LabelElementConfig` | `"label"` | `Text`, `For` |
| `FieldsetElementConfig` | `"fieldset"` | `Legend`, `Elements` |
| `DatalistElementConfig` | `"datalist"` | `Options`, `DatalistId` |
| `OutputElementConfig` | `"output"` | `For`, `DefaultValue` |
| `DatepickerElementConfig` | `"datepicker"` | `MinDate`, `MaxDate`, `Format` |
| `MultiselectElementConfig` | `"multiselect"` | `Options`, `MaxSelections` |
| `AutocompleteElementConfig` | `"autocomplete"` | `Options`, `Freesolo` |
| `FileUploadElementConfig` | `"fileupload"` | `Accept`, `Multiple`, `MaxSize` |
| `ColorPickerElementConfig` | `"colorpicker"` | `DefaultColor`, `Format` |
| `RangeSliderElementConfig` | `"rangeslider"` | `Min`, `Max`, `Step`, `DefaultValue` |
| `RatingElementConfig` | `"rating"` | `MaxRating`, `DefaultValue`, `Precision` |
| `OtpInputElementConfig` | `"otpinput"` | `Length`, `InputType` |
| `PhoneInputElementConfig` | `"phoneinput"` | `DefaultCountry`, `Format` |
| `CustomElementConfig` | `"custom"` | `Component`, `Props` |

---

## Validation Rules

```csharp
var element = new ElementBuilder<InputElementConfig>()
    .WithId("age").WithName("age")
    .WithValidation(new ValidationRule { Rule = "required",  Message = "Age is required" })
    .WithValidation(new ValidationRule { Rule = "min",       Value = "18", Message = "Must be 18 or older" })
    .WithValidation(new ValidationRule { Rule = "max",       Value = "120" })
    .Build();
```

**`ValidationRule`** fields:

| C# Property | JSON Field | Type |
|---|---|---|
| `Rule` | `"rule"` | `string` — e.g. `"required"`, `"min"`, `"max"`, `"minLength"`, `"maxLength"`, `"pattern"`, `"email"` |
| `Value` | `"value"` | `string?` — threshold for min/max/length/pattern rules |
| `Message` | `"message"` | `string?` — user-facing error message |

---

## Full JSON shape example

```json
{
  "id": "my-app",
  "title": "My Application",
  "defaultPageId": "home",
  "pages": [
    {
      "id": "home",
      "title": "Home",
      "order": 0,
      "visible": true,
      "sections": [
        {
          "layout": "stat",
          "id": "kpis",
          "stats": [
            { "id": "s1", "label": "Users", "value": "1,234", "trend": "+12%", "trendDirection": "up" }
          ]
        },
        {
          "layout": "chart",
          "id": "revenue-chart",
          "chartType": "bar",
          "height": 300,
          "series": [
            {
              "label": "Revenue",
              "data": [
                { "label": "Jan", "value": 12000 },
                { "label": "Feb", "value": 15000 }
              ]
            }
          ]
        },
        {
          "layout": "timeline",
          "id": "activity",
          "events": [
            { "id": "e1", "title": "Launched", "timestamp": "Jan 2025", "color": "green" }
          ]
        }
      ]
    }
  ]
}
```
