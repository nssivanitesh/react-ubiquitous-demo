<?php

namespace ReactUbiquitous\DTOs\Elements;

use ReactUbiquitous\Contracts\ElementConfigInterface;
use ReactUbiquitous\DTOs\Validation\ValidationRule;

abstract class BaseElementConfig implements ElementConfigInterface
{
    /** @param ValidationRule[] $validations */
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly ?int $order = null,
        public readonly ?string $width = null,
        public readonly ?string $label = null,
        public readonly ?string $labelPosition = null,
        public readonly ?string $tooltip = null,
        public readonly ?string $units = null,
        public readonly ?string $unitsPosition = null,
        public readonly ?bool $disabled = null,
        public readonly ?bool $readonly = null,
        public readonly ?bool $required = null,
        public readonly ?bool $hidden = null,
        public readonly ?string $hiddenExpr = null,
        public readonly ?string $disabledExpr = null,
        public readonly ?string $className = null,
        public readonly ?array $style = null,
        public readonly array $validations = [],
    ) {}

    protected function baseArray(): array
    {
        $data = array_filter([
            'id' => $this->id,
            'type' => $this->getType(),
            'name' => $this->name,
            'order' => $this->order,
            'width' => $this->width,
            'label' => $this->label,
            'labelPosition' => $this->labelPosition,
            'tooltip' => $this->tooltip,
            'units' => $this->units,
            'unitsPosition' => $this->unitsPosition,
            'disabled' => $this->disabled,
            'readonly' => $this->readonly,
            'required' => $this->required,
            'hidden' => $this->hidden,
            'hiddenExpr' => $this->hiddenExpr,
            'disabledExpr' => $this->disabledExpr,
            'className' => $this->className,
            'style' => $this->style,
        ], fn($v) => $v !== null);

        if (!empty($this->validations)) {
            $data['validations'] = array_map(
                fn(ValidationRule $v) => $v->toArray(),
                $this->validations
            );
        }

        return $data;
    }
}
