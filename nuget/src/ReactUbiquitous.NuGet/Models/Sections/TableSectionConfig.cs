using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single column definition in a table section.</summary>
public class TableColumn
{
    /// <summary>Gets or sets the key used to map the column to row data.</summary>
    [JsonPropertyName("key")]
    public string Key { get; set; } = string.Empty;

    /// <summary>Gets or sets the header label displayed for the column.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets a value indicating whether the column is sortable.</summary>
    [JsonPropertyName("sortable")]
    public bool? Sortable { get; set; }

    /// <summary>Gets or sets the width of the column.</summary>
    [JsonPropertyName("width")]
    public object? Width { get; set; }

    /// <summary>Gets or sets the text alignment within the column (e.g. "left", "center", "right").</summary>
    [JsonPropertyName("align")]
    public string? Align { get; set; }
}

/// <summary>Configuration for a data table section.</summary>
public class TableSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="TableSectionConfig"/> and sets the layout discriminator.</summary>
    public TableSectionConfig() { Layout = "table"; }

    /// <summary>Gets or sets the column definitions for the table.</summary>
    [JsonPropertyName("columns")]
    public List<TableColumn>? Columns { get; set; }

    /// <summary>Gets or sets the data rows rendered in the table body.</summary>
    [JsonPropertyName("rows")]
    public List<Dictionary<string, object>>? Rows { get; set; }

    /// <summary>Gets or sets a value indicating whether the search / filter input is shown above the table. Default: <c>true</c>.</summary>
    [JsonPropertyName("searchable")]
    public bool? Searchable { get; set; }

    /// <summary>Gets or sets the message displayed when no rows match the current filter.</summary>
    [JsonPropertyName("emptyMessage")]
    public string? EmptyMessage { get; set; }

    /// <summary>Gets or sets a value indicating whether column-level sorting is enabled.</summary>
    [JsonPropertyName("sortable")]
    public bool? Sortable { get; set; }

    /// <summary>Gets or sets a value indicating whether a filter input is shown.</summary>
    [JsonPropertyName("filterable")]
    public bool? Filterable { get; set; }

    /// <summary>Gets or sets a value indicating whether the table rows are paginated.</summary>
    [JsonPropertyName("paginated")]
    public bool? Paginated { get; set; }

    /// <summary>Gets or sets the number of rows displayed per page.</summary>
    [JsonPropertyName("pageSize")]
    public int? PageSize { get; set; }

    /// <summary>Gets or sets a value indicating whether alternating row striping is applied.</summary>
    [JsonPropertyName("striped")]
    public bool? Striped { get; set; }

    /// <summary>Gets or sets a value indicating whether the table has visible cell borders.</summary>
    [JsonPropertyName("bordered")]
    public bool? Bordered { get; set; }

    /// <summary>Gets or sets a value indicating whether compact row padding is used.</summary>
    [JsonPropertyName("compact")]
    public bool? Compact { get; set; }

    /// <summary>Gets or sets a value indicating whether rows can be selected.</summary>
    [JsonPropertyName("selectable")]
    public bool? Selectable { get; set; }
}
