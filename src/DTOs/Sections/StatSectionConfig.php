<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\StatItem;

final class StatSectionConfig extends BaseSectionConfig
{
    /** @param StatItem[] $stats */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $stats = [],
        public readonly ?int $columns = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'stat'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'columns' => $this->columns,
        ], fn($v) => $v !== null);

        $extra['stats'] = array_map(fn(StatItem $s) => $s->toArray(), $this->stats);

        return array_merge($this->baseArray(), $extra);
    }
}
