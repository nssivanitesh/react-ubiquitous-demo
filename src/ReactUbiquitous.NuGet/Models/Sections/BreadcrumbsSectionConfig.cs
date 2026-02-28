using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single item in a breadcrumb trail.</summary>
public class BreadcrumbItem
{
    /// <summary>Gets or sets the unique identifier of the breadcrumb item.</summary>
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    /// <summary>Gets or sets the display label for the breadcrumb item.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the URL the breadcrumb item links to.</summary>
    [JsonPropertyName("href")]
    public string? Href { get; set; }

    /// <summary>Gets or sets the icon identifier displayed alongside the breadcrumb label.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }
}

/// <summary>Configuration for a breadcrumbs navigation section.</summary>
public class BreadcrumbsSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="BreadcrumbsSectionConfig"/> and sets the layout discriminator.</summary>
    public BreadcrumbsSectionConfig() { Layout = "breadcrumbs"; }

    /// <summary>Gets or sets the list of breadcrumb items in order from root to current.</summary>
    [JsonPropertyName("items")]
    public List<BreadcrumbItem>? Items { get; set; }

    /// <summary>Gets or sets the separator character or string displayed between items.</summary>
    [JsonPropertyName("separator")]
    public string? Separator { get; set; }
}
