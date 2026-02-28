using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single badge item in a badge section.</summary>
public class BadgeItem
{
    /// <summary>Gets or sets the unique identifier of the badge item.</summary>
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    /// <summary>Gets or sets the text displayed inside the badge.</summary>
    [JsonPropertyName("label")]
    public string? Label { get; set; }

    /// <summary>Gets or sets the visual variant of the badge.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }

    /// <summary>Gets or sets the color of the badge.</summary>
    [JsonPropertyName("color")]
    public string? Color { get; set; }
}

/// <summary>Configuration for a badge display section.</summary>
public class BadgeSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="BadgeSectionConfig"/> and sets the layout discriminator.</summary>
    public BadgeSectionConfig() { Layout = "badge"; }

    /// <summary>Gets or sets the list of badge items to display.</summary>
    [JsonPropertyName("badges")]
    public List<BadgeItem>? Badges { get; set; }

    /// <summary>Gets or sets the visual style — one of <c>"subtle"</c>, <c>"solid"</c>, <c>"outline"</c>. Default: <c>"subtle"</c>.</summary>
    [JsonPropertyName("appearance")]
    public string? Appearance { get; set; }

    /// <summary>Gets or sets the size preset — one of <c>"sm"</c>, <c>"md"</c>, <c>"lg"</c>. Default: <c>"md"</c>.</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }
}
