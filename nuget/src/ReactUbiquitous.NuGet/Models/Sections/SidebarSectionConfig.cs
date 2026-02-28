using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a navigation item displayed in a sidebar.</summary>
public class SidebarItem
{
    /// <summary>Gets or sets the unique identifier of the item.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the display label for the item.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the URL the item navigates to.</summary>
    [JsonPropertyName("href")]
    public string? Href { get; set; }

    /// <summary>Gets or sets the icon identifier displayed alongside the item.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the badge text displayed on the item.</summary>
    [JsonPropertyName("badge")]
    public string? Badge { get; set; }

    /// <summary>Gets or sets a value indicating whether this item is currently active.</summary>
    [JsonPropertyName("active")]
    public bool? Active { get; set; }

    /// <summary>Gets or sets the child items for a nested sub-menu.</summary>
    [JsonPropertyName("children")]
    public List<SidebarItem>? Children { get; set; }
}

/// <summary>Configuration for a sidebar navigation section.</summary>
public class SidebarSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="SidebarSectionConfig"/> and sets the layout discriminator.</summary>
    public SidebarSectionConfig() { Layout = "sidebar"; }

    /// <summary>Gets or sets the list of sidebar navigation items.</summary>
    [JsonPropertyName("items")]
    public List<SidebarItem>? Items { get; set; }

    /// <summary>Gets or sets a value indicating whether the sidebar can be collapsed.</summary>
    [JsonPropertyName("collapsible")]
    public bool? Collapsible { get; set; }

    /// <summary>Gets or sets a value indicating whether the sidebar starts collapsed.</summary>
    [JsonPropertyName("defaultCollapsed")]
    public bool? DefaultCollapsed { get; set; }

    /// <summary>Gets or sets the CSS width of the sidebar.</summary>
    [JsonPropertyName("width")]
    public string? Width { get; set; }

    /// <summary>Gets or sets the position of the sidebar (e.g. "left", "right").</summary>
    [JsonPropertyName("position")]
    public string? Position { get; set; }

    /// <summary>Gets or sets the visual variant of the sidebar.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}
