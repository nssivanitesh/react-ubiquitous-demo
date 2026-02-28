<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class MediaItem implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $type, // 'image' | 'video'
        public readonly string $url,
        public readonly ?string $alt = null,
        public readonly ?string $caption = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'type' => $this->type,
            'url' => $this->url,
            'alt' => $this->alt,
            'caption' => $this->caption,
        ], fn($v) => $v !== null);
    }
}
