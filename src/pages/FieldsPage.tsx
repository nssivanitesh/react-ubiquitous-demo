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
      description="All supported form field and input types — including hiddenExpr, disabledExpr, and custom elements."
      localStorageKey="fields-demo"
      i18n={{ required: '⚠️ This field is required.', email: '📧 Enter a valid email address.' }}
      onAutoSave={(values) => console.info('[FieldsPage] auto-save:', values)}
      customComponents={{ 'color-swatch': ColorSwatch }}
      items={[
        { id: 'hiddenexpr',    label: '✨ hiddenExpr',      config: hiddenExprConfig,    status: 'active' },
        { id: 'disabledexpr',  label: '🔒 disabledExpr',   config: disabledExprConfig,  status: 'active' },
        { id: 'customelement', label: '🧩 Custom Element',  config: customElementConfig, status: 'active' },
        { id: 'input',         label: 'Input',              config: inputConfig,         status: 'active' },
        { id: 'checkbox',      label: 'Checkbox',           config: checkboxConfig,      status: 'active' },
        { id: 'radio',         label: 'Radio',              config: radioConfig,         status: 'active' },
        { id: 'textarea',      label: 'Textarea',           config: textareaConfig,      status: 'active' },
        { id: 'select',        label: 'Select',             config: selectConfig,        status: 'active' },
        { id: 'button',        label: 'Button',             config: buttonConfig,        status: 'active' },
        { id: 'label',         label: 'Label',              config: labelConfig,         status: 'active' },
        { id: 'fieldset',      label: 'Fieldset',           config: fieldsetConfig,      status: 'active' },
        { id: 'datalist',      label: 'Datalist',           config: datalistConfig,      status: 'active' },
        { id: 'output',        label: 'Output',             config: outputConfig,        status: 'active' },
        { id: 'datepicker',    label: 'Datepicker',         config: datepickerConfig,    status: 'active' },
        { id: 'multiselect',   label: 'Multi-Select',       config: multiselectConfig,   status: 'active' },
        { id: 'autocomplete',  label: 'Autocomplete',       config: autocompleteConfig,  status: 'active' },
        { id: 'fileupload',    label: 'File Upload',        config: fileuploadConfig,    status: 'active' },
        { id: 'colorpicker',   label: 'Color Picker',       config: colorpickerConfig,   status: 'active' },
        { id: 'rangeslider',   label: 'Range Slider',       config: rangesliderConfig,   status: 'active' },
        { id: 'rating',        label: 'Rating',             config: ratingConfig,        status: 'active' },
        { id: 'otpinput',      label: 'OTP Input',          config: otpinputConfig,      status: 'active' },
        { id: 'phoneinput',    label: 'Phone Input',        config: phoneinputConfig,    status: 'active' },
      ]}
    />
  )
}
