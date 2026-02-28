"""Tests for react_ubiquitous_put models."""
import pytest
from pydantic import ValidationError

from react_ubiquitous_put.models import (
    ValidationRule,
    InputElementConfig,
    CheckboxElementConfig,
    RadioOption,
    RadioElementConfig,
    TextareaElementConfig,
    SelectOption,
    SelectOptGroup,
    SelectElementConfig,
    ButtonElementConfig,
    LabelElementConfig,
    FieldsetElementConfig,
    DatalistElementConfig,
    OutputElementConfig,
    FlexSectionConfig,
    GridSectionConfig,
    HeroSectionConfig,
    MediaItem,
    MediaSectionConfig,
    AccordionPanel,
    AccordionSectionConfig,
    CollapseSectionConfig,
    DividerSectionConfig,
    CardSectionConfig,
    ListDetailSectionConfig,
    ListItem,
    ListEndpoint,
    FilterEndpoint,
    DetailEndpoint,
    UIPageConfig,
    UIStageConfig,
)


# ---------------------------------------------------------------------------
# ValidationRule
# ---------------------------------------------------------------------------

class TestValidationRule:
    def test_required_rule(self):
        r = ValidationRule(rule="required")
        assert r.rule == "required"
        assert r.value is None
        assert r.message is None

    def test_min_length_rule(self):
        r = ValidationRule(rule="minLength", value=8, message="Min 8 chars.")
        assert r.rule == "minLength"
        assert r.value == 8
        assert r.message == "Min 8 chars."

    def test_custom_rule(self):
        r = ValidationRule(rule="custom", validator="myValidator", config={"key": "val"})
        assert r.validator == "myValidator"
        assert r.config == {"key": "val"}

    def test_camel_case_input(self):
        r = ValidationRule.model_validate({"rule": "pattern", "value": "^[A-Z]+$"})
        assert r.value == "^[A-Z]+$"


# ---------------------------------------------------------------------------
# Element configs
# ---------------------------------------------------------------------------

class TestInputElementConfig:
    def test_defaults(self):
        el = InputElementConfig(id="e1", name="email", type="input")
        assert el.type == "input"
        assert el.input_type == "text"

    def test_full_fields(self):
        el = InputElementConfig(
            id="e1",
            name="email",
            input_type="email",
            label="Email",
            placeholder="you@example.com",
            required=True,
            order=1,
            validations=[ValidationRule(rule="required"), ValidationRule(rule="email")],
        )
        assert el.input_type == "email"
        assert el.label == "Email"
        assert len(el.validations) == 2

    def test_camel_case_round_trip(self):
        data = {
            "id": "f1",
            "name": "phone",
            "type": "input",
            "inputType": "tel",
            "labelPosition": "left",
            "datalistId": "dl1",
        }
        el = InputElementConfig.model_validate(data)
        assert el.input_type == "tel"
        assert el.label_position == "left"
        assert el.datalist_id == "dl1"

        out = el.model_dump(by_alias=True, exclude_none=True)
        assert out["inputType"] == "tel"
        assert out["labelPosition"] == "left"

    def test_type_literal_enforced(self):
        with pytest.raises(ValidationError):
            InputElementConfig(id="e1", name="n", type="button")


class TestCheckboxElementConfig:
    def test_defaults(self):
        el = CheckboxElementConfig(id="cb1", name="agree")
        assert el.type == "checkbox"
        assert el.default_checked is None

    def test_camel_checked(self):
        el = CheckboxElementConfig.model_validate(
            {"id": "cb1", "name": "agree", "type": "checkbox", "defaultChecked": True}
        )
        assert el.default_checked is True


class TestRadioElementConfig:
    def test_basic(self):
        opts = [RadioOption(label="Yes", value="yes"), RadioOption(label="No", value="no")]
        el = RadioElementConfig(id="r1", name="choice", options=opts, default_value="yes")
        assert el.type == "radio"
        assert len(el.options) == 2
        assert el.default_value == "yes"


class TestTextareaElementConfig:
    def test_basic(self):
        el = TextareaElementConfig(id="ta1", name="bio", rows=4, resize="vertical")
        assert el.type == "textarea"
        assert el.rows == 4
        assert el.resize == "vertical"


