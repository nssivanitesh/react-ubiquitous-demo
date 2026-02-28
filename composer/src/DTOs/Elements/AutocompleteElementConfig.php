<?php

namespace ReactUbiquitous\DTOs\Elements;

use ReactUbiquitous\DTOs\Supporting\SelectOption;

final class AutocompleteElementConfig extends BaseElementConfig
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
        public readonly ?string $value = null,
        public readonly ?string $defaultValue = null,
        public readonly ?string $placeholder = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'autocomplete'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'value' => $this->value,
            'defaultValue' => $this->defaultValue,
            'placeholder' => $this->placeholder,
        ], fn($v) => $v !== null);

        $extra['options'] = array_map(fn(SelectOption $o) => $o->toArray(), $this->options);

        return array_merge($this->baseArray(), $extra);
    }
}
