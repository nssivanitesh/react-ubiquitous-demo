export const modalConfig = {
  id: 'modal',
  layout: 'modal',
  title: 'Confirm Action',
  description: 'Are you sure you want to delete this item? This action cannot be undone.',
  open: true,
  size: 'md',
  closeOnBackdrop: true,
  showCloseButton: true,
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
  elements: [
    { id: 'm1', name: 'reason', type: 'input', inputType: 'text', label: 'Reason (optional)', placeholder: 'Why are you deleting this?', order: 0 },
  ],
}

export const drawerConfig = {
  id: 'drawer',
  layout: 'drawer',
  title: 'Filter Options',
  open: true,
  placement: 'right',
  size: '320px',
  closeOnBackdrop: true,
  showCloseButton: true,
  elements: [
    { id: 'dr1', name: 'category', type: 'select', label: 'Category', options: [
      { label: 'All', value: '' },
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
    ], order: 0 },
    { id: 'dr2', name: 'price_range', type: 'rangeslider', label: 'Price Range', min: 0, max: 1000, step: 10, defaultValue: [50, 500], order: 1 },
  ],
}

export const tooltipConfig = {
  id: 'tooltip',
  layout: 'tooltip',
  content: 'This is helpful tooltip information!',
  placement: 'top',
  triggerLabel: 'Hover over me',
  elements: [],
}

export const popoverConfig = {
  id: 'popover',
  layout: 'popover',
  title: 'Quick Info',
  description: 'Additional details about this item.',
  placement: 'bottom',
  triggerLabel: 'Click for info',
  content: 'This popover can contain rich content with forms and buttons.',
  elements: [],
}
