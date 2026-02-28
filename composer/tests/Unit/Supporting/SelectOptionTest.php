<?php

namespace ReactUbiquitous\Tests\Unit\Supporting;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\DTOs\Supporting\SelectOption;

class SelectOptionTest extends TestCase
{
    public function test_can_create_select_option(): void
    {
        $opt = new SelectOption('Option 1', 'opt1');

        $this->assertSame('Option 1', $opt->label);
        $this->assertSame('opt1', $opt->value);
        $this->assertNull($opt->disabled);
    }

    public function test_to_array_without_disabled(): void
    {
        $opt = new SelectOption('Option 1', 'opt1');
        $array = $opt->toArray();

        $this->assertSame(['label' => 'Option 1', 'value' => 'opt1'], $array);
    }

    public function test_to_array_with_disabled(): void
    {
        $opt = new SelectOption('Option 1', 'opt1', true);
        $array = $opt->toArray();

        $this->assertArrayHasKey('disabled', $array);
        $this->assertTrue($array['disabled']);
    }
}
