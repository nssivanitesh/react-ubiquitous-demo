using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a file upload element.</summary>
public class FileUploadElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="FileUploadElementConfig"/> and sets the type discriminator.</summary>
    public FileUploadElementConfig() { Type = "fileupload"; }

    /// <summary>Gets or sets the accepted file MIME types or extensions.</summary>
    [JsonPropertyName("accept")]
    public string? Accept { get; set; }

    /// <summary>Gets or sets a value indicating whether multiple files can be uploaded.</summary>
    [JsonPropertyName("multiple")]
    public bool? Multiple { get; set; }

    /// <summary>Gets or sets the maximum allowed file size in bytes.</summary>
    [JsonPropertyName("maxSize")]
    public long? MaxSize { get; set; }

    /// <summary>Gets or sets the maximum number of files that can be uploaded.</summary>
    [JsonPropertyName("maxFiles")]
    public int? MaxFiles { get; set; }

    /// <summary>Gets or sets a value indicating whether drag-and-drop upload is enabled.</summary>
    [JsonPropertyName("dragDrop")]
    public bool? DragDrop { get; set; }

    /// <summary>Gets or sets a value indicating whether file previews are displayed after selection.</summary>
    [JsonPropertyName("showPreview")]
    public bool? ShowPreview { get; set; }
}
