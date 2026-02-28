using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for an autocomplete input element with suggestion support.</summary>
public class AutocompleteElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="AutocompleteElementConfig"/> and sets the type discriminator.</summary>
    public AutocompleteElementConfig() { Type = "autocomplete"; }

    /// <summary>Gets or sets the list of suggestion options.</summary>
    [JsonPropertyName("options")]
    public List<object>? Options { get; set; }

    /// <summary>Gets or sets the default selected value.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current selected value.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets the placeholder text shown when no value is entered.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>Gets or sets a value indicating whether the user can enter values not in the options list.</summary>
    [JsonPropertyName("freeSolo")]
    public bool? FreeSolo { get; set; }

    /// <summary>Gets or sets a value indicating whether multiple values can be selected.</summary>
    [JsonPropertyName("multiple")]
    public bool? Multiple { get; set; }

    /// <summary>Gets or sets the minimum number of characters before suggestions appear.</summary>
    [JsonPropertyName("minChars")]
    public int? MinChars { get; set; }
}
