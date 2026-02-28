<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\SidebarItem;

final class SidebarSectionConfig extends BaseSectionConfig
{
    /** @param SidebarItem[] $items */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $items = [],
        public readonly ?bool $defaultCollapsed = null,
        public readonly ?bool $collapsible = null,
        public readonly ?string $width = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'sidebar'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'defaultCollapsed' => $this->defaultCollapsed,
            'collapsible' => $this->collapsible,
            'width' => $this->width,
        ], fn($v) => $v !== null);

        $extra['items'] = array_map(fn(SidebarItem $i) => $i->toArray(), $this->items);

        return array_merge($this->baseArray(), $extra);
    }
}
