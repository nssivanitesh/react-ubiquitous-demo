<?php

namespace ReactUbiquitous\DTOs\Sections;

final class DividerSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $label = null,
        public readonly ?string $orientation = null,
        public readonly ?string $variant = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'divider'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'label' => $this->label,
            'orientation' => $this->orientation,
            'variant' => $this->variant,
        ], fn($v) => $v !== null));
    }
}
