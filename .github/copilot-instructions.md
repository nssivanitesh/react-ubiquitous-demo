# Copilot Instructions — react-ubiquitous-demo

## Project Overview

This is a **demo site** for the [react-ubiquitous](https://www.npmjs.com/package/react-ubiquitous) npm package — a JSON-config-driven React UI component library. The site showcases every component category with live previews, editable JSON configs, and multi-language builder code examples.

---

## Repository Structure

```
react-ubiquitous-demo/
└── src/                        # Demo site source (React + TypeScript + Vite)
    ├── components/             # Shared UI components (CategoryPage, TopBar, etc.)
    ├── contexts/               # React context (ThemeContext)
    ├── data/                   # Per-category JSON config objects (fields, feedback, etc.)
    ├── pages/                  # Per-category page components
    └── utils/                  # Utilities (codeGen.ts — dynamic builder code generation)
```

---

## Component Page Architecture

Every component category page is built using `src/components/CategoryPage.tsx` with a list of `CategoryItem` objects from its data file (e.g. `src/data/fields.ts`).

Each `CategoryItem` is:
```ts
{
  id: string        // unique slug
  label: string     // tab / page title shown in the UI
  config: object    // react-ubiquitous JSON section config
  status?: 'active' | 'wip'
}
```

The `CategoryPage` component renders **five tabs** for each item:
1. **🖼 Preview** — live rendered `UIStage` component
2. **⚙️ JSON Config** — editable raw JSON (live-updates the preview)
3. **.NET** — auto-generated C# builder code (using `nuget/` classes)
4. **Python** — auto-generated Python builder code (using `py/` classes)
5. **Laravel** — auto-generated PHP builder code (using `composer/` classes)

The code generation for tabs 3–5 is handled by `src/utils/codeGen.ts` which converts any JSON section config object into equivalent builder code for each platform.

---

## Builder APIs Summary

### .NET (C#) — `nuget/`

```csharp
// Install: dotnet add package ReactUbiquitous.NuGet
using ReactUbiquitous.NuGet.Builders;
using ReactUbiquitous.NuGet.Models.Elements;
using ReactUbiquitous.NuGet.Models.Sections;

var section = new SectionBuilder<FlexSectionConfig>()
    .WithId("my-section")
    .WithTitle("My Section")
    .Configure(s => { s.FlexDirection = "column"; s.Gap = "1rem"; })
    .AddElement(new ElementBuilder<InputElementConfig>()
        .WithId("f1").WithName("email").WithLabel("Email")
        .Configure(e => { e.InputType = "email"; })
        .Build())
    .Build();
```

### Python — `py/`

```python
# Install: pip install react-ubiquitous-put
from react_ubiquitous_put.builders import SectionBuilder, ElementBuilder
from react_ubiquitous_put.models import FlexSectionConfig, InputElementConfig

section = (
    SectionBuilder(FlexSectionConfig)
    .with_id("my-section")
    .with_title("My Section")
    .with_field(flex_direction="column", gap="1rem")
    .add_element(
        ElementBuilder(InputElementConfig)
        .with_id("f1").with_name("email").with_label("Email")
        .with_field(input_type="email")
        .build()
    )
    .build()
)
```

### Laravel / PHP — `composer/`

```php
<?php
// Install: composer require react-ubiquitous/composer
use ReactUbiquitous\DTOs\Sections\FlexSectionConfig;
use ReactUbiquitous\DTOs\Elements\InputElementConfig;

$section = new FlexSectionConfig(
    id: 'my-section',
    title: 'My Section',
    flexDirection: 'column',
    gap: '1rem',
    elements: [
        new InputElementConfig(id: 'f1', name: 'email', inputType: 'email', label: 'Email'),
    ],
);
```

---

## Adding a New Component Demo

1. Add a new config object to the relevant data file in `src/data/`
2. Add it to the `items` array in the relevant page in `src/pages/`
3. The `.NET`, `Python`, and `Laravel` code tabs are generated automatically by `src/utils/codeGen.ts`

## Modifying the Code Generator

`src/utils/codeGen.ts` exports three functions:
- `genDotNet(cfg: object): string` → C# builder code
- `genPython(cfg: object): string` → Python builder code
- `genLaravel(cfg: object): string` → PHP builder code

Each function reads the `layout` field to determine the section class, and the `type` field on each element to determine the element class. Add new mappings to `ELEMENT_CLASS` or `SECTION_CLASS` in that file when new component types are added to the library.
