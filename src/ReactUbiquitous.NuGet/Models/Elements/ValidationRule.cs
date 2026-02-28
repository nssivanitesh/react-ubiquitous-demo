using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Represents a validation rule applied to a form element.</summary>
public class ValidationRule
{
    /// <summary>Gets or sets the rule type identifier.</summary>
    [JsonPropertyName("rule")]
    public string Rule { get; set; } = string.Empty;

    /// <summary>Gets or sets the value associated with the rule.</summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }

    /// <summary>Gets or sets the error message to display when the rule fails.</summary>
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    /// <summary>Gets or sets the name of a custom validator function.</summary>
    [JsonPropertyName("validator")]
    public string? Validator { get; set; }

    /// <summary>Gets or sets additional configuration for the rule.</summary>
    [JsonPropertyName("config")]
    public object? Config { get; set; }

    /// <summary>Gets or sets the logical operator used to combine nested rules.</summary>
    [JsonPropertyName("operator")]
    public string? Operator { get; set; }

    /// <summary>Gets or sets a list of nested validation rules.</summary>
    [JsonPropertyName("rules")]
    public List<ValidationRule>? Rules { get; set; }
}
