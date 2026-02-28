<?php

namespace ReactUbiquitous\DTOs\Sections;

final class CollapseSectionConfig extends BaseSectionConfig
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
        public readonly ?bool $defaultOpen = null,
        public readonly ?bool $icon = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'collapse'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'label' => $this->label,
            'defaultOpen' => $this->defaultOpen,
            'icon' => $this->icon,
        ], fn($v) => $v !== null));
    }
}
