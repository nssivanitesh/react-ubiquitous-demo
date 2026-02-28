<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class TimelineEvent implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly ?string $description = null,
        public readonly ?string $timestamp = null,
        public readonly ?string $variant = null,
        public readonly ?string $icon = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'timestamp' => $this->timestamp,
            'variant' => $this->variant,
            'icon' => $this->icon,
        ], fn($v) => $v !== null);
    }
}
