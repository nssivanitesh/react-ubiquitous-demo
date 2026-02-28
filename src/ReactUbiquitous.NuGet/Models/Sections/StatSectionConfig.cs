using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single statistic item in a stat section.</summary>
public class StatItem
{
    /// <summary>Gets or sets the unique identifier of the stat item.</summary>
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    /// <summary>Gets or sets the big primary number or value (e.g. "1,234", "98%").</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets the descriptive label below the value.</summary>
    [JsonPropertyName("label")]
    public string? Label { get; set; }

    /// <summary>Gets or sets the optional supporting sub-label or context.</summary>
    [JsonPropertyName("subLabel")]
    public string? SubLabel { get; set; }

    /// <summary>Gets or sets the optional trend indicator string (e.g. "+12%" or "↑ 5").</summary>
    [JsonPropertyName("trend")]
    public string? Trend { get; set; }

    /// <summary>Gets or sets the trend direction — one of <c>"up"</c>, <c>"down"</c>, <c>"neutral"</c>.</summary>
    [JsonPropertyName("trendDirection")]
    public string? TrendDirection { get; set; }

    /// <summary>Gets or sets the optional icon character or emoji.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }
}

/// <summary>Configuration for a statistic display section.</summary>
public class StatSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="StatSectionConfig"/> and sets the layout discriminator.</summary>
    public StatSectionConfig() { Layout = "stat"; }

    /// <summary>Gets or sets the list of statistic items to display.</summary>
    [JsonPropertyName("stats")]
    public List<StatItem>? Stats { get; set; }

    /// <summary>Gets or sets the number of columns in the grid. Default: auto (min 2).</summary>
    [JsonPropertyName("columns")]
    public int? Columns { get; set; }
}
