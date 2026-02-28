using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single tab within a tabs section.</summary>
public class TabItem
{
    /// <summary>Gets or sets the unique identifier of the tab.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the label displayed in the tab header.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the icon identifier displayed in the tab header.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets a value indicating whether this tab is disabled.</summary>
    [JsonPropertyName("disabled")]
    public bool? Disabled { get; set; }

    /// <summary>Gets or sets the badge text displayed on the tab.</summary>
    [JsonPropertyName("badge")]
    public string? Badge { get; set; }

    /// <summary>Gets or sets the sections rendered within this tab's content panel.</summary>
    [JsonPropertyName("sections")]
    public List<BaseSectionConfig>? Sections { get; set; }

    /// <summary>Gets or sets the elements rendered within this tab's content panel.</summary>
    [JsonPropertyName("elements")]
    public List<BaseElementConfig>? Elements { get; set; }
}

/// <summary>Configuration for a tabbed content section.</summary>
public class TabsSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="TabsSectionConfig"/> and sets the layout discriminator.</summary>
    public TabsSectionConfig() { Layout = "tabs"; }

    /// <summary>Gets or sets the list of tabs.</summary>
    [JsonPropertyName("tabs")]
    public List<TabItem>? Tabs { get; set; }

    /// <summary>Gets or sets the ID of the initially active tab.</summary>
    [JsonPropertyName("activeTab")]
    public string? ActiveTab { get; set; }

    /// <summary>Gets or sets the orientation of the tab bar (e.g. "horizontal", "vertical").</summary>
    [JsonPropertyName("orientation")]
    public string? Orientation { get; set; }

    /// <summary>Gets or sets the visual variant of the tabs.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}
