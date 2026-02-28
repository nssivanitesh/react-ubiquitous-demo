using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a range slider element.</summary>
public class RangeSliderElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="RangeSliderElementConfig"/> and sets the type discriminator.</summary>
    public RangeSliderElementConfig() { Type = "rangeslider"; }

    /// <summary>Gets or sets the minimum value of the slider.</summary>
    [JsonPropertyName("min")]
    public double? Min { get; set; }

    /// <summary>Gets or sets the maximum value of the slider.</summary>
    [JsonPropertyName("max")]
    public double? Max { get; set; }

    /// <summary>Gets or sets the step increment of the slider.</summary>
    [JsonPropertyName("step")]
    public double? Step { get; set; }

    /// <summary>Gets or sets the default value or range of the slider.</summary>
    [JsonPropertyName("defaultValue")]
    public object? DefaultValue { get; set; }

    /// <summary>Gets or sets the current value or range of the slider.</summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }

    /// <summary>Gets or sets a value indicating whether the slider supports a range with two handles.</summary>
    [JsonPropertyName("range")]
    public bool? Range { get; set; }

    /// <summary>Gets or sets a value indicating whether a tooltip is shown above the slider handle.</summary>
    [JsonPropertyName("showTooltip")]
    public bool? ShowTooltip { get; set; }

    /// <summary>Gets or sets a value indicating whether tick marks are displayed on the slider track.</summary>
    [JsonPropertyName("marks")]
    public bool? Marks { get; set; }

    /// <summary>Gets or sets the orientation of the slider (e.g. "horizontal", "vertical").</summary>
    [JsonPropertyName("orientation")]
    public string? Orientation { get; set; }
}
