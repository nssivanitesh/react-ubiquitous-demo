import { CategoryPage } from '../components/CategoryPage'
import { ColorSwatch } from '../components/ColorSwatch'
import {
  inputConfig, checkboxConfig, radioConfig, textareaConfig, selectConfig,
  buttonConfig, labelConfig, fieldsetConfig, datalistConfig, outputConfig,
  datepickerConfig, multiselectConfig, autocompleteConfig, fileuploadConfig,
  colorpickerConfig, rangesliderConfig, ratingConfig, otpinputConfig, phoneinputConfig,
  hiddenExprConfig, disabledExprConfig, customElementConfig,
} from '../data/fields'

export default function FieldsPage() {
  return (
    <CategoryPage
      title="📝 Fields"
      description="All supported form field and input types — including new 1.0.13 features: hiddenExpr, disabledExpr, and custom elements."
      localStorageKey="fields-demo"
      i18n={{ required: '⚠️ This field is required.', email: '📧 Enter a valid email address.' }}
      onAutoSave={(values) => console.info('[FieldsPage] auto-save:', values)}
      customComponents={{ 'color-swatch': ColorSwatch }}
      items={[
        { id: 'hiddenexpr',    label: '✨ hiddenExpr',      config: hiddenExprConfig,    status: 'wip' },
        { id: 'disabledexpr',  label: '🔒 disabledExpr',   config: disabledExprConfig,  status: 'wip' },
        { id: 'customelement', label: '🧩 Custom Element',  config: customElementConfig, status: 'wip' },
        { id: 'input',         label: 'Input',              config: inputConfig,         status: 'wip' },
        { id: 'checkbox',      label: 'Checkbox',           config: checkboxConfig,      status: 'wip' },
        { id: 'radio',         label: 'Radio',              config: radioConfig,         status: 'wip' },
        { id: 'textarea',      label: 'Textarea',           config: textareaConfig,      status: 'wip' },
        { id: 'select',        label: 'Select',             config: selectConfig,        status: 'wip' },
        { id: 'button',        label: 'Button',             config: buttonConfig,        status: 'wip' },
        { id: 'label',         label: 'Label',              config: labelConfig,         status: 'active' },
        { id: 'fieldset',      label: 'Fieldset',           config: fieldsetConfig,      status: 'wip' },
        { id: 'datalist',      label: 'Datalist',           config: datalistConfig,      status: 'wip' },
        { id: 'output',        label: 'Output',             config: outputConfig,        status: 'active' },
        { id: 'datepicker',    label: 'Datepicker',         config: datepickerConfig,    status: 'wip' },
        { id: 'multiselect',   label: 'Multi-Select',       config: multiselectConfig,   status: 'wip' },
        { id: 'autocomplete',  label: 'Autocomplete',       config: autocompleteConfig,  status: 'wip' },
        { id: 'fileupload',    label: 'File Upload',        config: fileuploadConfig,    status: 'wip' },
        { id: 'colorpicker',   label: 'Color Picker',       config: colorpickerConfig,   status: 'wip' },
        { id: 'rangeslider',   label: 'Range Slider',       config: rangesliderConfig,   status: 'wip' },
        { id: 'rating',        label: 'Rating',             config: ratingConfig,        status: 'wip' },
        { id: 'otpinput',      label: 'OTP Input',          config: otpinputConfig,      status: 'wip' },
        { id: 'phoneinput',    label: 'Phone Input',        config: phoneinputConfig,    status: 'wip' },
      ]}
    />
  )
}
