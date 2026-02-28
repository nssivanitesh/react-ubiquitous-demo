<?php

namespace ReactUbiquitous\DTOs\Elements;

use ReactUbiquitous\DTOs\Supporting\SelectOption;

final class MultiSelectElementConfig extends BaseElementConfig
{
    /** @param SelectOption[] $options */
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
        public readonly array $options = [],
        public readonly ?array $value = null,
        public readonly ?array $defaultValue = null,
        public readonly ?string $placeholder = null,
        public readonly ?int $maxItems = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'multiselect'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'value' => $this->value,
            'defaultValue' => $this->defaultValue,
            'placeholder' => $this->placeholder,
            'maxItems' => $this->maxItems,
        ], fn($v) => $v !== null);

        $extra['options'] = array_map(fn(SelectOption $o) => $o->toArray(), $this->options);

        return array_merge($this->baseArray(), $extra);
    }
}
