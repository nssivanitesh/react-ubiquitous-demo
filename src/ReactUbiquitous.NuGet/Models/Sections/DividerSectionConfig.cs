using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a visual divider section.</summary>
public class DividerSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="DividerSectionConfig"/> and sets the layout discriminator.</summary>
    public DividerSectionConfig() { Layout = "divider"; }

    /// <summary>Gets or sets an optional label displayed in the center of the divider.</summary>
    [JsonPropertyName("label")]
    public string? Label { get; set; }

    /// <summary>Gets or sets the orientation of the divider (e.g. "horizontal", "vertical").</summary>
    [JsonPropertyName("orientation")]
    public string? Orientation { get; set; }

    /// <summary>Gets or sets the visual variant of the divider (e.g. "solid", "dashed", "dotted").</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}
