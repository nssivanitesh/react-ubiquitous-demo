using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>A single avatar item displayed inside an <see cref="AvatarSectionConfig"/>.</summary>
public class AvatarItem
{
    /// <summary>Gets or sets the unique identifier of the avatar.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the fallback initials (e.g. "JD") shown when <see cref="Src"/> is absent or fails to load.</summary>
    [JsonPropertyName("initials")]
    public string? Initials { get; set; }

    /// <summary>Gets or sets the image URL.</summary>
    [JsonPropertyName("src")]
    public string? Src { get; set; }

    /// <summary>Gets or sets the alt text for the image.</summary>
    [JsonPropertyName("alt")]
    public string? Alt { get; set; }

    /// <summary>Gets or sets the optional display name shown below the avatar.</summary>
    [JsonPropertyName("name")]
    public string? Name { get; set; }
}

/// <summary>Configuration for an avatar group display section.</summary>
public class AvatarSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="AvatarSectionConfig"/> and sets the layout discriminator.</summary>
    public AvatarSectionConfig() { Layout = "avatar"; }

    /// <summary>Gets or sets the avatar items to render.</summary>
    [JsonPropertyName("avatars")]
    public List<AvatarItem>? Avatars { get; set; }

    /// <summary>Gets or sets the size preset — one of <c>"sm"</c>, <c>"md"</c>, <c>"lg"</c>, <c>"xl"</c>. Default: <c>"md"</c>.</summary>
    [JsonPropertyName("size")]
    public string? Size { get; set; }

    /// <summary>Gets or sets a value indicating whether avatars overlap (stack). Default: <c>false</c>.</summary>
    [JsonPropertyName("stacked")]
    public bool? Stacked { get; set; }
}
