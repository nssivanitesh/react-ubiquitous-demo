/* ============================================================
 * src/utils/codeGen.ts
 *
 * Converts a react-ubiquitous JSON section config object into
 * equivalent builder / DTO code for three platforms:
 *   - genDotNet  → C# (ReactUbiquitous.NuGet)
 *   - genPython  → Python (react-ubiquitous-put)
 *   - genLaravel → PHP (react-ubiquitous/composer)
 * ============================================================ */

type Cfg = Record<string, unknown>
type ElementCfg = Cfg & { type: string }

// ── class-name mappings ──────────────────────────────────────────────────────

export const ELEMENT_CLASS: Record<string, string> = {
  input:        'InputElementConfig',
  checkbox:     'CheckboxElementConfig',
  radio:        'RadioElementConfig',
  textarea:     'TextareaElementConfig',
  select:       'SelectElementConfig',
  button:       'ButtonElementConfig',
  label:        'LabelElementConfig',
  fieldset:     'FieldsetElementConfig',
  datalist:     'DatalistElementConfig',
  output:       'OutputElementConfig',
  datepicker:   'DatePickerElementConfig',
  multiselect:  'MultiSelectElementConfig',
  autocomplete: 'AutocompleteElementConfig',
  fileupload:   'FileUploadElementConfig',
  colorpicker:  'ColorPickerElementConfig',
  rangeslider:  'RangeSliderElementConfig',
  rating:       'RatingElementConfig',
  otpinput:     'OtpInputElementConfig',
  phoneinput:   'PhoneInputElementConfig',
  custom:       'CustomElementConfig',
}

export const SECTION_CLASS: Record<string, string> = {
  flex:          'FlexSectionConfig',
  grid:          'GridSectionConfig',
  tabs:          'TabsSectionConfig',
  accordion:     'AccordionSectionConfig',
  card:          'CardSectionConfig',
  table:         'TableSectionConfig',
  stat:          'StatSectionConfig',
  sidebar:       'SidebarSectionConfig',
  navbar:        'NavbarSectionConfig',
  modal:         'ModalSectionConfig',
  drawer:        'DrawerSectionConfig',
  stepper:       'StepperSectionConfig',
  timeline:      'TimelineSectionConfig',
  'list-detail': 'ListDetailSectionConfig',
  'tree-view':   'TreeViewSectionConfig',
  chat:          'ChatSectionConfig',
  hero:          'HeroSectionConfig',
  alert:         'AlertSectionConfig',
  progress:      'ProgressSectionConfig',
  skeleton:      'SkeletonSectionConfig',
  chart:         'ChartSectionConfig',
  media:         'MediaSectionConfig',
  avatar:        'AvatarSectionConfig',
  badge:         'BadgeSectionConfig',
  breadcrumbs:   'BreadcrumbsSectionConfig',
  divider:       'DividerSectionConfig',
  popover:       'PopoverSectionConfig',
  toast:         'ToastSectionConfig',
  tooltip:       'TooltipSectionConfig',
  codeblock:     'CodeBlockSectionConfig',
  'empty-state': 'EmptyStateSectionConfig',
  iframe:        'IframeSectionConfig',
  collapse:      'CollapseSectionConfig',
  pagination:    'PaginationSectionConfig',
}

// Fields handled by named builder methods (.WithXxx / .with_xxx) on elements
const ELEMENT_STD = new Set([
  'id', 'name', 'label', 'order', 'required', 'disabled',
  'readonly', 'hidden', 'tooltip', 'labelPosition', 'width', 'className',
])

// Fields handled by named builder methods on sections
const SECTION_STD = new Set(['id', 'title', 'description', 'order', 'className'])

// Fields never emitted directly (handled structurally or irrelevant)
const SKIP = new Set(['type', 'layout', 'elements', 'children', 'validations'])

// ── string helpers ───────────────────────────────────────────────────────────

