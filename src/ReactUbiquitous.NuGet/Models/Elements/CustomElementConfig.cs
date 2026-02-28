using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a custom element backed by a user-defined component.</summary>
public class CustomElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="CustomElementConfig"/> and sets the type discriminator.</summary>
    public CustomElementConfig() { Type = "custom"; }

    /// <summary>Gets or sets the name of the custom component to render.</summary>
    [JsonPropertyName("component")]
    public string Component { get; set; } = string.Empty;

    /// <summary>Gets or sets additional props passed to the custom component.</summary>
    [JsonPropertyName("props")]
    public Dictionary<string, object>? Props { get; set; }
}
