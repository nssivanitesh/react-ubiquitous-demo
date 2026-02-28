<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class StatItem implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $value,
        public readonly string $label,
        public readonly ?string $subLabel = null,
        public readonly ?string $trend = null,
        public readonly ?string $trendDirection = null,
        public readonly ?string $icon = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'value' => $this->value,
            'label' => $this->label,
            'subLabel' => $this->subLabel,
            'trend' => $this->trend,
            'trendDirection' => $this->trendDirection,
            'icon' => $this->icon,
        ], fn($v) => $v !== null);
    }
}
