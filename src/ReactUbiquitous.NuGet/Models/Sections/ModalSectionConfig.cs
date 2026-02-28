using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a modal dialog section.</summary>
public class ModalSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ModalSectionConfig"/> and sets the layout discriminator.</summary>
    public ModalSectionConfig() { Layout = "modal"; }

    /// <summary>Gets or sets a value indicating whether the modal is currently open.</summary>
    [JsonPropertyName("open")]
    public bool? Open { get; set; }

    /// <summary>Gets or sets the size of the modal dialog (e.g. "sm", "md", "lg", "xl").</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }

    /// <summary>Gets or sets a value indicating whether clicking the overlay closes the modal.</summary>
    [JsonPropertyName("closeOnOverlayClick")]
    public bool? CloseOnOverlayClick { get; set; }

    /// <summary>Gets or sets a value indicating whether a close button is shown in the modal header.</summary>
    [JsonPropertyName("closeButton")]
    public bool? CloseButton { get; set; }

    /// <summary>Gets or sets the elements rendered in the modal footer.</summary>
    [JsonPropertyName("footerElements")]
    public List<BaseElementConfig>? FooterElements { get; set; }
}
