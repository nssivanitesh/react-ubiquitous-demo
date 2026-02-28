# API Specification — react-ubiquitous UI Config

**Library version: `1.0.14`** · npm package: [`react-ubiquitous`](https://www.npmjs.com/package/react-ubiquitous)

> **The frontend is just a human-readable version of the API response.**

This document is the **definitive, framework-neutral reference** for the JSON
contract that any backend — regardless of language or runtime — must produce so
that a `react-ubiquitous` frontend can render a complete, data-driven UI without
any bespoke frontend changes.

This specification is intended for distribution to engineering teams generating
**builder classes** and **SDK packages** for backend platforms.  The JSON schema
described in [Section 3](#3-json-schema-reference) is stable across all platforms
and guaranteed accurate for library version `1.0.14`.

Backend teams can implement this contract in any language:

| Platform | Package / Distribution |
|---|---|
| .NET / C# | NuGet — `ReactUbiquitous.Models` (builder classes) |
| Java / Spring Boot | Maven Central / Gradle — Jackson-annotated POJOs |
| Python | PyPI — Pydantic v2 models |
| PHP / Laravel | Composer — fluent builder classes |
| Node.js / TypeScript | npm — `react-ubiquitous` ships TypeScript types natively |

The only requirement is that your API endpoint returns valid JSON that conforms
to the schema described in [Section 3](#3-json-schema-reference).

---

## Table of Contents

1. [Overview](#overview)
2. [Common Conventions](#common-conventions)
3. [Stage Configuration Endpoint](#1-stage-configuration-endpoint)
4. [List-Detail Section Endpoints](#2-list-detail-section-endpoints)
   - [List Endpoint](#21-list-endpoint)
   - [Filter / Search Endpoint](#22-filter--search-endpoint)
   - [Detail Endpoint](#23-detail-endpoint)
5. [JSON Schema Reference](#3-json-schema-reference)
   - [UIStageConfig](#uistageconfig)
   - [UIPageConfig](#uipageconfig)
   - [UISectionConfig](#uisectionconfig)
     - [Flex Section](#flex-section)
     - [Grid Section](#grid-section)
     - [Hero Section](#hero-section)
     - [Media Carousel Section](#media-carousel-section)
     - [List-Detail Section](#list-detail-section)
     - [Tree-View Section](#tree-view-section)
     - [Chat Section](#chat-section)
     - [Navbar Section](#navbar-section)
     - [Sidebar Section](#sidebar-section)
     - [Breadcrumbs Section](#breadcrumbs-section)
     - [Pagination Section](#pagination-section)
     - [Stepper Section](#stepper-section)
     - [Tabs Section](#tabs-section)
     - [Alert Section](#alert-section)
     - [Progress Section](#progress-section)
     - [Skeleton Section](#skeleton-section)
     - [Toast Section](#toast-section)
     - [Modal Section](#modal-section)
     - [Drawer Section](#drawer-section)
     - [Tooltip Section](#tooltip-section)
     - [Popover Section](#popover-section)
     - [Accordion Section](#accordion-section)
     - [Collapse / Spoiler Section](#collapse--spoiler-section)
     - [Divider Section](#divider-section)
     - [Card Section](#card-section)
     - [Table Section](#table-section)
     - [Badge Section](#badge-section)
     - [Avatar Section](#avatar-section)
     - [Timeline Section](#timeline-section)
     - [Stat Section](#stat-section)
     - [Empty State Section](#empty-state-section)
     - [Code Block Section](#code-block-section)
     - [Chart Section](#chart-section)
     - [Iframe Section](#iframe-section)
   - [UIElementConfig](#uielementconfig)
     - [Common Fields (BaseElementConfig)](#common-fields-baseelementconfig)
     - [input](#input)
     - [checkbox](#checkbox)
     - [radio](#radio)
     - [textarea](#textarea)
     - [select](#select)
     - [button](#button)
     - [label](#label)
     - [fieldset](#fieldset)
     - [datalist](#datalist)
     - [output](#output)
     - [datepicker](#datepicker)
     - [multiselect](#multiselect)
     - [autocomplete](#autocomplete)
     - [fileupload](#fileupload)
     - [colorpicker](#colorpicker)
     - [rangeslider](#rangeslider)
     - [rating](#rating)
     - [otpinput](#otpinput)
     - [phoneinput](#phoneinput)
     - [custom](#custom)
   - [Validation Rules](#validation-rules)
6. [Full Example Response](#4-full-example-response)
7. [Access Control Contract](#5-access-control-contract)
8. [Backend Implementation Guide](#6-backend-implementation-guide)
   - [.NET / C# (NuGet)](#61-net--c-nuget)
   - [Java / Spring Boot (Maven / Gradle)](#62-java--spring-boot-maven--gradle)
   - [Python (PyPI)](#63-python-pypi)
   - [PHP / Laravel (Composer)](#64-php--laravel-composer)

---

## Overview

The **ubiquitous UI Config** contract lets any backend return a single JSON
object that a `react-ubiquitous` frontend renders into a complete, interactive
application. The frontend defines **layout patterns** (field types, section
layouts, page structures). The backend **adheres to those patterns** by returning
data shaped to match.

No frontend code changes are needed when layouts or permissions change — only
the JSON returned by the backend changes.

### Frontend setup

Install the package and import the bundled stylesheet once — all utility CSS and
theme tokens are included:

```bash
npm install react-ubiquitous
```

```ts
// main.tsx (or your app entry)
import 'react-ubiquitous/styles.css'
import { UIStage } from 'react-ubiquitous'
```

Consumers using **Tailwind CSS v4** who want their own Tailwind build to generate
the utility classes should add an `@source` directive instead:

```css
/* src/index.css */
@import "tailwindcss";
@source "../node_modules/react-ubiquitous/dist/react-ubiquitous.mjs";
```

### Hierarchy

```
UIStageConfig           ← top-level container (like a worksheet)
 └─ UIPageConfig[]      ← tabs / pages inside the stage
     └─ UISectionConfig[]  ← layout containers (flex | grid | hero | media | list-detail | accordion | collapse | divider | card)
         └─ UIElementConfig[]  ← individual form controls and display elements
```

---

## Common Conventions

| Convention | Value |
|---|---|
| Base URL | Agreed per deployment (e.g. `https://api.example.com`) |
| Protocol | HTTPS |
| Data format | `application/json` |
| Authentication | Bearer token in `Authorization` header (or as agreed) |
| Date format | ISO 8601 — date-only fields use `YYYY-MM-DD`; datetime fields use `YYYY-MM-DDTHH:mm:ssZ` |
| Error format | `{ "error": "<message>", "code": "<error_code>" }` |
| HTTP status codes | Standard (`200 OK`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`) |

---

## 1. Stage Configuration Endpoint

### `GET /stages/{stageId}`

Returns a complete `UIStageConfig` object. The frontend passes this directly to
`<UIStage config={...} />` — no transformation needed.

**Path parameters**

| Parameter | Type | Description |
|---|---|---|
| `stageId` | `string` | Unique identifier of the stage to load |

**Query parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `userId` | `string` | Optional | When provided, backend filters pages/elements for that user (access control by omission) |

**Response — `200 OK`**

```json
Content-Type: application/json

{
  "id": "onboarding",
  "title": "Project Onboarding",
  "description": "Complete all sections to set up your team and project.",
  "defaultPageId": "page-personal",
  "pages": [ ...UIPageConfig[] ]
}
```

The full JSON schema is defined in [UIStageConfig](#uistageconfig).

**Example request**

```http
GET /stages/onboarding HTTP/1.1
Authorization: Bearer <token>
Accept: application/json
```

**Error responses**

| Status | When |
|---|---|
| `401` | Missing or invalid token |
| `403` | Caller is not allowed to view this stage |
| `404` | Stage with the given `stageId` does not exist |

---

## 2. List-Detail Section Endpoints

The `list-detail` section type (`layout: "list-detail"`) uses three optional
endpoint configurations — `listEndpoint`, `filterEndpoint`, and
`detailEndpoint` — that the frontend constructs URLs from at runtime.

### 2.1 List Endpoint

Specified by `listEndpoint` inside a `ListDetailSectionConfig`.

**`GET {listEndpoint.url}?{fromParam}={fromValue}&{toParam}={toValue}&{sortParam}={sortValue}`**

Default query parameter names and values (all overridable in the config):

| Config field | Default param name | Default value |
|---|---|---|
| `fromParam` | `from` | `1` |
| `toParam` | `to` | `100` |
| `sortParam` | `sort` | `asc` |

**Example URL (defaults)**

```
GET /contacts?from=1&to=50&sort=asc
```

**Response — `200 OK`**

Returns an array of `ListDetailItem` objects:

```json
[
  {
    "id": "c1",
    "label": "Alice Smith",
    "sublabel": "alice@acme.com",
    "avatar": "AS",
    "badge": "Admin"
  },
  {
    "id": "c2",
    "label": "Bob Jones",
    "sublabel": "bob@acme.com"
  }
]
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique item identifier |
| `label` | `string` | **Yes** | Primary text shown in the list row |
| `sublabel` | `string` | No | Secondary text shown below `label` |
| `avatar` | `string` | No | Image URL (must start with `http://` or `https://`) **or** initials string (≤ 2 characters, e.g. `"AB"`). The frontend distinguishes between the two by checking for a URL prefix. |
| `badge` | `string` | No | Short status badge text |

---

### 2.2 Filter / Search Endpoint

Specified by `filterEndpoint` inside a `ListDetailSectionConfig`.

**`GET {filterEndpoint.url}?{queryParam}={searchText}`**

Default query parameter name (overridable):

| Config field | Default param name |
|---|---|
| `queryParam` | `query` |

**Example URL (defaults)**

```
GET /contacts/search?query=alice
```

**Response — `200 OK`**

Same shape as the [List Endpoint](#21-list-endpoint) response — an array of
`ListDetailItem` objects filtered to match the search text.

---

### 2.3 Detail Endpoint

Specified by `detailEndpoint` inside a `ListDetailSectionConfig`.

**`GET {detailEndpoint.url}?{selectedParam}={itemId}`**

Default query parameter name (overridable):

| Config field | Default param name |
|---|---|
| `selectedParam` | `selected` |

**Example URL (defaults)**

```
GET /contacts?selected=c1
```

**Response — `200 OK`**

A flat JSON object whose **keys match the `name` fields** of the elements
defined in `detailPages`. The renderer uses this object to populate field
values in the right-hand detail panel.

```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@acme.com",
  "phone": "+1 555 000 0001",
  "notes": "Key account contact."
}
```

> **Tip:** Return only the fields the caller is allowed to see.
> The renderer silently ignores keys that do not correspond to any element `name`.

---

## 3. JSON Schema Reference

All types below are TypeScript interfaces exported by `react-ubiquitous`.
They map 1-to-1 to the JSON objects that the backend must return.

---

### UIStageConfig

```json
{
  "id": "string",               // required — unique stage identifier
  "title": "string",            // optional — heading above the tab bar
  "description": "string",      // optional — subtitle
  "defaultPageId": "string",    // optional — id of the tab to show first
  "pages": [ ...UIPageConfig ], // required — ordered list of pages/tabs
  "theme": "light",             // optional — "light" | "dark" | "html" | "custom"
  "className": "string",        // optional — extra CSS classes on the stage wrapper (useful with theme: "custom")
  "pageTransition": "none"      // optional — "none" | "fade" | "slide-left" | "slide-right" (default "none")
}
```

**`theme` values**

| Value | Description |
|---|---|
| `"light"` | Default Tailwind light-mode CSS classes |
| `"dark"` | Default Tailwind dark-mode CSS classes |
| `"html"` | Plain HTML — no extra CSS applied |
| `"custom"` | CSS classes are supplied via the `className` field |

**`pageTransition` values**

| Value | Description |
|---|---|
| `"none"` | Instant tab switch — no animation (default) |
| `"fade"` | Incoming page fades in |
| `"slide-left"` | New page slides in from the right (forward navigation) |
| `"slide-right"` | New page slides in from the left (backward navigation) |

---

### UIPageConfig

```json
{
  "id": "string",                    // required
  "title": "string",                 // required — tab label
  "description": "string",           // optional — subtitle or tab tooltip
  "icon": "string",                  // optional — Lucide icon name, e.g. "user"
  "order": 1,                        // required — sort order (ascending)
  "sections": [ ...UISectionConfig ],// required
  "className": "string",             // optional — extra CSS classes
  "visible": true                    // optional — hide from tab bar when false (default true)
}
```

---

### UISectionConfig

All sections share these base fields:

```json
{
  "id": "string",                  // required
  "layout": "flex|grid|hero|media|list-detail|tree-view|chat|navbar|sidebar|breadcrumbs|pagination|stepper|tabs|alert|progress|skeleton|toast|modal|drawer|tooltip|popover|accordion|collapse|divider|card|table|badge|avatar|timeline|stat|empty-state|code-block|chart|iframe", // required — discriminant
  "title": "string",               // optional — heading above the section
  "description": "string",         // optional — subtitle
  "order": 1,                      // optional — sort order within the page
  "className": "string",           // optional
  "style": { "color": "red" },     // optional — inline CSS (key: camelCase)
  "elements": [ ...UIElementConfig ] // optional — form controls inside the section
}
```

#### Flex Section

`layout: "flex"` — renders children in a CSS flexbox.

> **Default gap:** When `gap` is omitted, `0.75rem` (12 px) is applied automatically so elements never appear shoulder-to-shoulder out of the box. Set `rowGap` or `columnGap` to override individual dimensions, or set `gap: "0"` to remove all spacing.

```json
{
  "id": "toolbar",
  "layout": "flex",
  "order": 1,
  "flexDirection": "row",          // "row" | "column" | "row-reverse" | "column-reverse"
  "flexWrap": "wrap",              // "nowrap" | "wrap" | "wrap-reverse"
  "justifyContent": "flex-start",  // "flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly"
  "alignItems": "center",          // "flex-start"|"flex-end"|"center"|"stretch"|"baseline"|"start"|"end"
  "alignContent": "stretch",       // "flex-start"|"flex-end"|"center"|"stretch"|"space-between"|"space-around"
  "gap": "0.75rem",                // shorthand gap (default: "0.75rem")
  "rowGap": "0.5rem",              // row-gap override
  "columnGap": "1rem",             // column-gap override
  "elements": []
}
```

#### Grid Section

`layout: "grid"` — renders children in a CSS grid.

> **Default gap:** When `gap` is omitted, `1rem` (16 px) is applied automatically so cells never appear shoulder-to-shoulder out of the box. Set `rowGap` or `columnGap` to override individual dimensions, or set `gap: "0"` to remove all spacing.

```json
{
  "id": "details",
  "layout": "grid",
  "order": 1,
  "gridTemplateColumns": "repeat(3, 1fr)",
  "gridTemplateRows": "auto",
  "gap": "1rem",                   // shorthand gap (default: "1rem")
  "rowGap": "0.5rem",              // row-gap override
  "columnGap": "1.5rem",           // column-gap override
  "alignItems": "start",   // "flex-start"|"flex-end"|"center"|"stretch"|"baseline"|"start"|"end"
  "justifyItems": "stretch", // "start"|"end"|"center"|"stretch"
  "elements": []
}
```

#### Hero Section

`layout: "hero"` — a full-width banner with a background, title, and optional
call-to-action link.

```json
{
  "id": "banner",
  "layout": "hero",
  "order": 1,
  "title": "Welcome back",
  "subtitle": "Here is what happened while you were away.",
  "description": "Your dashboard shows the latest activity.",

  "backgroundType": "gradient",    // "gradient" | "color" | "image"
  "gradientFrom": "#6366f1",       // used when backgroundType === "gradient"
  "gradientTo": "#1e293b",
  "gradientDirection": "to bottom right",
  "backgroundColor": "#1e293b",    // used when backgroundType === "color"
  "backgroundImage": "https://example.com/bg.jpg", // used when backgroundType === "image"

  "overlay": true,                 // dark overlay over background
  "overlayOpacity": 40,            // 0–100

  "minHeight": "320px",
  "textAlign": "center",           // "left" | "center" | "right"
  "verticalAlign": "center",       // "top" | "center" | "bottom"

  "linkText": "Learn more",
  "linkUrl": "https://example.com",
  "linkRelative": false,           // true = same tab, no rel attribute

  "elements": []
}
```

#### Media Carousel Section

`layout: "media"` — an accessible image/video carousel.

```json
{
  "id": "gallery",
  "layout": "media",
  "order": 1,
  "aspectRatio": "16/9",   // any CSS aspect-ratio, e.g. "4/3", "1/1"
  "showArrows": true,
  "showDots": true,
  "items": [
    {
      "id": "img-1",
      "type": "image",               // "image" | "video"
      "url": "https://example.com/photo.jpg",
      "alt": "A product photo",
      "caption": "Optional overlay caption"
    },
    {
      "id": "vid-1",
      "type": "video",
      "url": "https://example.com/demo.mp4",
      "caption": "Product walkthrough"
    }
  ],
  "elements": []
}
```

#### List-Detail Section

`layout: "list-detail"` — a master-list / detail-panel layout. The left pane
shows a searchable, paginated list; the right pane renders one or more detail
pages with form sections.

```json
{
  "id": "contacts",
  "layout": "list-detail",
  "order": 1,

  "listTitle": "Contacts",
  "listWidth": "280px",
  "pageSize": 50,

  "listItems": [
    { "id": "c1", "label": "Alice Smith", "sublabel": "alice@acme.com", "badge": "Admin" },
    { "id": "c2", "label": "Bob Jones",   "sublabel": "bob@acme.com" }
  ],

  "listEndpoint": {
    "url": "https://api.example.com/contacts",
    "fromParam": "from",
    "fromValue": 1,
    "toParam": "to",
    "toValue": 50,
    "sortParam": "sort",
    "sortValue": "asc"
  },

  "filterEndpoint": {
    "url": "https://api.example.com/contacts/search",
    "queryParam": "query"
  },

  "detailEndpoint": {
    "url": "https://api.example.com/contacts",
    "selectedParam": "selected"
  },

  "detailPages": [
    {
      "id": "dp-overview",
      "title": "Overview",
      "order": 1,
      "sections": [
        {
          "id": "dp-name",
          "layout": "grid",
          "order": 1,
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "1rem",
          "elements": [
            { "id": "dp-first", "name": "firstName", "type": "input", "inputType": "text", "label": "First name", "order": 1 },
            { "id": "dp-last",  "name": "lastName",  "type": "input", "inputType": "text", "label": "Last name",  "order": 2 }
          ]
        }
      ]
    }
  ],

  "elements": []
}
```

#### Tree-View Section

`layout: "tree-view"` — a tree-and-detail view. The left pane shows an
expandable / collapsible hierarchy of nodes; the right pane renders a detail
panel for the selected node.

```json
{
  "id": "org-tree",
  "layout": "tree-view",
  "order": 1,

  "treeTitle": "Organization",
  "treeWidth": "260px",
  "treeMode": "easy",

  "treeNodes": [
    {
      "id": "dept-eng",
      "label": "Engineering",
      "badge": "12",
      "children": [
        { "id": "team-fe",  "label": "Frontend",  "sublabel": "4 members" },
        { "id": "team-be",  "label": "Backend",   "sublabel": "8 members" }
      ]
    },
    {
      "id": "dept-hr",
      "label": "Human Resources",
      "badge": "3"
    }
  ],

  "detailEndpoint": {
    "url": "https://api.example.com/departments",
    "selectedParam": "selected"
  },

  "detailPages": [
    {
      "id": "dp-info",
      "title": "Details",
      "order": 1,
      "sections": [
        {
          "id": "dp-grid",
          "layout": "grid",
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "1rem",
          "elements": [
            { "id": "dp-name",  "name": "name",  "type": "input", "inputType": "text", "label": "Department", "order": 1 },
            { "id": "dp-head",  "name": "head",  "type": "input", "inputType": "text", "label": "Head",       "order": 2 }
          ]
        }
      ]
    }
  ],

  "elements": []
}
```

**TreeViewNode fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique node identifier |
| `label` | `string` | **Yes** | Display label |
| `sublabel` | `string` | No | Secondary description shown below the label |
| `badge` | `string` | No | Short badge text (e.g. a count or status) |
| `children` | `TreeViewNode[]` | No | Nested child nodes |

**TreeViewSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `treeTitle` | `string` | No | Heading shown above the tree pane |
| `treeWidth` | `string` | No | CSS width of the tree pane (default `"260px"`) |
| `treeMode` | `string` | No | `"compact"` (tight spacing) \| `"easy"` (relaxed spacing, default) |
| `treeNodes` | `TreeViewNode[]` | No | Root-level tree nodes |
| `detailEndpoint` | `DetailEndpointConfig` | No | Endpoint for loading detail data for the selected node |
| `detailPages` | `DetailPage[]` | No | Pages rendered in the right-hand detail panel |

---

#### Chat Section

`layout: "chat"` — a two-pane messaging UI. The left pane lists conversations;
the right pane shows messages for the selected conversation and includes a
send-message input.

```json
{
  "id": "support-chat",
  "layout": "chat",
  "order": 1,

  "listTitle": "Conversations",
  "listWidth": "280px",
  "currentUserName": "Support Agent",
  "inputPlaceholder": "Type a reply…",
  "sendButtonText": "Send",

  "conversations": [
    {
      "id": "conv-1",
      "label": "Alice Smith",
      "sublabel": "Can I change my email?",
      "avatar": "AS",
      "badge": "2",
      "messages": [
        {
          "id": "m1",
          "text": "Hi, I need help changing my account email.",
          "sender": "Alice Smith",
          "role": "other",
          "timestamp": "2025-01-15T10:30:00Z",
          "avatar": "AS"
        },
        {
          "id": "m2",
          "text": "Of course! Please verify your identity first.",
          "sender": "Support Agent",
          "role": "me",
          "timestamp": "2025-01-15T10:31:00Z"
        }
      ]
    }
  ]
}
```

**ChatMessage fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique message identifier |
| `text` | `string` | **Yes** | Message text content |
| `sender` | `string` | **Yes** | Display name of the sender |
| `role` | `string` | **Yes** | `"me"` (right-aligned, current user) \| `"other"` (left-aligned) |
| `timestamp` | `string` | No | ISO 8601 timestamp (e.g. `"2025-01-15T10:30:00Z"`) |
| `avatar` | `string` | No | Image URL or ≤ 2-char initials for the sender |

**ChatConversation fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique conversation identifier |
| `label` | `string` | **Yes** | Display name of the conversation or group |
| `sublabel` | `string` | No | Last-message preview |
| `avatar` | `string` | No | Image URL or ≤ 2-char initials |
| `badge` | `string` | No | Unread-count badge or status text |
| `messages` | `ChatMessage[]` | No | Pre-seeded messages shown when this conversation is selected |

**ChatSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `conversations` | `ChatConversation[]` | No | Conversations shown in the left pane |
| `listTitle` | `string` | No | Heading above the conversations list (default `"Messages"`) |
| `listWidth` | `string` | No | CSS width of the conversations pane (default `"280px"`) |
| `inputPlaceholder` | `string` | No | Placeholder in the message text area (default `"Type a message…"`) |
| `sendButtonText` | `string` | No | Send button label (default `"Send"`) |
| `currentUserName` | `string` | No | Display name for outgoing messages (default `"You"`) |

---

#### Accordion Section

`layout: "accordion"` — expand/collapse panels. Only one panel is open at a
time by default; set `allowMultiple: true` to allow several open at once.

```json
{
  "id": "faq",
  "layout": "accordion",
  "order": 1,
  "allowMultiple": false,
  "panels": [
    {
      "id": "p1",
      "label": "What is react-ubiquitous?",
      "description": "A short teaser",
      "defaultOpen": true,
      "elements": [
        { "id": "body1", "name": "body1", "type": "label", "label": "A JSON-driven UI renderer.", "order": 1 }
      ]
    },
    {
      "id": "p2",
      "label": "How do I install it?",
      "elements": [
        { "id": "body2", "name": "body2", "type": "label", "label": "Run npm install react-ubiquitous.", "order": 1 }
      ]
    }
  ],
  "elements": []
}
```

**AccordionPanel fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique panel identifier |
| `label` | `string` | **Yes** | Panel header label |
| `description` | `string` | No | Optional subtitle in the panel header |
| `defaultOpen` | `boolean` | No | Open on first render (default `false`) |
| `sections` | `UISectionConfig[]` | No | Nested sections rendered in the panel body |
| `elements` | `UIElementConfig[]` | No | Flat elements rendered when `sections` is empty |

---

#### Collapse / Spoiler Section

`layout: "collapse"` — a single expand/collapse toggle for one content region.

```json
{
  "id": "adv-opts",
  "layout": "collapse",
  "order": 1,
  "label": "Advanced options",
  "description": "Rarely needed settings",
  "defaultOpen": false,
  "icon": true,
  "elements": [
    { "id": "timeout", "name": "timeout", "type": "input", "inputType": "number", "label": "Timeout (ms)", "order": 1 }
  ]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | No | Trigger button label (falls back to `title`) |
| `description` | `string` | No | Optional subtitle on the trigger |
| `defaultOpen` | `boolean` | No | Start open (default `false`) |
| `icon` | `boolean` | No | Show chevron icon on the trigger (default `true`) |

---

#### Divider Section

`layout: "divider"` — a visual separator with an optional centred label.

```json
{
  "id": "divider-or",
  "layout": "divider",
  "order": 1,
  "label": "OR",
  "orientation": "horizontal",
  "variant": "solid",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | No | Centred text label inside the line |
| `orientation` | `string` | No | `"horizontal"` \| `"vertical"` (default `"horizontal"`) |
| `variant` | `string` | No | `"solid"` \| `"dashed"` \| `"dotted"` (default `"solid"`) |

---

#### Card Section

`layout: "card"` — a bordered content container with optional header and
footer slots. `title` / `description` fill the header; `elements` fill the
body; `footerElements` fill a distinct footer row.

```json
{
  "id": "profile-card",
  "layout": "card",
  "order": 1,
  "title": "Profile",
  "description": "Your public info",
  "bordered": true,
  "shadow": "sm",
  "padded": true,
  "elements": [
    { "id": "name",  "name": "name",  "type": "input", "inputType": "text",  "label": "Name",  "order": 1 },
    { "id": "email", "name": "email", "type": "input", "inputType": "email", "label": "Email", "order": 2 }
  ],
  "footerElements": [
    { "id": "save", "name": "save", "type": "button", "label": "Save", "order": 1 }
  ]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `footerElements` | `UIElementConfig[]` | No | Elements rendered in the card footer row |
| `padded` | `boolean` | No | Body padding (default `true`) |
| `bordered` | `boolean` | No | Border around the card (default `true`) |
| `shadow` | `false \| "sm" \| "md" \| "lg"` | No | Box-shadow preset (default `"sm"`) |

---

#### Navbar Section

`layout: "navbar"` — a top app bar with a logo, navigation links, and a mobile hamburger toggle.

```json
{
  "id": "top-nav",
  "layout": "navbar",
  "order": 1,
  "logoText": "MyApp",
  "logoUrl": "https://example.com/logo.png",
  "links": [
    { "id": "home",  "label": "Home",    "href": "/" },
    { "id": "about", "label": "About",   "href": "/about", "active": true }
  ],
  "position": "sticky",
  "theme": "light",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `logoText` | `string` | No | Text logo on the left side |
| `logoUrl` | `string` | No | Image URL for the logo |
| `links` | `NavLink[]` | No | Navigation links — `{ id, label, href?, active? }` |
| `position` | `string` | No | `"static"` \| `"sticky"` \| `"fixed"` (default `"static"`) |
| `theme` | `string` | No | `"light"` \| `"dark"` (default `"light"`) |

---

#### Sidebar Section

`layout: "sidebar"` — a collapsible side navigation panel with nested item support.

```json
{
  "id": "side-nav",
  "layout": "sidebar",
  "order": 1,
  "width": "260px",
  "defaultCollapsed": false,
  "collapsible": true,
  "items": [
    {
      "id": "dashboard",
      "label": "Dashboard",
      "href": "/dashboard",
      "icon": "layout-dashboard",
      "active": true
    },
    {
      "id": "settings",
      "label": "Settings",
      "icon": "settings",
      "children": [
        { "id": "profile", "label": "Profile", "href": "/settings/profile" }
      ]
    }
  ],
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `items` | `SidebarItem[]` | No | Navigation items — `{ id, label, href?, icon?, active?, children? }` |
| `defaultCollapsed` | `boolean` | No | Start collapsed (default `false`) |
| `collapsible` | `boolean` | No | Allow user to toggle collapsed state (default `true`) |
| `width` | `string` | No | CSS width of the expanded sidebar (default `"260px"`) |

---

#### Breadcrumbs Section

`layout: "breadcrumbs"` — a hierarchical location trail.

```json
{
  "id": "page-breadcrumbs",
  "layout": "breadcrumbs",
  "order": 1,
  "separator": "/",
  "items": [
    { "id": "home",     "label": "Home",     "href": "/" },
    { "id": "products", "label": "Products", "href": "/products" },
    { "id": "detail",   "label": "Widget Pro" }
  ],
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | No | Ordered crumbs — `{ id, label, href? }` (omit `href` for the current page) |
| `separator` | `string` | No | Character(s) rendered between crumbs (default `"/"`) |

---

#### Pagination Section

`layout: "pagination"` — page-number controls for navigating long lists.

```json
{
  "id": "contacts-pagination",
  "layout": "pagination",
  "order": 1,
  "totalItems": 500,
  "pageSize": 25,
  "currentPage": 1,
  "showFirstLast": true,
  "showPrevNext": true,
  "maxPageButtons": 7,
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `totalItems` | `number` | **Yes** | Total items across all pages |
| `pageSize` | `number` | No | Items per page (default `10`) |
| `currentPage` | `number` | No | Initially active page, 1-based (default `1`) |
| `showFirstLast` | `boolean` | No | Show First / Last jump buttons (default `false`) |
| `showPrevNext` | `boolean` | No | Show Previous / Next buttons (default `true`) |
| `maxPageButtons` | `number` | No | Max page-number buttons before truncating (default `7`) |

---

#### Stepper Section

`layout: "stepper"` — a multi-step wizard progress indicator.

```json
{
  "id": "onboarding-steps",
  "layout": "stepper",
  "order": 1,
  "currentStep": 0,
  "orientation": "horizontal",
  "steps": [
    { "id": "s1", "label": "Account",  "description": "Create your account" },
    { "id": "s2", "label": "Profile",  "description": "Fill in profile details", "status": "current" },
    { "id": "s3", "label": "Confirm",  "description": "Review and confirm" }
  ],
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `steps` | `StepperStep[]` | No | Ordered steps — `{ id, label, description?, status? }` |
| `currentStep` | `number` | No | Zero-based index of the active step (default `0`) |
| `orientation` | `string` | No | `"horizontal"` \| `"vertical"` (default `"horizontal"`) |

**StepperStep `status` values**: `"complete"` \| `"current"` \| `"upcoming"` — derived from `currentStep` when omitted.

---

#### Tabs Section

`layout: "tabs"` — a general-purpose tabbed content container that can be nested anywhere inside a page.

```json
{
  "id": "info-tabs",
  "layout": "tabs",
  "order": 1,
  "defaultTabId": "tab-overview",
  "tabs": [
    {
      "id": "tab-overview",
      "label": "Overview",
      "elements": [
        { "id": "desc", "name": "desc", "type": "label", "text": "Overview content here.", "order": 1 }
      ]
    },
    {
      "id": "tab-details",
      "label": "Details",
      "sections": [
        {
          "id": "detail-grid",
          "layout": "grid",
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "1rem",
          "elements": []
        }
      ]
    }
  ],
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `tabs` | `TabItem[]` | No | Tab buttons and content — `{ id, label, sections?, elements? }` |
| `defaultTabId` | `string` | No | `id` of the tab to show on first render (falls back to first tab) |

---

#### Alert Section

`layout: "alert"` — inline contextual message (error, warning, info, or success).

```json
{
  "id": "save-success",
  "layout": "alert",
  "order": 1,
  "title": "Saved",
  "description": "Your changes have been saved successfully.",
  "severity": "success",
  "dismissible": true,
  "icon": true,
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `severity` | `string` | No | `"info"` \| `"success"` \| `"warning"` \| `"error"` (default `"info"`) |
| `dismissible` | `boolean` | No | Show a dismiss (×) button (default `false`) |
| `icon` | `boolean` | No | Show the severity icon (default `true`) |

---

#### Progress Section

`layout: "progress"` — linear or circular loading / progress indicator.

```json
{
  "id": "upload-progress",
  "layout": "progress",
  "order": 1,
  "variant": "linear",
  "value": 65,
  "showLabel": true,
  "size": "md",
  "color": "#6366f1",
  "indeterminate": false,
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | No | `"linear"` \| `"circular"` (default `"linear"`) |
| `value` | `number` | No | Progress value 0–100 (default `0`) |
| `showLabel` | `boolean` | No | Show the percentage label (default `false`) |
| `size` | `string` | No | `"sm"` \| `"md"` \| `"lg"` (default `"md"`) |
| `color` | `string` | No | CSS color for the filled track (default `"#6366f1"`) |
| `indeterminate` | `boolean` | No | Animated indeterminate mode — ignores `value` (default `false`) |

---

#### Skeleton Section

`layout: "skeleton"` — animated loading placeholder shown while content is fetching.

```json
{
  "id": "card-loader",
  "layout": "skeleton",
  "order": 1,
  "shape": "rect",
  "lines": 3,
  "avatar": true,
  "width": "100%",
  "height": "120px",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `shape` | `string` | No | `"text"` \| `"rect"` \| `"circle"` (default `"text"`) |
| `lines` | `number` | No | Number of text-line skeletons (default `3`) |
| `avatar` | `boolean` | No | Show a circular avatar skeleton before the lines (default `false`) |
| `width` | `string` | No | Explicit CSS width of the block |
| `height` | `string` | No | Explicit CSS height (used with `shape: "rect"`) |

---

#### Toast Section

`layout: "toast"` — ephemeral notification that auto-dismisses after a delay.

```json
{
  "id": "notify-saved",
  "layout": "toast",
  "order": 1,
  "message": "Changes saved.",
  "severity": "success",
  "duration": 4000,
  "position": "bottom-right",
  "visible": true,
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | `string` | No | Notification message text |
| `severity` | `string` | No | `"info"` \| `"success"` \| `"warning"` \| `"error"` (default `"info"`) |
| `duration` | `number` | No | Auto-dismiss delay in ms — `0` to disable (default `4000`) |
| `position` | `string` | No | `"top-left"` \| `"top-center"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-center"` \| `"bottom-right"` (default `"bottom-right"`) |
| `visible` | `boolean` | No | Whether the toast is visible on first render (default `true`) |

---

#### Modal Section

`layout: "modal"` — blocking overlay dialog with optional action buttons.

```json
{
  "id": "confirm-delete",
  "layout": "modal",
  "order": 1,
  "title": "Delete item?",
  "description": "This action cannot be undone.",
  "open": false,
  "size": "sm",
  "closeOnBackdrop": true,
  "showCloseButton": true,
  "confirmLabel": "Delete",
  "cancelLabel": "Cancel",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `open` | `boolean` | No | Whether the modal is open on first render (default `false`) |
| `size` | `string` | No | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"full"` (default `"md"`) |
| `closeOnBackdrop` | `boolean` | No | Close when the backdrop is clicked (default `true`) |
| `showCloseButton` | `boolean` | No | Show the × close button in the header (default `true`) |
| `confirmLabel` | `string` | No | Primary action button label — omit to hide |
| `cancelLabel` | `string` | No | Secondary / cancel button label — omit to hide |

---

#### Drawer Section

`layout: "drawer"` — a panel that slides in from any edge of the viewport.

```json
{
  "id": "filter-drawer",
  "layout": "drawer",
  "order": 1,
  "title": "Filters",
  "open": false,
  "placement": "right",
  "size": "320px",
  "closeOnBackdrop": true,
  "showCloseButton": true,
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `open` | `boolean` | No | Whether the drawer is open on first render (default `false`) |
| `placement` | `string` | No | `"left"` \| `"right"` \| `"top"` \| `"bottom"` (default `"right"`) |
| `size` | `string` | No | CSS width (left/right) or height (top/bottom) (default `"320px"`) |
| `closeOnBackdrop` | `boolean` | No | Close when the backdrop is clicked (default `true`) |
| `showCloseButton` | `boolean` | No | Show the × close button (default `true`) |

---

#### Tooltip Section

`layout: "tooltip"` — hover-triggered floating label attached to a trigger element.

```json
{
  "id": "help-tooltip",
  "layout": "tooltip",
  "order": 1,
  "content": "This field is required.",
  "placement": "top",
  "triggerLabel": "?",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `content` | `string` | No | Text shown inside the tooltip bubble |
| `placement` | `string` | No | `"top"` \| `"bottom"` \| `"left"` \| `"right"` (default `"top"`) |
| `triggerLabel` | `string` | No | Label on the trigger button when no elements are provided (default `"Hover me"`) |

---

#### Popover Section

`layout: "popover"` — click-triggered floating panel with richer content than a tooltip.

```json
{
  "id": "more-info",
  "layout": "popover",
  "order": 1,
  "placement": "bottom",
  "triggerLabel": "More info",
  "content": "Here is some additional context.",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `placement` | `string` | No | `"top"` \| `"bottom"` \| `"left"` \| `"right"` (default `"bottom"`) |
| `triggerLabel` | `string` | No | Label on the trigger button (default `"Open"`) |
| `content` | `string` | No | Short body text (alternative to placing elements) |

---

#### Table Section

`layout: "table"` — a data table with optional search, sorting, and pagination.

```json
{
  "id": "users-table",
  "layout": "table",
  "order": 1,
  "searchable": true,
  "pageSize": 10,
  "emptyMessage": "No users found.",
  "columns": [
    { "key": "name",  "label": "Name",  "sortable": true,  "width": "200px" },
    { "key": "email", "label": "Email", "sortable": true  },
    { "key": "role",  "label": "Role",  "sortable": false }
  ],
  "rows": [
    { "name": "Alice Smith", "email": "alice@acme.com", "role": "Admin" },
    { "name": "Bob Jones",   "email": "bob@acme.com",   "role": "Viewer" }
  ],
  "elements": []
}
```

**TableColumn fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `key` | `string` | **Yes** | Matches a key in each row object |
| `label` | `string` | **Yes** | Visible column header |
| `sortable` | `boolean` | No | Enable column sort (default `false`) |
| `width` | `string` | No | CSS column width (e.g. `"120px"`, `"20%"`) |

**TableSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `columns` | `TableColumn[]` | **Yes** | Column definitions |
| `rows` | `object[]` | **Yes** | Row data — each key matches a column `key` |
| `searchable` | `boolean` | No | Show a search input above the table (default `true`) |
| `pageSize` | `number` | No | Rows per page — `0` disables pagination (default `10`) |
| `emptyMessage` | `string` | No | Message shown when no rows match the filter |

---

#### Badge Section

`layout: "badge"` — a collection of badge / tag / chip items.

```json
{
  "id": "skill-tags",
  "layout": "badge",
  "order": 1,
  "appearance": "subtle",
  "size": "md",
  "badges": [
    { "id": "ts",    "label": "TypeScript", "variant": "primary" },
    { "id": "react", "label": "React",      "variant": "info"    },
    { "id": "node",  "label": "Node.js",    "variant": "success" }
  ],
  "elements": []
}
```

**BadgeItem fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique identifier |
| `label` | `string` | **Yes** | Display text |
| `variant` | `string` | No | `"default"` \| `"primary"` \| `"success"` \| `"warning"` \| `"danger"` \| `"info"` |

**BadgeSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `badges` | `BadgeItem[]` | **Yes** | Badge items to render |
| `appearance` | `string` | No | `"subtle"` \| `"solid"` \| `"outline"` (default `"subtle"`) |
| `size` | `string` | No | `"sm"` \| `"md"` \| `"lg"` (default `"md"`) |

---

#### Avatar Section

`layout: "avatar"` — one or more avatar images with optional stacking.

```json
{
  "id": "team-avatars",
  "layout": "avatar",
  "order": 1,
  "size": "md",
  "stacked": true,
  "avatars": [
    { "id": "a1", "initials": "AS", "src": "https://example.com/alice.jpg", "alt": "Alice", "name": "Alice" },
    { "id": "a2", "initials": "BJ", "alt": "Bob",   "name": "Bob"   }
  ],
  "elements": []
}
```

**AvatarItem fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique identifier |
| `initials` | `string` | No | Fallback initials (e.g. `"JD"`) shown when image is absent |
| `src` | `string` | No | Image URL |
| `alt` | `string` | No | Alt text for the image |
| `name` | `string` | No | Optional display name shown below the avatar |

**AvatarSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `avatars` | `AvatarItem[]` | **Yes** | Avatar items to render |
| `size` | `string` | No | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` (default `"md"`) |
| `stacked` | `boolean` | No | Overlap avatars (default `false`) |

---

#### Timeline Section

`layout: "timeline"` — a vertical list of time-ordered events.

```json
{
  "id": "project-history",
  "layout": "timeline",
  "order": 1,
  "events": [
    {
      "id": "e1",
      "title": "Project kicked off",
      "description": "Initial planning meeting held.",
      "timestamp": "Jan 2025",
      "variant": "success",
      "icon": "🚀"
    },
    {
      "id": "e2",
      "title": "Beta released",
      "timestamp": "Mar 2025",
      "variant": "primary"
    }
  ],
  "elements": []
}
```

**TimelineEvent fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique identifier |
| `title` | `string` | **Yes** | Event title / heading |
| `description` | `string` | No | Optional longer description |
| `timestamp` | `string` | No | Date / time label (e.g. `"Jan 2025"` or ISO string) |
| `variant` | `string` | No | Dot color: `"default"` \| `"primary"` \| `"success"` \| `"warning"` \| `"danger"` |
| `icon` | `string` | No | Emoji / character rendered inside the dot |

**TimelineSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `events` | `TimelineEvent[]` | **Yes** | Ordered list of events |

---

#### Stat Section

`layout: "stat"` — a grid of metric / KPI cards.

```json
{
  "id": "dashboard-stats",
  "layout": "stat",
  "order": 1,
  "columns": 3,
  "stats": [
    {
      "id": "s1",
      "value": "1,234",
      "label": "Total Users",
      "subLabel": "Registered accounts",
      "trend": "+12%",
      "trendDirection": "up",
      "icon": "👥"
    },
    {
      "id": "s2",
      "value": "$98,500",
      "label": "Revenue",
      "trend": "-3%",
      "trendDirection": "down"
    }
  ],
  "elements": []
}
```

**StatItem fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique identifier |
| `value` | `string` | **Yes** | Primary display value (e.g. `"1,234"`, `"98%"`) |
| `label` | `string` | **Yes** | Descriptive label below the value |
| `subLabel` | `string` | No | Optional supporting sub-label |
| `trend` | `string` | No | Trend indicator string (e.g. `"+12%"`) |
| `trendDirection` | `string` | No | `"up"` (green) \| `"down"` (red) \| `"neutral"` (slate) |
| `icon` | `string` | No | Emoji / character |

**StatSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `stats` | `StatItem[]` | **Yes** | Stat items to display |
| `columns` | `number` | No | Number of columns in the grid (default auto, min 2) |

---

#### Empty State Section

`layout: "empty-state"` — a placeholder shown when a list or data set has no content.

```json
{
  "id": "no-results",
  "layout": "empty-state",
  "order": 1,
  "heading": "No results found",
  "message": "Try adjusting your filters or search term.",
  "icon": "🗂",
  "actionLabel": "Clear filters",
  "actionHref": "/contacts",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `heading` | `string` | No | Primary heading (default `"No data found"`) |
| `message` | `string` | No | Supporting description |
| `icon` | `string` | No | Emoji or icon character (default `"🗂"`) |
| `actionLabel` | `string` | No | Optional call-to-action button label |
| `actionHref` | `string` | No | URL for the optional call-to-action |

---

#### Code Block Section

`layout: "code-block"` — a syntax-highlighted, copyable code snippet.

```json
{
  "id": "example-code",
  "layout": "code-block",
  "order": 1,
  "language": "typescript",
  "lineNumbers": true,
  "copyable": true,
  "code": "const greeting = (name: string) => `Hello, ${name}!`;",
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `code` | `string` | **Yes** | Source code string to display |
| `language` | `string` | No | Language hint shown in the header (e.g. `"typescript"`, `"bash"`) |
| `lineNumbers` | `boolean` | No | Show line numbers (default `false`) |
| `copyable` | `boolean` | No | Show a copy-to-clipboard button (default `true`) |

---

#### Chart Section

`layout: "chart"` — a data visualisation chart (line, bar, pie, etc.).

```json
{
  "id": "sales-chart",
  "layout": "chart",
  "order": 1,
  "chartType": "bar",
  "height": 300,
  "showGrid": true,
  "showLegend": true,
  "showLabels": false,
  "series": [
    { "key": "revenue", "label": "Revenue", "color": "#6366f1" },
    { "key": "expenses","label": "Expenses","color": "#f43f5e" }
  ],
  "data": [
    { "label": "Jan", "revenue": 12000, "expenses": 8000 },
    { "label": "Feb", "revenue": 15000, "expenses": 9500 },
    { "label": "Mar", "revenue": 11000, "expenses": 7000 }
  ],
  "elements": []
}
```

**ChartDataPoint fields**

Each data point must have a `label` key (used for the x-axis). All other keys are numeric series values.

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | **Yes** | Category label (x-axis) |
| `value` | `number` | No | Primary value when no explicit series keys are defined |
| _(series key)_ | `number` | No | Any additional numeric key matched by a `ChartSeries.key` entry |

**ChartSeries fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `key` | `string` | **Yes** | Property name in each `ChartDataPoint` |
| `label` | `string` | No | Human-readable series label shown in the legend |
| `color` | `string` | No | Override CSS color for this series |

**ChartSectionConfig fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `chartType` | `string` | **Yes** | `"line"` \| `"area"` \| `"bar"` \| `"pie"` \| `"donut"` \| `"radar"` \| `"scatter"` |
| `data` | `ChartDataPoint[]` | **Yes** | Array of data points |
| `series` | `ChartSeries[]` | No | Named series configuration (defaults to single `"value"` series) |
| `showGrid` | `boolean` | No | Show horizontal grid lines (default `true` for line/area/bar/scatter) |
| `showLegend` | `boolean` | No | Show a legend (default `true` when ≥ 2 series) |
| `showLabels` | `boolean` | No | Show value labels on bars / pie slices (default `false`) |
| `height` | `number` | No | Chart height in pixels (default `300`) |

---

#### Iframe Section

`layout: "iframe"` — embeds an external URL inside an `<iframe>`.

```json
{
  "id": "embedded-report",
  "layout": "iframe",
  "order": 1,
  "src": "https://example.com/report",
  "queryParams": { "tab": "sales", "year": 2025 },
  "frameWidth": "100%",
  "frameHeight": "480px",
  "sandbox": "allow-scripts allow-same-origin",
  "frameTitle": "Sales report",
  "allowFullscreen": true,
  "showLoader": true,
  "elements": []
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `src` | `string` | **Yes** | Base URL to load inside the iframe |
| `queryParams` | `object` | No | Key/value pairs appended as query parameters to `src` |
| `frameWidth` | `string` | No | iframe width (default `"100%"`) |
| `frameHeight` | `string` | No | iframe height (default `"480px"`) |
| `sandbox` | `string` | No | HTML `sandbox` attribute (e.g. `"allow-scripts allow-same-origin"`) — omit for no restrictions |
| `frameTitle` | `string` | No | Accessible title for the iframe (required for screen readers) |
| `allowFullscreen` | `boolean` | No | Allow the iframe to go fullscreen (default `true`) |
| `showLoader` | `boolean` | No | Show a loading spinner while the iframe is loading (default `true`) |

---

### UIElementConfig

All element configs include the **common base fields** below, plus
type-specific fields determined by the `type` discriminant.

#### Common Fields (BaseElementConfig)

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique element identifier within the page |
| `name` | `string` | **Yes** | HTML `name` attribute; also the key emitted by `onChange` |
| `type` | `string` | **Yes** | Discriminant — see element types below |
| `order` | `number` | No | Render order within the section (ascending) |
| `width` | `string \| 1–12` | No | CSS width string (`"50%"`, `"200px"`) or column span `1`–`12`. **Numeric values are always treated as column spans** (e.g. `6` = 50 % width). Use a CSS string such as `"6px"` when a pixel value is intended. |
| `label` | `string` | No | Label text shown alongside the control |
| `labelPosition` | `string` | No | `"top"` \| `"left"` \| `"right"` \| `"hidden"` (default `"top"`) |
| `tooltip` | `string` | No | Help text shown on hover / via info icon |
| `units` | `string` | No | Unit label, e.g. `"kg"`, `"$"`, `"°C"` |
| `unitsPosition` | `string` | No | `"prefix"` \| `"suffix"` (default `"suffix"`) |
| `disabled` | `boolean` | No | Disables the control |
| `readonly` | `boolean` | No | Makes the control read-only |
| `required` | `boolean` | No | Marks the field as mandatory |
| `hidden` | `boolean` | No | Hides the element entirely |
| `className` | `string` | No | Additional CSS class names on the wrapper |
| `style` | `object` | No | Inline styles on the wrapper (camelCase keys) |
| `validations` | `ValidationRule[]` | No | Validation rules — see [Validation Rules](#validation-rules) |

---

#### `input`

Wraps `<input>` with all HTML type variants.

```json
{
  "id": "email",
  "name": "email",
  "type": "input",
  "inputType": "email",
  "label": "Email Address",
  "placeholder": "jane@example.com",
  "required": true,
  "order": 1,
  "validations": [
    { "rule": "required" },
    { "rule": "email", "message": "Please enter a valid email." }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `inputType` | `string` | `"text"` \| `"email"` \| `"password"` \| `"number"` \| `"tel"` \| `"url"` \| `"date"` \| `"datetime-local"` \| `"time"` \| `"month"` \| `"week"` \| `"color"` \| `"range"` \| `"file"` \| `"search"` \| `"hidden"` — Note: `inputType: "hidden"` renders an `<input type="hidden">` and passes a value silently with the form. `hidden: true` (from BaseElementConfig) hides the entire element wrapper including its label and tooltip. Use `inputType: "hidden"` to include a silent value in form submissions; use `hidden: true` to conditionally remove a visible field from the UI. |
| `placeholder` | `string` | Placeholder text |
| `defaultValue` | `string \| number` | Initial value |
| `value` | `string \| number` | Controlled value |
| `min` | `number \| string` | Minimum (number/date) |
| `max` | `number \| string` | Maximum (number/date) |
| `step` | `number` | Step increment (number/range) |
| `multiple` | `boolean` | Allow multiple files (`inputType: "file"`) |
| `accept` | `string` | Accepted MIME types (`inputType: "file"`) |
| `autocomplete` | `string` | HTML autocomplete attribute |
| `datalistId` | `string` | `id` of an associated `datalist` element |

---

#### `checkbox`

Wraps `<input type="checkbox">`.

```json
{
  "id": "newsletter",
  "name": "newsletter",
  "type": "checkbox",
  "label": "Subscribe to newsletter",
  "labelPosition": "right",
  "defaultChecked": true,
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `defaultChecked` | `boolean` | Initial checked state |
| `checked` | `boolean` | Controlled checked state |
| `value` | `string` | Value submitted when checked |

---

#### `radio`

Renders a group of `<input type="radio">` controls.

```json
{
  "id": "access-level",
  "name": "accessLevel",
  "type": "radio",
  "label": "Access Level",
  "orientation": "horizontal",
  "defaultValue": "viewer",
  "order": 1,
  "options": [
    { "label": "Viewer", "value": "viewer" },
    { "label": "Editor", "value": "editor" },
    { "label": "Admin",  "value": "admin"  }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `options` | `RadioOption[]` | `{ "label": string, "value": string, "disabled"?: boolean }` |
| `defaultValue` | `string` | Initially selected value |
| `value` | `string` | Controlled selected value |
| `orientation` | `string` | `"vertical"` \| `"horizontal"` (default `"vertical"`) |

---

#### `textarea`

Wraps `<textarea>`.

```json
{
  "id": "bio",
  "name": "bio",
  "type": "textarea",
  "label": "Short Bio",
  "placeholder": "Tell us about yourself…",
  "rows": 4,
  "resize": "vertical",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `placeholder` | `string` | Placeholder text |
| `defaultValue` | `string` | Initial text |
| `value` | `string` | Controlled value |
| `rows` | `number` | Visible row count |
| `cols` | `number` | Visible column count |
| `resize` | `string` | `"none"` \| `"both"` \| `"horizontal"` \| `"vertical"` |
| `maxLength` | `number` | Maximum character count |

---

#### `select`

Wraps `<select>` with flat options and/or option groups.

```json
{
  "id": "department",
  "name": "department",
  "type": "select",
  "label": "Department",
  "placeholder": "Select a department",
  "required": true,
  "order": 1,
  "options": [
    {
      "group": true,
      "label": "Engineering",
      "options": [
        { "label": "Frontend", "value": "fe" },
        { "label": "Backend",  "value": "be" }
      ]
    },
    { "label": "Marketing", "value": "marketing" }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `options` | `array` | Mix of `SelectOption` (`{ label, value, disabled? }`) and `SelectOptGroup` (`{ group: true, label, options }`) |
| `multiple` | `boolean` | Allow selecting multiple values |
| `size` | `number` | Visible rows when `multiple: true` |
| `defaultValue` | `string \| string[]` | Initially selected value(s) |
| `value` | `string \| string[]` | Controlled selected value(s) |
| `placeholder` | `string` | Empty/placeholder option label |

---

#### `button`

Renders a clickable button (maps to shadcn/ui `<Button>`).

```json
{
  "id": "btn-submit",
  "name": "submit",
  "type": "button",
  "text": "Submit",
  "buttonType": "submit",
  "variant": "default",
  "size": "md",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Button label |
| `buttonType` | `string` | `"button"` \| `"submit"` \| `"reset"` |
| `variant` | `string` | `"default"` \| `"outline"` \| `"ghost"` \| `"destructive"` \| `"secondary"` \| `"link"` |
| `size` | `string` | `"sm"` \| `"md"` \| `"lg"` |
| `icon` | `string` | Lucide icon name (e.g. `"save"`, `"trash"`) |
| `iconPosition` | `string` | `"left"` \| `"right"` |

---

#### `label`

Renders a standalone `<label>` element (not the wrapper label from BaseElementConfig).

```json
{
  "id": "hint",
  "name": "hint",
  "type": "label",
  "text": "All fields marked * are required.",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Display text |
| `htmlFor` | `string` | `id` of the element this label describes |

---

#### `fieldset`

Renders `<fieldset>` + `<legend>` as a named grouping container.
Children are a nested `UIElementConfig[]`.

```json
{
  "id": "terms-group",
  "name": "terms",
  "type": "fieldset",
  "legend": "Terms & Conditions",
  "order": 1,
  "children": [
    {
      "id": "accept-terms",
      "name": "acceptTerms",
      "type": "checkbox",
      "label": "I accept the terms and conditions",
      "labelPosition": "right",
      "required": true,
      "order": 1
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `legend` | `string` | `<legend>` caption text |
| `children` | `UIElementConfig[]` | Elements rendered inside the fieldset |

---

#### `datalist`

Renders `<datalist>` to provide autocomplete suggestions for an `<input>`.
Reference this element's `id` from an `input` element's `datalistId` field.

```json
{
  "id": "skill-list",
  "name": "skillList",
  "type": "datalist",
  "order": 1,
  "options": [
    "TypeScript",
    "React",
    { "label": "Node.js", "value": "nodejs" }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `options` | `array` | Plain strings or `{ label, value }` pairs |

---

#### `output`

Renders `<output>` — a read-only computed display field with optional formatting.

```json
{
  "id": "budget-display",
  "name": "budgetDisplay",
  "type": "output",
  "label": "Formatted Budget",
  "format": "currency",
  "value": "12500",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `value` | `string \| number` | Current display value |
| `defaultValue` | `string` | Initial value before any update |
| `format` | `string` | `"text"` \| `"number"` \| `"currency"` \| `"percentage"` |
| `htmlFor` | `string[]` | `id`s of input elements this output depends on |
| `formula` | `string` | Expression computing the value from sibling fields — e.g. `"{price} * {quantity}"`. Supports `+`, `-`, `*`, `/` and parentheses. When supplied, `value` / `defaultValue` are ignored. |

---

#### `datepicker`

Calendar date / datetime picker.

```json
{
  "id": "start-date",
  "name": "startDate",
  "type": "datepicker",
  "label": "Start Date",
  "placeholder": "Pick a date",
  "min": "2024-01-01",
  "max": "2030-12-31",
  "includeTime": false,
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `value` | `string` | Controlled ISO date string (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`) |
| `defaultValue` | `string` | Initial date string |
| `placeholder` | `string` | Placeholder text |
| `min` | `string` | Minimum selectable date (`YYYY-MM-DD`) |
| `max` | `string` | Maximum selectable date (`YYYY-MM-DD`) |
| `includeTime` | `boolean` | Include time selection (default `false`) |

---

#### `multiselect`

Searchable multi-selection dropdown (combobox).

```json
{
  "id": "skills",
  "name": "skills",
  "type": "multiselect",
  "label": "Skills",
  "placeholder": "Search skills…",
  "maxItems": 5,
  "defaultValue": ["typescript"],
  "options": [
    { "label": "TypeScript", "value": "typescript" },
    { "label": "React",      "value": "react"      },
    { "label": "Node.js",    "value": "nodejs"     }
  ],
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `options` | `SelectOption[]` | Available options — `{ label, value, disabled? }` |
| `value` | `string[]` | Controlled array of selected values |
| `defaultValue` | `string[]` | Initially selected values |
| `placeholder` | `string` | Placeholder / search hint |
| `maxItems` | `number` | Maximum number of selectable items |

---

#### `autocomplete`

Type-ahead suggestions dropdown (single-value).

```json
{
  "id": "city",
  "name": "city",
  "type": "autocomplete",
  "label": "City",
  "placeholder": "Start typing a city…",
  "options": [
    { "label": "New York",     "value": "ny"  },
    { "label": "Los Angeles",  "value": "la"  },
    { "label": "Chicago",      "value": "chi" }
  ],
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `options` | `SelectOption[]` | Static suggestion list — `{ label, value }` |
| `value` | `string` | Controlled value |
| `defaultValue` | `string` | Initial value |
| `placeholder` | `string` | Input placeholder |

---

#### `fileupload`

Drag-and-drop file upload zone.

```json
{
  "id": "avatar",
  "name": "avatar",
  "type": "fileupload",
  "label": "Profile Picture",
  "accept": "image/*",
  "multiple": false,
  "maxSize": 5242880,
  "placeholder": "Drag a file here or click to browse",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `accept` | `string` | Accepted MIME types / extensions (e.g. `"image/*,.pdf"`) |
| `multiple` | `boolean` | Allow multiple files |
| `maxSize` | `number` | Maximum individual file size in bytes |
| `placeholder` | `string` | Placeholder text shown inside the drop zone |

---

#### `colorpicker`

Hex / RGB color selector.

```json
{
  "id": "brand-color",
  "name": "brandColor",
  "type": "colorpicker",
  "label": "Brand Color",
  "defaultValue": "#6366f1",
  "format": "hex",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `value` | `string` | Controlled hex color string (e.g. `"#ff0000"`) |
| `defaultValue` | `string` | Initial color |
| `format` | `string` | `"hex"` \| `"rgb"` (display format in the text input) |

---

#### `rangeslider`

Dual min–max range slider.

```json
{
  "id": "price-range",
  "name": "priceRange",
  "type": "rangeslider",
  "label": "Price Range",
  "min": 0,
  "max": 1000,
  "step": 10,
  "defaultValue": [100, 500],
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `min` | `number` | Minimum bound of the slider track |
| `max` | `number` | Maximum bound of the slider track |
| `step` | `number` | Step increment |
| `value` | `[number, number]` | Controlled `[minValue, maxValue]` tuple |
| `defaultValue` | `[number, number]` | Initial `[minValue, maxValue]` tuple |

---

#### `rating`

Star rating input.

```json
{
  "id": "review-rating",
  "name": "reviewRating",
  "type": "rating",
  "label": "Your Rating",
  "max": 5,
  "defaultValue": 3,
  "allowHalf": true,
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `max` | `number` | Maximum star count (default `5`) |
| `value` | `number` | Controlled rating value |
| `defaultValue` | `number` | Initial rating |
| `allowHalf` | `boolean` | Allow half-star increments |

---

#### `otpinput`

Segmented OTP / PIN input.

```json
{
  "id": "otp",
  "name": "otp",
  "type": "otpinput",
  "label": "One-Time Password",
  "length": 6,
  "mask": false,
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `length` | `number` | Number of digit segments (default `6`) |
| `value` | `string` | Controlled value string (digits only) |
| `defaultValue` | `string` | Initial value |
| `mask` | `boolean` | Mask input characters (e.g. for PIN entry) |

---

#### `phoneinput`

Country code + phone number field.

```json
{
  "id": "mobile",
  "name": "mobile",
  "type": "phoneinput",
  "label": "Mobile Number",
  "defaultCountry": "US",
  "placeholder": "+1 555 000 0000",
  "order": 1
}
```

| Field | Type | Description |
|---|---|---|
| `countries` | `PhoneCountryOption[]` | List of country options — `{ label, code, dialCode }`. Defaults to built-in set when omitted. |
| `defaultCountry` | `string` | Pre-selected ISO 3166-1 alpha-2 country code (e.g. `"US"`) |
| `value` | `string` | Controlled full phone value (dial code + number) |
| `defaultValue` | `string` | Initial phone value |
| `placeholder` | `string` | Input placeholder |

---

#### `custom`

Renders a consumer-registered React component, allowing any non-standard
control to be embedded inside a JSON-driven layout.

The host application registers components under string keys when mounting
`<UIStage customComponents={{ 'my-widget': MyWidget }} />`. The `component`
field in the config must match one of those keys.

```json
{
  "id": "map-picker",
  "name": "location",
  "type": "custom",
  "label": "Pick a location",
  "component": "map-picker",
  "order": 1,
  "props": {
    "defaultLat": 51.5074,
    "defaultLng": -0.1278,
    "zoom": 12
  }
}
```

| Field | Type | Description |
|---|---|---|
| `component` | `string` | Key used to look up the custom component in the `customComponents` map |
| `props` | `object` | Arbitrary key/value data forwarded to the component as `config.props` |

> **Note:** All `BaseElementConfig` fields (`label`, `required`, `disabled`,
> `validations`, etc.) are also available to the custom component via its `config` prop.

---

### Validation Rules

Validation rules are delivered as an array on `BaseElementConfig.validations`.
All rules accept an optional `message` string to override the default error text.

```json
"validations": [
  { "rule": "required" },
  { "rule": "minLength", "value": 8, "message": "At least 8 characters." },
  { "rule": "pattern",   "value": "^[A-Za-z0-9]+$" }
]
```

| Rule | Extra field | Default error message |
|---|---|---|
| `required` | — | "This field is required." |
| `min` | `value: number \| string` | "Minimum value is {value}." |
| `max` | `value: number \| string` | "Maximum value is {value}." |
| `minLength` | `value: number` | "Minimum length is {value} characters." |
| `maxLength` | `value: number` | "Maximum length is {value} characters." |
| `pattern` | `value: string` (regex, no delimiters) | "Invalid format." |
| `email` | — | "Invalid email address." |
| `url` | — | "Invalid URL." |
| `phone` | — | "Invalid phone number." |
| `step` | `value: number` | "Value must be a multiple of {value}." |
| `custom` | `validator: string`, `config?: object` | Resolved via the consumer's validator registry |
| `group` | `operator: "and" \| "or"`, `rules: ValidationRule[]` | Logical group — all nested rules must pass (`"and"`) or at least one must pass (`"or"`) |

**Logical groups** allow mixing AND / OR logic at the same level:

```json
"validations": [
  { "rule": "required" },
  {
    "rule": "group",
    "operator": "or",
    "rules": [
      { "rule": "email" },
      { "rule": "url" }
    ],
    "message": "Must be a valid email or URL."
  }
]
```

---

## 4. Full Example Response

Below is a complete `UIStageConfig` response for a two-page onboarding form:

```json
{
  "id": "onboarding",
  "title": "Project Onboarding",
  "description": "Complete all sections to set up your team and project.",
  "defaultPageId": "page-personal",
  "pages": [
    {
      "id": "page-personal",
      "title": "Personal Details",
      "description": "Tell us about yourself.",
      "order": 1,
      "sections": [
        {
          "id": "section-name",
          "title": "Full Name",
          "layout": "grid",
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "1rem",
          "order": 1,
          "elements": [
            {
              "id": "first-name",
              "name": "firstName",
              "type": "input",
              "inputType": "text",
              "label": "First Name",
              "placeholder": "Jane",
              "required": true,
              "order": 1,
              "validations": [
                { "rule": "required", "message": "First name is required." },
                { "rule": "minLength", "value": 2, "message": "At least 2 characters." }
              ]
            },
            {
              "id": "last-name",
              "name": "lastName",
              "type": "input",
              "inputType": "text",
              "label": "Last Name",
              "placeholder": "Doe",
              "required": true,
              "order": 2,
              "validations": [
                { "rule": "required", "message": "Last name is required." }
              ]
            }
          ]
        },
        {
          "id": "section-contact",
          "title": "Contact",
          "layout": "grid",
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "1rem",
          "order": 2,
          "elements": [
            {
              "id": "email",
              "name": "email",
              "type": "input",
              "inputType": "email",
              "label": "Email Address",
              "placeholder": "jane@example.com",
              "required": true,
              "order": 1,
              "validations": [
                { "rule": "required" },
                { "rule": "email", "message": "Please enter a valid email." }
              ]
            },
            {
              "id": "phone",
              "name": "phone",
              "type": "input",
              "inputType": "tel",
              "label": "Phone",
              "placeholder": "+1 555 000 0000",
              "tooltip": "Include country code.",
              "order": 2,
              "validations": [
                { "rule": "phone", "message": "Invalid phone number." }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "page-submit",
      "title": "Review & Submit",
      "order": 2,
      "sections": [
        {
          "id": "section-confirm",
          "title": "Confirm Submission",
          "layout": "flex",
          "flexDirection": "column",
          "gap": "1.5rem",
          "order": 1,
          "elements": [
            {
              "id": "confirm-fieldset",
              "name": "confirmGroup",
              "type": "fieldset",
              "legend": "Terms & Conditions",
              "order": 1,
              "children": [
                {
                  "id": "accept-terms",
                  "name": "acceptTerms",
                  "type": "checkbox",
                  "label": "I accept the terms and conditions",
                  "labelPosition": "right",
                  "required": true,
                  "order": 1,
                  "validations": [
                    { "rule": "required", "message": "You must accept to continue." }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "section-actions",
          "layout": "flex",
          "flexDirection": "row",
          "justifyContent": "flex-end",
          "gap": "0.75rem",
          "order": 2,
          "elements": [
            {
              "id": "btn-reset",
              "name": "reset",
              "type": "button",
              "text": "Reset",
              "buttonType": "reset",
              "variant": "outline",
              "order": 1
            },
            {
              "id": "btn-submit",
              "name": "submit",
              "type": "button",
              "text": "Submit",
              "buttonType": "submit",
              "variant": "default",
              "order": 2
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 5. Access Control Contract

`react-ubiquitous` enforces **no access control in the frontend**. The library
renders whatever the API returns — nothing more, nothing less.

### The rule: omit rather than hide

If a user should **not** see a field, page, or section — **do not include it in
the response**. There is no frontend role check to bypass.

| Scenario | Backend action |
|---|---|
| A field is read-only for this user | Return `"readonly": true` on that element |
| A page should be invisible but still accessible | Return `"visible": false` on that page |
| A page must be completely hidden | Omit it from the `pages` array |
| A user has no access to a stage | Return `403 Forbidden` |
| An admin sees extra fields | Include those element configs in the response only for admin users |

### Per-user stage configs

The recommended pattern is to accept an optional `userId` (or derive it from the
auth token) in the stage configuration endpoint and filter the returned config
server-side:

```
GET /stages/dashboard          → returns config for the authenticated user
GET /stages/dashboard?preview=admin → returns admin-level config (for admins only)
```

There is no client-side "if admin then show X" logic. The frontend simply renders
what it receives.

---

## 6. Backend Implementation Guide

This section shows how to implement the JSON contract in three common backend
ecosystems. In every case the goal is the same: produce a JSON object whose
structure matches the schema in [Section 3](#3-json-schema-reference) and return
it from an HTTP endpoint.

All code samples are illustrative. Real implementations will want proper error
handling, dependency injection, authentication, and so on.

---

### 6.1 .NET / C# (NuGet)

#### Model classes

Define plain C# classes (POCOs) that map directly to the JSON schema. Use
`System.Text.Json` (built into .NET) or `Newtonsoft.Json` for serialisation.
Mark nullable reference-type properties with `?`; the serialiser will omit them
when `DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull`.

```csharp
using System.Text.Json.Serialization;

// ─── Element configs ────────────────────────────────────────────────────────

public class ValidationRule
{
    [JsonPropertyName("rule")]
    public string Rule { get; set; } = "";   // "required" | "email" | "min" | etc.

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Value { get; set; }

    [JsonPropertyName("message")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Message { get; set; }
}

public abstract class BaseElementConfig
{
    [JsonPropertyName("id")]    public string Id   { get; set; } = "";
    [JsonPropertyName("name")]  public string Name { get; set; } = "";
    [JsonPropertyName("type")]  public string Type { get; set; } = "";
    [JsonPropertyName("order")] public int?   Order { get; set; }
    [JsonPropertyName("width")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Width { get; set; }   // string or int (column span 1-12)

    [JsonPropertyName("label")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Label { get; set; }

    [JsonPropertyName("labelPosition")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? LabelPosition { get; set; }   // "top"|"left"|"right"|"hidden"

    [JsonPropertyName("tooltip")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Tooltip { get; set; }

    [JsonPropertyName("units")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Units { get; set; }

    [JsonPropertyName("unitsPosition")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? UnitsPosition { get; set; }   // "prefix"|"suffix"

    [JsonPropertyName("disabled")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Disabled { get; set; }

    [JsonPropertyName("readonly")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Readonly { get; set; }

    [JsonPropertyName("required")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Required { get; set; }

    [JsonPropertyName("hidden")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Hidden { get; set; }

    [JsonPropertyName("className")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ClassName { get; set; }

    [JsonPropertyName("validations")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<ValidationRule>? Validations { get; set; }
}

public class InputElementConfig : BaseElementConfig
{
    public InputElementConfig() { Type = "input"; }

    [JsonPropertyName("inputType")]
    public string InputType { get; set; } = "text";
    // "text"|"email"|"password"|"number"|"tel"|"url"|"date"|"datetime-local"
    // |"time"|"month"|"week"|"color"|"range"|"file"|"search"|"hidden"

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? DefaultValue { get; set; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Value { get; set; }

    [JsonPropertyName("min")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Min { get; set; }

    [JsonPropertyName("max")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Max { get; set; }

    [JsonPropertyName("step")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Step { get; set; }

    [JsonPropertyName("autocomplete")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Autocomplete { get; set; }

    [JsonPropertyName("datalistId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DatalistId { get; set; }
}

public class SelectOption
{
    [JsonPropertyName("label")]  public string Label { get; set; } = "";
    [JsonPropertyName("value")]  public string Value { get; set; } = "";
    [JsonPropertyName("disabled")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Disabled { get; set; }
}

public class SelectOptGroup
{
    [JsonPropertyName("group")]  public bool   Group   { get; set; } = true;
    [JsonPropertyName("label")]  public string Label   { get; set; } = "";
    [JsonPropertyName("options")] public List<SelectOption> Options { get; set; } = new();
}

public class SelectElementConfig : BaseElementConfig
{
    public SelectElementConfig() { Type = "select"; }

    // Each entry is either a SelectOption or a SelectOptGroup — serialise as object
    [JsonPropertyName("options")]
    public List<object> Options { get; set; } = new();

    [JsonPropertyName("multiple")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Multiple { get; set; }

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? DefaultValue { get; set; }
}

public class ButtonElementConfig : BaseElementConfig
{
    public ButtonElementConfig() { Type = "button"; }

    [JsonPropertyName("text")]       public string Text       { get; set; } = "";
    [JsonPropertyName("buttonType")] public string ButtonType { get; set; } = "button";
    // "button"|"submit"|"reset"
    [JsonPropertyName("variant")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Variant { get; set; }
    // "default"|"outline"|"ghost"|"destructive"|"secondary"|"link"
    [JsonPropertyName("size")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Size { get; set; }   // "sm"|"md"|"lg"
}

public class DatePickerElementConfig : BaseElementConfig
{
    public DatePickerElementConfig() { Type = "datepicker"; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultValue { get; set; }

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }

    [JsonPropertyName("min")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Min { get; set; }

    [JsonPropertyName("max")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Max { get; set; }

    [JsonPropertyName("includeTime")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool IncludeTime { get; set; }
}

public class MultiSelectElementConfig : BaseElementConfig
{
    public MultiSelectElementConfig() { Type = "multiselect"; }

    [JsonPropertyName("options")]
    public List<SelectOption> Options { get; set; } = new();

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? DefaultValue { get; set; }

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }

    [JsonPropertyName("maxItems")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MaxItems { get; set; }
}

public class AutocompleteElementConfig : BaseElementConfig
{
    public AutocompleteElementConfig() { Type = "autocomplete"; }

    [JsonPropertyName("options")]
    public List<SelectOption> Options { get; set; } = new();

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultValue { get; set; }

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }
}

public class FileUploadElementConfig : BaseElementConfig
{
    public FileUploadElementConfig() { Type = "fileupload"; }

    [JsonPropertyName("accept")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Accept { get; set; }

    [JsonPropertyName("multiple")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Multiple { get; set; }

    [JsonPropertyName("maxSize")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public long? MaxSize { get; set; }

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }
}

public class ColorPickerElementConfig : BaseElementConfig
{
    public ColorPickerElementConfig() { Type = "colorpicker"; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultValue { get; set; }

    [JsonPropertyName("format")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Format { get; set; }   // "hex"|"rgb"
}

public class RangeSliderElementConfig : BaseElementConfig
{
    public RangeSliderElementConfig() { Type = "rangeslider"; }

    [JsonPropertyName("min")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Min { get; set; }

    [JsonPropertyName("max")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Max { get; set; }

    [JsonPropertyName("step")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Step { get; set; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double[]? Value { get; set; }   // [minValue, maxValue]

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double[]? DefaultValue { get; set; }
}

public class RatingElementConfig : BaseElementConfig
{
    public RatingElementConfig() { Type = "rating"; }

    [JsonPropertyName("max")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Max { get; set; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? DefaultValue { get; set; }

    [JsonPropertyName("allowHalf")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool AllowHalf { get; set; }
}

public class OtpInputElementConfig : BaseElementConfig
{
    public OtpInputElementConfig() { Type = "otpinput"; }

    [JsonPropertyName("length")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Length { get; set; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultValue { get; set; }

    [JsonPropertyName("mask")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Mask { get; set; }
}

public class PhoneInputElementConfig : BaseElementConfig
{
    public PhoneInputElementConfig() { Type = "phoneinput"; }

    [JsonPropertyName("defaultCountry")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultCountry { get; set; }

    [JsonPropertyName("value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Value { get; set; }

    [JsonPropertyName("defaultValue")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultValue { get; set; }

    [JsonPropertyName("placeholder")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }
}

// ─── Section configs ─────────────────────────────────────────────────────────

public abstract class BaseSectionConfig
{
    [JsonPropertyName("id")]     public string Id     { get; set; } = "";
    [JsonPropertyName("layout")] public string Layout { get; set; } = "";
    [JsonPropertyName("order")]  public int?   Order  { get; set; }

    [JsonPropertyName("title")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Title { get; set; }

    [JsonPropertyName("description")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    [JsonPropertyName("elements")]
    public List<BaseElementConfig> Elements { get; set; } = new();
}

public class GridSectionConfig : BaseSectionConfig
{
    public GridSectionConfig() { Layout = "grid"; }

    [JsonPropertyName("gridTemplateColumns")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? GridTemplateColumns { get; set; }

    [JsonPropertyName("gap")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Gap { get; set; }
}

public class FlexSectionConfig : BaseSectionConfig
{
    public FlexSectionConfig() { Layout = "flex"; }

    [JsonPropertyName("flexDirection")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FlexDirection { get; set; }
    // "row"|"column"|"row-reverse"|"column-reverse"

    [JsonPropertyName("flexWrap")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FlexWrap { get; set; }

    [JsonPropertyName("gap")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Gap { get; set; }

    [JsonPropertyName("justifyContent")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? JustifyContent { get; set; }

    [JsonPropertyName("alignItems")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? AlignItems { get; set; }
}

// ─── Page and Stage configs ───────────────────────────────────────────────────

public class UIPageConfig
{
    [JsonPropertyName("id")]    public string Id    { get; set; } = "";
    [JsonPropertyName("title")] public string Title { get; set; } = "";
    [JsonPropertyName("order")] public int    Order { get; set; }

    [JsonPropertyName("description")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    [JsonPropertyName("icon")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Icon { get; set; }

    [JsonPropertyName("visible")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Visible { get; set; }   // omit = true

    [JsonPropertyName("sections")]
    public List<BaseSectionConfig> Sections { get; set; } = new();
}

public class UIStageConfig
{
    [JsonPropertyName("id")]    public string Id    { get; set; } = "";

    [JsonPropertyName("title")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Title { get; set; }

    [JsonPropertyName("description")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    [JsonPropertyName("defaultPageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultPageId { get; set; }

    [JsonPropertyName("pages")]
    public List<UIPageConfig> Pages { get; set; } = new();

    [JsonPropertyName("theme")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Theme { get; set; }   // "light"|"dark"|"html"|"custom"

    [JsonPropertyName("className")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ClassName { get; set; }

    [JsonPropertyName("pageTransition")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? PageTransition { get; set; }   // "none"|"fade"|"slide-left"|"slide-right"
}
```

#### ASP.NET Core Web API endpoint

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

[ApiController]
[Route("stages")]
public class StagesController : ControllerBase
{
    [HttpGet("{stageId}")]
    public IActionResult GetStage(string stageId, [FromQuery] string? userId)
    {
        // Build the config server-side (from DB, config files, etc.)
        var config = new UIStageConfig
        {
            Id    = "onboarding",
            Title = "Project Onboarding",
            Pages = new List<UIPageConfig>
            {
                new UIPageConfig
                {
                    Id    = "page-personal",
                    Title = "Personal Details",
                    Order = 1,
                    Sections = new List<BaseSectionConfig>
                    {
                        new GridSectionConfig
                        {
                            Id                  = "section-name",
                            Title               = "Full Name",
                            GridTemplateColumns = "repeat(2, 1fr)",
                            Gap                 = "1rem",
                            Order               = 1,
                            Elements = new List<BaseElementConfig>
                            {
                                new InputElementConfig
                                {
                                    Id          = "first-name",
                                    Name        = "firstName",
                                    InputType   = "text",
                                    Label       = "First Name",
                                    Placeholder = "Jane",
                                    Required    = true,
                                    Order       = 1,
                                    Validations = new List<ValidationRule>
                                    {
                                        new ValidationRule { Rule = "required" },
                                        new ValidationRule
                                        {
                                            Rule    = "minLength",
                                            Value   = 2,
                                            Message = "At least 2 characters."
                                        }
                                    }
                                },
                                new InputElementConfig
                                {
                                    Id          = "last-name",
                                    Name        = "lastName",
                                    InputType   = "text",
                                    Label       = "Last Name",
                                    Placeholder = "Doe",
                                    Required    = true,
                                    Order       = 2
                                }
                            }
                        }
                    }
                }
            }
        };

        var options = new JsonSerializerOptions
        {
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            PropertyNamingPolicy   = JsonNamingPolicy.CamelCase
        };

        return Ok(config);   // ASP.NET Core serialises to JSON automatically
    }
}
```

#### Project setup (NuGet)

```xml
<!-- .csproj — no extra NuGet packages needed; System.Text.Json is in-box -->
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```

If you prefer **Newtonsoft.Json**, replace `System.Text.Json` attributes with
`[JsonProperty("camelCaseName")]` from `Newtonsoft.Json`.

---

### 6.2 Java / Spring Boot (Maven / Gradle)

#### Model classes (Java records)

Java 16+ records are the most concise way to express immutable config objects.
Jackson (included in `spring-boot-starter-web`) serialises them automatically.
Use `@JsonInclude(JsonInclude.Include.NON_NULL)` to omit null fields.

```java
package com.example.ubiquitous.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

// ─── Validation ──────────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ValidationRule(
    String rule,        // "required"|"email"|"min"|"max"|"minLength"|"maxLength"
                        // |"pattern"|"url"|"phone"|"step"|"custom"
    Object value,       // numeric or string threshold (null when not applicable)
    String message      // optional custom error message
) {}

// ─── Base element ─────────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record BaseElementConfig(
    String id,
    String name,
    String type,        // discriminant — see element types below
    Integer order,
    Object width,       // String (CSS) or Integer (column span 1-12)
    String label,
    String labelPosition,  // "top"|"left"|"right"|"hidden"
    String tooltip,
    String units,
    String unitsPosition,  // "prefix"|"suffix"
    Boolean disabled,
    Boolean readonly,
    Boolean required,
    Boolean hidden,
    String className,
    Map<String, Object> style,
    List<ValidationRule> validations
) {}

// ─── Input element ────────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record InputElementConfig(
    // BaseElementConfig fields
    String id, String name, Integer order,
    Object width, String label, String labelPosition,
    String tooltip, Boolean required, Boolean disabled, Boolean readonly, Boolean hidden,
    List<ValidationRule> validations,
    // Input-specific
    String inputType,    // "text"|"email"|"password"|"number"|"tel"|"url"|"date"
                         // |"datetime-local"|"time"|"month"|"week"|"color"
                         // |"range"|"file"|"search"|"hidden"
    String placeholder,
    Object defaultValue,
    Object value,
    Object min,
    Object max,
    Double step,
    String autocomplete,
    String datalistId
) {
    @JsonProperty("type")
    public String type() { return "input"; }
}

// ─── Select option helpers ────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SelectOption(String label, String value, Boolean disabled) {}

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SelectOptGroup(
    @JsonProperty("group") boolean group,
    String label,
    List<SelectOption> options
) {}

// ─── Select element ───────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SelectElementConfig(
    String id, String name, Integer order,
    Object width, String label, Boolean required,
    List<ValidationRule> validations,
    List<Object> options,   // List of SelectOption or SelectOptGroup
    Boolean multiple,
    String placeholder,
    Object defaultValue
) {
    @JsonProperty("type")
    public String type() { return "select"; }
}

// ─── Button element ───────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ButtonElementConfig(
    String id, String name, Integer order,
    String text,
    String buttonType,  // "button"|"submit"|"reset"
    String variant,     // "default"|"outline"|"ghost"|"destructive"|"secondary"|"link"
    String size         // "sm"|"md"|"lg"
) {
    @JsonProperty("type")
    public String type() { return "button"; }
}

// ─── Section configs ──────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record GridSectionConfig(
    String id,
    Integer order,
    String title,
    String description,
    List<Object> elements,         // List of any element config
    String gridTemplateColumns,
    String gridTemplateRows,
    String gap,
    String rowGap,
    String columnGap,
    String justifyItems,
    String alignItems
) {
    @JsonProperty("layout")
    public String layout() { return "grid"; }
}

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FlexSectionConfig(
    String id,
    Integer order,
    String title,
    String description,
    List<Object> elements,
    String flexDirection,    // "row"|"column"|"row-reverse"|"column-reverse"
    String flexWrap,         // "nowrap"|"wrap"|"wrap-reverse"
    String gap,
    String justifyContent,   // "flex-start"|"flex-end"|"center"|"space-between"|etc.
    String alignItems,
    String alignContent
) {
    @JsonProperty("layout")
    public String layout() { return "flex"; }
}

// ─── Page and Stage ───────────────────────────────────────────────────────────

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UIPageConfig(
    String id,
    String title,
    Integer order,
    String description,
    String icon,
    Boolean visible,
    List<Object> sections   // List of GridSectionConfig or FlexSectionConfig
) {}

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UIStageConfig(
    String id,
    String title,
    String description,
    String defaultPageId,
    List<UIPageConfig> pages,
    String theme,           // "light"|"dark"|"html"|"custom"
    String className,
    String pageTransition   // "none"|"fade"|"slide-left"|"slide-right"
) {}
```

#### Spring Boot REST controller

```java
package com.example.ubiquitous.controller;

import com.example.ubiquitous.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stages")
public class StagesController {

    @GetMapping("/{stageId}")
    public ResponseEntity<UIStageConfig> getStage(
            @PathVariable String stageId,
            @RequestParam(required = false) String userId) {

        var config = new UIStageConfig(
            "onboarding",
            "Project Onboarding",
            "Complete all sections to set up your team.",
            "page-personal",
            List.of(
                new UIPageConfig(
                    "page-personal",
                    "Personal Details",
                    1,
                    "Tell us about yourself.",
                    null,
                    null,
                    List.of(
                        new GridSectionConfig(
                            "section-name",
                            1,
                            "Full Name",
                            null,
                            List.of(
                                new InputElementConfig(
                                    "first-name", "firstName", 1,
                                    null, "First Name", null,
                                    null, true, null, null, null,
                                    List.of(
                                        new ValidationRule("required", null, null),
                                        new ValidationRule("minLength", 2, "At least 2 characters.")
                                    ),
                                    "text", "Jane",
                                    null, null, null, null, null, null, null
                                ),
                                new InputElementConfig(
                                    "last-name", "lastName", 2,
                                    null, "Last Name", null,
                                    null, true, null, null, null,
                                    List.of(new ValidationRule("required", null, null)),
                                    "text", "Doe",
                                    null, null, null, null, null, null, null
                                )
                            ),
                            "repeat(2, 1fr)",
                            null, "1rem", null, null, null, null
                        )
                    )
                )
            )
        );

        return ResponseEntity.ok(config);
    }
}
```

#### Maven dependency (`pom.xml`)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!-- Jackson is included transitively — no extra dependency needed -->
</dependency>
```

#### Gradle dependency (`build.gradle`)

```groovy
implementation 'org.springframework.boot:spring-boot-starter-web'
```

---

### 6.3 Python (PyPI)

#### Pydantic v2 models

[Pydantic](https://docs.pydantic.dev/) is the recommended library for Python
because it enforces types at runtime and serialises to camelCase JSON with a
single configuration flag.

```python
from __future__ import annotations

from typing import Any, Literal, Union
from pydantic import BaseModel, ConfigDict, Field

# ─── Helpers ─────────────────────────────────────────────────────────────────

def _camel(s: str) -> str:
    """snake_case → camelCase for JSON serialisation."""
    parts = s.split("_")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


class _Base(BaseModel):
    model_config = ConfigDict(
        alias_generator=_camel,
        populate_by_name=True,
        exclude_none=True,
    )


# ─── Validation ───────────────────────────────────────────────────────────────

class ValidationRule(_Base):
    rule: str  # "required"|"email"|"min"|"max"|"minLength"|"maxLength"
               # |"pattern"|"url"|"phone"|"step"|"custom"
    value: Any = None       # numeric or string threshold (omitted when None)
    message: str | None = None


# ─── Element configs ──────────────────────────────────────────────────────────

class BaseElementConfig(_Base):
    id: str
    name: str
    type: str  # discriminant
    order: int | None = None
    width: str | int | None = None   # CSS string or column span 1-12
    label: str | None = None
    label_position: Literal["top", "left", "right", "hidden"] | None = None
    tooltip: str | None = None
    units: str | None = None
    units_position: Literal["prefix", "suffix"] | None = None
    disabled: bool | None = None
    readonly: bool | None = None
    required: bool | None = None
    hidden: bool | None = None
    class_name: str | None = None
    style: dict[str, Any] | None = None
    validations: list[ValidationRule] | None = None


class InputElementConfig(BaseElementConfig):
    type: Literal["input"] = "input"
    input_type: Literal[
        "text", "email", "password", "number", "tel", "url",
        "date", "datetime-local", "time", "month", "week",
        "color", "range", "file", "search", "hidden"
    ] = "text"
    placeholder: str | None = None
    default_value: str | int | None = None
    value: str | int | None = None
    min: str | int | None = None
    max: str | int | None = None
    step: float | None = None
    autocomplete: str | None = None
    datalist_id: str | None = None


class SelectOption(_Base):
    label: str
    value: str
    disabled: bool | None = None


class SelectOptGroup(_Base):
    group: Literal[True] = True
    label: str
    options: list[SelectOption]


class SelectElementConfig(BaseElementConfig):
    type: Literal["select"] = "select"
    options: list[Union[SelectOption, SelectOptGroup]] = Field(default_factory=list)
    multiple: bool | None = None
    placeholder: str | None = None
    default_value: str | list[str] | None = None
    value: str | list[str] | None = None


class ButtonElementConfig(BaseElementConfig):
    type: Literal["button"] = "button"
    text: str = ""
    button_type: Literal["button", "submit", "reset"] = "button"
    variant: Literal[
        "default", "outline", "ghost", "destructive", "secondary", "link"
    ] | None = None
    size: Literal["sm", "md", "lg"] | None = None


class DatePickerElementConfig(BaseElementConfig):
    type: Literal["datepicker"] = "datepicker"
    value: str | None = None
    default_value: str | None = None
    placeholder: str | None = None
    min: str | None = None
    max: str | None = None
    include_time: bool | None = None


class MultiSelectElementConfig(BaseElementConfig):
    type: Literal["multiselect"] = "multiselect"
    options: list[SelectOption] = Field(default_factory=list)
    value: list[str] | None = None
    default_value: list[str] | None = None
    placeholder: str | None = None
    max_items: int | None = None


class AutocompleteElementConfig(BaseElementConfig):
    type: Literal["autocomplete"] = "autocomplete"
    options: list[SelectOption] = Field(default_factory=list)
    value: str | None = None
    default_value: str | None = None
    placeholder: str | None = None


class FileUploadElementConfig(BaseElementConfig):
    type: Literal["fileupload"] = "fileupload"
    accept: str | None = None
    multiple: bool | None = None
    max_size: int | None = None
    placeholder: str | None = None


class ColorPickerElementConfig(BaseElementConfig):
    type: Literal["colorpicker"] = "colorpicker"
    value: str | None = None
    default_value: str | None = None
    format: Literal["hex", "rgb"] | None = None


class RangeSliderElementConfig(BaseElementConfig):
    type: Literal["rangeslider"] = "rangeslider"
    min: float | None = None
    max: float | None = None
    step: float | None = None
    value: tuple[float, float] | None = None
    default_value: tuple[float, float] | None = None


class RatingElementConfig(BaseElementConfig):
    type: Literal["rating"] = "rating"
    max: int | None = None
    value: float | None = None
    default_value: float | None = None
    allow_half: bool | None = None


class OtpInputElementConfig(BaseElementConfig):
    type: Literal["otpinput"] = "otpinput"
    length: int | None = None
    value: str | None = None
    default_value: str | None = None
    mask: bool | None = None


class PhoneInputElementConfig(BaseElementConfig):
    type: Literal["phoneinput"] = "phoneinput"
    default_country: str | None = None
    value: str | None = None
    default_value: str | None = None
    placeholder: str | None = None


# ─── Section configs ──────────────────────────────────────────────────────────

class BaseSectionConfig(_Base):
    id: str
    layout: str  # discriminant
    order: int | None = None
    title: str | None = None
    description: str | None = None
    elements: list[Any] = Field(default_factory=list)


class GridSectionConfig(BaseSectionConfig):
    layout: Literal["grid"] = "grid"
    grid_template_columns: str | None = None
    grid_template_rows: str | None = None
    gap: str | None = None
    row_gap: str | None = None
    column_gap: str | None = None
    justify_items: str | None = None
    align_items: str | None = None


class FlexSectionConfig(BaseSectionConfig):
    layout: Literal["flex"] = "flex"
    flex_direction: Literal[
        "row", "column", "row-reverse", "column-reverse"
    ] | None = None
    flex_wrap: Literal["nowrap", "wrap", "wrap-reverse"] | None = None
    gap: str | None = None
    justify_content: str | None = None
    align_items: str | None = None
    align_content: str | None = None


# ─── Page and Stage ───────────────────────────────────────────────────────────

class UIPageConfig(_Base):
    id: str
    title: str
    order: int
    description: str | None = None
    icon: str | None = None
    visible: bool | None = None
    sections: list[Union[GridSectionConfig, FlexSectionConfig]] = Field(
        default_factory=list
    )


class UIStageConfig(_Base):
    id: str
    title: str | None = None
    description: str | None = None
    default_page_id: str | None = None
    pages: list[UIPageConfig] = Field(default_factory=list)
    theme: Literal["light", "dark", "html", "custom"] | None = None
    class_name: str | None = None
    page_transition: Literal["none", "fade", "slide-left", "slide-right"] | None = None
```

#### FastAPI endpoint

```python
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/stages/{stage_id}")
async def get_stage(stage_id: str, user_id: str | None = None) -> JSONResponse:
    config = UIStageConfig(
        id="onboarding",
        title="Project Onboarding",
        description="Complete all sections to set up your team.",
        default_page_id="page-personal",
        pages=[
            UIPageConfig(
                id="page-personal",
                title="Personal Details",
                order=1,
                description="Tell us about yourself.",
                sections=[
                    GridSectionConfig(
                        id="section-name",
                        title="Full Name",
                        order=1,
                        grid_template_columns="repeat(2, 1fr)",
                        gap="1rem",
                        elements=[
                            InputElementConfig(
                                id="first-name",
                                name="firstName",
                                input_type="text",
                                label="First Name",
                                placeholder="Jane",
                                required=True,
                                order=1,
                                validations=[
                                    ValidationRule(rule="required"),
                                    ValidationRule(
                                        rule="minLength",
                                        value=2,
                                        message="At least 2 characters.",
                                    ),
                                ],
                            ),
                            InputElementConfig(
                                id="last-name",
                                name="lastName",
                                input_type="text",
                                label="Last Name",
                                placeholder="Doe",
                                required=True,
                                order=2,
                                validations=[ValidationRule(rule="required")],
                            ),
                        ],
                    )
                ],
            )
        ],
    )

    # Serialise with camelCase aliases and exclude None fields
    return JSONResponse(
        content=config.model_dump(by_alias=True, exclude_none=True)
    )
```

#### Flask endpoint

```python
from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/stages/<stage_id>")
def get_stage(stage_id: str):
    config = UIStageConfig(
        id=stage_id,
        title="My Stage",
        pages=[
            UIPageConfig(
                id="page-1",
                title="Page One",
                order=1,
                sections=[
                    FlexSectionConfig(
                        id="section-actions",
                        order=1,
                        flex_direction="row",
                        justify_content="flex-end",
                        gap="0.75rem",
                        elements=[
                            ButtonElementConfig(
                                id="btn-submit",
                                name="submit",
                                text="Submit",
                                button_type="submit",
                                variant="default",
                                order=1,
                            )
                        ],
                    )
                ],
            )
        ],
    )
    return jsonify(config.model_dump(by_alias=True, exclude_none=True))
```

#### Installation

```bash
# Pydantic v2
pip install pydantic

# FastAPI (includes an ASGI server via uvicorn)
pip install fastapi uvicorn

# Flask
pip install flask
```

---

### 6.4 PHP / Laravel (Composer)

#### Value-object classes

PHP 8.1+ readonly classes map cleanly to JSON. Use
[`spatie/laravel-data`](https://github.com/spatie/laravel-data) (recommended)
or plain readonly classes with `json_encode` / `JsonSerializable`.

The examples below use `spatie/laravel-data` because it provides automatic
camelCase serialisation, nested casting, and built-in `toArray()` / `toJson()`
support — making the integration almost zero-boilerplate.

```php
<?php

namespace App\UiConfig;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Mappers\SnakeCaseToCamelCaseNameMapper;

// ─── Validation ───────────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class ValidationRule extends Data
{
    public function __construct(
        public readonly string  $rule,       // "required"|"email"|"min"|"max"|"minLength"|"maxLength"
                                             // |"pattern"|"url"|"phone"|"step"|"custom"
        public readonly mixed   $value = null,
        public readonly ?string $message = null,
    ) {}
}

// ─── Base element ─────────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
abstract class BaseElementConfig extends Data
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $name,
        public readonly string  $type,      // discriminant
        public readonly ?int    $order         = null,
        public readonly mixed   $width         = null,  // string (CSS) or int (column span 1–12)
        public readonly ?string $label         = null,
        public readonly ?string $label_position = null, // "top"|"left"|"right"|"hidden"
        public readonly ?string $tooltip       = null,
        public readonly ?string $units         = null,
        public readonly ?string $units_position = null, // "prefix"|"suffix"
        public readonly ?bool   $disabled      = null,
        public readonly ?bool   $readonly      = null,
        public readonly ?bool   $required      = null,
        public readonly ?bool   $hidden        = null,
        public readonly ?string $class_name    = null,
        /** @var ValidationRule[]|null */
        public readonly ?array  $validations   = null,
    ) {}
}

// ─── Input element ────────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class InputElementConfig extends BaseElementConfig
{
    public function __construct(
        string  $id,
        string  $name,
        ?int    $order              = null,
        mixed   $width              = null,
        ?string $label              = null,
        ?bool   $required           = null,
        ?bool   $disabled           = null,
        ?bool   $readonly           = null,
        ?bool   $hidden             = null,
        ?array  $validations        = null,
        public readonly string  $input_type   = 'text',
        // "text"|"email"|"password"|"number"|"tel"|"url"|"date"
        // |"datetime-local"|"time"|"month"|"week"|"color"|"range"
        // |"file"|"search"|"hidden"
        public readonly ?string $placeholder  = null,
        public readonly mixed   $default_value = null,
        public readonly mixed   $value         = null,
        public readonly mixed   $min           = null,
        public readonly mixed   $max           = null,
        public readonly ?float  $step          = null,
        public readonly ?string $autocomplete  = null,
        public readonly ?string $datalist_id   = null,
    ) {
        parent::__construct(
            id: $id, name: $name, type: 'input',
            order: $order, width: $width, label: $label,
            required: $required, disabled: $disabled,
            readonly: $readonly, hidden: $hidden, validations: $validations,
        );
    }
}

// ─── Select helpers ───────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class SelectOption extends Data
{
    public function __construct(
        public readonly string $label,
        public readonly string $value,
        public readonly ?bool  $disabled = null,
    ) {}
}

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class SelectOptGroup extends Data
{
    public function __construct(
        public readonly bool   $group   = true,
        public readonly string $label   = '',
        /** @var SelectOption[] */
        public readonly array  $options = [],
    ) {}
}

// ─── Select element ───────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class SelectElementConfig extends BaseElementConfig
{
    public function __construct(
        string  $id,
        string  $name,
        ?int    $order         = null,
        mixed   $width         = null,
        ?string $label         = null,
        ?bool   $required      = null,
        ?array  $validations   = null,
        /** @var array<SelectOption|SelectOptGroup> */
        public readonly array   $options       = [],
        public readonly ?bool   $multiple      = null,
        public readonly ?string $placeholder   = null,
        public readonly mixed   $default_value = null,
        public readonly mixed   $value         = null,
    ) {
        parent::__construct(id: $id, name: $name, type: 'select',
            order: $order, width: $width, label: $label,
            required: $required, validations: $validations);
    }
}

// ─── Button element ───────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class ButtonElementConfig extends BaseElementConfig
{
    public function __construct(
        string  $id,
        string  $name,
        ?int    $order       = null,
        public readonly string  $text        = '',
        public readonly string  $button_type = 'button',  // "button"|"submit"|"reset"
        public readonly ?string $variant     = null,
        // "default"|"outline"|"ghost"|"destructive"|"secondary"|"link"
        public readonly ?string $size        = null,   // "sm"|"md"|"lg"
        public readonly ?string $icon        = null,
        public readonly ?string $icon_position = null, // "left"|"right"
    ) {
        parent::__construct(id: $id, name: $name, type: 'button', order: $order);
    }
}

// ─── Date Picker element ──────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class DatePickerElementConfig extends BaseElementConfig
{
    public function __construct(
        string  $id,
        string  $name,
        ?int    $order          = null,
        ?string $label          = null,
        ?bool   $required       = null,
        ?array  $validations    = null,
        public readonly ?string $value          = null,
        public readonly ?string $default_value  = null,
        public readonly ?string $placeholder    = null,
        public readonly ?string $min            = null,
        public readonly ?string $max            = null,
        public readonly ?bool   $include_time   = null,
    ) {
        parent::__construct(id: $id, name: $name, type: 'datepicker',
            order: $order, label: $label, required: $required, validations: $validations);
    }
}

// ─── MultiSelect element ──────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class MultiSelectElementConfig extends BaseElementConfig
{
    public function __construct(
        string  $id,
        string  $name,
        ?int    $order          = null,
        ?string $label          = null,
        ?bool   $required       = null,
        ?array  $validations    = null,
        /** @var SelectOption[] */
        public readonly array   $options        = [],
        /** @var string[]|null */
        public readonly ?array  $value          = null,
        /** @var string[]|null */
        public readonly ?array  $default_value  = null,
        public readonly ?string $placeholder    = null,
        public readonly ?int    $max_items      = null,
    ) {
        parent::__construct(id: $id, name: $name, type: 'multiselect',
            order: $order, label: $label, required: $required, validations: $validations);
    }
}

// ─── Section configs ──────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
abstract class BaseSectionConfig extends Data
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $layout,
        public readonly ?int    $order       = null,
        public readonly ?string $title       = null,
        public readonly ?string $description = null,
        /** @var BaseElementConfig[] */
        public readonly array   $elements    = [],
    ) {}
}

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class GridSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string  $id,
        ?int    $order                  = null,
        ?string $title                  = null,
        array   $elements               = [],
        public readonly ?string $grid_template_columns = null,
        public readonly ?string $grid_template_rows    = null,
        public readonly ?string $gap                   = null,
        public readonly ?string $row_gap               = null,
        public readonly ?string $column_gap            = null,
        public readonly ?string $align_items           = null,
        public readonly ?string $justify_items         = null,
    ) {
        parent::__construct(id: $id, layout: 'grid',
            order: $order, title: $title, elements: $elements);
    }
}

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class FlexSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string  $id,
        ?int    $order                    = null,
        ?string $title                    = null,
        array   $elements                 = [],
        public readonly ?string $flex_direction  = null,  // "row"|"column"|"row-reverse"|"column-reverse"
        public readonly ?string $flex_wrap       = null,  // "nowrap"|"wrap"|"wrap-reverse"
        public readonly ?string $gap             = null,
        public readonly ?string $row_gap         = null,
        public readonly ?string $column_gap      = null,
        public readonly ?string $justify_content = null,
        public readonly ?string $align_items     = null,
        public readonly ?string $align_content   = null,
    ) {
        parent::__construct(id: $id, layout: 'flex',
            order: $order, title: $title, elements: $elements);
    }
}

// ─── Page and Stage ───────────────────────────────────────────────────────────

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class UIPageConfig extends Data
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $title,
        public readonly int     $order,
        public readonly ?string $description = null,
        public readonly ?string $icon        = null,
        public readonly ?bool   $visible     = null,
        /** @var BaseSectionConfig[] */
        public readonly array   $sections    = [],
    ) {}
}

#[MapOutputName(SnakeCaseToCamelCaseNameMapper::class)]
class UIStageConfig extends Data
{
    public function __construct(
        public readonly string  $id,
        public readonly ?string $title           = null,
        public readonly ?string $description     = null,
        public readonly ?string $default_page_id = null,
        /** @var UIPageConfig[] */
        public readonly array   $pages           = [],
        public readonly ?string $theme           = null,  // "light"|"dark"|"html"|"custom"
        public readonly ?string $class_name      = null,
        public readonly ?string $page_transition = null,  // "none"|"fade"|"slide-left"|"slide-right"
    ) {}
}
```

#### Laravel controller

```php
<?php

namespace App\Http\Controllers;

use App\UiConfig\UIStageConfig;
use App\UiConfig\UIPageConfig;
use App\UiConfig\GridSectionConfig;
use App\UiConfig\FlexSectionConfig;
use App\UiConfig\InputElementConfig;
use App\UiConfig\ButtonElementConfig;
use App\UiConfig\ValidationRule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StagesController extends Controller
{
    public function show(Request $request, string $stageId): JsonResponse
    {
        // Optionally derive the viewer's identity from the auth token
        // $userId = auth()->id();

        $config = new UIStageConfig(
            id:             'onboarding',
            title:          'Project Onboarding',
            description:    'Complete all sections to set up your team and project.',
            default_page_id: 'page-personal',
            pages: [
                new UIPageConfig(
                    id:    'page-personal',
                    title: 'Personal Details',
                    order: 1,
                    description: 'Tell us about yourself.',
                    sections: [
                        new GridSectionConfig(
                            id:                    'section-name',
                            order:                 1,
                            title:                 'Full Name',
                            grid_template_columns: 'repeat(2, 1fr)',
                            gap:                   '1rem',
                            elements: [
                                new InputElementConfig(
                                    id:          'first-name',
                                    name:        'firstName',
                                    order:       1,
                                    label:       'First Name',
                                    required:    true,
                                    input_type:  'text',
                                    placeholder: 'Jane',
                                    validations: [
                                        new ValidationRule(rule: 'required'),
                                        new ValidationRule(rule: 'minLength', value: 2,
                                            message: 'At least 2 characters.'),
                                    ],
                                ),
                                new InputElementConfig(
                                    id:          'last-name',
                                    name:        'lastName',
                                    order:       2,
                                    label:       'Last Name',
                                    required:    true,
                                    input_type:  'text',
                                    placeholder: 'Doe',
                                    validations: [
                                        new ValidationRule(rule: 'required'),
                                    ],
                                ),
                            ],
                        ),
                    ],
                ),
                new UIPageConfig(
                    id:    'page-submit',
                    title: 'Review & Submit',
                    order: 2,
                    sections: [
                        new FlexSectionConfig(
                            id:              'section-actions',
                            order:           1,
                            flex_direction:  'row',
                            justify_content: 'flex-end',
                            gap:             '0.75rem',
                            elements: [
                                new ButtonElementConfig(
                                    id:          'btn-reset',
                                    name:        'reset',
                                    order:       1,
                                    text:        'Reset',
                                    button_type: 'reset',
                                    variant:     'outline',
                                ),
                                new ButtonElementConfig(
                                    id:          'btn-submit',
                                    name:        'submit',
                                    order:       2,
                                    text:        'Submit',
                                    button_type: 'submit',
                                    variant:     'default',
                                ),
                            ],
                        ),
                    ],
                ),
            ],
        );

        // spatie/laravel-data serialises to camelCase and drops null values
        return response()->json($config->toArray());
    }
}
```

#### Route registration

```php
// routes/api.php
use App\Http\Controllers\StagesController;

Route::get('/stages/{stageId}', [StagesController::class, 'show'])
     ->middleware('auth:sanctum');
```

#### Composer dependencies

```json
{
    "require": {
        "php": "^8.1",
        "laravel/framework": "^11.0",
        "spatie/laravel-data": "^4.0"
    }
}
```

```bash
composer require spatie/laravel-data
```

> **Without `spatie/laravel-data`:** You can use plain PHP arrays and
> `response()->json([...])` directly, or implement `JsonSerializable` on each
> class. The key requirement is that all property names are serialised as
> **camelCase** (e.g. `gridTemplateColumns`, not `grid_template_columns`) and
> `null` values are omitted from the output.
