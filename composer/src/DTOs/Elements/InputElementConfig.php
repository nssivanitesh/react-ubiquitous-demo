<?php

namespace ReactUbiquitous\DTOs\Elements;

final class InputElementConfig extends BaseElementConfig
{
    public function __construct(
        string $id,
        string $name,
        public readonly string $inputType,
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
        public readonly ?string $placeholder = null,
        public readonly string|int|null $defaultValue = null,
        public readonly string|int|null $value = null,
        public readonly string|int|null $min = null,
        public readonly string|int|null $max = null,
        public readonly ?int $step = null,
        public readonly ?bool $multiple = null,
        public readonly ?string $accept = null,
        public readonly ?string $autocomplete = null,
        public readonly ?string $datalistId = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'input'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'inputType' => $this->inputType,
            'placeholder' => $this->placeholder,
            'defaultValue' => $this->defaultValue,
            'value' => $this->value,
            'min' => $this->min,
            'max' => $this->max,
            'step' => $this->step,
            'multiple' => $this->multiple,
            'accept' => $this->accept,
            'autocomplete' => $this->autocomplete,
            'datalistId' => $this->datalistId,
        ], fn($v) => $v !== null));
    }
}
