<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\TreeViewNode;
use ReactUbiquitous\DTOs\Supporting\DetailEndpointConfig;
use ReactUbiquitous\DTOs\Supporting\DetailPage;

final class TreeViewSectionConfig extends BaseSectionConfig
{
    /** @param TreeViewNode[] $treeNodes */
    /** @param DetailPage[] $detailPages */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $treeTitle = null,
        public readonly ?string $treeWidth = null,
        public readonly ?string $treeMode = null,
        public readonly array $treeNodes = [],
        public readonly ?DetailEndpointConfig $detailEndpoint = null,
        public readonly array $detailPages = [],
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'tree-view'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'treeTitle' => $this->treeTitle,
            'treeWidth' => $this->treeWidth,
            'treeMode' => $this->treeMode,
            'detailEndpoint' => $this->detailEndpoint?->toArray(),
        ], fn($v) => $v !== null);

        $extra['treeNodes'] = array_map(fn(TreeViewNode $n) => $n->toArray(), $this->treeNodes);
        $extra['detailPages'] = array_map(fn(DetailPage $p) => $p->toArray(), $this->detailPages);

        return array_merge($this->baseArray(), $extra);
    }
}
