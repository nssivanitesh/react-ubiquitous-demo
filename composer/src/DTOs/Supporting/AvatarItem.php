<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class AvatarItem implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly ?string $initials = null,
        public readonly ?string $src = null,
        public readonly ?string $alt = null,
        public readonly ?string $name = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'initials' => $this->initials,
            'src' => $this->src,
            'alt' => $this->alt,
            'name' => $this->name,
        ], fn($v) => $v !== null);
    }
}