class TestSelectElementConfig:
    def test_flat_options(self):
        opts = [SelectOption(label="A", value="a"), SelectOption(label="B", value="b")]
        el = SelectElementConfig(id="sel1", name="dept", options=opts)
        assert el.type == "select"
        assert len(el.options) == 2

    def test_opt_group(self):
        grp = SelectOptGroup(
            group=True,
            label="Engineering",
            options=[SelectOption(label="FE", value="fe")],
        )
        el = SelectElementConfig(id="sel1", name="dept", options=[grp])
        assert isinstance(el.options[0], SelectOptGroup)

    def test_camel_default_value(self):
        el = SelectElementConfig.model_validate(
            {"id": "s1", "name": "s", "type": "select", "defaultValue": "opt1", "options": []}
        )
        assert el.default_value == "opt1"


class TestButtonElementConfig:
    def test_defaults(self):
        el = ButtonElementConfig(id="btn1", name="submit", text="Submit")
        assert el.type == "button"
        assert el.button_type == "button"

    def test_camel_button_type(self):
        el = ButtonElementConfig.model_validate(
            {"id": "b1", "name": "b", "type": "button", "buttonType": "submit", "text": "Go"}
        )
        assert el.button_type == "submit"


class TestLabelElementConfig:
    def test_basic(self):
        el = LabelElementConfig(id="lbl1", name="hint", text="All required", html_for="input1")
        assert el.type == "label"
        assert el.text == "All required"
        assert el.html_for == "input1"


class TestFieldsetElementConfig:
    def test_with_children(self):
        child = CheckboxElementConfig(id="cb1", name="agree", label="I agree")
        fs = FieldsetElementConfig(id="fs1", name="terms", legend="Terms", children=[child])
        assert fs.type == "fieldset"
        assert len(fs.children) == 1
        assert fs.children[0].type == "checkbox"


class TestDatalistElementConfig:
    def test_string_options(self):
        el = DatalistElementConfig(id="dl1", name="skills", options=["Python", "React"])
        assert el.type == "datalist"
        assert el.options[0] == "Python"

    def test_object_options(self):
        el = DatalistElementConfig(
            id="dl1", name="skills", options=[SelectOption(label="Node.js", value="nodejs")]
        )
        assert isinstance(el.options[0], SelectOption)


class TestOutputElementConfig:
    def test_basic(self):
        el = OutputElementConfig(id="out1", name="budget", format="currency", value="12500")
        assert el.type == "output"
        assert el.format == "currency"


# ---------------------------------------------------------------------------
# Section configs
# ---------------------------------------------------------------------------

class TestFlexSectionConfig:
    def test_basic(self):
        s = FlexSectionConfig(id="flex1", flex_direction="row", gap="1rem")
        assert s.layout == "flex"
        assert s.flex_direction == "row"

    def test_camel_alias(self):
        s = FlexSectionConfig.model_validate(
            {"id": "f1", "layout": "flex", "flexDirection": "column", "justifyContent": "center"}
        )
        assert s.flex_direction == "column"
        assert s.justify_content == "center"


class TestGridSectionConfig:
    def test_basic(self):
        s = GridSectionConfig(id="grid1", grid_template_columns="repeat(3, 1fr)", gap="1rem")
        assert s.layout == "grid"
        assert s.grid_template_columns == "repeat(3, 1fr)"

    def test_with_elements(self):
        el = InputElementConfig(id="e1", name="fn", label="First", order=1)
        s = GridSectionConfig(id="g1", elements=[el])
        assert len(s.elements) == 1


class TestHeroSectionConfig:
    def test_gradient(self):
        s = HeroSectionConfig(
            id="hero1",
            title="Welcome",
            background_type="gradient",
            gradient_from="#6366f1",
            gradient_to="#1e293b",
            overlay=True,
            overlay_opacity=40,
        )
        assert s.layout == "hero"
        assert s.background_type == "gradient"
        assert s.overlay_opacity == 40


class TestMediaSectionConfig:
    def test_with_items(self):
        item = MediaItem(id="img1", type="image", url="https://example.com/photo.jpg", alt="A photo")
        s = MediaSectionConfig(id="media1", aspect_ratio="16/9", show_arrows=True, items=[item])
        assert s.layout == "media"
        assert len(s.items) == 1
        assert s.items[0].type == "image"


class TestAccordionSectionConfig:
    def test_basic(self):
        panel = AccordionPanel(
            id="p1",
            label="What is it?",
            default_open=True,
            elements=[LabelElementConfig(id="b1", name="body1", text="A JSON renderer.", order=1)],
        )
        s = AccordionSectionConfig(id="faq", panels=[panel])
        assert s.layout == "accordion"
        assert s.panels[0].default_open is True

    def test_nested_sections_in_panel(self):
        inner = GridSectionConfig(id="inner1")
        panel = AccordionPanel(id="p1", label="Nested", sections=[inner])
        s = AccordionSectionConfig(id="acc1", panels=[panel])
        assert len(s.panels[0].sections) == 1


