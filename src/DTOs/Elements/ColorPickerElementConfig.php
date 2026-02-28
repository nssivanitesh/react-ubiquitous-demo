<?php

namespace ReactUbiquitous\DTOs\Elements;

final class ColorPickerElementConfig extends BaseElementConfig
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
        public readonly ?string $value = null,
        public readonly ?string $defaultValue = null,
        public readonly ?string $format = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'colorpicker'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'value' => $this->value,
            'defaultValue' => $this->defaultValue,
            'format' => $this->format,
        ], fn($v) => $v !== null));
    }
}
