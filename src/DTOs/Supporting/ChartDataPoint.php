<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ChartDataPoint implements SerializableInterface
{
    public function __construct(
        public readonly string $label,
        public readonly ?float $value = null,
        public readonly array $extra = [],
    ) {}

    public function toArray(): array
    {
        $data = array_filter([
            'label' => $this->label,
            'value' => $this->value,
        ], fn($v) => $v !== null);

        return array_merge($data, $this->extra);
    }
}
