import { CategoryPage } from '../components/CategoryPage'
import { alertConfig, alertSuccessConfig, progressConfig, progressCircularConfig, skeletonConfig, toastConfig } from '../data/feedback'

export default function FeedbackPage() {
  return (
    <CategoryPage
      title="💬 Feedback"
      description="Components that communicate status or loading state to users."
      items={[
        { id: 'alert-info', label: 'Alert (Info)', config: alertConfig },
        { id: 'alert-success', label: 'Alert (Success)', config: alertSuccessConfig },
        { id: 'progress', label: 'Progress (Linear)', config: progressConfig },
        { id: 'progress-circular', label: 'Progress (Circular)', config: progressCircularConfig },
        { id: 'skeleton', label: 'Skeleton', config: skeletonConfig },
        { id: 'toast', label: 'Toast', config: toastConfig },
      ]}
    />
  )
}
