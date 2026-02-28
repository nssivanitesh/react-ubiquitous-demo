"""
Flask integration helpers for react-ubiquitous-put.

Provides a single ``ui_response`` function that serialises a
``UIStageConfig`` (or any Pydantic model) to a camelCase JSON response
suitable for the react-ubiquitous frontend.

Usage::

    from flask import Flask
    from react_ubiquitous_put import UIStageConfig, UIPageConfig, FlexSectionConfig
    from react_ubiquitous_put.flask_utils import ui_response

    app = Flask(__name__)

    @app.get("/stages/<stage_id>")
    def get_stage(stage_id: str):
        config = UIStageConfig(id=stage_id, pages=[...])
        return ui_response(config)
"""
from __future__ import annotations

from typing import TYPE_CHECKING

from pydantic import BaseModel

if TYPE_CHECKING:  # pragma: no cover
    from flask import Response


def ui_response(config: BaseModel, status: int = 200) -> "Response":
    """Serialise a Pydantic model to a Flask JSON response.

    The response uses camelCase keys (via Pydantic aliases) and omits
    ``null`` / ``None`` values, matching the contract expected by the
    react-ubiquitous frontend.

    Args:
        config: Any Pydantic model — typically a ``UIStageConfig`` instance.
        status: HTTP status code (default ``200``).

    Returns:
        A Flask ``Response`` with ``Content-Type: application/json``.
    """
    try:
        from flask import current_app
    except ImportError as exc:  # pragma: no cover
        raise ImportError(
            "Flask is required to use react_ubiquitous_put.flask_utils. "
            "Install it with: pip install flask"
        ) from exc

    payload = config.model_dump(by_alias=True, exclude_none=True)
    response = current_app.response_class(
        response=current_app.json.dumps(payload),
        status=status,
        mimetype="application/json",
    )
    return response
