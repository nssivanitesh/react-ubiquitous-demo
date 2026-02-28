<?php

namespace ReactUbiquitous\Tests\Unit\Builders;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\Builders\ValidationBuilder;
use ReactUbiquitous\DTOs\Validation\ValidationRule;

class ValidationBuilderTest extends TestCase
{
    public function test_can_build_empty_rules(): void
    {
        $rules = ValidationBuilder::make()->build();
        $this->assertIsArray($rules);
        $this->assertEmpty($rules);
    }

    public function test_can_add_required_rule(): void
    {
        $rules = ValidationBuilder::make()->required()->build();

        $this->assertCount(1, $rules);
        $this->assertSame('required', $rules[0]->rule);
    }

    public function test_can_add_multiple_rules(): void
    {
        $rules = ValidationBuilder::make()
            ->required()
            ->email()
            ->minLength(5)
            ->build();

        $this->assertCount(3, $rules);
        $this->assertSame('required', $rules[0]->rule);
        $this->assertSame('email', $rules[1]->rule);
        $this->assertSame('minLength', $rules[2]->rule);
        $this->assertSame(5, $rules[2]->value);
    }

    public function test_builder_is_immutable(): void
    {
        $b1 = ValidationBuilder::make();
        $b2 = $b1->required();

        $this->assertNotSame($b1, $b2);
        $this->assertEmpty($b1->build());
        $this->assertCount(1, $b2->build());
    }

    public function test_validation_rules_serialize_to_array(): void
    {
        $rules = ValidationBuilder::make()
            ->required('This field is required')
            ->minLength(3, 'Minimum 3 chars')
            ->build();

        $this->assertSame(['rule' => 'required', 'message' => 'This field is required'], $rules[0]->toArray());
        $this->assertSame(['rule' => 'minLength', 'value' => 3, 'message' => 'Minimum 3 chars'], $rules[1]->toArray());
    }

    public function test_can_build_or_group(): void
    {
        $emailRule = new ValidationRule('email');
        $urlRule = new ValidationRule('url');
        $rules = ValidationBuilder::make()
            ->required()
            ->orGroup([$emailRule, $urlRule], 'Must be email or URL')
            ->build();

        $this->assertCount(2, $rules);
        $array = $rules[1]->toArray();
        $this->assertSame('group', $array['rule']);
        $this->assertSame('or', $array['operator']);
    }
}
