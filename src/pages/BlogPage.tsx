import { UIStage } from 'react-ubiquitous'
import type { UIStageConfig, UISectionConfig } from 'react-ubiquitous'
import { useTheme } from '../contexts/ThemeContext'
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

export default function BlogPage() {
  const { theme, transition } = useTheme()

  const stageConfig: UIStageConfig = {
    id: 'blog-intro',
    theme,
    pageTransition: transition,
    pages: [
      {
        id: 'intro',
        title: '🏠 Home',
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
    ],
  }

  return <UIStage config={stageConfig} />
}
