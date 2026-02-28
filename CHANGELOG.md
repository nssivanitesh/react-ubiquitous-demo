# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.7] — 2026-02-27

### Changed

- **`AvatarSectionConfig`** — replaced single-avatar properties (`Src`, `Alt`, `Shape`, `Fallback`, `Initials`) with a spec-compliant `Avatars: List<AvatarItem>` collection plus `Size` and `Stacked` section-level fields. Added `AvatarItem` supporting type (`Id`, `Initials`, `Src`, `Alt`, `Name`).
- **`TimelineEvent`** — renamed `Color` (JSON `"color"`) → `Variant` (JSON `"variant"`) to match the spec's `'default' | 'primary' | 'success' | 'warning' | 'danger'` color-variant field.
- **`ChartSectionConfig`** — replaced the `ChartDataSeries`-based nested data model with the spec-compliant flat model: added `Data: List<ChartDataPoint>` (x-axis labels + values at section level) and replaced `ChartDataSeries` with `ChartSeries` (`Key`, `Label`, `Color`) for the `Series` collection. Added `ShowGrid` field.
- **`BadgeSectionConfig`** — added `Appearance` (`"subtle" | "solid" | "outline"`) and `Size` (`"sm" | "md" | "lg"`) fields.
- **`StatSectionConfig`** — added `Columns` field; `StatItem` gains `SubLabel`; `StatItem.Value` type narrowed from `object?` to `string?`; removed non-spec `Prefix` and `Suffix` properties.
- **`TableSectionConfig`** — added spec-required `Searchable` (`bool?`) and `EmptyMessage` (`string?`) fields.

---

## [1.0.4] — 2026-02-27

### Changed

- Updated README code examples for `BadgeSectionConfig`, `TimelineSectionConfig`, and `StatSectionConfig` to match the types actually shipped in the DLL (removed references to non-existent `BadgeItem`, `TimelineEvent`, and `StatItem` types).
- Added `CHANGELOG.md`.

---

## [1.0.3] — 2025-03-01

### Fixed

- `ListDetailSectionConfig` now emits `"layout": "list-detail"` (hyphenated), which matches the `react-ubiquitous` frontend schema.

### Known schema mismatches with `react-ubiquitous` npm package

The following mismatches exist between the JSON this package emits and what the `react-ubiquitous` frontend component expects. A post-processing shim is required at the API boundary until a future release resolves them.

#### 1. Stat sections — flat structure and `trendValue` field name

- **NuGet emits:** One flat `{ "layout": "stat", "label": ..., "value": ..., "trendValue": ... }` section per statistic.
- **Frontend expects:** A single section containing a `stats` array of objects with a `trendDirection` field.
- **Workaround:** Group individual `StatSectionConfig` objects into a `stats` array and rename `trendValue` → `trendDirection` before sending to the frontend.

#### 2. Badge sections — flat structure and `content` field name

- **NuGet emits:** One flat `{ "layout": "badge", "content": ..., "variant": ... }` section per badge.
- **Frontend expects:** A single section containing a `badges` array of objects with a `label` field.
- **Workaround:** Group individual `BadgeSectionConfig` objects into a `badges` array and rename `content` → `label` before sending to the frontend.

#### 3. Timeline — `items` / `label` / `date` field names

- **NuGet emits:** `TimelineSectionConfig.Items` (array key `"items"`); each `TimelineItem` uses `"label"` and `"date"`.
- **Frontend expects:** Array key `"events"`; each event uses `"title"` and `"timestamp"`.
- **Workaround:** Rename `items` → `events`, `label` → `title`, and `date` → `timestamp` in each event before sending to the frontend.

#### 4. Chart sections — layout discriminator and series shape

- **NuGet emits:** Separate layout values per chart type: `"bar"`, `"area"`, `"line"`, `"donut"`, `"radar"`.
- **Frontend expects:** A unified `"layout": "chart"` discriminator with a `"chartType"` field (e.g. `"chartType": "bar"`).
- **NuGet emits:** `ChartDataSeries.Name` (JSON key `"name"`) and raw numeric `data` arrays alongside a top-level `categories` array.
- **Frontend expects:** Series `"label"` (not `"name"`) and structured data points `[{ "x": "Jan", "y": 180 }, ...]` with the category embedded in each point.
- **Workaround:** Rewrite chart section layout values, rename `name` → `label` on each series, and convert `(categories, data)` pairs into `{ x, y }` point objects before sending to the frontend.

---

## [1.0.2] — 2025-01-15

### Added

- Initial public release targeting `react-ubiquitous` npm package v1.0.14.
- Fluent builder API: `StageBuilder`, `PageBuilder`, `SectionBuilder<T>`, `ElementBuilder<T>`.
- Section configuration types for all supported layouts: Flex, Grid, Card, Hero, Accordion, Collapse, Divider, Media Carousel, List-Detail, Tree-View, Chat, Navbar, Sidebar, Breadcrumbs, Pagination, Stepper, Tabs, Alert, Progress, Skeleton, Toast, Modal, Drawer, Tooltip, Popover, Table, Badge, Avatar, Timeline, Stat, Empty State, Code Block, Chart (Line, Area, Bar, Pie, Donut, Radar, Scatter), and Iframe.
- Element configuration types for all supported input types: Input, Checkbox, Radio, Textarea, Select, Button, Label, Fieldset, Datalist, Output, Datepicker, Multiselect, Autocomplete, File Upload, Color Picker, Range Slider, Rating, OTP Input, Phone Input, and Custom.
- Validation rule model (`ValidationRule`) supporting required, min/max length, pattern, min/max value, and custom rules.
- JSON serialization via `System.Text.Json` with `[JsonPropertyName]` attributes on all properties.
