using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a toast notification section.</summary>
public class ToastSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ToastSectionConfig"/> and sets the layout discriminator.</summary>
    public ToastSectionConfig() { Layout = "toast"; }

    /// <summary>Gets or sets the message text displayed in the toast.</summary>
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    /// <summary>Gets or sets the severity level of the toast (e.g. "info", "success", "warning", "error").</summary>
    [JsonPropertyName("severity")]
    public string? Severity { get; set; }

    /// <summary>Gets or sets the auto-dismiss duration in milliseconds.</summary>
    [JsonPropertyName("duration")]
    public int? Duration { get; set; }

    /// <summary>Gets or sets the screen position of the toast (e.g. "top-right", "bottom-center").</summary>
    [JsonPropertyName("position")]
    public string? Position { get; set; }

    /// <summary>Gets or sets a value indicating whether the toast can be dismissed by the user.</summary>
    [JsonPropertyName("closable")]
    public bool? Closable { get; set; }

    /// <summary>Gets or sets the icon identifier displayed in the toast.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }
}
