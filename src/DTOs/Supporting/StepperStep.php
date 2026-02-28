<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class StepperStep implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $description = null,
        public readonly ?string $status = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'description' => $this->description,
            'status' => $this->status,
        ], fn($v) => $v !== null);
    }
}
