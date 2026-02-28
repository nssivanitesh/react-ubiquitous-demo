<?php

namespace ReactUbiquitous\DTOs\Elements;

final class FileUploadElementConfig extends BaseElementConfig
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
        public readonly ?string $accept = null,
        public readonly ?bool $multiple = null,
        public readonly ?int $maxSize = null,
        public readonly ?string $placeholder = null,
    ) {
        parent::__construct($id, $name, $order, $width, $label, $labelPosition, $tooltip, $units, $unitsPosition, $disabled, $readonly, $required, $hidden, $hiddenExpr, $disabledExpr, $className, $style, $validations);
    }

    public function getType(): string { return 'fileupload'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'accept' => $this->accept,
            'multiple' => $this->multiple,
            'maxSize' => $this->maxSize,
            'placeholder' => $this->placeholder,
        ], fn($v) => $v !== null));
    }
}
