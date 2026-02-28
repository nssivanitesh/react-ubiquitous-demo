<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class RadioOption implements SerializableInterface
{
    public function __construct(
        public readonly string $label,
        public readonly string $value,
        public readonly ?bool $disabled = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'label' => $this->label,
            'value' => $this->value,
            'disabled' => $this->disabled,
        ], fn($v) => $v !== null);
    }
}
