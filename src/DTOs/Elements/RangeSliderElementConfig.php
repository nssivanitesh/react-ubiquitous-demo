<?php

namespace ReactUbiquitous\DTOs\Elements;

final class RangeSliderElementConfig extends BaseElementConfig
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
        public readonly ?int $min = null,
        public readonly ?int $max = null,
        public readonly ?int $step = null,
        public readonly ?array $value = null,
        public readonly ?array $defaultValue = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'rangeslider'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'min' => $this->min,
            'max' => $this->max,
            'step' => $this->step,
            'value' => $this->value,
            'defaultValue' => $this->defaultValue,
        ], fn($v) => $v !== null));
    }
}
