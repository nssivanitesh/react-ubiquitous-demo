using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a hero banner section.</summary>
public class HeroSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="HeroSectionConfig"/> and sets the layout discriminator.</summary>
    public HeroSectionConfig() { Layout = "hero"; }

    /// <summary>Gets or sets the subtitle text displayed below the title.</summary>
    [JsonPropertyName("subtitle")]
    public string? Subtitle { get; set; }

    /// <summary>Gets or sets the type of background (e.g. "color", "image", "gradient").</summary>
    [JsonPropertyName("backgroundType")]
    public string? BackgroundType { get; set; }

    /// <summary>Gets or sets the starting color of a gradient background.</summary>
    [JsonPropertyName("gradientFrom")]
    public string? GradientFrom { get; set; }

    /// <summary>Gets or sets the ending color of a gradient background.</summary>
    [JsonPropertyName("gradientTo")]
    public string? GradientTo { get; set; }

    /// <summary>Gets or sets the direction of the gradient background.</summary>
    [JsonPropertyName("gradientDirection")]
    public string? GradientDirection { get; set; }

    /// <summary>Gets or sets the solid background color.</summary>
    [JsonPropertyName("backgroundColor")]
    public string? BackgroundColor { get; set; }

    /// <summary>Gets or sets the URL of the background image.</summary>
    [JsonPropertyName("backgroundImage")]
    public string? BackgroundImage { get; set; }

    /// <summary>Gets or sets a value indicating whether a dark overlay is applied over the background.</summary>
    [JsonPropertyName("overlay")]
    public bool? Overlay { get; set; }

    /// <summary>Gets or sets the opacity percentage of the overlay (0–100).</summary>
    [JsonPropertyName("overlayOpacity")]
    public int? OverlayOpacity { get; set; }

    /// <summary>Gets or sets the minimum height of the hero section.</summary>
    [JsonPropertyName("minHeight")]
    public string? MinHeight { get; set; }

    /// <summary>Gets or sets the horizontal text alignment within the hero.</summary>
    [JsonPropertyName("textAlign")]
    public string? TextAlign { get; set; }

    /// <summary>Gets or sets the vertical alignment of content within the hero.</summary>
    [JsonPropertyName("verticalAlign")]
    public string? VerticalAlign { get; set; }

    /// <summary>Gets or sets the call-to-action link text.</summary>
    [JsonPropertyName("linkText")]
    public string? LinkText { get; set; }

    /// <summary>Gets or sets the call-to-action link URL.</summary>
    [JsonPropertyName("linkUrl")]
    public string? LinkUrl { get; set; }

    /// <summary>Gets or sets a value indicating whether the link URL is relative.</summary>
    [JsonPropertyName("linkRelative")]
    public bool? LinkRelative { get; set; }
}
