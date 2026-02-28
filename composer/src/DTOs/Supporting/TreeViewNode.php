<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class TreeViewNode implements SerializableInterface
{
    /** @param TreeViewNode[] $children */
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $sublabel = null,
        public readonly ?string $badge = null,
        public readonly array $children = [],
    ) {}

    public function toArray(): array
    {
        $data = array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'sublabel' => $this->sublabel,
            'badge' => $this->badge,
        ], fn($v) => $v !== null);

        if (!empty($this->children)) {
            $data['children'] = array_map(fn(TreeViewNode $c) => $c->toArray(), $this->children);
        }

        return $data;
    }
}
