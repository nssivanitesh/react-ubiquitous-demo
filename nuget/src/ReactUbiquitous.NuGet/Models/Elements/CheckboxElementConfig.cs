using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a checkbox element.</summary>
public class CheckboxElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="CheckboxElementConfig"/> and sets the type discriminator.</summary>
    public CheckboxElementConfig() { Type = "checkbox"; }

    /// <summary>Gets or sets the default checked state of the checkbox.</summary>
    [JsonPropertyName("defaultChecked")]
    public bool? DefaultChecked { get; set; }

    /// <summary>Gets or sets the current checked state of the checkbox.</summary>
    [JsonPropertyName("checked")]
    public bool? Checked { get; set; }

    /// <summary>Gets or sets the value submitted when the checkbox is checked.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }
}
