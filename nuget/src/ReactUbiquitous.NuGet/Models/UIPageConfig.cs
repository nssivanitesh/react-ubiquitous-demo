using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Sections;

namespace ReactUbiquitous.NuGet.Models;

/// <summary>Represents the configuration for a single UI page.</summary>
public class UIPageConfig
{
    /// <summary>Gets or sets the unique page identifier.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the page title.</summary>
    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    /// <summary>Gets or sets the page description.</summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    /// <summary>Gets or sets the icon associated with the page.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the display order of the page.</summary>
    [JsonPropertyName("order")]
    public int Order { get; set; }

    /// <summary>Gets or sets the list of sections contained in the page.</summary>
    [JsonPropertyName("sections")]
    public List<BaseSectionConfig>? Sections { get; set; }

    /// <summary>Gets or sets additional CSS class names for the page.</summary>
    [JsonPropertyName("className")]
    public string? ClassName { get; set; }

    /// <summary>Gets or sets a value indicating whether the page is visible.</summary>
    [JsonPropertyName("visible")]
    public bool? Visible { get; set; }
}
