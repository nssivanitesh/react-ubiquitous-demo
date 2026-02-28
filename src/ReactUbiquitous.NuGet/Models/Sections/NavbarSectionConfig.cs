using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a navigation link displayed in a navbar.</summary>
public class NavbarLink
{
    /// <summary>Gets or sets the unique identifier of the link.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the display label for the link.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the URL the link navigates to.</summary>
    [JsonPropertyName("url")]
    public string? Url { get; set; }

    /// <summary>Gets or sets the icon identifier displayed alongside the link label.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the child links for a dropdown sub-menu.</summary>
    [JsonPropertyName("children")]
    public List<NavbarLink>? Children { get; set; }
}

/// <summary>Configuration for a navigation bar section.</summary>
public class NavbarSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="NavbarSectionConfig"/> and sets the layout discriminator.</summary>
    public NavbarSectionConfig() { Layout = "navbar"; }

    /// <summary>Gets or sets the URL of the navbar logo image.</summary>
    [JsonPropertyName("logo")]
    public string? Logo { get; set; }

    /// <summary>Gets or sets the alternative text for the navbar logo.</summary>
    [JsonPropertyName("logoAlt")]
    public string? LogoAlt { get; set; }

    /// <summary>Gets or sets the list of navigation links.</summary>
    [JsonPropertyName("links")]
    public List<NavbarLink>? Links { get; set; }

    /// <summary>Gets or sets a value indicating whether the navbar sticks to the top of the viewport.</summary>
    [JsonPropertyName("sticky")]
    public bool? Sticky { get; set; }

    /// <summary>Gets or sets a value indicating whether the navbar collapses on small screens.</summary>
    [JsonPropertyName("collapsible")]
    public bool? Collapsible { get; set; }

    /// <summary>Gets or sets the visual variant of the navbar.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}
