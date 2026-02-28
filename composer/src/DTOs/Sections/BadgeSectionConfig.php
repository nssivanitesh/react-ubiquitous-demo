<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\BadgeItem;

final class BadgeSectionConfig extends BaseSectionConfig
{
    /** @param BadgeItem[] $badges */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $badges = [],
        public readonly ?string $appearance = null,
        public readonly ?string $size = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'badge'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'appearance' => $this->appearance,
            'size' => $this->size,
        ], fn($v) => $v !== null);

        $extra['badges'] = array_map(fn(BadgeItem $b) => $b->toArray(), $this->badges);

        return array_merge($this->baseArray(), $extra);
    }
}
