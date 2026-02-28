"""Tests for react_ubiquitous_put builders."""
import pytest

from react_ubiquitous_put.builders import (
    ElementBuilder,
    SectionBuilder,
    PageBuilder,
    StageBuilder,
)
from react_ubiquitous_put.models import (
    InputElementConfig,
    ButtonElementConfig,
    CheckboxElementConfig,
    GridSectionConfig,
    FlexSectionConfig,
    UIPageConfig,
    UIStageConfig,
)


# ---------------------------------------------------------------------------
# ElementBuilder
# ---------------------------------------------------------------------------

class TestElementBuilder:
    def test_build_input(self):
        el = (
            ElementBuilder(InputElementConfig)
            .with_id("email")
            .with_name("email")
            .with_field(input_type="email")
            .with_label("Email Address")
            .with_order(1)
            .with_required(True)
            .build()
        )
        assert isinstance(el, InputElementConfig)
        assert el.id == "email"
        assert el.input_type == "email"
        assert el.required is True

    def test_build_button(self):
        el = (
            ElementBuilder(ButtonElementConfig)
            .with_id("btn1")
            .with_name("submit")
            .with_field(text="Submit", button_type="submit", variant="default")
            .with_order(1)
            .build()
        )
        assert isinstance(el, ButtonElementConfig)
        assert el.text == "Submit"
        assert el.button_type == "submit"

    def test_add_validations(self):
        el = (
            ElementBuilder(InputElementConfig)
            .with_id("pw")
            .with_name("password")
            .with_field(input_type="password")
            .add_validation("required")
            .add_validation("minLength", value=8, message="Min 8 chars.")
            .build()
        )
        assert len(el.validations) == 2
        assert el.validations[0].rule == "required"
        assert el.validations[1].value == 8

    def test_builder_immutability(self):
        """Each with_* call returns a new builder; originals are unchanged."""
        base = ElementBuilder(InputElementConfig).with_id("a").with_name("a")
        modified = base.with_label("New Label")
        built_base = base.build()
        built_mod = modified.build()
        assert built_base.label is None
        assert built_mod.label == "New Label"

    def test_with_style_and_class_name(self):
        el = (
            ElementBuilder(CheckboxElementConfig)
            .with_id("cb1")
            .with_name("agree")
            .with_class_name("my-checkbox")
            .with_style({"color": "red"})
            .build()
        )
        assert el.class_name == "my-checkbox"
        assert el.style == {"color": "red"}

    def test_with_tooltip_and_width(self):
        el = (
            ElementBuilder(InputElementConfig)
            .with_id("e1")
            .with_name("n")
            .with_tooltip("Help text")
            .with_width(6)
            .build()
        )
        assert el.tooltip == "Help text"
        assert el.width == 6


# ---------------------------------------------------------------------------
# SectionBuilder
# ---------------------------------------------------------------------------

class TestSectionBuilder:
    def test_build_grid(self):
        el = (
            ElementBuilder(InputElementConfig)
            .with_id("fn")
            .with_name("firstName")
            .with_label("First Name")
            .with_order(1)
            .build()
        )
        sec = (
            SectionBuilder(GridSectionConfig)
            .with_id("personal")
            .with_title("Personal Info")
            .with_order(1)
            .with_field(grid_template_columns="repeat(2, 1fr)", gap="1rem")
            .add_element(el)
            .build()
        )
        assert isinstance(sec, GridSectionConfig)
        assert sec.grid_template_columns == "repeat(2, 1fr)"
        assert len(sec.elements) == 1

    def test_build_flex(self):
        sec = (
            SectionBuilder(FlexSectionConfig)
            .with_id("toolbar")
            .with_field(flex_direction="row", gap="0.5rem")
            .build()
        )
        assert isinstance(sec, FlexSectionConfig)
        assert sec.flex_direction == "row"

    def test_add_multiple_elements(self):
        e1 = ElementBuilder(InputElementConfig).with_id("e1").with_name("n1").with_order(1).build()
        e2 = ElementBuilder(InputElementConfig).with_id("e2").with_name("n2").with_order(2).build()
        sec = (
            SectionBuilder(GridSectionConfig)
            .with_id("s1")
            .add_element(e1)
            .add_element(e2)
            .build()
        )
        assert len(sec.elements) == 2

    def test_builder_immutability(self):
        base = SectionBuilder(GridSectionConfig).with_id("s1")
        modified = base.with_title("Title")
        assert base.build().title is None
        assert modified.build().title == "Title"


