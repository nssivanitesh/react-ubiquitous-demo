using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a flexbox layout section.</summary>
public class FlexSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="FlexSectionConfig"/> and sets the layout discriminator.</summary>
    public FlexSectionConfig() { Layout = "flex"; }

    /// <summary>Gets or sets the flex-direction CSS property.</summary>
    [JsonPropertyName("flexDirection")]
    public string? FlexDirection { get; set; }

    /// <summary>Gets or sets the flex-wrap CSS property.</summary>
    [JsonPropertyName("flexWrap")]
    public string? FlexWrap { get; set; }

    /// <summary>Gets or sets the justify-content CSS property.</summary>
    [JsonPropertyName("justifyContent")]
    public string? JustifyContent { get; set; }

    /// <summary>Gets or sets the align-items CSS property.</summary>
    [JsonPropertyName("alignItems")]
    public string? AlignItems { get; set; }

    /// <summary>Gets or sets the align-content CSS property.</summary>
    [JsonPropertyName("alignContent")]
    public string? AlignContent { get; set; }

    /// <summary>Gets or sets the gap between flex items.</summary>
    [JsonPropertyName("gap")]
    public string? Gap { get; set; }

    /// <summary>Gets or sets the row-gap between flex rows.</summary>
    [JsonPropertyName("rowGap")]
    public string? RowGap { get; set; }

    /// <summary>Gets or sets the column-gap between flex columns.</summary>
    [JsonPropertyName("columnGap")]
    public string? ColumnGap { get; set; }
}
