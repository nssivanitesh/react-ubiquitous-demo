<?php

namespace ReactUbiquitous\DTOs\Sections;

final class GridSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $gridTemplateColumns = null,
        public readonly ?string $gridTemplateRows = null,
        public readonly string|int|null $gap = null,
        public readonly string|int|null $rowGap = null,
        public readonly string|int|null $columnGap = null,
        public readonly ?string $alignItems = null,
        public readonly ?string $justifyItems = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'grid'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'gridTemplateColumns' => $this->gridTemplateColumns,
            'gridTemplateRows' => $this->gridTemplateRows,
            'gap' => $this->gap,
            'rowGap' => $this->rowGap,
            'columnGap' => $this->columnGap,
            'alignItems' => $this->alignItems,
            'justifyItems' => $this->justifyItems,
        ], fn($v) => $v !== null));
    }
}
