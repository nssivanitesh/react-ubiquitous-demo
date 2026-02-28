using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a tooltip overlay section.</summary>
public class TooltipSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="TooltipSectionConfig"/> and sets the layout discriminator.</summary>
    public TooltipSectionConfig() { Layout = "tooltip"; }

    /// <summary>Gets or sets the text content displayed inside the tooltip.</summary>
    [JsonPropertyName("content")]
    public string? Content { get; set; }

    /// <summary>Gets or sets the placement of the tooltip relative to the trigger (e.g. "top", "bottom", "left", "right").</summary>
    [JsonPropertyName("placement")]
    public string? Placement { get; set; }

    /// <summary>Gets or sets the delay in milliseconds before the tooltip appears.</summary>
    [JsonPropertyName("delay")]
    public int? Delay { get; set; }

    /// <summary>Gets or sets a value indicating whether an arrow pointer is shown on the tooltip.</summary>
    [JsonPropertyName("arrow")]
    public bool? Arrow { get; set; }
}
