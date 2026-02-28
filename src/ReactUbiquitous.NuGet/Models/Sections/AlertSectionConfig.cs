using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for an alert feedback section.</summary>
public class AlertSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="AlertSectionConfig"/> and sets the layout discriminator.</summary>
    public AlertSectionConfig() { Layout = "alert"; }

    /// <summary>Gets or sets the message text displayed in the alert.</summary>
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    /// <summary>Gets or sets the severity level of the alert (e.g. "info", "success", "warning", "error").</summary>
    [JsonPropertyName("severity")]
    public string? Severity { get; set; }

    /// <summary>Gets or sets a value indicating whether the alert can be dismissed by the user.</summary>
    [JsonPropertyName("dismissible")]
    public bool? Dismissible { get; set; }

    /// <summary>Gets or sets the icon identifier displayed in the alert.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets the visual variant of the alert.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}