function toPascal(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function toSnake(s: string): string {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// ── value formatters ─────────────────────────────────────────────────────────

/** Format a value as a C# literal. */
function fmtCS(v: unknown, depth = 0): string {
  if (v === null || v === undefined) return 'null'
  if (typeof v === 'string') return `"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    const pad  = '    '.repeat(depth)
    const pad1 = '    '.repeat(depth + 1)
    if (v.every(x => typeof x !== 'object' || x === null)) {
      return `[ ${v.map(x => fmtCS(x)).join(', ')} ]`
    }
    const items = v.map(item =>
      `${pad1}new { ${
        Object.entries(item as object)
          .map(([k, val]) => `${toPascal(k)} = ${fmtCS(val)}`)
          .join(', ')
      } }`
    )
    return `[\n${items.join(',\n')}\n${pad}]`
  }
  if (typeof v === 'object') {
    const pad  = '    '.repeat(depth)
    const pad1 = '    '.repeat(depth + 1)
    const pairs = Object.entries(v as object).map(
      ([k, val]) => `${pad1}${toPascal(k)} = ${fmtCS(val)}`
    )
    return `new {\n${pairs.join(',\n')}\n${pad}}`
  }
  return String(v)
}

/** Format a value as a Python literal. */
function fmtPy(v: unknown, depth = 0): string {
  if (v === null || v === undefined) return 'None'
  if (typeof v === 'string') return `"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  if (typeof v === 'boolean') return v ? 'True' : 'False'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    const pad  = '    '.repeat(depth)
    const pad1 = '    '.repeat(depth + 1)
    if (v.every(x => typeof x !== 'object' || x === null)) {
      return `[${v.map(x => fmtPy(x)).join(', ')}]`
    }
    const items = v.map(item =>
      `${pad1}{${
        Object.entries(item as object)
          .map(([k, val]) => `"${k}": ${fmtPy(val)}`)
          .join(', ')
      }}`
    )
    return `[\n${items.join(',\n')}\n${pad}]`
  }
  if (typeof v === 'object') {
    const pad  = '    '.repeat(depth)
    const pad1 = '    '.repeat(depth + 1)
    const pairs = Object.entries(v as object).map(
      ([k, val]) => `${pad1}"${k}": ${fmtPy(val)}`
    )
    return `{\n${pairs.join(',\n')}\n${pad}}`
  }
  return String(v)
}

/** Format a value as a PHP literal. */
function fmtPhp(v: unknown, depth = 0): string {
  if (v === null || v === undefined) return 'null'
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    const pad  = '    '.repeat(depth)
    const pad1 = '    '.repeat(depth + 1)
    if (v.every(x => typeof x !== 'object' || x === null)) {
      return `[${v.map(x => fmtPhp(x)).join(', ')}]`
    }
    const items = v.map(item =>
      `${pad1}[${
        Object.entries(item as object)
          .map(([k, val]) => `'${k}' => ${fmtPhp(val)}`)
          .join(', ')
      }]`
    )
    return `[\n${items.join(',\n')}\n${pad}]`
  }
  if (typeof v === 'object') {
    const pad  = '    '.repeat(depth)
    const pad1 = '    '.repeat(depth + 1)
    const pairs = Object.entries(v as object).map(
      ([k, val]) => `${pad1}'${k}' => ${fmtPhp(val)}`
    )
    return `[\n${pairs.join(',\n')}\n${pad}]`
  }
  return String(v)
}

// ── C# generator ─────────────────────────────────────────────────────────────

function genCSElement(el: ElementCfg, baseInd: string): string {
  const cls  = ELEMENT_CLASS[el.type] ?? `${toPascal(el.type)}ElementConfig`
  const ind  = baseInd + '    '

  // Standard builder chain
  const chain: string[] = []
  for (const field of ELEMENT_STD) {
    if (el[field] !== undefined) {
      chain.push(`${ind}.With${toPascal(field)}(${fmtCS(el[field])})`)
    }
  }

  // Extra fields → Configure()
  const extras: string[] = []
  for (const [k, v] of Object.entries(el)) {
    if (SKIP.has(k) || ELEMENT_STD.has(k) || v === undefined) continue
    extras.push(`${ind}    ${toPascal(k)} = ${fmtCS(v, (ind.length / 4) + 1)},`)
  }

  let code = `${baseInd}new ElementBuilder<${cls}>()\n`
  if (chain.length) code += chain.join('\n') + '\n'
  if (extras.length) {
    code += `${ind}.Configure(e =>\n${ind}{\n`
    code += extras.join('\n') + '\n'
    code += `${ind}})\n`
  }

  // Nested children (e.g. fieldset)
  const children = el.children as ElementCfg[] | undefined
  if (children?.length) {
    for (const child of children) {
      code += `${ind}.AddElement(\n${genCSElement(child, ind + '    ')})\n`
    }
  }

  code += `${ind}.Build()`
  return code
}

