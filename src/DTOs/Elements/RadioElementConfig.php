<?php

namespace ReactUbiquitous\DTOs\Elements;

use ReactUbiquitous\DTOs\Supporting\RadioOption;

final class RadioElementConfig extends BaseElementConfig
{
    /** @param RadioOption[] $options */
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
        public readonly ?string $defaultValue = null,
        public readonly ?string $value = null,
        public readonly ?string $orientation = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'radio'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'defaultValue' => $this->defaultValue,
            'value' => $this->value,
            'orientation' => $this->orientation,
        ], fn($v) => $v !== null);

        $extra['options'] = array_map(fn(RadioOption $o) => $o->toArray(), $this->options);

        return array_merge($this->baseArray(), $extra);
    }
}
