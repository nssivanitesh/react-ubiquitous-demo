<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class DetailEndpointConfig implements SerializableInterface
{
    public function __construct(
        public readonly string $url,
        public readonly ?string $selectedParam = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'url' => $this->url,
            'selectedParam' => $this->selectedParam,
        ], fn($v) => $v !== null);
    }
}
