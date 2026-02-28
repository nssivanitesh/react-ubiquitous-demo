using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Configuration for a datalist element providing autocomplete suggestions.</summary>
public class DatalistElementConfig : BaseElementConfig
{
    /// <summary>Initializes a new instance of <see cref="DatalistElementConfig"/> and sets the type discriminator.</summary>
    public DatalistElementConfig() { Type = "datalist"; }

    /// <summary>Gets or sets the list of suggestion options.</summary>
    [JsonPropertyName("options")]
    public List<object>? Options { get; set; }
}
