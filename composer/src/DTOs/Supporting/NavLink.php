<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class NavLink implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $href = null,
        public readonly ?bool $active = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'href' => $this->href,
            'active' => $this->active,
        ], fn($v) => $v !== null);
    }
}
