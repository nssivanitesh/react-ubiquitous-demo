using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a skeleton loading placeholder section.</summary>
public class SkeletonSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="SkeletonSectionConfig"/> and sets the layout discriminator.</summary>
    public SkeletonSectionConfig() { Layout = "skeleton"; }

    /// <summary>Gets or sets the shape of the skeleton (e.g. "text", "rect", "circle").</summary>
    [JsonPropertyName("shape")]
    public string? Shape { get; set; }

    /// <summary>Gets or sets the number of skeleton lines or shapes to render.</summary>
    [JsonPropertyName("lines")]
    public int? Lines { get; set; }

    /// <summary>Gets or sets the animation style (e.g. "pulse", "wave", "none").</summary>
    [JsonPropertyName("animation")]
    public string? Animation { get; set; }

    /// <summary>Gets or sets the width of the skeleton shape.</summary>
    [JsonPropertyName("width")]
    public object? Width { get; set; }

    /// <summary>Gets or sets the height of the skeleton shape.</summary>
    [JsonPropertyName("height")]
    public object? Height { get; set; }
}
