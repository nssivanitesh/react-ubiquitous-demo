using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single event entry in a timeline.</summary>
public class TimelineEvent
{
    /// <summary>Gets or sets the unique identifier of the timeline event.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the title of the timeline event.</summary>
    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    /// <summary>Gets or sets the description of the timeline event.</summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    /// <summary>Gets or sets the timestamp associated with the event.</summary>
    [JsonPropertyName("timestamp")]
    public string? Timestamp { get; set; }

    /// <summary>Gets or sets the icon identifier displayed at the event marker.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the dot color variant — one of <c>"default"</c>, <c>"primary"</c>, <c>"success"</c>, <c>"warning"</c>, <c>"danger"</c>.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}

/// <summary>Configuration for a timeline section.</summary>
public class TimelineSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="TimelineSectionConfig"/> and sets the layout discriminator.</summary>
    public TimelineSectionConfig() { Layout = "timeline"; }

    /// <summary>Gets or sets the list of timeline events.</summary>
    [JsonPropertyName("events")]
    public List<TimelineEvent>? Events { get; set; }

    /// <summary>Gets or sets the orientation of the timeline (e.g. "vertical", "horizontal").</summary>
    [JsonPropertyName("orientation")]
    public string? Orientation { get; set; }

    /// <summary>Gets or sets a value indicating whether events alternate sides of the timeline axis.</summary>
    [JsonPropertyName("alternating")]
    public bool? Alternating { get; set; }
}
