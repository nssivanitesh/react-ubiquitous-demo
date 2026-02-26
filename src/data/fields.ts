export const inputConfig = {
  id: 'input-section',
  layout: 'flex',
  title: 'Input Fields',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'i1', name: 'text', type: 'input', inputType: 'text', label: 'Text Input', placeholder: 'Enter text...', order: 0 },
    { id: 'i2', name: 'email', type: 'input', inputType: 'email', label: 'Email', placeholder: 'user@example.com', order: 1 },
    { id: 'i3', name: 'password', type: 'input', inputType: 'password', label: 'Password', placeholder: 'Enter password', order: 2 },
    { id: 'i4', name: 'number', type: 'input', inputType: 'number', label: 'Number', defaultValue: 42, min: 0, max: 100, order: 3 },
    { id: 'i5', name: 'search', type: 'input', inputType: 'search', label: 'Search', placeholder: 'Search...', order: 4 },
  ],
}

export const checkboxConfig = {
  id: 'checkbox-section',
  layout: 'flex',
  title: 'Checkboxes',
  flexDirection: 'column',
  gap: '0.5rem',
  elements: [
    { id: 'cb1', name: 'agree', type: 'checkbox', label: 'I agree to the terms and conditions', defaultChecked: false, order: 0 },
    { id: 'cb2', name: 'newsletter', type: 'checkbox', label: 'Subscribe to newsletter', defaultChecked: true, order: 1 },
    { id: 'cb3', name: 'notifications', type: 'checkbox', label: 'Enable notifications', defaultChecked: false, order: 2 },
  ],
}

export const radioConfig = {
  id: 'radio-section',
  layout: 'flex',
  title: 'Radio Buttons',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    {
      id: 'r1', name: 'plan', type: 'radio', label: 'Select Plan',
      orientation: 'vertical',
      options: [
        { label: 'Free — 5GB storage', value: 'free' },
        { label: 'Pro — 100GB storage ($9/mo)', value: 'pro' },
        { label: 'Enterprise — Unlimited ($29/mo)', value: 'enterprise' },
      ],
      defaultValue: 'pro',
      order: 0,
    },
  ],
}

export const textareaConfig = {
  id: 'textarea-section',
  layout: 'flex',
  title: 'Textarea',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'ta1', name: 'message', type: 'textarea', label: 'Message', placeholder: 'Type your message here...', rows: 4, resize: 'vertical', order: 0 },
    { id: 'ta2', name: 'notes', type: 'textarea', label: 'Notes (max 200 chars)', placeholder: 'Internal notes...', rows: 3, maxLength: 200, order: 1 },
  ],
}

export const selectConfig = {
  id: 'select-section',
  layout: 'flex',
  title: 'Select Dropdowns',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    {
      id: 's1', name: 'country', type: 'select', label: 'Country',
      placeholder: 'Select a country...',
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'Germany', value: 'de' },
      ],
      order: 0,
    },
    {
      id: 's2', name: 'tech', type: 'select', label: 'Technologies (multiple)',
      multiple: true, size: 4,
      options: [
        { group: true, label: 'Frontend', options: [{ label: 'React', value: 'react' }, { label: 'Vue', value: 'vue' }] },
        { group: true, label: 'Backend', options: [{ label: 'Node.js', value: 'node' }, { label: 'Python', value: 'python' }] },
      ],
      order: 1,
    },
  ],
}

export const buttonConfig = {
  id: 'button-section',
  layout: 'flex',
  title: 'Buttons',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '0.75rem',
  elements: [
    { id: 'btn1', name: 'primary', type: 'button', text: 'Primary', variant: 'default', size: 'md', order: 0 },
    { id: 'btn2', name: 'secondary', type: 'button', text: 'Secondary', variant: 'secondary', size: 'md', order: 1 },
    { id: 'btn3', name: 'outline', type: 'button', text: 'Outline', variant: 'outline', size: 'md', order: 2 },
    { id: 'btn4', name: 'ghost', type: 'button', text: 'Ghost', variant: 'ghost', size: 'md', order: 3 },
    { id: 'btn5', name: 'destructive', type: 'button', text: 'Delete', variant: 'destructive', size: 'md', order: 4 },
    { id: 'btn6', name: 'link', type: 'button', text: 'Link', variant: 'link', size: 'md', order: 5 },
    { id: 'btn7', name: 'small', type: 'button', text: 'Small', variant: 'default', size: 'sm', order: 6 },
    { id: 'btn8', name: 'large', type: 'button', text: 'Large', variant: 'default', size: 'lg', order: 7 },
  ],
}

export const labelConfig = {
  id: 'label-section',
  layout: 'flex',
  title: 'Labels',
  flexDirection: 'column',
  gap: '0.75rem',
  elements: [
    { id: 'lb1', name: 'lbl1', type: 'label', text: 'This is a label element', htmlFor: 'some-input', order: 0 },
    { id: 'lb2', name: 'lbl2', type: 'label', text: 'Required field *', order: 1 },
  ],
}

