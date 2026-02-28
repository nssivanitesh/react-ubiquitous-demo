using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a one-time password (OTP) input element.</summary>
public class OtpInputElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="OtpInputElementConfig"/> and sets the type discriminator.</summary>
    public OtpInputElementConfig() { Type = "otpinput"; }

    /// <summary>Gets or sets the number of OTP digits.</summary>
    [JsonPropertyName("length")]
    public int? Length { get; set; }

    /// <summary>Gets or sets the input type for each digit field (e.g. "text", "number").</summary>
    [JsonPropertyName("inputType")]
    public string? InputType { get; set; }

    /// <summary>Gets or sets the default OTP value.</summary>
    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }

    /// <summary>Gets or sets the current OTP value.</summary>
    [JsonPropertyName("value")]
    public string? Value { get; set; }

    /// <summary>Gets or sets a value indicating whether the entered digits are masked.</summary>
    [JsonPropertyName("mask")]
    public bool? Mask { get; set; }

    /// <summary>Gets or sets the separator character displayed between digit groups.</summary>
    [JsonPropertyName("separator")]
    public string? Separator { get; set; }
}
