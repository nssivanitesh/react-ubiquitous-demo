<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ChartSeries implements SerializableInterface
{
    public function __construct(
        public readonly string $key,
        public readonly ?string $label = null,
        public readonly ?string $color = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'key' => $this->key,
            'label' => $this->label,
            'color' => $this->color,
        ], fn($v) => $v !== null);
    }
}
