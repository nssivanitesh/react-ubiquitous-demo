using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a text/input element.</summary>
public class InputElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="InputElementConfig"/> and sets the type discriminator.</summary>
    public InputElementConfig() { Type = "input"; }

    /// <summary>Gets or sets the HTML input type (e.g. "text", "email", "number").</summary>
    [JsonPropertyName("inputType")]
    public string InputType { get; set; } = "text";

    /// <summary>Gets or sets the placeholder text shown when the input is empty.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>Gets or sets the default value of the input.</summary>
    [JsonPropertyName("defaultValue")]
    public object? DefaultValue { get; set; }

    /// <summary>Gets or sets the current value of the input.</summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }

    /// <summary>Gets or sets the minimum allowed value.</summary>
    [JsonPropertyName("min")]
    public object? Min { get; set; }

    /// <summary>Gets or sets the maximum allowed value.</summary>
    [JsonPropertyName("max")]
    public object? Max { get; set; }

    /// <summary>Gets or sets the numeric step increment.</summary>
    [JsonPropertyName("step")]
    public double? Step { get; set; }

    /// <summary>Gets or sets a value indicating whether multiple values are allowed.</summary>
    [JsonPropertyName("multiple")]
    public bool? Multiple { get; set; }

    /// <summary>Gets or sets the accepted file types for file inputs.</summary>
    [JsonPropertyName("accept")]
    public string? Accept { get; set; }

    /// <summary>Gets or sets the autocomplete hint for the browser.</summary>
    [JsonPropertyName("autocomplete")]
    public string? Autocomplete { get; set; }

    /// <summary>Gets or sets the ID of an associated datalist element.</summary>
    [JsonPropertyName("datalistId")]
    public string? DatalistId { get; set; }
}
