using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a star rating element.</summary>
public class RatingElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="RatingElementConfig"/> and sets the type discriminator.</summary>
    public RatingElementConfig() { Type = "rating"; }

    /// <summary>Gets or sets the maximum rating value (number of stars).</summary>
    [JsonPropertyName("max")]
    public int? Max { get; set; }

    /// <summary>Gets or sets the default rating value.</summary>
    [JsonPropertyName("defaultValue")]
    public double? DefaultValue { get; set; }

    /// <summary>Gets or sets the current rating value.</summary>
    [JsonPropertyName("value")]
    public double? Value { get; set; }

    /// <summary>Gets or sets the precision step for fractional ratings.</summary>
    [JsonPropertyName("precision")]
    public double? Precision { get; set; }

    /// <summary>Gets or sets the size of the rating icons.</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }

    /// <summary>Gets or sets the icon used to represent each rating unit.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }
}
