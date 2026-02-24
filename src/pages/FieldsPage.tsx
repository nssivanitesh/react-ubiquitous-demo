import { ComponentDemo } from '../components/ComponentDemo'
import {
  inputConfig, checkboxConfig, radioConfig, textareaConfig, selectConfig,
  buttonConfig, labelConfig, fieldsetConfig, datalistConfig, outputConfig,
  datepickerConfig, multiselectConfig, autocompleteConfig, fileuploadConfig,
  colorpickerConfig, rangesliderConfig, ratingConfig, otpinputConfig, phoneinputConfig
} from '../data/fields'

export default function FieldsPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>📝 Fields</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>All form field types supported by react-ubiquitous.</p>
      <ComponentDemo title="Input Fields" description="type: 'input'" initialConfig={inputConfig} />
      <ComponentDemo title="Checkboxes" description="type: 'checkbox'" initialConfig={checkboxConfig} />
      <ComponentDemo title="Radio Buttons" description="type: 'radio'" initialConfig={radioConfig} />
      <ComponentDemo title="Textarea" description="type: 'textarea'" initialConfig={textareaConfig} />
      <ComponentDemo title="Select Dropdowns" description="type: 'select'" initialConfig={selectConfig} />
      <ComponentDemo title="Buttons" description="type: 'button'" initialConfig={buttonConfig} />
      <ComponentDemo title="Labels" description="type: 'label'" initialConfig={labelConfig} />
      <ComponentDemo title="Fieldset" description="type: 'fieldset'" initialConfig={fieldsetConfig} />
      <ComponentDemo title="Datalist" description="type: 'datalist'" initialConfig={datalistConfig} />
      <ComponentDemo title="Output (Formula)" description="type: 'output'" initialConfig={outputConfig} />
      <ComponentDemo title="Date Pickers" description="type: 'datepicker'" initialConfig={datepickerConfig} />
      <ComponentDemo title="Multi-Select" description="type: 'multiselect'" initialConfig={multiselectConfig} />
      <ComponentDemo title="Autocomplete" description="type: 'autocomplete'" initialConfig={autocompleteConfig} />
      <ComponentDemo title="File Upload" description="type: 'fileupload'" initialConfig={fileuploadConfig} />
      <ComponentDemo title="Color Picker" description="type: 'colorpicker'" initialConfig={colorpickerConfig} />
      <ComponentDemo title="Range Slider" description="type: 'rangeslider'" initialConfig={rangesliderConfig} />
      <ComponentDemo title="Rating" description="type: 'rating'" initialConfig={ratingConfig} />
      <ComponentDemo title="OTP Input" description="type: 'otpinput'" initialConfig={otpinputConfig} />
      <ComponentDemo title="Phone Input" description="type: 'phoneinput'" initialConfig={phoneinputConfig} />
    </div>
  )
}
