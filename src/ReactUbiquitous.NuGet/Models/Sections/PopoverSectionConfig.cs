using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a popover overlay section.</summary>
public class PopoverSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="PopoverSectionConfig"/> and sets the layout discriminator.</summary>
    public PopoverSectionConfig() { Layout = "popover"; }

    /// <summary>Gets or sets the rich content displayed inside the popover.</summary>
    [JsonPropertyName("content")]
    public string? Content { get; set; }

    /// <summary>Gets or sets the placement of the popover relative to the trigger.</summary>
    [JsonPropertyName("placement")]
    public string? Placement { get; set; }

    /// <summary>Gets or sets the interaction that triggers the popover (e.g. "click", "hover").</summary>
    [JsonPropertyName("trigger")]
    public string? Trigger { get; set; }

    /// <summary>Gets or sets a value indicating whether a close button is shown inside the popover.</summary>
    [JsonPropertyName("closeButton")]
    public bool? CloseButton { get; set; }
}
