using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a card section with optional header, body, and footer.</summary>
public class CardSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="CardSectionConfig"/> and sets the layout discriminator.</summary>
    public CardSectionConfig() { Layout = "card"; }

    /// <summary>Gets or sets the elements rendered in the card footer.</summary>
    [JsonPropertyName("footerElements")]
    public List<BaseElementConfig>? FooterElements { get; set; }

    /// <summary>Gets or sets a value indicating whether padding is applied inside the card.</summary>
    [JsonPropertyName("padded")]
    public bool? Padded { get; set; }

    /// <summary>Gets or sets a value indicating whether the card has a visible border.</summary>
    [JsonPropertyName("bordered")]
    public bool? Bordered { get; set; }

    /// <summary>Gets or sets the shadow depth of the card (e.g. "sm", "md", "lg").</summary>
    [JsonPropertyName("shadow")]
    public string? Shadow { get; set; }
}
