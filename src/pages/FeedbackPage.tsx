import { CategoryPage } from '../components/CategoryPage'
import { alertConfig, alertSuccessConfig, progressConfig, progressCircularConfig, skeletonConfig, toastConfig } from '../data/feedback'

export default function FeedbackPage() {
  return (
    <CategoryPage
      title="💬 Feedback"
      description="Components that communicate status or loading state to users."
      items={[
        { id: 'alert-info',         label: 'Alert (Info)',          config: alertConfig,           status: 'active' },
        { id: 'alert-success',      label: 'Alert (Success)',       config: alertSuccessConfig,    status: 'active' },
        { id: 'progress',           label: 'Progress (Linear)',     config: progressConfig,        status: 'active' },
        { id: 'progress-circular',  label: 'Progress (Circular)',   config: progressCircularConfig, status: 'active' },
        { id: 'skeleton',           label: 'Skeleton',              config: skeletonConfig,        status: 'active' },
        { id: 'toast',              label: 'Toast',                 config: toastConfig,           status: 'active' },
      ]}
    />
  )
}
