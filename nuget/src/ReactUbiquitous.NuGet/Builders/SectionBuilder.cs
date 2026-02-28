using ReactUbiquitous.NuGet.Models.Elements;
using ReactUbiquitous.NuGet.Models.Sections;

namespace ReactUbiquitous.NuGet.Builders;

/// <summary>Provides a fluent builder for constructing <typeparamref name="T"/> section configurations.</summary>
/// <typeparam name="T">The concrete section configuration type to build.</typeparam>
public class SectionBuilder<T> where T : BaseSectionConfig, new()
{
    private readonly T _section = new();

    /// <summary>Sets the unique section identifier.</summary>
    public SectionBuilder<T> WithId(string id) { _section.Id = id; return this; }

    /// <summary>Sets the section title.</summary>
    public SectionBuilder<T> WithTitle(string title) { _section.Title = title; return this; }

    /// <summary>Sets the display order of the section.</summary>
    public SectionBuilder<T> WithOrder(int order) { _section.Order = order; return this; }

    /// <summary>Sets additional CSS class names for the section.</summary>
    public SectionBuilder<T> WithClassName(string className) { _section.ClassName = className; return this; }

    /// <summary>Adds an element to the section.</summary>
    public SectionBuilder<T> AddElement(BaseElementConfig element) { (_section.Elements ??= []).Add(element); return this; }

    /// <summary>Applies a custom configuration action to the section.</summary>
    public SectionBuilder<T> Configure(Action<T> configure) { configure(_section); return this; }

    /// <summary>Builds and returns the configured section.</summary>
    public T Build() => _section;
}
