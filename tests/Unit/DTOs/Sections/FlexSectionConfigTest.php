<?php

namespace ReactUbiquitous\Tests\Unit\DTOs\Sections;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\DTOs\Sections\FlexSectionConfig;

class FlexSectionConfigTest extends TestCase
{
    public function test_can_create_minimal_flex_section(): void
    {
        $section = new FlexSectionConfig('s1', []);

        $this->assertSame('s1', $section->id);
        $this->assertSame('flex', $section->getLayout());
    }

    public function test_to_array_contains_layout(): void
    {
        $section = new FlexSectionConfig('s1', []);
        $array = $section->toArray();

        $this->assertSame('flex', $array['layout']);
        $this->assertSame('s1', $array['id']);
    }

    public function test_to_array_omits_null_flex_fields(): void
    {
        $section = new FlexSectionConfig('s1', []);
        $array = $section->toArray();

        $this->assertArrayNotHasKey('flexDirection', $array);
        $this->assertArrayNotHasKey('gap', $array);
    }

    public function test_to_array_includes_flex_fields_when_set(): void
    {
        $section = new FlexSectionConfig(
            id: 's1',
            elements: [],
            flexDirection: 'row',
            gap: '1rem',
        );
        $array = $section->toArray();

        $this->assertSame('row', $array['flexDirection']);
        $this->assertSame('1rem', $array['gap']);
    }
}
