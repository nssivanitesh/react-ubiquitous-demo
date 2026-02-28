using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a single collapsible section.</summary>
public class CollapseSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="CollapseSectionConfig"/> and sets the layout discriminator.</summary>
    public CollapseSectionConfig() { Layout = "collapse"; }

    /// <summary>Gets or sets the label displayed in the collapse toggle header.</summary>
    [JsonPropertyName("label")]
    public string? Label { get; set; }

    /// <summary>Gets or sets a value indicating whether the section is expanded by default.</summary>
    [JsonPropertyName("defaultOpen")]
    public bool? DefaultOpen { get; set; }

    /// <summary>Gets or sets a value indicating whether a toggle icon is shown.</summary>
    [JsonPropertyName("icon")]
    public bool? Icon { get; set; }
}
