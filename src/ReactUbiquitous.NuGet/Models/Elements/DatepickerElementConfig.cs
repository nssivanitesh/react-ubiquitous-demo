using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a date picker element.</summary>
public class DatepickerElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="DatepickerElementConfig"/> and sets the type discriminator.</summary>
    public DatepickerElementConfig() { Type = "datepicker"; }

    /// <summary>Gets or sets the display format for the selected date.</summary>
    [JsonPropertyName("format")]
    public string? Format { get; set; }

    /// <summary>Gets or sets the earliest selectable date.</summary>
    [JsonPropertyName("minDate")]
    public string? MinDate { get; set; }

    /// <summary>Gets or sets the latest selectable date.</summary>
    [JsonPropertyName("maxDate")]
    public string? MaxDate { get; set; }

    /// <summary>Gets or sets the placeholder text shown when no date is selected.</summary>
    [JsonPropertyName("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>Gets or sets the default selected date value.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current selected date value.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets a value indicating whether a time picker is also shown.</summary>
    [JsonPropertyName("showTime")]
    public bool? ShowTime { get; set; }

    /// <summary>Gets or sets a value indicating whether a date range can be selected.</summary>
    [JsonPropertyName("range")]
    public bool? Range { get; set; }
}
