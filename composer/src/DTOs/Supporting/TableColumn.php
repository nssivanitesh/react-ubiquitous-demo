<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class TableColumn implements SerializableInterface
{
    public function __construct(
        public readonly string $key,
        public readonly string $label,
        public readonly ?bool $sortable = null,
        public readonly ?string $width = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'key' => $this->key,
            'label' => $this->label,
            'sortable' => $this->sortable,
            'width' => $this->width,
        ], fn($v) => $v !== null);
    }
}
