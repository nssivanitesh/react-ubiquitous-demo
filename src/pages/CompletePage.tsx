import { UIStage } from 'react-ubiquitous'
import type { UIStageConfig, UISectionConfig } from 'react-ubiquitous'
import { useTheme } from '../contexts/ThemeContext'
import { barChartConfig, lineChartConfig, donutChartConfig, areaChartConfig } from '../data/charts'
import { statConfig, tableConfig, timelineConfig, mediaConfig, cardConfig } from '../data/dataDisplay'
import { listDetailConfig, heroConfig } from '../data/layout'
import { tabsConfig, stepperConfig } from '../data/navigation'
import { accordionConfig } from '../data/disclosure'
import { alertSuccessConfig, progressConfig } from '../data/feedback'
import {
  blogHeroConfig,
  blogPainPointsConfig,
  blogDivider1Config,
  blogPackagesBadgesConfig,
  blogDivider2Config,
  blogStatsConfig,
  blogCodeConfig,
  blogTimelineConfig,
  blogShowcaseChartConfig,
  blogShowcaseTableConfig,
  blogAlertConfig,
  blogCtaHeroConfig,
} from '../data/blog'

export default function CompletePage() {
  const { theme, transition } = useTheme()

  const stageConfig: UIStageConfig = {
    id: 'complete-demo',
    theme,
    pageTransition: transition,
    pages: [
      {
        id: 'blog',
        title: '📝 Blog',
        order: 0,
        sections: [
          blogHeroConfig as UISectionConfig,
          blogPainPointsConfig as UISectionConfig,
          blogDivider1Config as UISectionConfig,
          blogPackagesBadgesConfig as UISectionConfig,
          blogDivider2Config as UISectionConfig,
          blogStatsConfig as UISectionConfig,
          blogCodeConfig as UISectionConfig,
          blogTimelineConfig as UISectionConfig,
          blogShowcaseChartConfig as UISectionConfig,
          blogShowcaseTableConfig as UISectionConfig,
          blogAlertConfig as UISectionConfig,
          blogCtaHeroConfig as UISectionConfig,
        ],
      },
      {
        id: 'dashboard',
        title: '📊 Dashboard',
        order: 1,
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
        order: 2,
        sections: [
          listDetailConfig as UISectionConfig,
          { ...tableConfig, order: 1 } as UISectionConfig,
        ],
      },
      {
        id: 'gallery',
        title: '🎨 Gallery',
        order: 3,
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
        order: 4,
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
