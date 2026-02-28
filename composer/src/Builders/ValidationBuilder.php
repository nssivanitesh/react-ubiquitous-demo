<?php

namespace ReactUbiquitous\Builders;

use ReactUbiquitous\DTOs\Validation\ValidationRule;

final class ValidationBuilder
{
    private array $rules = [];

    public static function make(): self
    {
        return new self();
    }

    public function required(?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'required', message: $message);
        return $clone;
    }

    public function min(int|float|string $value, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'min', value: $value, message: $message);
        return $clone;
    }

    public function max(int|float|string $value, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'max', value: $value, message: $message);
        return $clone;
    }

    public function minLength(int $value, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'minLength', value: $value, message: $message);
        return $clone;
    }

    public function maxLength(int $value, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'maxLength', value: $value, message: $message);
        return $clone;
    }

    public function pattern(string $regex, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'pattern', value: $regex, message: $message);
        return $clone;
    }

    public function email(?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'email', message: $message);
        return $clone;
    }

    public function url(?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'url', message: $message);
        return $clone;
    }

    public function phone(?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'phone', message: $message);
        return $clone;
    }

    public function step(int|float $value, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(rule: 'step', value: $value, message: $message);
        return $clone;
    }

    public function custom(string $validator, ?array $config = null, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(
            rule: 'custom',
            validator: $validator,
            config: $config,
            message: $message
        );
        return $clone;
    }

    public function orGroup(array $rules, ?string $message = null): self
    {
        $clone = clone $this;
        $clone->rules[] = new ValidationRule(
            rule: 'group',
            operator: 'or',
            rules: $rules,
            message: $message
        );
        return $clone;
    }

    /** @return ValidationRule[] */
    public function build(): array
    {
        return $this->rules;
    }
}
