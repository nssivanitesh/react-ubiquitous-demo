using ReactUbiquitous.NuGet.Models;

namespace ReactUbiquitous.NuGet.Builders;

/// <summary>Provides a fluent builder for constructing <see cref="UIStageConfig"/> instances.</summary>
public class StageBuilder
{
    private readonly UIStageConfig _stage = new();

    /// <summary>Sets the unique stage identifier.</summary>
    public StageBuilder WithId(string id) { _stage.Id = id; return this; }

    /// <summary>Sets the stage title.</summary>
    public StageBuilder WithTitle(string title) { _stage.Title = title; return this; }

    /// <summary>Sets the stage description.</summary>
    public StageBuilder WithDescription(string description) { _stage.Description = description; return this; }

    /// <summary>Sets the identifier of the default page to display.</summary>
    public StageBuilder WithDefaultPageId(string pageId) { _stage.DefaultPageId = pageId; return this; }

    /// <summary>Sets the visual theme for the stage.</summary>
    public StageBuilder WithTheme(string theme) { _stage.Theme = theme; return this; }

    /// <summary>Sets additional CSS class names for the stage.</summary>
    public StageBuilder WithClassName(string className) { _stage.ClassName = className; return this; }

    /// <summary>Sets the page transition animation style.</summary>
    public StageBuilder WithPageTransition(string transition) { _stage.PageTransition = transition; return this; }

    /// <summary>Adds a page to the stage.</summary>
    public StageBuilder AddPage(UIPageConfig page) { (_stage.Pages ??= []).Add(page); return this; }

    /// <summary>Builds and returns the configured stage.</summary>
    public UIStageConfig Build() => _stage;
}
