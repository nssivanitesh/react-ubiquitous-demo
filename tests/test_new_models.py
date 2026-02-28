"""Tests for new element types, section types, UIStageConfig fields, and Flask integration."""
import pytest
from pydantic import ValidationError

from react_ubiquitous_put.models import (
    DatePickerElementConfig,
    MultiSelectElementConfig,
    AutocompleteElementConfig,
    FileUploadElementConfig,
    ColorPickerElementConfig,
    RangeSliderElementConfig,
    RatingElementConfig,
    OtpInputElementConfig,
    PhoneInputElementConfig,
    CustomElementConfig,
    SelectOption,
    TreeViewNode,
    TreeViewSectionConfig,
    ChatMessage,
    ChatConversation,
    ChatSectionConfig,
    NavLink,
    NavbarSectionConfig,
    SidebarItem,
    SidebarSectionConfig,
    BreadcrumbItem,
    BreadcrumbsSectionConfig,
    PaginationSectionConfig,
    StepperStep,
    StepperSectionConfig,
    TabItem,
    TabsSectionConfig,
    AlertSectionConfig,
    ProgressSectionConfig,
    SkeletonSectionConfig,
    ToastSectionConfig,
    ModalSectionConfig,
    DrawerSectionConfig,
    TooltipSectionConfig,
    PopoverSectionConfig,
    TableColumn,
    TableSectionConfig,
    BadgeItem,
    BadgeSectionConfig,
    AvatarItem,
    AvatarSectionConfig,
    TimelineEvent,
    TimelineSectionConfig,
    StatItem,
    StatSectionConfig,
    EmptyStateSectionConfig,
    CodeBlockSectionConfig,
    ChartSeries,
    ChartSectionConfig,
    IframeSectionConfig,
    GridSectionConfig,
    UIPageConfig,
    UIStageConfig,
)


# ---------------------------------------------------------------------------
# New element types
# ---------------------------------------------------------------------------

class TestDatePickerElementConfig:
    def test_basic(self):
        el = DatePickerElementConfig(id="dp1", name="dob", default_value="2024-01-01")
        assert el.type == "datepicker"
        assert el.default_value == "2024-01-01"

    def test_include_time(self):
        el = DatePickerElementConfig(id="dp2", name="dt", include_time=True, min="2024-01-01", max="2025-12-31")
        assert el.include_time is True


class TestMultiSelectElementConfig:
    def test_basic(self):
        opts = [SelectOption(label="A", value="a"), SelectOption(label="B", value="b")]
        el = MultiSelectElementConfig(id="ms1", name="tags", options=opts, default_value=["a"])
        assert el.type == "multiselect"
        assert len(el.options) == 2
        assert el.default_value == ["a"]

    def test_max_items(self):
        el = MultiSelectElementConfig(id="ms2", name="skills", max_items=3)
        assert el.max_items == 3

    def test_camel_case_output(self):
        el = MultiSelectElementConfig(id="ms3", name="x", max_items=5)
        out = el.model_dump(by_alias=True, exclude_none=True)
        assert out["maxItems"] == 5


class TestAutocompleteElementConfig:
    def test_basic(self):
        opts = [SelectOption(label="Paris", value="paris")]
        el = AutocompleteElementConfig(id="ac1", name="city", options=opts, placeholder="Search…")
        assert el.type == "autocomplete"
        assert el.placeholder == "Search…"


class TestFileUploadElementConfig:
    def test_basic(self):
        el = FileUploadElementConfig(id="fu1", name="avatar", accept="image/*", multiple=False, max_size=2097152)
        assert el.type == "fileupload"
        assert el.accept == "image/*"
        assert el.max_size == 2097152

    def test_camel_case_output(self):
        el = FileUploadElementConfig(id="fu2", name="doc", max_size=1024)
        out = el.model_dump(by_alias=True, exclude_none=True)
        assert out["maxSize"] == 1024


class TestColorPickerElementConfig:
    def test_basic(self):
        el = ColorPickerElementConfig(id="cp1", name="color", default_value="#ff0000", format="hex")
        assert el.type == "colorpicker"
        assert el.format == "hex"


class TestRangeSliderElementConfig:
    def test_basic(self):
        el = RangeSliderElementConfig(id="rs1", name="price", min=0, max=1000, step=10, default_value=(100, 500))
        assert el.type == "rangeslider"
        assert el.default_value == (100, 500)

    def test_camel_case_output(self):
        el = RangeSliderElementConfig(id="rs2", name="r", default_value=(10.0, 90.0))
        out = el.model_dump(by_alias=True, exclude_none=True)
        assert list(out["defaultValue"]) == [10.0, 90.0]


