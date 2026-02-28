<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\TableColumn;

final class TableSectionConfig extends BaseSectionConfig
{
    /** @param TableColumn[] $columns */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $columns = [],
        public readonly array $rows = [],
        public readonly ?bool $searchable = null,
        public readonly ?int $pageSize = null,
        public readonly ?string $emptyMessage = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'table'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'searchable' => $this->searchable,
            'pageSize' => $this->pageSize,
            'emptyMessage' => $this->emptyMessage,
        ], fn($v) => $v !== null);

        $extra['columns'] = array_map(fn(TableColumn $c) => $c->toArray(), $this->columns);
        $extra['rows'] = $this->rows;

        return array_merge($this->baseArray(), $extra);
    }
}
