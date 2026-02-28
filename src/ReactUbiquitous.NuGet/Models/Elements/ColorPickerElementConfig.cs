using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a color picker element.</summary>
public class ColorPickerElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="ColorPickerElementConfig"/> and sets the type discriminator.</summary>
    public ColorPickerElementConfig() { Type = "colorpicker"; }

    /// <summary>Gets or sets the default color value.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current color value.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets the color format (e.g. "hex", "rgb", "hsl").</summary>
    [JsonPropertyName("format")]
    public string? Format { get; set; }

    /// <summary>Gets or sets a list of preset colors shown in the picker.</summary>
    [JsonPropertyName("presetColors")]
    public List<string>? PresetColors { get; set; }

    /// <summary>Gets or sets a value indicating whether an alpha/opacity channel is shown.</summary>
    [JsonPropertyName("showAlpha")]
    public bool? ShowAlpha { get; set; }
}
