<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ListDetailItem implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $sublabel = null,
        public readonly ?string $avatar = null,
        public readonly ?string $badge = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'sublabel' => $this->sublabel,
            'avatar' => $this->avatar,
            'badge' => $this->badge,
        ], fn($v) => $v !== null);
    }
}