class TestRatingElementConfig:
    def test_basic(self):
        el = RatingElementConfig(id="rt1", name="rating", max=5, default_value=4.0, allow_half=True)
        assert el.type == "rating"
        assert el.allow_half is True

    def test_camel_case_output(self):
        el = RatingElementConfig(id="rt2", name="r", allow_half=True, default_value=3.5)
        out = el.model_dump(by_alias=True, exclude_none=True)
        assert out["allowHalf"] is True
        assert out["defaultValue"] == 3.5


class TestOtpInputElementConfig:
    def test_basic(self):
        el = OtpInputElementConfig(id="otp1", name="code", length=6, mask=True)
        assert el.type == "otpinput"
        assert el.length == 6
        assert el.mask is True


class TestPhoneInputElementConfig:
    def test_basic(self):
        el = PhoneInputElementConfig(id="ph1", name="phone", default_country="US", placeholder="+1")
        assert el.type == "phoneinput"
        assert el.default_country == "US"

    def test_camel_case_output(self):
        el = PhoneInputElementConfig(id="ph2", name="p", default_country="GB")
        out = el.model_dump(by_alias=True, exclude_none=True)
        assert out["defaultCountry"] == "GB"


class TestCustomElementConfig:
    def test_basic(self):
        el = CustomElementConfig(id="cu1", name="widget", component="MyWidget", props={"foo": "bar"})
        assert el.type == "custom"
        assert el.component == "MyWidget"
        assert el.props == {"foo": "bar"}


# ---------------------------------------------------------------------------
# New section types
# ---------------------------------------------------------------------------

class TestTreeViewSectionConfig:
    def test_basic(self):
        node = TreeViewNode(id="n1", label="Root", children=[TreeViewNode(id="n2", label="Child")])
        s = TreeViewSectionConfig(id="tv1", tree_title="Org", tree_nodes=[node])
        assert s.layout == "tree-view"
        assert s.tree_nodes[0].label == "Root"
        assert len(s.tree_nodes[0].children) == 1

    def test_camel_case_output(self):
        s = TreeViewSectionConfig(id="tv2", tree_width="300px", tree_mode="compact")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["treeWidth"] == "300px"
        assert out["treeMode"] == "compact"


class TestChatSectionConfig:
    def test_basic(self):
        msg = ChatMessage(id="m1", text="Hello", sender="Alice", role="other")
        conv = ChatConversation(id="c1", label="Alice", messages=[msg])
        s = ChatSectionConfig(id="chat1", conversations=[conv], current_user_name="Agent")
        assert s.layout == "chat"
        assert s.conversations[0].messages[0].text == "Hello"

    def test_camel_case_output(self):
        s = ChatSectionConfig(id="chat2", list_width="280px", input_placeholder="Type…", send_button_text="Send")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["listWidth"] == "280px"
        assert out["inputPlaceholder"] == "Type…"
        assert out["sendButtonText"] == "Send"


class TestNavbarSectionConfig:
    def test_basic(self):
        links = [NavLink(id="home", label="Home", href="/"), NavLink(id="about", label="About", active=True)]
        s = NavbarSectionConfig(id="nav1", logo_text="MyApp", links=links, position="sticky")
        assert s.layout == "navbar"
        assert s.logo_text == "MyApp"
        assert s.links[1].active is True

    def test_camel_case_output(self):
        s = NavbarSectionConfig(id="nav2", logo_url="https://example.com/logo.png")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["logoUrl"] == "https://example.com/logo.png"


class TestSidebarSectionConfig:
    def test_basic(self):
        child = SidebarItem(id="profile", label="Profile", href="/settings/profile")
        item = SidebarItem(id="settings", label="Settings", icon="settings", children=[child])
        s = SidebarSectionConfig(id="sidebar1", items=[item], collapsible=True, width="260px")
        assert s.layout == "sidebar"
        assert s.items[0].children[0].label == "Profile"

    def test_camel_case_output(self):
        s = SidebarSectionConfig(id="sb2", default_collapsed=True)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["defaultCollapsed"] is True


class TestBreadcrumbsSectionConfig:
    def test_basic(self):
        items = [
            BreadcrumbItem(id="home", label="Home", href="/"),
            BreadcrumbItem(id="products", label="Products", href="/products"),
            BreadcrumbItem(id="detail", label="Widget Pro"),
        ]
        s = BreadcrumbsSectionConfig(id="bc1", items=items, separator="/")
        assert s.layout == "breadcrumbs"
        assert len(s.items) == 3
        assert s.items[2].href is None


