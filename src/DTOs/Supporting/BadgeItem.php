<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class BadgeItem implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $variant = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'variant' => $this->variant,
        ], fn($v) => $v !== null);
    }
}
