using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a multi-line text area element.</summary>
public class TextareaElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="TextareaElementConfig"/> and sets the type discriminator.</summary>
    public TextareaElementConfig() { Type = "textarea"; }

    /// <summary>Gets or sets the placeholder text shown when the textarea is empty.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>Gets or sets the default text content.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current text content.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets the number of visible text rows.</summary>
    [JsonPropertyName("rows")]
    public int? Rows { get; set; }

    /// <summary>Gets or sets the number of visible text columns.</summary>
    [JsonPropertyName("cols")]
    public int? Cols { get; set; }

    /// <summary>Gets or sets the resize behavior (e.g. "none", "vertical", "horizontal", "both").</summary>
    [JsonPropertyName("resize")]
    public string? Resize { get; set; }

    /// <summary>Gets or sets the maximum number of characters allowed.</summary>
    [JsonPropertyName("maxLength")]
    public int? MaxLength { get; set; }
}
