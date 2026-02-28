using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Represents a single selectable option in a select element.</summary>
public class SelectOption
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

/// <summary>Represents a grouped set of options within a select element.</summary>
public class SelectOptGroup
{
    /// <summary>Gets or sets a value indicating that this item is a group header.</summary>
    [JsonPropertyName("group")]
    public bool Group { get; set; } = true;

    /// <summary>Gets or sets the display label for the option group.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the options contained within the group.</summary>
    [JsonPropertyName("options")]
    public List<SelectOption>? Options { get; set; }
}

/// <summary>Configuration for a dropdown select element.</summary>
public class SelectElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="SelectElementConfig"/> and sets the type discriminator.</summary>
    public SelectElementConfig() { Type = "select"; }

    /// <summary>Gets or sets the list of options or option groups available for selection.</summary>
    [JsonPropertyName("options")]
    public List<object>? Options { get; set; }

    /// <summary>Gets or sets a value indicating whether multiple options can be selected.</summary>
    [JsonPropertyName("multiple")]
    public bool? Multiple { get; set; }

    /// <summary>Gets or sets the number of visible rows in the select list.</summary>
    [JsonPropertyName("size")]
    public int? Size { get; set; }

    /// <summary>Gets or sets the default selected value.</summary>
    [JsonPropertyName("defaultValue")]
    public object? DefaultValue { get; set; }

    /// <summary>Gets or sets the current selected value.</summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }

    /// <summary>Gets or sets the placeholder text shown when no option is selected.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }
}
