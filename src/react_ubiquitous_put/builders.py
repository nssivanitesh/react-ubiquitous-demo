"""
Fluent-style builder classes for constructing react-ubiquitous UI configs.

Each builder is immutable-ish: setter methods return a new builder instance,
keeping the original unchanged (similar to the functional builder pattern).
``build()`` always returns a validated Pydantic model.
"""
from __future__ import annotations

from typing import Any, Generic, TypeVar

from .models import (
    BaseElementConfig,
    BaseSectionConfig,
    UIElementConfig,
    UIPageConfig,
    UIStageConfig,
    UISectionConfig,
    ValidationRule,
)

_E = TypeVar("_E", bound=BaseElementConfig)
_S = TypeVar("_S", bound=BaseSectionConfig)


# ---------------------------------------------------------------------------
# ElementBuilder
# ---------------------------------------------------------------------------

class ElementBuilder(Generic[_E]):
    """Fluent builder for any element config.

    Typical usage::

        from react_ubiquitous_put.models import InputElementConfig
        from react_ubiquitous_put.builders import ElementBuilder

        element = (
            ElementBuilder(InputElementConfig)
            .with_id("first-name")
            .with_name("firstName")
            .with_label("First Name")
            .with_required(True)
            .build()
        )
    """

    def __init__(self, model_cls: type[_E], **kwargs: Any) -> None:
        self._cls = model_cls
        self._data: dict[str, Any] = dict(kwargs)

    # ── identity ────────────────────────────────────────────────────────────

    def with_id(self, id: str) -> ElementBuilder[_E]:  # noqa: A002
        return self._copy(id=id)

    def with_name(self, name: str) -> ElementBuilder[_E]:
        return self._copy(name=name)

    def with_order(self, order: int) -> ElementBuilder[_E]:
        return self._copy(order=order)

    # ── presentation ────────────────────────────────────────────────────────

    def with_label(self, label: str) -> ElementBuilder[_E]:
        return self._copy(label=label)

    def with_label_position(self, position: str) -> ElementBuilder[_E]:
        return self._copy(label_position=position)

    def with_tooltip(self, tooltip: str) -> ElementBuilder[_E]:
        return self._copy(tooltip=tooltip)

    def with_width(self, width: str | int) -> ElementBuilder[_E]:
        return self._copy(width=width)

    def with_class_name(self, class_name: str) -> ElementBuilder[_E]:
        return self._copy(class_name=class_name)

    def with_style(self, style: dict[str, Any]) -> ElementBuilder[_E]:
        return self._copy(style=style)

    # ── state ───────────────────────────────────────────────────────────────

    def with_required(self, required: bool = True) -> ElementBuilder[_E]:
        return self._copy(required=required)

    def with_disabled(self, disabled: bool = True) -> ElementBuilder[_E]:
        return self._copy(disabled=disabled)

    def with_readonly(self, readonly: bool = True) -> ElementBuilder[_E]:
        return self._copy(readonly=readonly)

    def with_hidden(self, hidden: bool = True) -> ElementBuilder[_E]:
        return self._copy(hidden=hidden)

    # ── validation ──────────────────────────────────────────────────────────

    def add_validation(self, rule: str, value: Any = None, message: str | None = None) -> ElementBuilder[_E]:
        existing: list[ValidationRule] = list(self._data.get("validations") or [])
        existing.append(ValidationRule(rule=rule, value=value, message=message))
        return self._copy(validations=existing)

    # ── generic field setter ─────────────────────────────────────────────────

    def with_field(self, **kwargs: Any) -> ElementBuilder[_E]:
        """Set arbitrary fields on the underlying model."""
        return self._copy(**kwargs)

    # ── build ────────────────────────────────────────────────────────────────

    def build(self) -> _E:
        """Validate data and return a model instance."""
        return self._cls(**self._data)

    # ── internal ─────────────────────────────────────────────────────────────

    def _copy(self, **overrides: Any) -> ElementBuilder[_E]:
        new_data = {**self._data, **overrides}
        return ElementBuilder(self._cls, **new_data)


# ---------------------------------------------------------------------------
# SectionBuilder
# ---------------------------------------------------------------------------

