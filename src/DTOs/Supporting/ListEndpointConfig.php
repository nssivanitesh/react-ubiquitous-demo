<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ListEndpointConfig implements SerializableInterface
{
    public function __construct(
        public readonly string $url,
        public readonly ?string $fromParam = null,
        public readonly ?int $fromValue = null,
        public readonly ?string $toParam = null,
        public readonly ?int $toValue = null,
        public readonly ?string $sortParam = null,
        public readonly ?string $sortValue = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'url' => $this->url,
            'fromParam' => $this->fromParam,
            'fromValue' => $this->fromValue,
            'toParam' => $this->toParam,
            'toValue' => $this->toValue,
            'sortParam' => $this->sortParam,
            'sortValue' => $this->sortValue,
        ], fn($v) => $v !== null);
    }
}
