using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a phone number input element with country code support.</summary>
public class PhoneInputElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="PhoneInputElementConfig"/> and sets the type discriminator.</summary>
    public PhoneInputElementConfig() { Type = "phoneinput"; }

    /// <summary>Gets or sets the ISO 3166-1 alpha-2 country code selected by default.</summary>
    [JsonPropertyName("defaultCountry")]
    public string? DefaultCountry { get; set; }

    /// <summary>Gets or sets the default phone number value.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current phone number value.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets the placeholder text shown when no number is entered.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>Gets or sets the list of country codes available for selection.</summary>
    [JsonPropertyName("onlyCountries")]
    public List<string>? OnlyCountries { get; set; }

    /// <summary>Gets or sets the list of country codes displayed at the top of the country dropdown.</summary>
    [JsonPropertyName("preferredCountries")]
    public List<string>? PreferredCountries { get; set; }
}
