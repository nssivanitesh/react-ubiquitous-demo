import { ComponentDemo } from '../components/ComponentDemo'
import { alertConfig, alertSuccessConfig, progressConfig, progressCircularConfig, skeletonConfig, toastConfig } from '../data/feedback'

export default function FeedbackPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>💬 Feedback</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>Components that communicate status, progress, and messages to users.</p>
      <ComponentDemo title="Alert (Info)" description="layout: 'alert', severity: 'info'" initialConfig={alertConfig} />
      <ComponentDemo title="Alert (Success)" description="layout: 'alert', severity: 'success'" initialConfig={alertSuccessConfig} />
      <ComponentDemo title="Progress (Linear)" description="layout: 'progress', variant: 'linear'" initialConfig={progressConfig} />
      <ComponentDemo title="Progress (Circular)" description="layout: 'progress', variant: 'circular'" initialConfig={progressCircularConfig} />
      <ComponentDemo title="Skeleton" description="layout: 'skeleton'" initialConfig={skeletonConfig} />
      <ComponentDemo title="Toast" description="layout: 'toast'" initialConfig={toastConfig} />
    </div>
  )
}
