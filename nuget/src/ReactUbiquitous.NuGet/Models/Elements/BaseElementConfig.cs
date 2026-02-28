using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Elements;

/// <summary>Base configuration for all UI form elements, providing common layout and behaviour properties.</summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(InputElementConfig), "input")]
[JsonDerivedType(typeof(CheckboxElementConfig), "checkbox")]
[JsonDerivedType(typeof(RadioElementConfig), "radio")]
[JsonDerivedType(typeof(TextareaElementConfig), "textarea")]
[JsonDerivedType(typeof(SelectElementConfig), "select")]
[JsonDerivedType(typeof(ButtonElementConfig), "button")]
[JsonDerivedType(typeof(LabelElementConfig), "label")]
[JsonDerivedType(typeof(FieldsetElementConfig), "fieldset")]
[JsonDerivedType(typeof(DatalistElementConfig), "datalist")]
[JsonDerivedType(typeof(OutputElementConfig), "output")]
[JsonDerivedType(typeof(DatepickerElementConfig), "datepicker")]
[JsonDerivedType(typeof(MultiselectElementConfig), "multiselect")]
[JsonDerivedType(typeof(AutocompleteElementConfig), "autocomplete")]
[JsonDerivedType(typeof(FileUploadElementConfig), "fileupload")]
[JsonDerivedType(typeof(ColorPickerElementConfig), "colorpicker")]
[JsonDerivedType(typeof(RangeSliderElementConfig), "rangeslider")]
[JsonDerivedType(typeof(RatingElementConfig), "rating")]
[JsonDerivedType(typeof(OtpInputElementConfig), "otpinput")]
[JsonDerivedType(typeof(PhoneInputElementConfig), "phoneinput")]
[JsonDerivedType(typeof(CustomElementConfig), "custom")]
public abstract class BaseElementConfig
{
    /// <summary>Gets or sets the unique element identifier.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the element name used for form submission.</summary>
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    /// <summary>Gets or sets the element type discriminator (not serialized).</summary>
    [JsonIgnore]
    public string Type { get; set; } = string.Empty;

    /// <summary>Gets or sets the display order of the element.</summary>
    [JsonPropertyName("order")]
    public int? Order { get; set; }

    /// <summary>Gets or sets the width of the element.</summary>
    [JsonPropertyName("width")]
    public object? Width { get; set; }

    /// <summary>Gets or sets the visible label text.</summary>
    [JsonPropertyName("label")]
    public string? Label { get; set; }

    /// <summary>Gets or sets the position of the label relative to the element.</summary>
    [JsonPropertyName("labelPosition")]
    public string? LabelPosition { get; set; }

    /// <summary>Gets or sets the tooltip text shown on hover.</summary>
    [JsonPropertyName("tooltip")]
    public string? Tooltip { get; set; }

    /// <summary>Gets or sets the units label displayed alongside the element.</summary>
    [JsonPropertyName("units")]
    public string? Units { get; set; }

    /// <summary>Gets or sets the position of the units label.</summary>
    [JsonPropertyName("unitsPosition")]
    public string? UnitsPosition { get; set; }

    /// <summary>Gets or sets a value indicating whether the element is disabled.</summary>
    [JsonPropertyName("disabled")]
    public bool? Disabled { get; set; }

    /// <summary>Gets or sets a value indicating whether the element is read-only.</summary>
    [JsonPropertyName("readonly")]
    public bool? Readonly { get; set; }

    /// <summary>Gets or sets a value indicating whether the element is required.</summary>
    [JsonPropertyName("required")]
    public bool? Required { get; set; }

    /// <summary>Gets or sets a value indicating whether the element is hidden.</summary>
    [JsonPropertyName("hidden")]
    public bool? Hidden { get; set; }

    /// <summary>Gets or sets additional CSS class names for the element.</summary>
    [JsonPropertyName("className")]
    public string? ClassName { get; set; }

    /// <summary>Gets or sets inline CSS styles applied to the element.</summary>
    [JsonPropertyName("style")]
    public Dictionary<string, object>? Style { get; set; }

    /// <summary>Gets or sets the list of validation rules applied to the element.</summary>
    [JsonPropertyName("validations")]
    public List<ValidationRule>? Validations { get; set; }
}
