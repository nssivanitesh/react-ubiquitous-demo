using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for an embedded iframe section.</summary>
public class IframeSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="IframeSectionConfig"/> and sets the layout discriminator.</summary>
    public IframeSectionConfig() { Layout = "iframe"; }

    /// <summary>Gets or sets the source URL of the iframe content.</summary>
    [JsonPropertyName("src")]
    public string? Src { get; set; }

    /// <summary>Gets or sets the width of the iframe.</summary>
    [JsonPropertyName("width")]
    public object? Width { get; set; }

    /// <summary>Gets or sets the height of the iframe.</summary>
    [JsonPropertyName("height")]
    public object? Height { get; set; }

    /// <summary>Gets or sets a value indicating whether the iframe can be viewed in full screen.</summary>
    [JsonPropertyName("allowFullscreen")]
    public bool? AllowFullscreen { get; set; }

    /// <summary>Gets or sets the sandbox policy applied to the iframe.</summary>
    [JsonPropertyName("sandbox")]
    public string? Sandbox { get; set; }

    /// <summary>Gets or sets the scrolling behavior of the iframe (e.g. "auto", "yes", "no").</summary>
    [JsonPropertyName("scrolling")]
    public string? Scrolling { get; set; }
}
