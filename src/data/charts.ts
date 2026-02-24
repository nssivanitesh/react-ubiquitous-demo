export const barChartConfig = {
  id: 'bar-chart',
  layout: 'chart',
  chartType: 'bar',
  title: 'Monthly Revenue',
  description: 'Sales data for the current year',
  showGrid: true,
  showLabels: true,
  height: 280,
  data: [
    { label: 'Jan', value: 42000 },
    { label: 'Feb', value: 55000 },
    { label: 'Mar', value: 49000 },
    { label: 'Apr', value: 62000 },
    { label: 'May', value: 71000 },
    { label: 'Jun', value: 68000 },
  ],
  elements: [],
}

export const lineChartConfig = {
  id: 'line-chart',
  layout: 'chart',
  chartType: 'line',
  title: 'Site Traffic',
  description: 'Unique visitors per month',
  showGrid: true,
  height: 280,
  data: [
    { label: 'Jan', value: 3200 },
    { label: 'Feb', value: 4100 },
    { label: 'Mar', value: 3800 },
    { label: 'Apr', value: 5200 },
    { label: 'May', value: 6100 },
    { label: 'Jun', value: 5700 },
  ],
  elements: [],
}

export const areaChartConfig = {
  id: 'area-chart',
  layout: 'chart',
  chartType: 'area',
  title: 'Server Load',
  description: 'CPU usage over time (%)',
  showGrid: true,
  height: 280,
  data: [
    { label: '00:00', value: 20 },
    { label: '04:00', value: 15 },
    { label: '08:00', value: 45 },
    { label: '12:00', value: 72 },
    { label: '16:00', value: 65 },
    { label: '20:00', value: 40 },
  ],
  elements: [],
}

export const pieChartConfig = {
  id: 'pie-chart',
  layout: 'chart',
  chartType: 'pie',
  title: 'Market Share',
  description: 'Browser usage statistics',
  height: 280,
  data: [
    { label: 'Chrome', value: 65 },
    { label: 'Safari', value: 19 },
    { label: 'Firefox', value: 8 },
    { label: 'Edge', value: 5 },
    { label: 'Other', value: 3 },
  ],
  elements: [],
}

export const donutChartConfig = {
  id: 'donut-chart',
  layout: 'chart',
  chartType: 'donut',
  title: 'Budget Allocation',
  description: 'Expense categories',
  height: 280,
  data: [
    { label: 'Salaries', value: 55 },
    { label: 'Marketing', value: 20 },
    { label: 'Infra', value: 15 },
    { label: 'R&D', value: 10 },
  ],
  elements: [],
}

export const radarChartConfig = {
  id: 'radar-chart',
  layout: 'chart',
  chartType: 'radar',
  title: 'Skills Assessment',
  description: 'Team competency radar',
  height: 280,
  data: [
    { label: 'Frontend', value: 85 },
    { label: 'Backend', value: 70 },
    { label: 'DevOps', value: 60 },
    { label: 'Design', value: 75 },
    { label: 'Testing', value: 80 },
  ],
  elements: [],
}

export const scatterChartConfig = {
  id: 'scatter-chart',
  layout: 'chart',
  chartType: 'scatter',
  title: 'Performance vs Cost',
  description: 'Correlation analysis',
  showGrid: true,
  height: 280,
  data: [
    { label: 'A', x: 10, y: 20 },
    { label: 'B', x: 25, y: 45 },
    { label: 'C', x: 40, y: 30 },
    { label: 'D', x: 55, y: 70 },
    { label: 'E', x: 70, y: 55 },
    { label: 'F', x: 85, y: 90 },
  ],
  elements: [],
}
