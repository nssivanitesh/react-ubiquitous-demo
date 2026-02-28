<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class BreadcrumbItem implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $href = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'href' => $this->href,
        ], fn($v) => $v !== null);
    }
}
