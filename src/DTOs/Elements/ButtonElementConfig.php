<?php

namespace ReactUbiquitous\DTOs\Elements;

final class ButtonElementConfig extends BaseElementConfig
{
    public function __construct(
        string $id,
        string $name,
        ?int $order = null,
        ?string $width = null,
        ?string $label = null,
        ?string $labelPosition = null,
        ?string $tooltip = null,
        ?string $units = null,
        ?string $unitsPosition = null,
        ?bool $disabled = null,
        ?bool $readonly = null,
        ?bool $required = null,
        ?bool $hidden = null,
        ?string $hiddenExpr = null,
        ?string $disabledExpr = null,
        ?string $className = null,
        ?array $style = null,
        array $validations = [],
        public readonly string $text = '',
        public readonly ?string $buttonType = null,
        public readonly ?string $variant = null,
        public readonly ?string $size = null,
        public readonly ?string $icon = null,
        public readonly ?string $iconPosition = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'button'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'text' => $this->text,
            'buttonType' => $this->buttonType,
            'variant' => $this->variant,
            'size' => $this->size,
            'icon' => $this->icon,
            'iconPosition' => $this->iconPosition,
        ], fn($v) => $v !== null));
    }
}