export const fieldsetConfig = {
  id: 'fieldset-section',
  layout: 'flex',
  title: 'Fieldset',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    {
      id: 'fs1', name: 'personal', type: 'fieldset', legend: 'Personal Information', order: 0,
      children: [
        { id: 'fs1a', name: 'fname', type: 'input', inputType: 'text', label: 'First Name', order: 0 },
        { id: 'fs1b', name: 'lname', type: 'input', inputType: 'text', label: 'Last Name', order: 1 },
      ],
    },
  ],
}

export const datalistConfig = {
  id: 'datalist-section',
  layout: 'flex',
  title: 'Datalist',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    {
      id: 'dl1', name: 'browser_list', type: 'datalist', label: 'Browsers',
      options: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'Brave'],
      order: 0,
    },
    { id: 'dl2', name: 'browser_input', type: 'input', inputType: 'text', label: 'Your browser', placeholder: 'Type or select...', datalistId: 'browser_list', order: 1 },
  ],
}

export const outputConfig = {
  id: 'output-section',
  layout: 'flex',
  title: 'Output (Formula)',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'out1', name: 'price', type: 'input', inputType: 'number', label: 'Unit Price ($)', defaultValue: 25, order: 0 },
    { id: 'out2', name: 'quantity', type: 'input', inputType: 'number', label: 'Quantity', defaultValue: 4, order: 1 },
    { id: 'out3', name: 'total', type: 'output', label: 'Total', formula: '{price} * {quantity}', format: 'currency', order: 2 },
  ],
}

export const datepickerConfig = {
  id: 'datepicker-section',
  layout: 'flex',
  title: 'Date Pickers',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'dp1', name: 'start_date', type: 'datepicker', label: 'Start Date', placeholder: 'Pick a date', defaultValue: '2025-01-15', order: 0 },
    { id: 'dp2', name: 'meeting_time', type: 'datepicker', label: 'Meeting Date & Time', includeTime: true, order: 1 },
  ],
}

export const multiselectConfig = {
  id: 'multiselect-section',
  layout: 'flex',
  title: 'Multi-Select',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    {
      id: 'ms1', name: 'skills', type: 'multiselect', label: 'Skills',
      placeholder: 'Select skills...',
      maxItems: 5,
      defaultValue: ['react', 'typescript'],
      options: [
        { label: 'React', value: 'react' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Node.js', value: 'node' },
        { label: 'GraphQL', value: 'graphql' },
        { label: 'Docker', value: 'docker' },
        { label: 'AWS', value: 'aws' },
      ],
      order: 0,
    },
  ],
}

export const autocompleteConfig = {
  id: 'autocomplete-section',
  layout: 'flex',
  title: 'Autocomplete',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    {
      id: 'ac1', name: 'language', type: 'autocomplete', label: 'Programming Language',
      placeholder: 'Type to search...',
      options: [
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Rust', value: 'rs' },
        { label: 'Go', value: 'go' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'Swift', value: 'swift' },
      ],
      order: 0,
    },
  ],
}

export const fileuploadConfig = {
  id: 'fileupload-section',
  layout: 'flex',
  title: 'File Upload',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'fu1', name: 'avatar', type: 'fileupload', label: 'Profile Picture', accept: 'image/*', multiple: false, maxSize: 2097152, placeholder: 'Drop your image here or click to browse (max 2MB)', order: 0 },
    { id: 'fu2', name: 'documents', type: 'fileupload', label: 'Documents', accept: '.pdf,.doc,.docx', multiple: true, maxSize: 10485760, placeholder: 'Drop files here or click to browse', order: 1 },
  ],
}

export const colorpickerConfig = {
  id: 'colorpicker-section',
  layout: 'flex',
  title: 'Color Picker',
  flexDirection: 'row',
  gap: '2rem',
  elements: [
    { id: 'cp1', name: 'primary_color', type: 'colorpicker', label: 'Primary Color', defaultValue: '#6366f1', format: 'hex', order: 0 },
    { id: 'cp2', name: 'accent_color', type: 'colorpicker', label: 'Accent Color', defaultValue: '#10b981', format: 'hex', order: 1 },
  ],
}

export const rangesliderConfig = {
  id: 'rangeslider-section',
  layout: 'flex',
  title: 'Range Slider',
  flexDirection: 'column',
  gap: '1.5rem',
  elements: [
    { id: 'rs1', name: 'price_range', type: 'rangeslider', label: 'Price Range ($)', min: 0, max: 1000, step: 10, defaultValue: [100, 750], order: 0 },
    { id: 'rs2', name: 'age_range', type: 'rangeslider', label: 'Age Range', min: 18, max: 80, step: 1, defaultValue: [25, 45], order: 1 },
  ],
}

export const ratingConfig = {
  id: 'rating-section',
  layout: 'flex',
  title: 'Rating',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'rat1', name: 'overall', type: 'rating', label: 'Overall Rating', max: 5, defaultValue: 4, order: 0 },
    { id: 'rat2', name: 'experience', type: 'rating', label: 'User Experience', max: 5, defaultValue: 4.5, allowHalf: true, order: 1 },
    { id: 'rat3', name: 'value', type: 'rating', label: 'Value for Money', max: 10, defaultValue: 7, order: 2 },
  ],
}