/** Generate C# builder code for a section config. */
export function genDotNet(cfg: Cfg): string {
  const layout     = (cfg.layout as string) ?? 'flex'
  const sectionCls = SECTION_CLASS[layout] ?? `${toPascal(layout)}SectionConfig`
  const elements   = (cfg.elements as ElementCfg[]) ?? []
  const ind        = '    '

  const elementClasses = [...new Set(elements.map(e => ELEMENT_CLASS[e.type] ?? `${toPascal(e.type)}ElementConfig`))]

  // Section extra fields → Configure()
  const sectionExtras: string[] = []
  for (const [k, v] of Object.entries(cfg)) {
    if (SKIP.has(k) || SECTION_STD.has(k) || v === undefined) continue
    sectionExtras.push(`${ind}    ${toPascal(k)} = ${fmtCS(v, 2)},`)
  }

  let code = '// Install: dotnet add package ReactUbiquitous.NuGet\n'
  code     += 'using ReactUbiquitous.NuGet.Builders;\n'
  if (elementClasses.length) code += 'using ReactUbiquitous.NuGet.Models.Elements;\n'
  code     += 'using ReactUbiquitous.NuGet.Models.Sections;\n\n'
  code     += `var section = new SectionBuilder<${sectionCls}>()\n`

  for (const field of SECTION_STD) {
    if (cfg[field] !== undefined) {
      code += `${ind}.With${toPascal(field)}(${fmtCS(cfg[field])})\n`
    }
  }

  if (sectionExtras.length) {
    code += `${ind}.Configure(s =>\n${ind}{\n`
    code += sectionExtras.join('\n') + '\n'
    code += `${ind}})\n`
  }

  for (const el of elements) {
    code += `${ind}.AddElement(\n${genCSElement(el, ind + ind)}\n${ind})\n`
  }

  code += `${ind}.Build();`
  return code
}

// ── Python generator ──────────────────────────────────────────────────────────

function genPyElement(el: ElementCfg, ind: string): string {
  const cls  = ELEMENT_CLASS[el.type] ?? `${toPascal(el.type)}ElementConfig`
  const ind1 = ind + '    '
  const ind2 = ind1 + '    '

  // Standard builder chain
  const chain: string[] = []
  for (const field of ELEMENT_STD) {
    if (el[field] !== undefined) {
      chain.push(`${ind1}.with_${toSnake(field)}(${fmtPy(el[field])})`)
    }
  }

  // Extra fields → with_field()
  const extras: [string, unknown][] = []
  for (const [k, v] of Object.entries(el)) {
    if (SKIP.has(k) || ELEMENT_STD.has(k) || v === undefined) continue
    extras.push([k, v])
  }

  let code = `${ind}(\n${ind1}ElementBuilder(${cls})\n`
  if (chain.length) code += chain.join('\n') + '\n'

  if (extras.length) {
    code += `${ind1}.with_field(\n`
    for (const [k, v] of extras) {
      code += `${ind2}${toSnake(k)}=${fmtPy(v, ind2.length / 4)},\n`
    }
    code += `${ind1})\n`
  }

  const children = el.children as ElementCfg[] | undefined
  if (children?.length) {
    for (const child of children) {
      code += `${ind1}.add_element(\n${genPyElement(child, ind1 + '    ')}\n${ind1})\n`
    }
  }

  code += `${ind1}.build()\n${ind})`
  return code
}

/** Generate Python builder code for a section config. */
export function genPython(cfg: Cfg): string {
  const layout     = (cfg.layout as string) ?? 'flex'
  const sectionCls = SECTION_CLASS[layout] ?? `${toPascal(layout)}SectionConfig`
  const elements   = (cfg.elements as ElementCfg[]) ?? []
  const ind        = '    '
  const ind2       = ind + ind

  const elementClasses = [...new Set(elements.map(e => ELEMENT_CLASS[e.type] ?? `${toPascal(e.type)}ElementConfig`))]

  // Section extra fields → with_field()
  const extras: [string, unknown][] = []
  for (const [k, v] of Object.entries(cfg)) {
    if (SKIP.has(k) || SECTION_STD.has(k) || v === undefined) continue
    extras.push([k, v])
  }

  let imports = `# Install: pip install react-ubiquitous-put\n`
  imports    += `from react_ubiquitous_put.builders import SectionBuilder, ElementBuilder\n`
  imports    += `from react_ubiquitous_put.models import ${sectionCls}`
  if (elementClasses.length) imports += `, ${elementClasses.join(', ')}`
  imports    += '\n'

  let code = imports + '\nsection = (\n'
  code     += `${ind}SectionBuilder(${sectionCls})\n`

  for (const field of SECTION_STD) {
    if (cfg[field] !== undefined) {
      code += `${ind}.with_${toSnake(field)}(${fmtPy(cfg[field])})\n`
    }
  }

  if (extras.length) {
    code += `${ind}.with_field(\n`
    for (const [k, v] of extras) {
      code += `${ind2}${toSnake(k)}=${fmtPy(v, ind2.length / 4)},\n`
    }
    code += `${ind})\n`
  }

  for (const el of elements) {
    code += `${ind}.add_element(\n${genPyElement(el, ind2)}\n${ind})\n`
  }

  code += `${ind}.build()\n)`
  return code
}