class SectionBuilder(Generic[_S]):
    """Fluent builder for any section config.

    Typical usage::

        from react_ubiquitous_put.models import GridSectionConfig, InputElementConfig
        from react_ubiquitous_put.builders import SectionBuilder, ElementBuilder

        section = (
            SectionBuilder(GridSectionConfig)
            .with_id("personal-info")
            .with_title("Personal Information")
            .with_field(grid_template_columns="repeat(2, 1fr)", gap="1rem")
            .add_element(
                ElementBuilder(InputElementConfig)
                .with_id("fn").with_name("firstName").with_label("First Name").with_order(1).build()
            )
            .build()
        )
    """

    def __init__(self, model_cls: type[_S], **kwargs: Any) -> None:
        self._cls = model_cls
        self._data: dict[str, Any] = dict(kwargs)
        if "elements" not in self._data:
            self._data["elements"] = []

    # ── identity ─────────────────────────────────────────────────────────────

    def with_id(self, id: str) -> SectionBuilder[_S]:  # noqa: A002
        return self._copy(id=id)

    def with_title(self, title: str) -> SectionBuilder[_S]:
        return self._copy(title=title)

    def with_description(self, description: str) -> SectionBuilder[_S]:
        return self._copy(description=description)

    def with_order(self, order: int) -> SectionBuilder[_S]:
        return self._copy(order=order)

    def with_class_name(self, class_name: str) -> SectionBuilder[_S]:
        return self._copy(class_name=class_name)

    def with_style(self, style: dict[str, Any]) -> SectionBuilder[_S]:
        return self._copy(style=style)

    # ── elements ─────────────────────────────────────────────────────────────

    def add_element(self, element: UIElementConfig) -> SectionBuilder[_S]:
        elements = list(self._data.get("elements") or [])
        elements.append(element)
        return self._copy(elements=elements)

    # ── generic field setter ─────────────────────────────────────────────────

    def with_field(self, **kwargs: Any) -> SectionBuilder[_S]:
        """Set arbitrary fields on the underlying model (e.g. layout-specific props)."""
        return self._copy(**kwargs)

    # ── build ────────────────────────────────────────────────────────────────

    def build(self) -> _S:
        """Validate data and return a model instance."""
        return self._cls(**self._data)

    # ── internal ─────────────────────────────────────────────────────────────

    def _copy(self, **overrides: Any) -> SectionBuilder[_S]:
        new_data = {**self._data, **overrides}
        return SectionBuilder(self._cls, **new_data)


# ---------------------------------------------------------------------------
# PageBuilder
# ---------------------------------------------------------------------------

class PageBuilder:
    """Fluent builder for UIPageConfig.

    Typical usage::

        from react_ubiquitous_put.builders import PageBuilder

        page = (
            PageBuilder()
            .with_id("overview")
            .with_title("Overview")
            .with_order(1)
            .add_section(section)
            .build()
        )
    """

    def __init__(self, **kwargs: Any) -> None:
        self._data: dict[str, Any] = dict(kwargs)
        if "sections" not in self._data:
            self._data["sections"] = []

    def with_id(self, id: str) -> PageBuilder:  # noqa: A002
        return self._copy(id=id)

    def with_title(self, title: str) -> PageBuilder:
        return self._copy(title=title)

    def with_description(self, description: str) -> PageBuilder:
        return self._copy(description=description)

    def with_icon(self, icon: str) -> PageBuilder:
        return self._copy(icon=icon)

    def with_order(self, order: int) -> PageBuilder:
        return self._copy(order=order)

    def with_class_name(self, class_name: str) -> PageBuilder:
        return self._copy(class_name=class_name)

    def with_visible(self, visible: bool) -> PageBuilder:
        return self._copy(visible=visible)

    def add_section(self, section: UISectionConfig) -> PageBuilder:
        sections = list(self._data.get("sections") or [])
        sections.append(section)
        return self._copy(sections=sections)

    def build(self) -> UIPageConfig:
        """Validate data and return a UIPageConfig instance."""
        return UIPageConfig(**self._data)

    def _copy(self, **overrides: Any) -> PageBuilder:
        new_data = {**self._data, **overrides}
        return PageBuilder(**new_data)


# ---------------------------------------------------------------------------
# StageBuilder
# ---------------------------------------------------------------------------

class StageBuilder:
    """Fluent builder for UIStageConfig.

    Typical usage::

        from react_ubiquitous_put.builders import StageBuilder

        stage = (
            StageBuilder()
            .with_id("my-stage")
            .with_title("My Application")
            .add_page(page)
            .build()
        )
    """

    def __init__(self, **kwargs: Any) -> None:
        self._data: dict[str, Any] = dict(kwargs)
        if "pages" not in self._data:
            self._data["pages"] = []

    def with_id(self, id: str) -> StageBuilder:  # noqa: A002
        return self._copy(id=id)

    def with_title(self, title: str) -> StageBuilder:
        return self._copy(title=title)

    def with_description(self, description: str) -> StageBuilder:
        return self._copy(description=description)

    def with_default_page_id(self, page_id: str) -> StageBuilder:
        return self._copy(default_page_id=page_id)

    def add_page(self, page: UIPageConfig) -> StageBuilder:
        pages = list(self._data.get("pages") or [])
        pages.append(page)
        return self._copy(pages=pages)

    def build(self) -> UIStageConfig:
        """Validate data and return a UIStageConfig instance."""
        return UIStageConfig(**self._data)

    def _copy(self, **overrides: Any) -> StageBuilder:
        new_data = {**self._data, **overrides}
        return StageBuilder(**new_data)
