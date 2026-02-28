using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Builders;

/// <summary>Provides a fluent builder for constructing <typeparamref name="T"/> element configurations.</summary>
/// <typeparam name="T">The concrete element configuration type to build.</typeparam>
public class ElementBuilder<T> where T : BaseElementConfig, new()
{
    private readonly T _element = new();

    /// <summary>Sets the element identifier.</summary>
    public ElementBuilder<T> WithId(string id) { _element.Id = id; return this; }

    /// <summary>Sets the element name used for form submission.</summary>
    public ElementBuilder<T> WithName(string name) { _element.Name = name; return this; }

    /// <summary>Sets the visible label text.</summary>
    public ElementBuilder<T> WithLabel(string label) { _element.Label = label; return this; }

    /// <summary>Sets the display order of the element.</summary>
    public ElementBuilder<T> WithOrder(int order) { _element.Order = order; return this; }

    /// <summary>Sets whether the element is required.</summary>
    public ElementBuilder<T> WithRequired(bool required = true) { _element.Required = required; return this; }

    /// <summary>Sets whether the element is disabled.</summary>
    public ElementBuilder<T> WithDisabled(bool disabled = true) { _element.Disabled = disabled; return this; }

    /// <summary>Sets whether the element is read-only.</summary>
    public ElementBuilder<T> WithReadonly(bool @readonly = true) { _element.Readonly = @readonly; return this; }

    /// <summary>Sets whether the element is hidden.</summary>
    public ElementBuilder<T> WithHidden(bool hidden = true) { _element.Hidden = hidden; return this; }

    /// <summary>Sets the tooltip text shown on hover.</summary>
    public ElementBuilder<T> WithTooltip(string tooltip) { _element.Tooltip = tooltip; return this; }

    /// <summary>Sets the position of the label relative to the element.</summary>
    public ElementBuilder<T> WithLabelPosition(string position) { _element.LabelPosition = position; return this; }

    /// <summary>Sets additional CSS class names for the element.</summary>
    public ElementBuilder<T> WithClassName(string className) { _element.ClassName = className; return this; }

    /// <summary>Sets the width of the element.</summary>
    public ElementBuilder<T> WithWidth(object width) { _element.Width = width; return this; }

    /// <summary>Adds a validation rule to the element.</summary>
    public ElementBuilder<T> WithValidation(ValidationRule rule) { (_element.Validations ??= []).Add(rule); return this; }

    /// <summary>Applies a custom configuration action to the element.</summary>
    public ElementBuilder<T> Configure(Action<T> configure) { configure(_element); return this; }

    /// <summary>Builds and returns the configured element.</summary>
    public T Build() => _element;
}
