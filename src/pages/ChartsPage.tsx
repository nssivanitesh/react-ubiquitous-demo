import { CategoryPage } from '../components/CategoryPage'
import { barChartConfig, lineChartConfig, areaChartConfig, pieChartConfig, donutChartConfig, radarChartConfig, scatterChartConfig } from '../data/charts'

export default function ChartsPage() {
  return (
    <CategoryPage
      title="📊 Charts"
      description="SVG-based charts via layout: 'chart'."
      items={[
        { id: 'bar',     label: 'Bar',     config: barChartConfig,     status: 'active' },
        { id: 'line',    label: 'Line',    config: lineChartConfig,    status: 'active' },
        { id: 'area',    label: 'Area',    config: areaChartConfig,    status: 'active' },
        { id: 'pie',     label: 'Pie',     config: pieChartConfig,     status: 'active' },
        { id: 'donut',   label: 'Donut',   config: donutChartConfig,   status: 'active' },
        { id: 'radar',   label: 'Radar',   config: radarChartConfig,   status: 'active' },
        { id: 'scatter', label: 'Scatter', config: scatterChartConfig, status: 'active' },
      ]}
    />
  )
}
