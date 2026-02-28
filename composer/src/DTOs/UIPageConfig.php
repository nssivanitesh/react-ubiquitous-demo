<?php

namespace ReactUbiquitous\DTOs;

use ReactUbiquitous\Contracts\SerializableInterface;

final class UIPageConfig implements SerializableInterface
{
    /** @param array $sections UISectionConfig[] */
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly int $order,
        public readonly array $sections,
        public readonly ?string $description = null,
        public readonly ?string $icon = null,
        public readonly ?string $className = null,
        public readonly ?bool $visible = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'icon' => $this->icon,
            'order' => $this->order,
            'sections' => array_map(fn($s) => $s->toArray(), $this->sections),
            'className' => $this->className,
            'visible' => $this->visible,
        ], fn($v) => $v !== null);
    }
}
