<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\BreadcrumbItem;

final class BreadcrumbsSectionConfig extends BaseSectionConfig
{
    /** @param BreadcrumbItem[] $items */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $items = [],
        public readonly ?string $separator = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'breadcrumbs'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'separator' => $this->separator,
        ], fn($v) => $v !== null);

        $extra['items'] = array_map(fn(BreadcrumbItem $i) => $i->toArray(), $this->items);

        return array_merge($this->baseArray(), $extra);
    }
}
