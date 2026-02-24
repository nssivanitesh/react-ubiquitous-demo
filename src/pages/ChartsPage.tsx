import { ComponentDemo } from '../components/ComponentDemo'
import { barChartConfig, lineChartConfig, areaChartConfig, pieChartConfig, donutChartConfig, radarChartConfig, scatterChartConfig } from '../data/charts'

export default function ChartsPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>📊 Charts</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>SVG-based charts rendered via <code>layout: 'chart'</code>. Edit the JSON to change chart type, data, and options.</p>
      <ComponentDemo title="Bar Chart" description="chartType: 'bar'" initialConfig={barChartConfig} />
      <ComponentDemo title="Line Chart" description="chartType: 'line'" initialConfig={lineChartConfig} />
      <ComponentDemo title="Area Chart" description="chartType: 'area'" initialConfig={areaChartConfig} />
      <ComponentDemo title="Pie Chart" description="chartType: 'pie'" initialConfig={pieChartConfig} />
      <ComponentDemo title="Donut Chart" description="chartType: 'donut'" initialConfig={donutChartConfig} />
      <ComponentDemo title="Radar Chart" description="chartType: 'radar'" initialConfig={radarChartConfig} />
      <ComponentDemo title="Scatter Chart" description="chartType: 'scatter'" initialConfig={scatterChartConfig} />
    </div>
  )
}