class TestCollapseSectionConfig:
    def test_basic(self):
        s = CollapseSectionConfig(id="col1", label="Advanced", default_open=False, icon=True)
        assert s.layout == "collapse"
        assert s.label == "Advanced"


class TestDividerSectionConfig:
    def test_basic(self):
        s = DividerSectionConfig(id="div1", label="OR", orientation="horizontal", variant="solid")
        assert s.layout == "divider"
        assert s.variant == "solid"


class TestCardSectionConfig:
    def test_with_footer(self):
        btn = ButtonElementConfig(id="save", name="save", text="Save", order=1)
        s = CardSectionConfig(id="card1", title="Profile", bordered=True, shadow="sm", footer_elements=[btn])
        assert s.layout == "card"
        assert len(s.footer_elements) == 1


class TestListDetailSectionConfig:
    def test_basic(self):
        items = [ListItem(id="c1", label="Alice", sublabel="alice@acme.com")]
        ep = ListEndpoint(url="https://api.example.com/contacts", from_param="from", from_value=1)
        s = ListDetailSectionConfig(id="contacts", list_items=items, list_endpoint=ep)
        assert s.layout == "list-detail"
        assert s.list_items[0].label == "Alice"
        assert s.list_endpoint.url == "https://api.example.com/contacts"

    def test_detail_pages(self):
        page = UIPageConfig(
            id="dp1",
            title="Overview",
            order=1,
            sections=[GridSectionConfig(id="sec1")],
        )
        s = ListDetailSectionConfig(id="ld1", detail_pages=[page])
        assert len(s.detail_pages) == 1
        assert s.detail_pages[0].title == "Overview"


# ---------------------------------------------------------------------------
# UIPageConfig and UIStageConfig
# ---------------------------------------------------------------------------

class TestUIPageConfig:
    def test_basic(self):
        page = UIPageConfig(id="p1", title="Overview", order=1)
        assert page.id == "p1"
        assert page.sections == []

    def test_with_sections(self):
        sec = GridSectionConfig(id="s1", grid_template_columns="repeat(2,1fr)")
        page = UIPageConfig(id="p1", title="Details", order=1, sections=[sec])
        assert len(page.sections) == 1

    def test_discriminated_section_union(self):
        """Section type is correctly resolved from the 'layout' discriminant."""
        data = {
            "id": "p1",
            "title": "Test",
            "order": 1,
            "sections": [
                {"id": "s1", "layout": "grid", "gridTemplateColumns": "1fr 1fr"},
                {"id": "s2", "layout": "flex", "flexDirection": "row"},
            ],
        }
        page = UIPageConfig.model_validate(data)
        assert page.sections[0].layout == "grid"
        assert page.sections[1].layout == "flex"

    def test_camel_case_json_output(self):
        sec = GridSectionConfig(id="s1", grid_template_columns="1fr")
        page = UIPageConfig(id="p1", title="T", order=1, sections=[sec], class_name="my-page")
        out = page.model_dump(by_alias=True, exclude_none=True)
        assert "className" in out
        assert out["sections"][0]["gridTemplateColumns"] == "1fr"


class TestUIStageConfig:
    def test_basic(self):
        page = UIPageConfig(id="p1", title="Page 1", order=1)
        stage = UIStageConfig(id="stage1", title="My App", pages=[page])
        assert stage.id == "stage1"
        assert len(stage.pages) == 1

    def test_camel_default_page_id(self):
        page = UIPageConfig(id="p1", title="P", order=1)
        stage = UIStageConfig.model_validate(
            {"id": "s1", "defaultPageId": "p1", "pages": [{"id": "p1", "title": "P", "order": 1}]}
        )
        assert stage.default_page_id == "p1"

    def test_json_round_trip(self):
        page = UIPageConfig(id="p1", title="Home", order=1)
        stage = UIStageConfig(id="s1", title="App", default_page_id="p1", pages=[page])
        json_str = stage.model_dump_json(by_alias=True)
        restored = UIStageConfig.model_validate_json(json_str)
        assert restored.default_page_id == "p1"
        assert restored.pages[0].title == "Home"
