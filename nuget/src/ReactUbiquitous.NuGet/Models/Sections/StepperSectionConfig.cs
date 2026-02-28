using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single step in a stepper workflow.</summary>
public class StepItem
{
    /// <summary>Gets or sets the unique identifier of the step.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the label displayed in the step header.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the description shown below the step label.</summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    /// <summary>Gets or sets the icon identifier displayed in the step indicator.</summary>
    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    /// <summary>Gets or sets a value indicating whether this step is optional.</summary>
    [JsonPropertyName("optional")]
    public bool? Optional { get; set; }

    /// <summary>Gets or sets the sections rendered within this step's content area.</summary>
    [JsonPropertyName("sections")]
    public List<BaseSectionConfig>? Sections { get; set; }

    /// <summary>Gets or sets the elements rendered within this step's content area.</summary>
    [JsonPropertyName("elements")]
    public List<BaseElementConfig>? Elements { get; set; }
}

/// <summary>Configuration for a stepper section used to guide users through a multi-step workflow.</summary>
public class StepperSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="StepperSectionConfig"/> and sets the layout discriminator.</summary>
    public StepperSectionConfig() { Layout = "stepper"; }

    /// <summary>Gets or sets the list of steps in the stepper.</summary>
    [JsonPropertyName("steps")]
    public List<StepItem>? Steps { get; set; }

    /// <summary>Gets or sets the zero-based index of the currently active step.</summary>
    [JsonPropertyName("currentStep")]
    public int? CurrentStep { get; set; }

    /// <summary>Gets or sets the orientation of the stepper (e.g. "horizontal", "vertical").</summary>
    [JsonPropertyName("orientation")]
    public string? Orientation { get; set; }

    /// <summary>Gets or sets the visual variant of the stepper.</summary>
    [JsonPropertyName("variant")]
    public string? Variant { get; set; }

    /// <summary>Gets or sets a value indicating whether steps must be completed in order.</summary>
    [JsonPropertyName("linear")]
    public bool? Linear { get; set; }
}
