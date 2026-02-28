<?php

namespace ReactUbiquitous\Tests\Unit\DTOs;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\DTOs\UIStageConfig;
use ReactUbiquitous\DTOs\UIPageConfig;
use ReactUbiquitous\Enums\UITheme;
use ReactUbiquitous\Enums\UIPageTransition;

class UIStageConfigTest extends TestCase
{
    public function test_can_create_minimal_stage(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page]);

        $this->assertSame('stage1', $stage->id);
        $this->assertCount(1, $stage->pages);
    }

    public function test_to_array_contains_required_fields(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page]);
        $array = $stage->toArray();

        $this->assertArrayHasKey('id', $array);
        $this->assertArrayHasKey('pages', $array);
        $this->assertSame('stage1', $array['id']);
    }

    public function test_to_array_omits_null_fields(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page]);
        $array = $stage->toArray();

        $this->assertArrayNotHasKey('title', $array);
        $this->assertArrayNotHasKey('description', $array);
        $this->assertArrayNotHasKey('theme', $array);
    }

    public function test_to_array_includes_theme_enum_value(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page], theme: UITheme::Dark);
        $array = $stage->toArray();

        $this->assertSame('dark', $array['theme']);
    }

    public function test_to_array_includes_page_transition_enum_value(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page], pageTransition: UIPageTransition::Fade);
        $array = $stage->toArray();

        $this->assertSame('fade', $array['pageTransition']);
    }

    public function test_to_array_includes_string_theme(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page], theme: 'custom');
        $array = $stage->toArray();

        $this->assertSame('custom', $array['theme']);
    }

    public function test_pages_are_serialized(): void
    {
        $page = new UIPageConfig('page1', 'Home', 1, []);
        $stage = new UIStageConfig('stage1', [$page]);
        $array = $stage->toArray();

        $this->assertIsArray($array['pages']);
        $this->assertCount(1, $array['pages']);
        $this->assertSame('page1', $array['pages'][0]['id']);
    }
}
