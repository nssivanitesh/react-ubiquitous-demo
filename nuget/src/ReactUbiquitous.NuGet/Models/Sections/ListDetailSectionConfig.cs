using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single item displayed in the list panel of a list-detail section.</summary>
public class ListDetailItem
{
    /// <summary>Gets or sets the unique identifier of the list item.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the primary label of the list item.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the secondary label displayed below the primary label.</summary>
    [JsonPropertyName("sublabel")]
    public string? Sublabel { get; set; }

    /// <summary>Gets or sets the URL of the avatar image for the list item.</summary>
    [JsonPropertyName("avatar")]
    public string? Avatar { get; set; }

    /// <summary>Gets or sets the badge text displayed on the list item.</summary>
    [JsonPropertyName("badge")]
    public string? Badge { get; set; }
}

/// <summary>Represents the API endpoint configuration for retrieving a paginated list.</summary>
public class ListEndpointConfig
{
    /// <summary>Gets or sets the URL of the list endpoint.</summary>
    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    /// <summary>Gets or sets the query parameter name for the start of the page range.</summary>
    [JsonPropertyName("fromParam")]
    public string FromParam { get; set; } = string.Empty;

    /// <summary>Gets or sets the default value for the start of the page range.</summary>
    [JsonPropertyName("fromValue")]
    public int? FromValue { get; set; }

    /// <summary>Gets or sets the query parameter name for the end of the page range.</summary>
    [JsonPropertyName("toParam")]
    public string ToParam { get; set; } = string.Empty;

    /// <summary>Gets or sets the default value for the end of the page range.</summary>
    [JsonPropertyName("toValue")]
    public int? ToValue { get; set; }

    /// <summary>Gets or sets the query parameter name for the sort field.</summary>
    [JsonPropertyName("sortParam")]
    public string SortParam { get; set; } = string.Empty;

    /// <summary>Gets or sets the default sort field value.</summary>
    [JsonPropertyName("sortValue")]
    public string SortValue { get; set; } = string.Empty;
}

/// <summary>Represents the API endpoint configuration for filtering a list.</summary>
public class FilterEndpointConfig
{
    /// <summary>Gets or sets the URL of the filter endpoint.</summary>
    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    /// <summary>Gets or sets the query parameter name used for the filter value.</summary>
    [JsonPropertyName("queryParam")]
    public string QueryParam { get; set; } = string.Empty;
}

/// <summary>Represents the API endpoint configuration for retrieving a selected item's detail.</summary>
public class DetailEndpointConfig
{
    /// <summary>Gets or sets the URL of the detail endpoint.</summary>
    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    /// <summary>Gets or sets the query parameter name used to pass the selected item identifier.</summary>
    [JsonPropertyName("selectedParam")]
    public string SelectedParam { get; set; } = string.Empty;
}

/// <summary>Configuration for a list-detail section that displays a master list alongside a detail view.</summary>
public class ListDetailSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ListDetailSectionConfig"/> and sets the layout discriminator.</summary>
    public ListDetailSectionConfig() { Layout = "list-detail"; }

    /// <summary>Gets or sets the heading shown above the list panel.</summary>
    [JsonPropertyName("listTitle")]
    public string? ListTitle { get; set; }

    /// <summary>Gets or sets the CSS width of the list panel.</summary>
    [JsonPropertyName("listWidth")]
    public string? ListWidth { get; set; }

    /// <summary>Gets or sets the number of items per page.</summary>
    [JsonPropertyName("pageSize")]
    public int? PageSize { get; set; }

    /// <summary>Gets or sets the static list of items to display.</summary>
    [JsonPropertyName("listItems")]
    public List<ListDetailItem>? ListItems { get; set; }

    /// <summary>Gets or sets the API endpoint used to load list items dynamically.</summary>
    [JsonPropertyName("listEndpoint")]
    public ListEndpointConfig? ListEndpoint { get; set; }

    /// <summary>Gets or sets the API endpoint used to filter the list.</summary>
    [JsonPropertyName("filterEndpoint")]
    public FilterEndpointConfig? FilterEndpoint { get; set; }

    /// <summary>Gets or sets the API endpoint used to load detail data for the selected item.</summary>
    [JsonPropertyName("detailEndpoint")]
    public DetailEndpointConfig? DetailEndpoint { get; set; }

    /// <summary>Gets or sets the page configurations rendered in the detail panel.</summary>
    [JsonPropertyName("detailPages")]
    public List<UIPageConfig>? DetailPages { get; set; }
}
