using System.Text.Json;
using ReactUbiquitous.NuGet.Builders;
using ReactUbiquitous.NuGet.Models;
using ReactUbiquitous.NuGet.Models.Elements;
using ReactUbiquitous.NuGet.Models.Sections;
using Xunit;

namespace ReactUbiquitous.NuGet.Tests;

public class SerializationTests
{
    private static readonly JsonSerializerOptions Options = new() { WriteIndented = false };

    [Fact]
    public void UIStageConfig_SerializesToValidJson_WithCorrectFieldNames()
    {
        var stage = new StageBuilder()
            .WithId("stage-1")
            .WithTitle("My Stage")
            .Build();

        var json = JsonSerializer.Serialize(stage, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("stage-1", root.GetProperty("id").GetString());
        Assert.Equal("My Stage", root.GetProperty("title").GetString());
    }

    [Fact]
    public void BaseSectionConfig_PolymorphicDeserialization_ByLayoutField()
    {
        var json = """{"layout":"grid","id":"g1","gridTemplateColumns":"1fr 1fr"}""";
        var section = JsonSerializer.Deserialize<BaseSectionConfig>(json, Options);

        Assert.NotNull(section);
        Assert.IsType<GridSectionConfig>(section);
        var grid = (GridSectionConfig)section;
        Assert.Equal("g1", grid.Id);
        Assert.Equal("1fr 1fr", grid.GridTemplateColumns);
    }

    [Fact]
    public void BaseElementConfig_PolymorphicDeserialization_ByTypeField()
    {
        var json = """{"type":"input","id":"e1","name":"myField","inputType":"email"}""";
        var element = JsonSerializer.Deserialize<BaseElementConfig>(json, Options);

        Assert.NotNull(element);
        Assert.IsType<InputElementConfig>(element);
        var input = (InputElementConfig)element;
        Assert.Equal("e1", input.Id);
        Assert.Equal("email", input.InputType);
    }

    [Fact]
    public void FlexSection_SerializesWithLayoutField()
    {
        var section = new SectionBuilder<FlexSectionConfig>()
            .WithId("flex-1")
            .Configure(s => { s.FlexDirection = "row"; s.Gap = "8px"; })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("flex", root.GetProperty("layout").GetString());
        Assert.Equal("row", root.GetProperty("flexDirection").GetString());
        Assert.Equal("8px", root.GetProperty("gap").GetString());
    }

    [Fact]
    public void FullComplexExample_SerializesAndDeserializesCorrectly()
    {
        var emailInput = new ElementBuilder<InputElementConfig>()
            .WithId("email").WithName("email").WithLabel("Email")
            .WithRequired()
            .Configure(e => { e.InputType = "email"; e.Placeholder = "Enter email"; })
            .Build();

        var section = new SectionBuilder<GridSectionConfig>()
            .WithId("form-section").WithTitle("Form")
            .AddElement(emailInput)
            .Configure(s => s.GridTemplateColumns = "1fr 1fr")
            .Build();

        var page = new PageBuilder()
            .WithId("form-page").WithTitle("Form Page").WithOrder(0)
            .AddSection(section)
            .Build();

        var stage = new StageBuilder()
            .WithId("my-stage").WithTitle("My App")
            .WithDefaultPageId("form-page")
            .AddPage(page)
            .Build();

        var json = JsonSerializer.Serialize(stage, Options);
        var deserialized = JsonSerializer.Deserialize<UIStageConfig>(json, Options);

        Assert.NotNull(deserialized);
        Assert.Equal("my-stage", deserialized.Id);
        Assert.Single(deserialized.Pages!);

        var deserializedPage = deserialized.Pages![0];
        Assert.Single(deserializedPage.Sections!);

        var deserializedSection = deserializedPage.Sections![0];
        Assert.IsType<GridSectionConfig>(deserializedSection);
        Assert.Single(deserializedSection.Elements!);

        var deserializedElement = deserializedSection.Elements![0];
        Assert.IsType<InputElementConfig>(deserializedElement);
        Assert.Equal("email", deserializedElement.Id);
        Assert.True(deserializedElement.Required);
    }

    [Fact]
    public void CheckboxElement_SerializesAndDeserializesCorrectly()
    {
        var checkbox = new ElementBuilder<CheckboxElementConfig>()
            .WithId("agree").WithName("agree").WithLabel("I agree")
            .Configure(e => { e.DefaultChecked = false; e.Value = "yes"; })
            .Build();

        var json = JsonSerializer.Serialize<BaseElementConfig>(checkbox, Options);
        var deserialized = JsonSerializer.Deserialize<BaseElementConfig>(json, Options);

        Assert.IsType<CheckboxElementConfig>(deserialized);
        var cb = (CheckboxElementConfig)deserialized;
        Assert.Equal("agree", cb.Id);
        Assert.Equal("yes", cb.Value);
    }

    [Fact]
    public void SelectElement_SerializesCorrectly()
    {
        var select = new ElementBuilder<SelectElementConfig>()
            .WithId("color").WithName("color").WithLabel("Color")
            .Configure(e =>
            {
                e.Options =
                [
                    new SelectOption { Label = "Red", Value = "red" },
                    new SelectOption { Label = "Blue", Value = "blue" }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseElementConfig>(select, Options);
        using var doc = JsonDocument.Parse(json);
        Assert.Equal("select", doc.RootElement.GetProperty("type").GetString());
    }

    [Fact]
    public void UIStageConfig_Theme_PageTransition_ClassName_SerializeCorrectly()
    {
        var stage = new StageBuilder()
            .WithId("themed-stage")
            .WithTitle("Themed")
            .WithTheme("dark")
            .WithClassName("custom-class")
            .WithPageTransition("fade")
            .Build();

        var json = JsonSerializer.Serialize(stage, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("dark", root.GetProperty("theme").GetString());
        Assert.Equal("custom-class", root.GetProperty("className").GetString());
        Assert.Equal("fade", root.GetProperty("pageTransition").GetString());
    }

    [Fact]
    public void TreeViewSectionConfig_SerializesAndDeserializesCorrectly()
    {
        var section = new SectionBuilder<TreeViewSectionConfig>()
            .WithId("org-tree")
            .WithTitle("Organization")
            .Configure(s =>
            {
                s.TreeTitle = "Organization";
                s.TreeWidth = "260px";
                s.TreeMode = "easy";
                s.TreeNodes =
                [
                    new TreeViewNode
                    {
                        Id = "dept-eng",
                        Label = "Engineering",
                        Badge = "12",
                        Children =
                        [
                            new TreeViewNode { Id = "team-fe", Label = "Frontend", Sublabel = "4 members" }
                        ]
                    }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("tree-view", root.GetProperty("layout").GetString());
        Assert.Equal("Organization", root.GetProperty("treeTitle").GetString());
        Assert.Equal("260px", root.GetProperty("treeWidth").GetString());

        var deserialized = JsonSerializer.Deserialize<BaseSectionConfig>(json, Options);
        Assert.IsType<TreeViewSectionConfig>(deserialized);
        var tv = (TreeViewSectionConfig)deserialized!;
        Assert.Single(tv.TreeNodes!);
        Assert.Equal("dept-eng", tv.TreeNodes![0].Id);
    }

    [Fact]
    public void ChatSectionConfig_SerializesAndDeserializesCorrectly()
    {
        var section = new SectionBuilder<ChatSectionConfig>()
            .WithId("support-chat")
            .Configure(s =>
            {
                s.ListTitle = "Conversations";
                s.CurrentUserName = "Support Agent";
                s.Conversations =
                [
                    new ChatConversation
                    {
                        Id = "conv-1",
                        Label = "Alice Smith",
                        Avatar = "AS",
                        Messages =
                        [
                            new ChatMessage
                            {
                                Id = "m1",
                                Text = "Hello!",
                                Sender = "Alice Smith",
                                Role = "other",
                                Timestamp = "2025-01-15T10:30:00Z"
                            }
                        ]
                    }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("chat", root.GetProperty("layout").GetString());
        Assert.Equal("Support Agent", root.GetProperty("currentUserName").GetString());

        var deserialized = JsonSerializer.Deserialize<BaseSectionConfig>(json, Options);
        Assert.IsType<ChatSectionConfig>(deserialized);
        var chat = (ChatSectionConfig)deserialized!;
        Assert.Single(chat.Conversations!);
        Assert.Equal("Alice Smith", chat.Conversations![0].Label);
    }

    [Fact]
    public void CustomElementConfig_SerializesAndDeserializesCorrectly()
    {
        var custom = new ElementBuilder<CustomElementConfig>()
            .WithId("map-picker")
            .WithName("location")
            .WithLabel("Pick a location")
            .Configure(e =>
            {
                e.Component = "map-picker";
                e.Props = new Dictionary<string, object>
                {
                    ["defaultLat"] = 51.5074,
                    ["zoom"] = 12
                };
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseElementConfig>(custom, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("custom", root.GetProperty("type").GetString());
        Assert.Equal("map-picker", root.GetProperty("component").GetString());

        var deserialized = JsonSerializer.Deserialize<BaseElementConfig>(json, Options);
        Assert.IsType<CustomElementConfig>(deserialized);
        var c = (CustomElementConfig)deserialized!;
        Assert.Equal("map-picker", c.Component);
    }

    [Fact]
    public void ListDetailItem_Avatar_SerializesCorrectly()
    {
        var item = new ListDetailItem
        {
            Id = "c1",
            Label = "Alice Smith",
            Avatar = "AS",
            Badge = "Admin"
        };

        var json = JsonSerializer.Serialize(item, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("AS", root.GetProperty("avatar").GetString());
        Assert.Equal("Admin", root.GetProperty("badge").GetString());
    }

    [Fact]
    public void AlertSectionConfig_Dismissible_SerializesCorrectly()
    {
        var section = new SectionBuilder<AlertSectionConfig>()
            .WithId("a1")
            .Configure(s => { s.Severity = "success"; s.Dismissible = true; })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("alert", root.GetProperty("layout").GetString());
        Assert.True(root.GetProperty("dismissible").GetBoolean());
        Assert.False(root.TryGetProperty("closable", out _));
    }

    [Fact]
    public void SkeletonSectionConfig_Shape_Lines_SerializeCorrectly()
    {
        var section = new SectionBuilder<SkeletonSectionConfig>()
            .WithId("sk1")
            .Configure(s => { s.Shape = "rect"; s.Lines = 3; })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("skeleton", root.GetProperty("layout").GetString());
        Assert.Equal("rect", root.GetProperty("shape").GetString());
        Assert.Equal(3, root.GetProperty("lines").GetInt32());
        Assert.False(root.TryGetProperty("variant", out _));
        Assert.False(root.TryGetProperty("count", out _));
    }

    [Fact]
    public void PaginationSectionConfig_TotalItems_SerializesCorrectly()
    {
        var section = new SectionBuilder<PaginationSectionConfig>()
            .WithId("pag1")
            .Configure(s => { s.TotalItems = 500; s.PageSize = 25; s.CurrentPage = 1; })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("pagination", root.GetProperty("layout").GetString());
        Assert.Equal(500, root.GetProperty("totalItems").GetInt32());
        Assert.False(root.TryGetProperty("totalPages", out _));
    }

    [Fact]
    public void BreadcrumbItem_Href_SerializesCorrectly()
    {
        var section = new SectionBuilder<BreadcrumbsSectionConfig>()
            .WithId("bc1")
            .Configure(s =>
            {
                s.Items =
                [
                    new BreadcrumbItem { Id = "home", Label = "Home", Href = "/" },
                    new BreadcrumbItem { Id = "detail", Label = "Detail" }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("breadcrumbs", root.GetProperty("layout").GetString());
        var item = root.GetProperty("items")[0];
        Assert.Equal("home", item.GetProperty("id").GetString());
        Assert.Equal("/", item.GetProperty("href").GetString());
        Assert.False(item.TryGetProperty("url", out _));
    }

    [Fact]
    public void StepperSectionConfig_CurrentStep_SerializesCorrectly()
    {
        var section = new SectionBuilder<StepperSectionConfig>()
            .WithId("st1")
            .Configure(s => { s.CurrentStep = 1; s.Steps = [new StepItem { Id = "s1", Label = "Step 1" }]; })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("stepper", root.GetProperty("layout").GetString());
        Assert.Equal(1, root.GetProperty("currentStep").GetInt32());
        Assert.False(root.TryGetProperty("activeStep", out _));
    }

    [Fact]
    public void SidebarSectionConfig_Items_Href_SerializeCorrectly()
    {
        var section = new SectionBuilder<SidebarSectionConfig>()
            .WithId("sb1")
            .Configure(s =>
            {
                s.Items =
                [
                    new SidebarItem { Id = "dashboard", Label = "Dashboard", Href = "/dashboard", Active = true },
                    new SidebarItem
                    {
                        Id = "settings", Label = "Settings",
                        Children = [new SidebarItem { Id = "profile", Label = "Profile", Href = "/settings/profile" }]
                    }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("sidebar", root.GetProperty("layout").GetString());
        var items = root.GetProperty("items");
        Assert.Equal("/dashboard", items[0].GetProperty("href").GetString());
        Assert.True(items[0].GetProperty("active").GetBoolean());
        Assert.False(items[0].TryGetProperty("url", out _));
        Assert.False(root.TryGetProperty("links", out _));
    }

    [Fact]
    public void TimelineSectionConfig_Events_Title_Timestamp_SerializeCorrectly()
    {
        var section = new SectionBuilder<TimelineSectionConfig>()
            .WithId("tl1")
            .Configure(s =>
            {
                s.Events =
                [
                    new TimelineEvent { Id = "e1", Title = "Launched", Timestamp = "Jan 2025", Variant = "success" }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("timeline", root.GetProperty("layout").GetString());
        var ev = root.GetProperty("events")[0];
        Assert.Equal("Launched", ev.GetProperty("title").GetString());
        Assert.Equal("Jan 2025", ev.GetProperty("timestamp").GetString());
        Assert.False(ev.TryGetProperty("label", out _));
        Assert.False(ev.TryGetProperty("date", out _));
        Assert.False(root.TryGetProperty("items", out _));
    }

    [Fact]
    public void StatSectionConfig_Stats_Collection_SerializesCorrectly()
    {
        var section = new SectionBuilder<StatSectionConfig>()
            .WithId("stat1")
            .Configure(s =>
            {
                s.Stats =
                [
                    new StatItem { Id = "s1", Label = "Total Users", Value = "1,234", TrendDirection = "up", Trend = "+12%" }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("stat", root.GetProperty("layout").GetString());
        var stat = root.GetProperty("stats")[0];
        Assert.Equal("Total Users", stat.GetProperty("label").GetString());
        Assert.Equal("up", stat.GetProperty("trendDirection").GetString());
        Assert.False(stat.TryGetProperty("trendValue", out _));
    }

    [Fact]
    public void BadgeSectionConfig_Badges_Collection_SerializesCorrectly()
    {
        var section = new SectionBuilder<BadgeSectionConfig>()
            .WithId("b1")
            .Configure(s =>
            {
                s.Badges =
                [
                    new BadgeItem { Id = "ts", Label = "TypeScript", Variant = "primary" }
                ];
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("badge", root.GetProperty("layout").GetString());
        var badge = root.GetProperty("badges")[0];
        Assert.Equal("TypeScript", badge.GetProperty("label").GetString());
        Assert.False(badge.TryGetProperty("content", out _));
        Assert.False(root.TryGetProperty("content", out _));
    }

    [Fact]
    public void ChartSectionConfig_EmitsLayoutChart_AndChartType()
    {
        var section = new SectionBuilder<BarChartSectionConfig>()
            .WithId("chart1")
            .Configure(s =>
            {
                s.Data =
                [
                    new ChartDataPoint { Label = "Jan", Value = 12000 },
                    new ChartDataPoint { Label = "Feb", Value = 15000 }
                ];
                s.Series =
                [
                    new ChartSeries { Key = "value", Label = "Revenue", Color = "#6366f1" }
                ];
                s.Horizontal = false;
            })
            .Build();

        var json = JsonSerializer.Serialize<BaseSectionConfig>(section, Options);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("chart", root.GetProperty("layout").GetString());
        Assert.Equal("bar", root.GetProperty("chartType").GetString());
        var dp = root.GetProperty("data")[0];
        Assert.Equal("Jan", dp.GetProperty("label").GetString());
        Assert.Equal(12000, dp.GetProperty("value").GetDouble());
        var series = root.GetProperty("series")[0];
        Assert.Equal("value", series.GetProperty("key").GetString());
        Assert.Equal("Revenue", series.GetProperty("label").GetString());
        Assert.False(root.TryGetProperty("categories", out _));
    }

    [Fact]
    public void AllChartTypes_EmitLayoutChart_WithCorrectChartType()
    {
        BaseSectionConfig[] charts =
        [
            new LineChartSectionConfig(),
            new AreaChartSectionConfig(),
            new BarChartSectionConfig(),
            new PieChartSectionConfig(),
            new DonutChartSectionConfig(),
            new RadarChartSectionConfig(),
            new ScatterChartSectionConfig()
        ];
        string[] expectedTypes = ["line", "area", "bar", "pie", "donut", "radar", "scatter"];

        for (int i = 0; i < charts.Length; i++)
        {
            var json = JsonSerializer.Serialize(charts[i], Options);
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;
            Assert.Equal("chart", root.GetProperty("layout").GetString());
            Assert.Equal(expectedTypes[i], root.GetProperty("chartType").GetString());
        }
    }

    [Fact]
    public void ChartSectionConfig_Deserialization_ByLayoutChart()
    {
        var json = """{"layout":"chart","id":"c1","chartType":"line","showLegend":true}""";
        var section = JsonSerializer.Deserialize<BaseSectionConfig>(json, Options);

        Assert.NotNull(section);
        Assert.IsType<ChartSectionConfig>(section);
        var chart = (ChartSectionConfig)section;
        Assert.Equal("c1", chart.Id);
        Assert.Equal("line", chart.ChartType);
        Assert.True(chart.ShowLegend);
    }
}
