using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single expandable panel within an accordion.</summary>
public class AccordionPanel
{
    /// <summary>Gets or sets the unique identifier of the panel.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the label displayed in the panel header.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the description shown below the panel label.</summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    /// <summary>Gets or sets a value indicating whether the panel is expanded by default.</summary>
    [JsonPropertyName("defaultOpen")]
    public bool? DefaultOpen { get; set; }

    /// <summary>Gets or sets the sections contained within the panel body.</summary>
    [JsonPropertyName("sections")]
    public List<BaseSectionConfig>? Sections { get; set; }

    /// <summary>Gets or sets the elements contained within the panel body.</summary>
    [JsonPropertyName("elements")]
    public List<BaseElementConfig>? Elements { get; set; }
}

/// <summary>Configuration for an accordion section containing collapsible panels.</summary>
public class AccordionSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="AccordionSectionConfig"/> and sets the layout discriminator.</summary>
    public AccordionSectionConfig() { Layout = "accordion"; }

    /// <summary>Gets or sets a value indicating whether multiple panels can be open simultaneously.</summary>
    [JsonPropertyName("allowMultiple")]
    public bool? AllowMultiple { get; set; }

    /// <summary>Gets or sets the list of accordion panels.</summary>
    [JsonPropertyName("panels")]
    public List<AccordionPanel>? Panels { get; set; }
}
