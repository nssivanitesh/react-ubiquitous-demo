using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single media item such as an image or video.</summary>
public class MediaItem
{
    /// <summary>Gets or sets the unique identifier of the media item.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the media type (e.g. "image", "video").</summary>
    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    /// <summary>Gets or sets the URL of the media resource.</summary>
    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    /// <summary>Gets or sets the alternative text for the media item.</summary>
    [JsonPropertyName("alt")]
    public string? Alt { get; set; }

    /// <summary>Gets or sets the caption displayed with the media item.</summary>
    [JsonPropertyName("caption")]
    public string? Caption { get; set; }
}

/// <summary>Configuration for a media gallery or carousel section.</summary>
public class MediaSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="MediaSectionConfig"/> and sets the layout discriminator.</summary>
    public MediaSectionConfig() { Layout = "media"; }

    /// <summary>Gets or sets the aspect ratio of the media display area.</summary>
    [JsonPropertyName("aspectRatio")]
    public string? AspectRatio { get; set; }

    /// <summary>Gets or sets a value indicating whether navigation arrows are shown.</summary>
    [JsonPropertyName("showArrows")]
    public bool? ShowArrows { get; set; }

    /// <summary>Gets or sets a value indicating whether indicator dots are shown.</summary>
    [JsonPropertyName("showDots")]
    public bool? ShowDots { get; set; }

    /// <summary>Gets or sets the list of media items to display.</summary>
    [JsonPropertyName("items")]
    public List<MediaItem>? Items { get; set; }
}