class TestPaginationSectionConfig:
    def test_basic(self):
        s = PaginationSectionConfig(id="pg1", total_items=500, page_size=25, current_page=1, show_first_last=True)
        assert s.layout == "pagination"
        assert s.total_items == 500

    def test_camel_case_output(self):
        s = PaginationSectionConfig(id="pg2", total_items=100, page_size=10, show_prev_next=True, max_page_buttons=7)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["totalItems"] == 100
        assert out["pageSize"] == 10
        assert out["showPrevNext"] is True
        assert out["maxPageButtons"] == 7


class TestStepperSectionConfig:
    def test_basic(self):
        steps = [
            StepperStep(id="s1", label="Account", description="Create account"),
            StepperStep(id="s2", label="Profile", status="current"),
        ]
        s = StepperSectionConfig(id="stepper1", steps=steps, current_step=1, orientation="horizontal")
        assert s.layout == "stepper"
        assert s.steps[1].status == "current"

    def test_camel_case_output(self):
        s = StepperSectionConfig(id="stepper2", total_items=0, current_step=0)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["currentStep"] == 0


class TestTabsSectionConfig:
    def test_basic(self):
        tab = TabItem(id="tab1", label="Overview")
        s = TabsSectionConfig(id="tabs1", tabs=[tab], default_tab_id="tab1")
        assert s.layout == "tabs"
        assert s.default_tab_id == "tab1"

    def test_with_nested_section(self):
        inner = GridSectionConfig(id="inner1")
        tab = TabItem(id="tab2", label="Details", sections=[inner])
        s = TabsSectionConfig(id="tabs2", tabs=[tab])
        assert s.tabs[0].sections[0].layout == "grid"

    def test_camel_case_output(self):
        s = TabsSectionConfig(id="tabs3", default_tab_id="overview")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["defaultTabId"] == "overview"


class TestAlertSectionConfig:
    def test_basic(self):
        s = AlertSectionConfig(id="alert1", title="Saved", severity="success", dismissible=True, icon=True)
        assert s.layout == "alert"
        assert s.severity == "success"
        assert s.dismissible is True


class TestProgressSectionConfig:
    def test_basic(self):
        s = ProgressSectionConfig(id="prog1", variant="circular", value=75, show_label=True, indeterminate=False)
        assert s.layout == "progress"
        assert s.value == 75

    def test_camel_case_output(self):
        s = ProgressSectionConfig(id="prog2", show_label=True, indeterminate=True)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["showLabel"] is True
        assert out["indeterminate"] is True


class TestSkeletonSectionConfig:
    def test_basic(self):
        s = SkeletonSectionConfig(id="sk1", shape="rect", lines=3, avatar=True, width="100%", height="120px")
        assert s.layout == "skeleton"
        assert s.shape == "rect"
        assert s.avatar is True


class TestToastSectionConfig:
    def test_basic(self):
        s = ToastSectionConfig(id="toast1", message="Saved!", severity="success", duration=4000, position="bottom-right", visible=True)
        assert s.layout == "toast"
        assert s.duration == 4000


class TestModalSectionConfig:
    def test_basic(self):
        s = ModalSectionConfig(id="modal1", title="Confirm", open=False, size="sm", close_on_backdrop=True, confirm_label="Delete", cancel_label="Cancel")
        assert s.layout == "modal"
        assert s.open is False

    def test_camel_case_output(self):
        s = ModalSectionConfig(id="modal2", show_close_button=True, close_on_backdrop=False)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["showCloseButton"] is True
        assert out["closeOnBackdrop"] is False


class TestDrawerSectionConfig:
    def test_basic(self):
        s = DrawerSectionConfig(id="drawer1", title="Filters", open=False, placement="right", size="320px")
        assert s.layout == "drawer"
        assert s.placement == "right"

    def test_camel_case_output(self):
        s = DrawerSectionConfig(id="drawer2", close_on_backdrop=True, show_close_button=True)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["closeOnBackdrop"] is True
        assert out["showCloseButton"] is True


class TestTooltipSectionConfig:
    def test_basic(self):
        s = TooltipSectionConfig(id="tip1", content="Required field.", placement="top", trigger_label="?")
        assert s.layout == "tooltip"
        assert s.content == "Required field."

    def test_camel_case_output(self):
        s = TooltipSectionConfig(id="tip2", trigger_label="help")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["triggerLabel"] == "help"


