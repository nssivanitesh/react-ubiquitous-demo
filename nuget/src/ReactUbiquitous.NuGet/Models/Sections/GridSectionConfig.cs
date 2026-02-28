using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a CSS grid layout section.</summary>
public class GridSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="GridSectionConfig"/> and sets the layout discriminator.</summary>
    public GridSectionConfig() { Layout = "grid"; }

    /// <summary>Gets or sets the grid-template-columns CSS property.</summary>
    [JsonPropertyName("gridTemplateColumns")]
    public string? GridTemplateColumns { get; set; }

    /// <summary>Gets or sets the grid-template-rows CSS property.</summary>
    [JsonPropertyName("gridTemplateRows")]
    public string? GridTemplateRows { get; set; }

    /// <summary>Gets or sets the gap between grid cells.</summary>
    [JsonPropertyName("gap")]
    public string? Gap { get; set; }

    /// <summary>Gets or sets the row-gap between grid rows.</summary>
    [JsonPropertyName("rowGap")]
    public string? RowGap { get; set; }

    /// <summary>Gets or sets the column-gap between grid columns.</summary>
    [JsonPropertyName("columnGap")]
    public string? ColumnGap { get; set; }

    /// <summary>Gets or sets the align-items CSS property for the grid.</summary>
    [JsonPropertyName("alignItems")]
    public string? AlignItems { get; set; }

    /// <summary>Gets or sets the justify-items CSS property for the grid.</summary>
    [JsonPropertyName("justifyItems")]
    public string? JustifyItems { get; set; }
}
