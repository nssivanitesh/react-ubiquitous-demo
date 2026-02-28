using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a drawer (slide-out panel) section.</summary>
public class DrawerSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="DrawerSectionConfig"/> and sets the layout discriminator.</summary>
    public DrawerSectionConfig() { Layout = "drawer"; }

    /// <summary>Gets or sets a value indicating whether the drawer is currently open.</summary>
    [JsonPropertyName("open")]
    public bool? Open { get; set; }

    /// <summary>Gets or sets the side from which the drawer slides in (e.g. "left", "right", "top", "bottom").</summary>
    [JsonPropertyName("placement")]
    public string? Placement { get; set; }

    /// <summary>Gets or sets the size of the drawer panel.</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }

    /// <summary>Gets or sets a value indicating whether clicking the overlay closes the drawer.</summary>
    [JsonPropertyName("closeOnOverlayClick")]
    public bool? CloseOnOverlayClick { get; set; }

    /// <summary>Gets or sets a value indicating whether a close button is shown in the drawer header.</summary>
    [JsonPropertyName("closeButton")]
    public bool? CloseButton { get; set; }
}
