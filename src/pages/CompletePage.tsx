import { UIStage } from 'react-ubiquitous'
import type { UIStageConfig, UISectionConfig } from 'react-ubiquitous'
import { useTheme } from '../contexts/ThemeContext'
import { barChartConfig, lineChartConfig, donutChartConfig, areaChartConfig } from '../data/charts'
import { statConfig, tableConfig, timelineConfig, mediaConfig, cardConfig } from '../data/dataDisplay'
import { listDetailConfig, heroConfig } from '../data/layout'
import { tabsConfig, stepperConfig } from '../data/navigation'
import { accordionConfig } from '../data/disclosure'
import { alertSuccessConfig, progressConfig } from '../data/feedback'

export default function CompletePage() {
  const { theme, transition } = useTheme()

  const stageConfig: UIStageConfig = {
    id: 'complete-demo',
    theme,
    pageTransition: transition,
    pages: [
      {
        id: 'dashboard',
        title: '📊 Dashboard',
        order: 0,
        sections: [
          statConfig as UISectionConfig,
          { ...barChartConfig, order: 1 } as UISectionConfig,
          { ...lineChartConfig, order: 2 } as UISectionConfig,
          { ...donutChartConfig, order: 3 } as UISectionConfig,
          { ...areaChartConfig, order: 4 } as UISectionConfig,
        ],
      },
      {
        id: 'contacts',
        title: '👥 Contacts',
        order: 1,
        sections: [
          listDetailConfig as UISectionConfig,
          { ...tableConfig, order: 1 } as UISectionConfig,
        ],
      },
      {
        id: 'gallery',
        title: '🎨 Gallery',
        order: 2,
        sections: [
          heroConfig as UISectionConfig,
          { ...mediaConfig, order: 1 } as UISectionConfig,
          { ...timelineConfig, order: 2 } as UISectionConfig,
          { ...cardConfig, order: 3 } as UISectionConfig,
        ],
      },
      {
        id: 'settings',
        title: '⚙️ Settings',
        order: 3,
        sections: [
          stepperConfig as UISectionConfig,
          { ...tabsConfig, order: 1 } as UISectionConfig,
          { ...accordionConfig, order: 2 } as UISectionConfig,
          { ...progressConfig, order: 3 } as UISectionConfig,
          { ...alertSuccessConfig, order: 4 } as UISectionConfig,
        ],
      },
    ],
  }

  return <UIStage config={stageConfig} />
}
