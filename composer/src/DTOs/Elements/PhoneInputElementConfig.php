<?php

namespace ReactUbiquitous\DTOs\Elements;

use ReactUbiquitous\DTOs\Supporting\PhoneCountryOption;

final class PhoneInputElementConfig extends BaseElementConfig
{
    /** @param PhoneCountryOption[] $countries */
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
        public readonly array $countries = [],
        public readonly ?string $defaultCountry = null,
        public readonly ?string $value = null,
        public readonly ?string $defaultValue = null,
        public readonly ?string $placeholder = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'phoneinput'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'defaultCountry' => $this->defaultCountry,
            'value' => $this->value,
            'defaultValue' => $this->defaultValue,
            'placeholder' => $this->placeholder,
        ], fn($v) => $v !== null);

        $extra['countries'] = array_map(fn(PhoneCountryOption $c) => $c->toArray(), $this->countries);

        return array_merge($this->baseArray(), $extra);
    }
}
