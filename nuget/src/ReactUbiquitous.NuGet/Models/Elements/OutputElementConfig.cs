using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for an output element that displays a computed value.</summary>
public class OutputElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="OutputElementConfig"/> and sets the type discriminator.</summary>
    public OutputElementConfig() { Type = "output"; }

    /// <summary>Gets or sets the current computed value.</summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }

    /// <summary>Gets or sets the default value displayed before any computation.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the display format string for the value.</summary>
    [JsonPropertyName("format")]
    public string? Format { get; set; }

    /// <summary>Gets or sets the IDs of the input elements whose values contribute to the output.</summary>
    [JsonPropertyName("htmlFor")]
    public List<string>? HtmlFor { get; set; }
}
