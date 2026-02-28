<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class FilterEndpointConfig implements SerializableInterface
{
    public function __construct(
        public readonly string $url,
        public readonly ?string $queryParam = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'url' => $this->url,
            'queryParam' => $this->queryParam,
        ], fn($v) => $v !== null);
    }
}
