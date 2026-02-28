<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class SelectOptGroup implements SerializableInterface
{
    /** @param SelectOption[] $options */
    public function __construct(
        public readonly string $label,
        public readonly array $options,
        public readonly bool $group = true,
    ) {}

    public function toArray(): array
    {
        return [
            'group' => $this->group,
            'label' => $this->label,
            'options' => array_map(fn(SelectOption $o) => $o->toArray(), $this->options),
        ];
    }
}
