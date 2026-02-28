<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class SidebarItem implements SerializableInterface
{
    /** @param SidebarItem[] $children */
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $href = null,
        public readonly ?string $icon = null,
        public readonly ?bool $active = null,
        public readonly array $children = [],
    ) {}

    public function toArray(): array
    {
        $data = array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'href' => $this->href,
            'icon' => $this->icon,
            'active' => $this->active,
        ], fn($v) => $v !== null);

        if (!empty($this->children)) {
            $data['children'] = array_map(fn(SidebarItem $c) => $c->toArray(), $this->children);
        }

        return $data;
    }
}