# ---------------------------------------------------------------------------
# PageBuilder
# ---------------------------------------------------------------------------

class TestPageBuilder:
    def test_build_page(self):
        sec = SectionBuilder(GridSectionConfig).with_id("s1").build()
        page = (
            PageBuilder()
            .with_id("overview")
            .with_title("Overview")
            .with_order(1)
            .add_section(sec)
            .build()
        )
        assert isinstance(page, UIPageConfig)
        assert page.title == "Overview"
        assert page.order == 1
        assert len(page.sections) == 1

    def test_optional_fields(self):
        page = (
            PageBuilder()
            .with_id("p1")
            .with_title("Settings")
            .with_order(2)
            .with_icon("settings")
            .with_description("App settings")
            .with_visible(True)
            .with_class_name("settings-page")
            .build()
        )
        assert page.icon == "settings"
        assert page.description == "App settings"
        assert page.visible is True
        assert page.class_name == "settings-page"

    def test_add_multiple_sections(self):
        s1 = SectionBuilder(GridSectionConfig).with_id("s1").with_order(1).build()
        s2 = SectionBuilder(FlexSectionConfig).with_id("s2").with_order(2).build()
        page = (
            PageBuilder()
            .with_id("p1")
            .with_title("T")
            .with_order(1)
            .add_section(s1)
            .add_section(s2)
            .build()
        )
        assert len(page.sections) == 2

    def test_builder_immutability(self):
        base = PageBuilder().with_id("p1").with_title("T").with_order(1)
        modified = base.with_description("Desc")
        assert base.build().description is None
        assert modified.build().description == "Desc"


# ---------------------------------------------------------------------------
# StageBuilder
# ---------------------------------------------------------------------------

class TestStageBuilder:
    def test_build_stage(self):
        page = PageBuilder().with_id("p1").with_title("Home").with_order(1).build()
        stage = (
            StageBuilder()
            .with_id("stage1")
            .with_title("My Application")
            .with_default_page_id("p1")
            .add_page(page)
            .build()
        )
        assert isinstance(stage, UIStageConfig)
        assert stage.id == "stage1"
        assert stage.title == "My Application"
        assert stage.default_page_id == "p1"
        assert len(stage.pages) == 1

    def test_add_multiple_pages(self):
        p1 = PageBuilder().with_id("p1").with_title("Home").with_order(1).build()
        p2 = PageBuilder().with_id("p2").with_title("Settings").with_order(2).build()
        stage = (
            StageBuilder()
            .with_id("s1")
            .add_page(p1)
            .add_page(p2)
            .build()
        )
        assert len(stage.pages) == 2

    def test_builder_immutability(self):
        base = StageBuilder().with_id("s1")
        modified = base.with_title("App")
        assert base.build().title is None
        assert modified.build().title == "App"

    def test_full_fluent_chain(self):
        """End-to-end test: build a complete stage using all builders."""
        email_el = (
            ElementBuilder(InputElementConfig)
            .with_id("email")
            .with_name("email")
            .with_field(input_type="email")
            .with_label("Email")
            .with_order(1)
            .with_required(True)
            .add_validation("required")
            .add_validation("email", message="Enter a valid email.")
            .build()
        )
        form_section = (
            SectionBuilder(GridSectionConfig)
            .with_id("form-grid")
            .with_order(1)
            .with_field(grid_template_columns="repeat(2, 1fr)", gap="1rem")
            .add_element(email_el)
            .build()
        )
        contact_page = (
            PageBuilder()
            .with_id("contact")
            .with_title("Contact")
            .with_order(1)
            .add_section(form_section)
            .build()
        )
        stage = (
            StageBuilder()
            .with_id("main")
            .with_title("My App")
            .with_default_page_id("contact")
            .add_page(contact_page)
            .build()
        )
        assert stage.id == "main"
        assert stage.pages[0].sections[0].elements[0].id == "email"
        assert stage.pages[0].sections[0].elements[0].validations[1].rule == "email"

        # Verify JSON serialization uses camelCase
        out = stage.model_dump(by_alias=True, exclude_none=True)
        assert out["defaultPageId"] == "contact"
        page_out = out["pages"][0]
        section_out = page_out["sections"][0]
        assert section_out["gridTemplateColumns"] == "repeat(2, 1fr)"
        element_out = section_out["elements"][0]
        assert element_out["inputType"] == "email"
        # labelPosition was not set, so it is excluded by exclude_none
        assert "labelPosition" not in element_out