// ── Laravel / PHP generator ───────────────────────────────────────────────────

// Required named ctor args per element type (beyond id / name)
const PHP_ELEMENT_REQUIRED: Record<string, string[]> = {
  input:     ['inputType'],
  button:    ['text'],
  label:     ['text'],
  fieldset:  ['legend'],
  output:    ['formula'],
  datalist:  [],
}

function genPhpElement(el: ElementCfg, ind: string): string {
  const cls  = ELEMENT_CLASS[el.type] ?? `${toPascal(el.type)}ElementConfig`
  const pad1 = ind + '    '

  const emitted = new Set<string>(['type'])
  const params: string[] = []

  const addParam = (k: string) => {
    if (emitted.has(k) || el[k] === undefined) return
    emitted.add(k)
    const depth = pad1.length / 4
    params.push(`${pad1}${k}: ${fmtPhp(el[k], depth)}`)
  }

  // id always first, name second
  addParam('id')
  addParam('name')

  // type-specific required fields
  for (const req of (PHP_ELEMENT_REQUIRED[el.type] ?? [])) addParam(req)

  // children inline (fieldset)
  const children = el.children as ElementCfg[] | undefined
  if (children?.length) {
    emitted.add('children')
    const childLines = children.map(c => genPhpElement(c, pad1 + '    ')).join(',\n')
    params.push(`${pad1}children: [\n${childLines},\n${pad1}]`)
  }

  // remaining fields
  const SKIP_PHP = new Set([...SKIP, 'children'])
  for (const [k, v] of Object.entries(el)) {
    if (SKIP_PHP.has(k) || emitted.has(k) || v === undefined) continue
    params.push(`${pad1}${k}: ${fmtPhp(v, pad1.length / 4)}`)
    emitted.add(k)
  }

  return `${ind}new ${cls}(\n${params.join(',\n')},\n${ind})`
}

/** Generate PHP (Laravel) DTO code for a section config. */
export function genLaravel(cfg: Cfg): string {
  const layout     = (cfg.layout as string) ?? 'flex'
  const sectionCls = SECTION_CLASS[layout] ?? `${toPascal(layout)}SectionConfig`
  const elements   = (cfg.elements as ElementCfg[]) ?? []
  const ind        = '    '
  const ind2       = ind + ind

  const elementClasses = [...new Set(elements.map(e => ELEMENT_CLASS[e.type] ?? `${toPascal(e.type)}ElementConfig`))]

  let code = `<?php\n// Install: composer require react-ubiquitous/composer\n\n`
  code    += `use ReactUbiquitous\\DTOs\\Sections\\${sectionCls};\n`
  for (const cls of elementClasses) {
    code  += `use ReactUbiquitous\\DTOs\\Elements\\${cls};\n`
  }
  code    += `\n$section = new ${sectionCls}(\n`

  // id first
  if (cfg.id !== undefined) code += `${ind}id: ${fmtPhp(cfg.id)},\n`

  // elements array
  if (elements.length) {
    code += `${ind}elements: [\n`
    for (const el of elements) {
      code += genPhpElement(el, ind2) + `,\n`
    }
    code += `${ind}],\n`
  }

  // remaining section fields (skip id, layout, elements, validations)
  const SKIP_PHP_SECTION = new Set(['id', 'layout', 'elements', 'validations'])
  for (const [k, v] of Object.entries(cfg)) {
    if (SKIP_PHP_SECTION.has(k) || v === undefined) continue
    code += `${ind}${k}: ${fmtPhp(v, 1)},\n`
  }

  code += `);`
  return code
}
