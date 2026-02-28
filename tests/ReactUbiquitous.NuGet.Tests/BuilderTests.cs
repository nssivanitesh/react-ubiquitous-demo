using ReactUbiquitous.NuGet.Builders;
using ReactUbiquitous.NuGet.Models.Elements;
using ReactUbiquitous.NuGet.Models.Sections;
using Xunit;

namespace ReactUbiquitous.NuGet.Tests;

public class BuilderTests
{
    [Fact]
    public void ElementBuilder_BuildsInputElementConfig_Correctly()
    {
        var element = new ElementBuilder<InputElementConfig>()
            .WithId("email-field")
            .WithName("email")
            .WithLabel("Email Address")
            .WithRequired()
            .WithTooltip("Enter your email")
            .Configure(e => { e.InputType = "email"; e.Placeholder = "user@example.com"; })
            .Build();

        Assert.Equal("email-field", element.Id);
        Assert.Equal("email", element.Name);
        Assert.Equal("Email Address", element.Label);
        Assert.True(element.Required);
        Assert.Equal("Enter your email", element.Tooltip);
        Assert.Equal("email", element.InputType);
        Assert.Equal("user@example.com", element.Placeholder);
        Assert.Equal("input", element.Type);
    }

    [Fact]
    public void ElementBuilder_ChainedCalls_Work()
    {
        var element = new ElementBuilder<InputElementConfig>()
            .WithId("a")
            .WithName("b")
            .WithLabel("c")
            .WithOrder(1)
            .WithDisabled()
            .WithHidden()
            .WithClassName("my-class")
            .WithWidth(6)
            .Build();

        Assert.Equal("a", element.Id);
        Assert.Equal("b", element.Name);
        Assert.Equal("c", element.Label);
        Assert.Equal(1, element.Order);
        Assert.True(element.Disabled);
        Assert.True(element.Hidden);
        Assert.Equal("my-class", element.ClassName);
        Assert.Equal(6, element.Width);
    }

    [Fact]
    public void SectionBuilder_BuildsGridSectionConfig_Correctly()
    {
        var input = new ElementBuilder<InputElementConfig>()
            .WithId("f1").WithName("field1").Build();

        var section = new SectionBuilder<GridSectionConfig>()
            .WithId("my-grid")
            .WithTitle("My Grid Section")
            .WithOrder(0)
            .AddElement(input)
            .Configure(s => { s.GridTemplateColumns = "repeat(3, 1fr)"; s.Gap = "16px"; })
            .Build();

        Assert.Equal("my-grid", section.Id);
        Assert.Equal("My Grid Section", section.Title);
        Assert.Equal(0, section.Order);
        Assert.Single(section.Elements!);
        Assert.Equal("repeat(3, 1fr)", section.GridTemplateColumns);
        Assert.Equal("16px", section.Gap);
        Assert.Equal("grid", section.Layout);
    }

    [Fact]
    public void PageBuilder_BuildsUIPageConfig_Correctly()
    {
        var section = new SectionBuilder<FlexSectionConfig>()
            .WithId("s1").WithTitle("Section 1").Build();

        var page = new PageBuilder()
            .WithId("page-1")
            .WithTitle("Page One")
            .WithDescription("First page")
            .WithOrder(0)
            .WithVisible(true)
            .AddSection(section)
            .Build();

        Assert.Equal("page-1", page.Id);
        Assert.Equal("Page One", page.Title);
        Assert.Equal("First page", page.Description);
        Assert.Equal(0, page.Order);
        Assert.True(page.Visible);
        Assert.Single(page.Sections!);
    }

    [Fact]
    public void StageBuilder_BuildsUIStageConfig_Correctly()
    {
        var page = new PageBuilder()
            .WithId("p1").WithTitle("Page 1").WithOrder(0).Build();

        var stage = new StageBuilder()
            .WithId("stage-1")
            .WithTitle("My Stage")
            .WithDescription("Stage description")
            .WithDefaultPageId("p1")
            .AddPage(page)
            .Build();

        Assert.Equal("stage-1", stage.Id);
        Assert.Equal("My Stage", stage.Title);
        Assert.Equal("Stage description", stage.Description);
        Assert.Equal("p1", stage.DefaultPageId);
        Assert.Single(stage.Pages!);
    }

    [Fact]
    public void ElementBuilder_WithValidation_AddsRules()
    {
        var rule = new ValidationRule { Rule = "required", Message = "This field is required" };
        var element = new ElementBuilder<InputElementConfig>()
            .WithId("x").WithName("x")
            .WithValidation(rule)
            .Build();

        Assert.NotNull(element.Validations);
        Assert.Single(element.Validations);
        Assert.Equal("required", element.Validations[0].Rule);
    }
}
