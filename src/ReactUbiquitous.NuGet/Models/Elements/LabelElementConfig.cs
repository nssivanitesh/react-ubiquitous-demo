using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a label element.</summary>
public class LabelElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="LabelElementConfig"/> and sets the type discriminator.</summary>
    public LabelElementConfig() { Type = "label"; }

    /// <summary>Gets or sets the visible text content of the label.</summary>
    [JsonPropertyName("text")]
    public string? Text { get; set; }

    /// <summary>Gets or sets the ID of the form element this label is associated with.</summary>
    [JsonPropertyName("htmlFor")]
    public string? HtmlFor { get; set; }
}
