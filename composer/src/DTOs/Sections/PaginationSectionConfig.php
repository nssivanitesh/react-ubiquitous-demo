<?php

namespace ReactUbiquitous\DTOs\Sections;

final class PaginationSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly int $totalItems = 0,
        public readonly ?int $pageSize = null,
        public readonly ?int $currentPage = null,
        public readonly ?bool $showFirstLast = null,
        public readonly ?bool $showPrevNext = null,
        public readonly ?int $maxPageButtons = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'pagination'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'totalItems' => $this->totalItems,
            'pageSize' => $this->pageSize,
            'currentPage' => $this->currentPage,
            'showFirstLast' => $this->showFirstLast,
            'showPrevNext' => $this->showPrevNext,
            'maxPageButtons' => $this->maxPageButtons,
        ], fn($v) => $v !== null));
    }
}
