using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models;

/// <summary>Represents the top-level configuration for a UI stage.</summary>
public class UIStageConfig
{
    /// <summary>Gets or sets the unique stage identifier.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the stage title.</summary>
    [JsonPropertyName("title")]
    public string? Title { get; set; }

    /// <summary>Gets or sets the stage description.</summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    /// <summary>Gets or sets the identifier of the default page to display.</summary>
    [JsonPropertyName("defaultPageId")]
    public string? DefaultPageId { get; set; }

    /// <summary>Gets or sets the list of pages in the stage.</summary>
    [JsonPropertyName("pages")]
    public List<UIPageConfig>? Pages { get; set; }

    /// <summary>Gets or sets the visual theme for the stage.</summary>
    [JsonPropertyName("theme")]
    public string? Theme { get; set; }

    /// <summary>Gets or sets additional CSS class names for the stage.</summary>
    [JsonPropertyName("className")]
    public string? ClassName { get; set; }

    /// <summary>Gets or sets the page transition animation style.</summary>
    [JsonPropertyName("pageTransition")]
    public string? PageTransition { get; set; }
}
