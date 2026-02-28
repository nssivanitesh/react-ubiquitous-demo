using System.Text.Json.Serialization;
using ReactUbiquitous.NuGet.Models.Elements;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Base configuration for all UI sections, providing common layout and content properties.</summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "layout", UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FallBackToNearestAncestor)]
[JsonDerivedType(typeof(FlexSectionConfig), "flex")]
[JsonDerivedType(typeof(GridSectionConfig), "grid")]
[JsonDerivedType(typeof(HeroSectionConfig), "hero")]
[JsonDerivedType(typeof(MediaSectionConfig), "media")]
[JsonDerivedType(typeof(ListDetailSectionConfig), "list-detail")]
[JsonDerivedType(typeof(TreeViewSectionConfig), "tree-view")]
[JsonDerivedType(typeof(ChatSectionConfig), "chat")]
[JsonDerivedType(typeof(AccordionSectionConfig), "accordion")]
[JsonDerivedType(typeof(CollapseSectionConfig), "collapse")]
[JsonDerivedType(typeof(DividerSectionConfig), "divider")]
[JsonDerivedType(typeof(CardSectionConfig), "card")]
// Charts
[JsonDerivedType(typeof(ChartSectionConfig), "chart")]
// Navigation
[JsonDerivedType(typeof(NavbarSectionConfig), "navbar")]
[JsonDerivedType(typeof(SidebarSectionConfig), "sidebar")]
[JsonDerivedType(typeof(BreadcrumbsSectionConfig), "breadcrumbs")]
[JsonDerivedType(typeof(PaginationSectionConfig), "pagination")]
[JsonDerivedType(typeof(StepperSectionConfig), "stepper")]
[JsonDerivedType(typeof(TabsSectionConfig), "tabs")]
// Feedback
[JsonDerivedType(typeof(AlertSectionConfig), "alert")]
[JsonDerivedType(typeof(ProgressSectionConfig), "progress")]
[JsonDerivedType(typeof(SkeletonSectionConfig), "skeleton")]
[JsonDerivedType(typeof(ToastSectionConfig), "toast")]
// Overlays
[JsonDerivedType(typeof(ModalSectionConfig), "modal")]
[JsonDerivedType(typeof(DrawerSectionConfig), "drawer")]
[JsonDerivedType(typeof(TooltipSectionConfig), "tooltip")]
[JsonDerivedType(typeof(PopoverSectionConfig), "popover")]
// Data Display
[JsonDerivedType(typeof(TableSectionConfig), "table")]
[JsonDerivedType(typeof(BadgeSectionConfig), "badge")]
[JsonDerivedType(typeof(AvatarSectionConfig), "avatar")]
[JsonDerivedType(typeof(TimelineSectionConfig), "timeline")]
[JsonDerivedType(typeof(StatSectionConfig), "stat")]
[JsonDerivedType(typeof(EmptyStateSectionConfig), "empty-state")]
[JsonDerivedType(typeof(CodeBlockSectionConfig), "code-block")]
[JsonDerivedType(typeof(IframeSectionConfig), "iframe")]
public abstract class BaseSectionConfig
{
    /// <summary>Gets or sets the unique section identifier.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the layout type discriminator (not serialized).</summary>
    [JsonIgnore]
    public string Layout { get; set; } = string.Empty;

    /// <summary>Gets or sets the section title.</summary>
    [JsonPropertyName("title")]
    public string? Title { get; set; }

    /// <summary>Gets or sets the section description.</summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    /// <summary>Gets or sets the display order of the section.</summary>
    [JsonPropertyName("order")]
    public int? Order { get; set; }

    /// <summary>Gets or sets additional CSS class names for the section.</summary>
    [JsonPropertyName("className")]
    public string? ClassName { get; set; }

    /// <summary>Gets or sets inline CSS styles applied to the section.</summary>
    [JsonPropertyName("style")]
    public Dictionary<string, object>? Style { get; set; }

    /// <summary>Gets or sets the list of elements contained in the section.</summary>
    [JsonPropertyName("elements")]
    public List<BaseElementConfig>? Elements { get; set; }
}
