<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\TabItem;

final class TabsSectionConfig extends BaseSectionConfig
{
    /** @param TabItem[] $tabs */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $tabs = [],
        public readonly ?string $defaultTabId = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'tabs'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'defaultTabId' => $this->defaultTabId,
        ], fn($v) => $v !== null);

        $extra['tabs'] = array_map(fn(TabItem $t) => $t->toArray(), $this->tabs);

        return array_merge($this->baseArray(), $extra);
    }
}