class TestPopoverSectionConfig:
    def test_basic(self):
        s = PopoverSectionConfig(id="pop1", placement="bottom", trigger_label="More info", content="Some context.")
        assert s.layout == "popover"
        assert s.trigger_label == "More info"

    def test_camel_case_output(self):
        s = PopoverSectionConfig(id="pop2", trigger_label="Open")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["triggerLabel"] == "Open"


class TestTableSectionConfig:
    def test_basic(self):
        cols = [TableColumn(key="name", label="Name", sortable=True), TableColumn(key="email", label="Email")]
        rows = [{"name": "Alice", "email": "alice@acme.com"}]
        s = TableSectionConfig(id="tbl1", columns=cols, rows=rows, searchable=True, page_size=10)
        assert s.layout == "table"
        assert len(s.columns) == 2
        assert s.rows[0]["name"] == "Alice"

    def test_camel_case_output(self):
        col = TableColumn(key="name", label="Name", sortable=True, width="200px")
        s = TableSectionConfig(id="tbl2", columns=[col], rows=[], page_size=20, empty_message="No data.")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["pageSize"] == 20
        assert out["emptyMessage"] == "No data."
        assert out["columns"][0]["sortable"] is True


class TestBadgeSectionConfig:
    def test_basic(self):
        badges = [BadgeItem(id="ts", label="TypeScript", variant="primary")]
        s = BadgeSectionConfig(id="badge1", badges=badges, appearance="subtle", size="md")
        assert s.layout == "badge"
        assert s.badges[0].variant == "primary"


class TestAvatarSectionConfig:
    def test_basic(self):
        avatars = [AvatarItem(id="a1", initials="AS", src="https://example.com/alice.jpg", alt="Alice", name="Alice")]
        s = AvatarSectionConfig(id="avatar1", avatars=avatars, size="md", stacked=True)
        assert s.layout == "avatar"
        assert s.stacked is True
        assert s.avatars[0].initials == "AS"


class TestTimelineSectionConfig:
    def test_basic(self):
        events = [
            TimelineEvent(id="e1", title="Kicked off", timestamp="Jan 2025", variant="success"),
            TimelineEvent(id="e2", title="Beta", timestamp="Mar 2025"),
        ]
        s = TimelineSectionConfig(id="tl1", events=events)
        assert s.layout == "timeline"
        assert len(s.events) == 2
        assert s.events[0].variant == "success"


class TestStatSectionConfig:
    def test_basic(self):
        stats = [
            StatItem(id="s1", value="1,234", label="Users", trend="+12%", trend_direction="up"),
            StatItem(id="s2", value="$98,500", label="Revenue"),
        ]
        s = StatSectionConfig(id="stats1", stats=stats, columns=3)
        assert s.layout == "stat"
        assert s.columns == 3

    def test_camel_case_output(self):
        item = StatItem(id="s3", value="42", label="Score", sub_label="Out of 100", trend_direction="neutral")
        s = StatSectionConfig(id="stats2", stats=[item])
        out = s.model_dump(by_alias=True, exclude_none=True)
        stat_out = out["stats"][0]
        assert stat_out["subLabel"] == "Out of 100"
        assert stat_out["trendDirection"] == "neutral"


class TestEmptyStateSectionConfig:
    def test_basic(self):
        s = EmptyStateSectionConfig(id="empty1", heading="No results", message="Try a different search.", icon="🗂", action_label="Clear", action_href="/contacts")
        assert s.layout == "empty-state"
        assert s.heading == "No results"

    def test_camel_case_output(self):
        s = EmptyStateSectionConfig(id="empty2", action_label="Reset", action_href="/reset")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["actionLabel"] == "Reset"
        assert out["actionHref"] == "/reset"


class TestCodeBlockSectionConfig:
    def test_basic(self):
        s = CodeBlockSectionConfig(id="code1", code="print('hello')", language="python", line_numbers=True, copyable=True)
        assert s.layout == "code-block"
        assert s.code == "print('hello')"

    def test_camel_case_output(self):
        s = CodeBlockSectionConfig(id="code2", code="x = 1", line_numbers=True)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["lineNumbers"] is True


