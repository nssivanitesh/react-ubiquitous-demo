<?php

namespace ReactUbiquitous\DTOs\Validation;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ValidationRule implements SerializableInterface
{
    public function __construct(
        public readonly string $rule,
        public readonly string|int|float|array|null $value = null,
        public readonly ?string $message = null,
        public readonly ?string $validator = null,
        public readonly ?array $config = null,
        public readonly ?string $operator = null,
        public readonly ?array $rules = null,
    ) {}

    public function toArray(): array
    {
        $data = ['rule' => $this->rule];

        if ($this->value !== null) {
            $data['value'] = $this->value;
        }
        if ($this->message !== null) {
            $data['message'] = $this->message;
        }
        if ($this->validator !== null) {
            $data['validator'] = $this->validator;
        }
        if ($this->config !== null) {
            $data['config'] = $this->config;
        }
        if ($this->operator !== null) {
            $data['operator'] = $this->operator;
        }
        if ($this->rules !== null) {
            $data['rules'] = array_map(
                fn(ValidationRule $r) => $r->toArray(),
                $this->rules
            );
        }

        return $data;
    }
}
