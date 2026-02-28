using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single data point in a chart. The <c>label</c> key is used for the x-axis / category label.</summary>
public class ChartDataPoint
{
    /// <summary>Gets or sets the category axis label for this data point (e.g. "Jan").</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the primary numeric value (used when no explicit series keys are defined).</summary>
    [JsonPropertyName("value")]
    public double? Value { get; set; }
}

/// <summary>Represents a single named series in a multi-series chart.</summary>
public class ChartSeries
{
    /// <summary>Gets or sets the key that matches a numeric property in each <see cref="ChartDataPoint"/>.</summary>
    [JsonPropertyName("key")]
    public string Key { get; set; } = string.Empty;

    /// <summary>Gets or sets the human-readable series label shown in the legend.</summary>
    [JsonPropertyName("label")]
    public string? Label { get; set; }

    /// <summary>Gets or sets the override color for this series (any CSS color string).</summary>
    [JsonPropertyName("color")]
    public string? Color { get; set; }
}

/// <summary>Configuration for a chart section. Set <see cref="ChartType"/> to specify the chart kind.</summary>
public class ChartSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ChartSectionConfig"/> and sets the layout discriminator.</summary>
    public ChartSectionConfig() { Layout = "chart"; }

    /// <summary>Gets or sets the chart type (e.g. "bar", "line", "area", "pie", "donut", "radar", "scatter").</summary>
    [JsonPropertyName("chartType")]
    public string? ChartType { get; set; }

    /// <summary>Gets or sets the flat array of data points (x-axis labels and numeric values).</summary>
    [JsonPropertyName("data")]
    public List<ChartDataPoint>? Data { get; set; }

    /// <summary>Gets or sets the named series configuration. When omitted a single series named <c>"value"</c> is assumed.</summary>
    [JsonPropertyName("series")]
    public List<ChartSeries>? Series { get; set; }

    /// <summary>Gets or sets a value indicating whether horizontal grid lines are shown. Default: <c>true</c>.</summary>
    [JsonPropertyName("showGrid")]
    public bool? ShowGrid { get; set; }

    /// <summary>Gets or sets a value indicating whether the chart legend is displayed.</summary>
    [JsonPropertyName("showLegend")]
    public bool? ShowLegend { get; set; }

    /// <summary>Gets or sets a value indicating whether value labels are shown on bars / pie slices. Default: <c>false</c>.</summary>
    [JsonPropertyName("showLabels")]
    public bool? ShowLabels { get; set; }

    /// <summary>Gets or sets the chart height in pixels. Default: <c>300</c>.</summary>
    [JsonPropertyName("height")]
    public object? Height { get; set; }

    /// <summary>Gets or sets the ordered list of colors applied to series.</summary>
    [JsonPropertyName("colors")]
    public List<string>? Colors { get; set; }

    /// <summary>Gets or sets a value indicating whether series are stacked.</summary>
    [JsonPropertyName("stacked")]
    public bool? Stacked { get; set; }

    // Line / Area shared properties

    /// <summary>Gets or sets a value indicating whether the line or area boundary is rendered as a smooth curve.</summary>
    [JsonPropertyName("smooth")]
    public bool? Smooth { get; set; }

    /// <summary>Gets or sets a value indicating whether data point markers are shown (line charts).</summary>
    [JsonPropertyName("showPoints")]
    public bool? ShowPoints { get; set; }

    /// <summary>Gets or sets the opacity of the filled area (0.0–1.0) (area charts).</summary>
    [JsonPropertyName("fillOpacity")]
    public double? FillOpacity { get; set; }

    // Bar chart properties

    /// <summary>Gets or sets a value indicating whether the bars are rendered horizontally.</summary>
    [JsonPropertyName("horizontal")]
    public bool? Horizontal { get; set; }

    /// <summary>Gets or sets the border radius applied to each bar.</summary>
    [JsonPropertyName("barRadius")]
    public int? BarRadius { get; set; }

    // Donut chart properties

    /// <summary>Gets or sets the inner radius of the donut hole.</summary>
    [JsonPropertyName("innerRadius")]
    public object? InnerRadius { get; set; }

    /// <summary>Gets or sets the label displayed in the center of the donut.</summary>
    [JsonPropertyName("centerLabel")]
    public string? CenterLabel { get; set; }

    // Radar chart properties

    /// <summary>Gets or sets a value indicating whether the radar area is filled.</summary>
    [JsonPropertyName("filled")]
    public bool? Filled { get; set; }

    // Scatter chart properties

    /// <summary>Gets or sets a value indicating whether a line is drawn through the scatter points.</summary>
    [JsonPropertyName("showLine")]
    public bool? ShowLine { get; set; }

    // Axis labels

    /// <summary>Gets or sets the label for the x-axis.</summary>
    [JsonPropertyName("xAxisLabel")]
    public string? XAxisLabel { get; set; }

    /// <summary>Gets or sets the label for the y-axis.</summary>
    [JsonPropertyName("yAxisLabel")]
    public string? YAxisLabel { get; set; }

    /// <summary>Gets or sets a value indicating whether data point tooltips are shown.</summary>
    [JsonPropertyName("showTooltip")]
    public bool? ShowTooltip { get; set; }
}

/// <summary>Configuration for a line chart section.</summary>
public class LineChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="LineChartSectionConfig"/> and sets the chart type.</summary>
    public LineChartSectionConfig() { ChartType = "line"; }
}

/// <summary>Configuration for an area chart section.</summary>
public class AreaChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="AreaChartSectionConfig"/> and sets the chart type.</summary>
    public AreaChartSectionConfig() { ChartType = "area"; }
}

/// <summary>Configuration for a bar chart section.</summary>
public class BarChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="BarChartSectionConfig"/> and sets the chart type.</summary>
    public BarChartSectionConfig() { ChartType = "bar"; }
}

/// <summary>Configuration for a pie chart section.</summary>
public class PieChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="PieChartSectionConfig"/> and sets the chart type.</summary>
    public PieChartSectionConfig() { ChartType = "pie"; }
}

/// <summary>Configuration for a donut chart section.</summary>
public class DonutChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="DonutChartSectionConfig"/> and sets the chart type.</summary>
    public DonutChartSectionConfig() { ChartType = "donut"; }
}

/// <summary>Configuration for a radar chart section.</summary>
public class RadarChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="RadarChartSectionConfig"/> and sets the chart type.</summary>
    public RadarChartSectionConfig() { ChartType = "radar"; }
}

/// <summary>Configuration for a scatter chart section.</summary>
public class ScatterChartSectionConfig : ChartSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ScatterChartSectionConfig"/> and sets the chart type.</summary>
    public ScatterChartSectionConfig() { ChartType = "scatter"; }
}
