using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Represents a single option in a radio group.</summary>
public class RadioOption
{
    /// <summary>Gets or sets the display label for the option.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the value submitted when the option is selected.</summary>
    [JsonPropertyName("value")]
    public string Value { get; set; } = string.Empty;

    /// <summary>Gets or sets a value indicating whether this option is disabled.</summary>
    [JsonPropertyName("disabled")]
    public bool? Disabled { get; set; }
}

/// <summary>Configuration for a radio button group element.</summary>
public class RadioElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="RadioElementConfig"/> and sets the type discriminator.</summary>
    public RadioElementConfig() { Type = "radio"; }

    /// <summary>Gets or sets the list of available radio options.</summary>
    [JsonPropertyName("options")]
    public List<RadioOption>? Options { get; set; }

    /// <summary>Gets or sets the default selected value.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current selected value.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets the layout orientation of the radio group.</summary>
    [JsonPropertyName("orientation")]
    public string? Orientation { get; set; }
}
