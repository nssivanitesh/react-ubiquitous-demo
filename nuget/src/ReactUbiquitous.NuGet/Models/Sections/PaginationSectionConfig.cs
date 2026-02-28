using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Configuration for a pagination navigation section.</summary>
public class PaginationSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="PaginationSectionConfig"/> and sets the layout discriminator.</summary>
    public PaginationSectionConfig() { Layout = "pagination"; }

    /// <summary>Gets or sets the total number of items across all pages.</summary>
    [JsonPropertyName("totalItems")]
    public int? TotalItems { get; set; }

    /// <summary>Gets or sets the currently active page number.</summary>
    [JsonPropertyName("currentPage")]
    public int? CurrentPage { get; set; }

    /// <summary>Gets or sets the number of items displayed per page.</summary>
    [JsonPropertyName("pageSize")]
    public int? PageSize { get; set; }

    /// <summary>Gets or sets a value indicating whether first and last page buttons are shown.</summary>
    [JsonPropertyName("showFirstLast")]
    public bool? ShowFirstLast { get; set; }

    /// <summary>Gets or sets a value indicating whether previous and next page buttons are shown.</summary>
    [JsonPropertyName("showPrevNext")]
    public bool? ShowPrevNext { get; set; }

    /// <summary>Gets or sets the number of page buttons displayed on each side of the current page.</summary>
    [JsonPropertyName("siblingCount")]
    public int? SiblingCount { get; set; }

    /// <summary>Gets or sets the visual variant of the pagination control.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }
}