export const otpinputConfig = {
  id: 'otpinput-section',
  layout: 'flex',
  title: 'OTP Input',
  flexDirection: 'column',
  gap: '1.5rem',
  elements: [
    { id: 'otp1', name: 'otp', type: 'otpinput', label: 'Enter OTP', length: 6, order: 0 },
    { id: 'otp2', name: 'pin', type: 'otpinput', label: 'Enter PIN (masked)', length: 4, mask: true, order: 1 },
  ],
}

export const phoneinputConfig = {
  id: 'phoneinput-section',
  layout: 'flex',
  title: 'Phone Input',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'ph1', name: 'phone', type: 'phoneinput', label: 'Phone Number', defaultCountry: 'US', placeholder: '(555) 000-0000', order: 0 },
    { id: 'ph2', name: 'mobile', type: 'phoneinput', label: 'Mobile (UK)', defaultCountry: 'GB', placeholder: '07xxx xxxxxx', order: 1 },
  ],
}

/**
 * Feature 1 (1.0.13): `hiddenExpr` — conditional visibility based on sibling field values.
 * The "Promo Code" input is only shown when the user ticks "I have a promo code".
 */
export const hiddenExprConfig = {
  id: 'hiddenexpr-section',
  layout: 'flex',
  title: '✨ hiddenExpr — Dynamic Show/Hide (new in 1.0.13)',
  description: 'Tick "I have a promo code" to reveal the promo code input. The field uses hiddenExpr: "{hasPromo} !== true" to hide itself dynamically.',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'he1', name: 'orderAmount', type: 'input', inputType: 'number', label: 'Order Amount ($)', defaultValue: 100, min: 1, order: 0 },
    { id: 'he2', name: 'hasPromo', type: 'checkbox', label: 'I have a promo code', defaultChecked: false, order: 1 },
    { id: 'he3', name: 'promoCode', type: 'input', inputType: 'text', label: 'Promo Code', placeholder: 'SAVE20', hiddenExpr: '{hasPromo} !== true', order: 2 },
    { id: 'he4', name: 'submitOrder', type: 'button', text: 'Place Order', variant: 'default', order: 3 },
  ],
}

/**
 * Feature 2 (1.0.13): `disabledExpr` — conditional disable based on sibling field values.
 * "Submit" is disabled until the user agrees to the terms; the comment field is disabled
 * when the "private" checkbox is checked.
 */
export const disabledExprConfig = {
  id: 'disabledexpr-section',
  layout: 'flex',
  title: '🔒 disabledExpr — Conditional Enable/Disable (new in 1.0.13)',
  description: 'The Submit button is disabled until "I agree to the terms" is ticked. The comment textarea disables when "Private — no comments" is checked.',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'de1', name: 'reviewTitle', type: 'input', inputType: 'text', label: 'Review Title', placeholder: 'Summarise your review', order: 0 },
    { id: 'de2', name: 'isPrivate', type: 'checkbox', label: 'Private — no public comments', defaultChecked: false, order: 1 },
    { id: 'de3', name: 'reviewComment', type: 'textarea', label: 'Comment', placeholder: 'Share your thoughts…', rows: 3, disabledExpr: '{isPrivate} === true', order: 2 },
    { id: 'de4', name: 'termsAccepted', type: 'checkbox', label: 'I agree to the terms and conditions', defaultChecked: false, order: 3 },
    { id: 'de5', name: 'submitReview', type: 'button', text: 'Submit Review', variant: 'default', disabledExpr: '{termsAccepted} !== true', order: 4 },
  ],
}

/**
 * Feature 4 (1.0.13): `CustomElementConfig` — render a consumer-supplied React component.
 * The custom component key 'color-swatch' is registered in main.tsx via customComponents prop.
 */
export const customElementConfig = {
  id: 'customelement-section',
  layout: 'flex',
  title: '🧩 CustomElementConfig — Custom React Component (new in 1.0.13)',
  description: 'The colored swatches below are rendered by a custom React component registered via the customComponents prop on UIStage. Use type: "custom" and a component key to inject any widget.',
  flexDirection: 'column',
  gap: '1rem',
  elements: [
    { id: 'ce0', name: 'swatchLabel', type: 'label', text: 'Brand color palette — rendered by a custom "color-swatch" component:', order: 0 },
    { id: 'ce1', name: 'primarySwatch',  type: 'custom', component: 'color-swatch', props: { color: '#6366f1', label: 'Primary'  }, order: 1 },
    { id: 'ce2', name: 'successSwatch',  type: 'custom', component: 'color-swatch', props: { color: '#16a34a', label: 'Success'  }, order: 2 },
    { id: 'ce3', name: 'warningSwatch',  type: 'custom', component: 'color-swatch', props: { color: '#d97706', label: 'Warning'  }, order: 3 },
    { id: 'ce4', name: 'dangerSwatch',   type: 'custom', component: 'color-swatch', props: { color: '#dc2626', label: 'Danger'   }, order: 4 },
  ],
}
