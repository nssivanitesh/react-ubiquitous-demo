<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\ListDetailItem;
use ReactUbiquitous\DTOs\Supporting\ListEndpointConfig;
use ReactUbiquitous\DTOs\Supporting\FilterEndpointConfig;
use ReactUbiquitous\DTOs\Supporting\DetailEndpointConfig;
use ReactUbiquitous\DTOs\Supporting\DetailPage;

final class ListDetailSectionConfig extends BaseSectionConfig
{
    /** @param ListDetailItem[] $listItems */
    /** @param DetailPage[] $detailPages */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $listTitle = null,
        public readonly ?string $listWidth = null,
        public readonly ?int $pageSize = null,
        public readonly array $listItems = [],
        public readonly ?ListEndpointConfig $listEndpoint = null,
        public readonly ?FilterEndpointConfig $filterEndpoint = null,
        public readonly ?DetailEndpointConfig $detailEndpoint = null,
        public readonly array $detailPages = [],
        public readonly ?bool $virtualScrolling = null,
        public readonly ?int $virtualListHeight = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'list-detail'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'listTitle' => $this->listTitle,
            'listWidth' => $this->listWidth,
            'pageSize' => $this->pageSize,
            'virtualScrolling' => $this->virtualScrolling,
            'virtualListHeight' => $this->virtualListHeight,
            'listEndpoint' => $this->listEndpoint?->toArray(),
            'filterEndpoint' => $this->filterEndpoint?->toArray(),
            'detailEndpoint' => $this->detailEndpoint?->toArray(),
        ], fn($v) => $v !== null);

        $extra['listItems'] = array_map(fn(ListDetailItem $i) => $i->toArray(), $this->listItems);
        $extra['detailPages'] = array_map(fn(DetailPage $p) => $p->toArray(), $this->detailPages);

        return array_merge($this->baseArray(), $extra);
    }
}
