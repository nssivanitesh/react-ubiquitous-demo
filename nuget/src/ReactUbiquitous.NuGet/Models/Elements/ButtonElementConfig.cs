using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a button element.</summary>
public class ButtonElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="ButtonElementConfig"/> and sets the type discriminator.</summary>
    public ButtonElementConfig() { Type = "button"; }

    /// <summary>Gets or sets the button label text.</summary>
    [JsonPropertyName("text")]
    public string? Text { get; set; }

    /// <summary>Gets or sets the HTML button type (e.g. "button", "submit", "reset").</summary>
    [JsonPropertyName("buttonType")]
    public string? ButtonType { get; set; }

    /// <summary>Gets or sets the visual variant of the button (e.g. "primary", "secondary").</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }

    /// <summary>Gets or sets the size of the button.</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }

    /// <summary>Gets or sets the icon identifier displayed on the button.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the position of the icon relative to the button text.</summary>
    [JsonPropertyName("iconPosition")]
    public string? IconPosition { get; set; }
}
