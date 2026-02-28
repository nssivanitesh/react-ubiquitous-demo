<?php

namespace ReactUbiquitous\Tests\Unit\DTOs\Elements;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\DTOs\Elements\InputElementConfig;
use ReactUbiquitous\DTOs\Validation\ValidationRule;
use ReactUbiquitous\Enums\InputType;

class InputElementConfigTest extends TestCase
{
    public function test_can_create_input_element(): void
    {
        $input = new InputElementConfig(
            id: 'f1',
            name: 'email',
            inputType: InputType::Email->value,
        );

        $this->assertSame('f1', $input->id);
        $this->assertSame('email', $input->name);
        $this->assertSame('input', $input->getType());
    }

    public function test_to_array_contains_required_fields(): void
    {
        $input = new InputElementConfig('f1', 'email', 'email');
        $array = $input->toArray();

        $this->assertSame('input', $array['type']);
        $this->assertSame('f1', $array['id']);
        $this->assertSame('email', $array['name']);
        $this->assertSame('email', $array['inputType']);
    }

    public function test_to_array_omits_null_fields(): void
    {
        $input = new InputElementConfig('f1', 'field', 'text');
        $array = $input->toArray();

        $this->assertArrayNotHasKey('placeholder', $array);
        $this->assertArrayNotHasKey('disabled', $array);
    }

    public function test_to_array_includes_validations(): void
    {
        $rules = [
            new ValidationRule('required'),
            new ValidationRule('email'),
        ];
        $input = new InputElementConfig(
            id: 'f1',
            name: 'email',
            inputType: 'email',
            validations: $rules,
        );
        $array = $input->toArray();

        $this->assertArrayHasKey('validations', $array);
        $this->assertCount(2, $array['validations']);
    }
}
