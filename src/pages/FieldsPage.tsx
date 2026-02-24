import { CategoryPage } from '../components/CategoryPage'
import { inputConfig, checkboxConfig, radioConfig, textareaConfig, selectConfig, buttonConfig, labelConfig, fieldsetConfig, datalistConfig, outputConfig, datepickerConfig, multiselectConfig, autocompleteConfig, fileuploadConfig, colorpickerConfig, rangesliderConfig, ratingConfig, otpinputConfig, phoneinputConfig } from '../data/fields'

export default function FieldsPage() {
  return (
    <CategoryPage
      title="📝 Fields"
      description="All supported form field and input types."
      items={[
        { id: 'input', label: 'Input', config: inputConfig },
        { id: 'checkbox', label: 'Checkbox', config: checkboxConfig },
        { id: 'radio', label: 'Radio', config: radioConfig },
        { id: 'textarea', label: 'Textarea', config: textareaConfig },
        { id: 'select', label: 'Select', config: selectConfig },
        { id: 'button', label: 'Button', config: buttonConfig },
        { id: 'label', label: 'Label', config: labelConfig },
        { id: 'fieldset', label: 'Fieldset', config: fieldsetConfig },
        { id: 'datalist', label: 'Datalist', config: datalistConfig },
        { id: 'output', label: 'Output', config: outputConfig },
        { id: 'datepicker', label: 'Datepicker', config: datepickerConfig },
        { id: 'multiselect', label: 'Multi-Select', config: multiselectConfig },
        { id: 'autocomplete', label: 'Autocomplete', config: autocompleteConfig },
        { id: 'fileupload', label: 'File Upload', config: fileuploadConfig },
        { id: 'colorpicker', label: 'Color Picker', config: colorpickerConfig },
        { id: 'rangeslider', label: 'Range Slider', config: rangesliderConfig },
        { id: 'rating', label: 'Rating', config: ratingConfig },
        { id: 'otpinput', label: 'OTP Input', config: otpinputConfig },
        { id: 'phoneinput', label: 'Phone Input', config: phoneinputConfig },
      ]}
    />
  )
}
