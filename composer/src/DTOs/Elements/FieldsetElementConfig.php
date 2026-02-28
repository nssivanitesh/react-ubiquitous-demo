<?php

namespace ReactUbiquitous\DTOs\Elements;

final class FieldsetElementConfig extends BaseElementConfig
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
        public readonly array $children = [],
        public readonly ?string $legend = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'fieldset'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'legend' => $this->legend,
        ], fn($v) => $v !== null);

        $extra['children'] = array_map(fn($c) => $c->toArray(), $this->children);

        return array_merge($this->baseArray(), $extra);
    }
}
