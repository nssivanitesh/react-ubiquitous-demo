export const alertConfig = {
  id: 'alert-info',
  layout: 'alert',
  title: 'Information',
  description: 'Your account has been successfully updated.',
  severity: 'info',
  dismissible: true,
  icon: true,
  elements: [],
}

export const alertSuccessConfig = {
  id: 'alert-success',
  layout: 'alert',
  title: 'Success',
  description: 'Payment processed successfully! Your order #12345 is confirmed.',
  severity: 'success',
  dismissible: true,
  icon: true,
  elements: [],
}

export const progressConfig = {
  id: 'progress',
  layout: 'progress',
  title: 'Upload Progress',
  description: 'Uploading files...',
  variant: 'linear',
  value: 65,
  showLabel: true,
  size: 'md',
  color: '#6366f1',
  elements: [],
}

export const progressCircularConfig = {
  id: 'progress-circular',
  layout: 'progress',
  title: 'Loading',
  variant: 'circular',
  value: 75,
  showLabel: true,
  size: 'lg',
  color: '#10b981',
  elements: [],
}

export const skeletonConfig = {
  id: 'skeleton',
  layout: 'skeleton',
  title: 'Loading Content',
  shape: 'text',
  lines: 4,
  avatar: true,
  elements: [],
}

export const toastConfig = {
  id: 'toast',
  layout: 'toast',
  message: '✅ Changes saved successfully!',
  severity: 'success',
  duration: 0,
  position: 'bottom-right',
  visible: true,
  elements: [],
}
