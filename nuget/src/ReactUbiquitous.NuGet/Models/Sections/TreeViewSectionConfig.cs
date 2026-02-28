using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a node within a tree view hierarchy.</summary>
public class TreeViewNode
{
    /// <summary>Gets or sets the unique identifier of the tree node.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the primary label of the tree node.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the secondary label displayed below the primary label.</summary>
    [JsonPropertyName("sublabel")]
    public string? Sublabel { get; set; }

    /// <summary>Gets or sets the badge text displayed on the node.</summary>
    [JsonPropertyName("badge")]
    public string? Badge { get; set; }

    /// <summary>Gets or sets the child nodes of this tree node.</summary>
    [JsonPropertyName("children")]
    public List<TreeViewNode>? Children { get; set; }
}

/// <summary>Configuration for a tree-view section with a hierarchical node list and an optional detail panel.</summary>
public class TreeViewSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="TreeViewSectionConfig"/> and sets the layout discriminator.</summary>
    public TreeViewSectionConfig() { Layout = "tree-view"; }

    /// <summary>Gets or sets the heading shown above the tree panel.</summary>
    [JsonPropertyName("treeTitle")]
    public string? TreeTitle { get; set; }

    /// <summary>Gets or sets the CSS width of the tree panel.</summary>
    [JsonPropertyName("treeWidth")]
    public string? TreeWidth { get; set; }

    /// <summary>Gets or sets the selection mode of the tree (e.g. "single", "multi").</summary>
    [JsonPropertyName("treeMode")]
    public string? TreeMode { get; set; }

    /// <summary>Gets or sets the root nodes of the tree.</summary>
    [JsonPropertyName("treeNodes")]
    public List<TreeViewNode>? TreeNodes { get; set; }

    /// <summary>Gets or sets the API endpoint used to load detail data for the selected node.</summary>
    [JsonPropertyName("detailEndpoint")]
    public DetailEndpointConfig? DetailEndpoint { get; set; }

    /// <summary>Gets or sets the page configurations rendered in the detail panel.</summary>
    [JsonPropertyName("detailPages")]
    public List<UIPageConfig>? DetailPages { get; set; }
}
