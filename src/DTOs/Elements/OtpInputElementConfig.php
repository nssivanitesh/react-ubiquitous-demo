<?php

namespace ReactUbiquitous\DTOs\Elements;

final class OtpInputElementConfig extends BaseElementConfig
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
        public readonly ?int $length = null,
        public readonly ?string $value = null,
        public readonly ?string $defaultValue = null,
        public readonly ?bool $mask = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'otpinput'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'length' => $this->length,
            'value' => $this->value,
            'defaultValue' => $this->defaultValue,
            'mask' => $this->mask,
        ], fn($v) => $v !== null));
    }
}
