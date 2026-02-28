using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a progress indicator section.</summary>
public class ProgressSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ProgressSectionConfig"/> and sets the layout discriminator.</summary>
    public ProgressSectionConfig() { Layout = "progress"; }

    /// <summary>Gets or sets the current progress value.</summary>
    [JsonPropertyName("value")]
    public double? Value { get; set; }

    /// <summary>Gets or sets the maximum progress value.</summary>
    [JsonPropertyName("max")]
    public double? Max { get; set; }

    /// <summary>Gets or sets the visual variant of the progress indicator (e.g. "bar", "circular").</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }

    /// <summary>Gets or sets a value indicating whether the percentage label is shown.</summary>
    [JsonPropertyName("showLabel")]
    public bool? ShowLabel { get; set; }

    /// <summary>Gets or sets the color of the progress indicator.</summary>
    [JsonPropertyName("color")]
    public string? Color { get; set; }

    /// <summary>Gets or sets the size of the progress indicator.</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }

    /// <summary>Gets or sets a value indicating whether the progress indicator is animated.</summary>
    [JsonPropertyName("animated")]
    public bool? Animated { get; set; }
}