class TestChartSectionConfig:
    def test_basic(self):
        series = [ChartSeries(key="revenue", label="Revenue", color="#6366f1")]
        data = [{"label": "Jan", "revenue": 12000}, {"label": "Feb", "revenue": 15000}]
        s = ChartSectionConfig(id="chart1", chart_type="bar", data=data, series=series, show_grid=True, show_legend=True, height=300)
        assert s.layout == "chart"
        assert s.chart_type == "bar"
        assert len(s.data) == 2

    def test_camel_case_output(self):
        s = ChartSectionConfig(id="chart2", chart_type="line", data=[], show_grid=True, show_labels=False)
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["chartType"] == "line"
        assert out["showGrid"] is True
        assert out["showLabels"] is False


class TestIframeSectionConfig:
    def test_basic(self):
        s = IframeSectionConfig(id="iframe1", src="https://example.com/report", frame_width="100%", frame_height="480px", allow_fullscreen=True, show_loader=True)
        assert s.layout == "iframe"
        assert s.src == "https://example.com/report"

    def test_camel_case_output(self):
        s = IframeSectionConfig(id="iframe2", src="https://example.com", query_params={"tab": "sales"}, frame_title="Report", sandbox="allow-scripts")
        out = s.model_dump(by_alias=True, exclude_none=True)
        assert out["queryParams"] == {"tab": "sales"}
        assert out["frameTitle"] == "Report"
        # frameWidth is optional so may or may not be present
        assert "frameWidth" not in out or out["frameWidth"]


# ---------------------------------------------------------------------------
# UIStageConfig new fields
# ---------------------------------------------------------------------------

class TestUIStageConfigNewFields:
    def test_theme_class_name_page_transition(self):
        page = UIPageConfig(id="p1", title="Home", order=1)
        stage = UIStageConfig(
            id="s1",
            title="App",
            pages=[page],
            theme="dark",
            class_name="my-stage",
            page_transition="fade",
        )
        assert stage.theme == "dark"
        assert stage.class_name == "my-stage"
        assert stage.page_transition == "fade"

    def test_camel_case_output(self):
        page = UIPageConfig(id="p1", title="P", order=1)
        stage = UIStageConfig(id="s1", pages=[page], theme="light", page_transition="slide-left", class_name="wrapper")
        out = stage.model_dump(by_alias=True, exclude_none=True)
        assert out["theme"] == "light"
        assert out["pageTransition"] == "slide-left"
        assert out["className"] == "wrapper"


# ---------------------------------------------------------------------------
# Flask integration
# ---------------------------------------------------------------------------

class TestFlaskUtils:
    def test_ui_response_returns_json(self):
        """ui_response returns a Flask Response with correct JSON and Content-Type."""
        flask = pytest.importorskip("flask")
        from react_ubiquitous_put.flask_utils import ui_response

        app = flask.Flask(__name__)
        page = UIPageConfig(id="p1", title="Home", order=1)
        stage = UIStageConfig(id="s1", title="My App", default_page_id="p1", pages=[page])

        with app.app_context():
            response = ui_response(stage)

        assert response.status_code == 200
        assert response.content_type == "application/json"

        import json
        data = json.loads(response.get_data(as_text=True))
        assert data["id"] == "s1"
        assert data["title"] == "My App"
        assert data["defaultPageId"] == "p1"
        assert "pages" in data
        # None values should be excluded
        assert "description" not in data

    def test_ui_response_camel_case_keys(self):
        """Serialised JSON uses camelCase keys."""
        flask = pytest.importorskip("flask")
        from react_ubiquitous_put.flask_utils import ui_response

        app = flask.Flask(__name__)
        sec = GridSectionConfig(id="s1", grid_template_columns="repeat(2, 1fr)", gap="1rem")
        page = UIPageConfig(id="p1", title="P", order=1, sections=[sec])
        stage = UIStageConfig(id="s1", pages=[page])

        with app.app_context():
            response = ui_response(stage)

        import json
        data = json.loads(response.get_data(as_text=True))
        section_out = data["pages"][0]["sections"][0]
        assert section_out["gridTemplateColumns"] == "repeat(2, 1fr)"
        assert "grid_template_columns" not in section_out

    def test_ui_response_custom_status(self):
        """ui_response supports custom HTTP status codes."""
        flask = pytest.importorskip("flask")
        from react_ubiquitous_put.flask_utils import ui_response

        app = flask.Flask(__name__)
        page = UIPageConfig(id="p1", title="P", order=1)
        stage = UIStageConfig(id="s1", pages=[page])

        with app.app_context():
            response = ui_response(stage, status=201)

        assert response.status_code == 201


# ---------------------------------------------------------------------------
# __version__
# ---------------------------------------------------------------------------

def test_package_version():
    import react_ubiquitous_put
    assert react_ubiquitous_put.__version__ == "1.0.1"
