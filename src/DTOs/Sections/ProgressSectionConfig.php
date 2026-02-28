<?php

namespace ReactUbiquitous\DTOs\Sections;

final class ProgressSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $variant = null,
        public readonly ?int $value = null,
        public readonly ?bool $showLabel = null,
        public readonly ?string $size = null,
        public readonly ?string $color = null,
        public readonly ?bool $indeterminate = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'progress'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'variant' => $this->variant,
            'value' => $this->value,
            'showLabel' => $this->showLabel,
            'size' => $this->size,
            'color' => $this->color,
            'indeterminate' => $this->indeterminate,
        ], fn($v) => $v !== null));
    }
}
