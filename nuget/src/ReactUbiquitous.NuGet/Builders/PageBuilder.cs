using ReactUbiquitous.NuGet.Models;
using ReactUbiquitous.NuGet.Models.Sections;

namespace ReactUbiquitous.NuGet.Builders;

/// <summary>Provides a fluent builder for constructing <see cref="UIPageConfig"/> instances.</summary>
public class PageBuilder
{
    private readonly UIPageConfig _page = new();

    /// <summary>Sets the unique page identifier.</summary>
    public PageBuilder WithId(string id) { _page.Id = id; return this; }

    /// <summary>Sets the page title.</summary>
    public PageBuilder WithTitle(string title) { _page.Title = title; return this; }

    /// <summary>Sets the page description.</summary>
    public PageBuilder WithDescription(string description) { _page.Description = description; return this; }

    /// <summary>Sets the icon associated with the page.</summary>
    public PageBuilder WithIcon(string icon) { _page.Icon = icon; return this; }

    /// <summary>Sets the display order of the page.</summary>
    public PageBuilder WithOrder(int order) { _page.Order = order; return this; }

    /// <summary>Sets additional CSS class names for the page.</summary>
    public PageBuilder WithClassName(string className) { _page.ClassName = className; return this; }

    /// <summary>Sets whether the page is visible.</summary>
    public PageBuilder WithVisible(bool visible) { _page.Visible = visible; return this; }

    /// <summary>Adds a section to the page.</summary>
    public PageBuilder AddSection(BaseSectionConfig section) { (_page.Sections ??= []).Add(section); return this; }

    /// <summary>Builds and returns the configured page.</summary>
    public UIPageConfig Build() => _page;
}
