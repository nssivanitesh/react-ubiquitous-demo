using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a fieldset element that groups related form controls.</summary>
public class FieldsetElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="FieldsetElementConfig"/> and sets the type discriminator.</summary>
    public FieldsetElementConfig() { Type = "fieldset"; }

    /// <summary>Gets or sets the legend caption displayed for the fieldset.</summary>
    [JsonPropertyName("legend")]
    public string? Legend { get; set; }

    /// <summary>Gets or sets the child elements contained within the fieldset.</summary>
    [JsonPropertyName("children")]
    public List<BaseElementConfig>? Children { get; set; }
}
