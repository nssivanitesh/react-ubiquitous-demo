using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a syntax-highlighted code block section.</summary>
public class CodeBlockSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="CodeBlockSectionConfig"/> and sets the layout discriminator.</summary>
    public CodeBlockSectionConfig() { Layout = "code-block"; }

    /// <summary>Gets or sets the source code to display.</summary>
    [JsonPropertyName("code")]
    public string? Code { get; set; }

    /// <summary>Gets or sets the programming language used for syntax highlighting.</summary>
    [JsonPropertyName("language")]
    public string? Language { get; set; }

    /// <summary>Gets or sets a value indicating whether a copy-to-clipboard button is shown.</summary>
    [JsonPropertyName("showCopy")]
    public bool? ShowCopy { get; set; }

    /// <summary>Gets or sets a value indicating whether line numbers are displayed.</summary>
    [JsonPropertyName("showLineNumbers")]
    public bool? ShowLineNumbers { get; set; }

    /// <summary>Gets or sets the syntax highlighting theme.</summary>
    [JsonPropertyName("theme")]
    public string? Theme { get; set; }

    /// <summary>Gets or sets the maximum height of the code block before scrolling.</summary>
    [JsonPropertyName("maxHeight")]
    public object? MaxHeight { get; set; }
}
