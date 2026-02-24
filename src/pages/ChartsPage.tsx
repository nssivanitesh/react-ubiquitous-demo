import { CategoryPage } from '../components/CategoryPage'
import { barChartConfig, lineChartConfig, areaChartConfig, pieChartConfig, donutChartConfig, radarChartConfig, scatterChartConfig } from '../data/charts'

export default function ChartsPage() {
  return (
    <CategoryPage
      title="📊 Charts"
      description="SVG-based charts via layout: 'chart'."
      items={[
        { id: 'bar', label: 'Bar', config: barChartConfig },
        { id: 'line', label: 'Line', config: lineChartConfig },
        { id: 'area', label: 'Area', config: areaChartConfig },
        { id: 'pie', label: 'Pie', config: pieChartConfig },
        { id: 'donut', label: 'Donut', config: donutChartConfig },
        { id: 'radar', label: 'Radar', config: radarChartConfig },
        { id: 'scatter', label: 'Scatter', config: scatterChartConfig },
      ]}
    />
  )
}
