using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for an empty-state placeholder section shown when no data is available.</summary>
public class EmptyStateSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="EmptyStateSectionConfig"/> and sets the layout discriminator.</summary>
    public EmptyStateSectionConfig() { Layout = "empty-state"; }

    /// <summary>Gets or sets the icon identifier displayed in the empty state.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the message displayed to the user.</summary>
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    /// <summary>Gets or sets the call-to-action button label.</summary>
    [JsonPropertyName("actionLabel")]
    public string? ActionLabel { get; set; }

    /// <summary>Gets or sets the URL the call-to-action navigates to.</summary>
    [JsonPropertyName("actionUrl")]
    public string? ActionUrl { get; set; }

    /// <summary>Gets or sets the elements rendered as the call-to-action area.</summary>
    [JsonPropertyName("actionElements")]
    public List<BaseElementConfig>? ActionElements { get; set; }
}
