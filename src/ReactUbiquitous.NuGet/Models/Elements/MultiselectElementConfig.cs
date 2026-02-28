using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a multi-select element allowing multiple value selection.</summary>
public class MultiselectElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="MultiselectElementConfig"/> and sets the type discriminator.</summary>
    public MultiselectElementConfig() { Type = "multiselect"; }

    /// <summary>Gets or sets the list of available options.</summary>
    [JsonPropertyName("options")]
    public List<object>? Options { get; set; }

    /// <summary>Gets or sets the default selected values.</summary>
    [JsonPropertyName("defaultValue")]
    public List<string>? DefaultValue { get; set; }

    /// <summary>Gets or sets the current selected values.</summary>
    [JsonPropertyName("value")]
    public List<string>? Value { get; set; }

    /// <summary>Gets or sets the placeholder text shown when no values are selected.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>Gets or sets the maximum number of items that can be selected.</summary>
    [JsonPropertyName("maxItems")]
    public int? MaxItems { get; set; }

    /// <summary>Gets or sets a value indicating whether the options list is searchable.</summary>
    [JsonPropertyName("searchable")]
    public bool? Searchable { get; set; }

    /// <summary>Gets or sets a value indicating whether the selection can be cleared.</summary>
    [JsonPropertyName("clearable")]
    public bool? Clearable { get; set; }
}
