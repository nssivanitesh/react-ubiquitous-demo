<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class PhoneCountryOption implements SerializableInterface
{
    public function __construct(
        public readonly string $label,
        public readonly string $code,
        public readonly string $dialCode,
    ) {}

    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'code' => $this->code,
            'dialCode' => $this->dialCode,
        ];
    }
}
