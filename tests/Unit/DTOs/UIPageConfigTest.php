<?php

namespace ReactUbiquitous\Tests\Unit\DTOs;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\DTOs\UIPageConfig;

class UIPageConfigTest extends TestCase
{
    public function test_can_create_page(): void
    {
        $page = new UIPageConfig('page1', 'My Page', 1, []);

        $this->assertSame('page1', $page->id);
        $this->assertSame('My Page', $page->title);
        $this->assertSame(1, $page->order);
    }

    public function test_to_array_contains_required_fields(): void
    {
        $page = new UIPageConfig('page1', 'My Page', 1, []);
        $array = $page->toArray();

        $this->assertSame('page1', $array['id']);
        $this->assertSame('My Page', $array['title']);
        $this->assertSame(1, $array['order']);
    }

    public function test_to_array_omits_null_optional_fields(): void
    {
        $page = new UIPageConfig('page1', 'My Page', 1, []);
        $array = $page->toArray();

        $this->assertArrayNotHasKey('description', $array);
        $this->assertArrayNotHasKey('icon', $array);
    }

    public function test_to_array_includes_optional_fields_when_set(): void
    {
        $page = new UIPageConfig(
            id: 'page1',
            title: 'My Page',
            order: 1,
            sections: [],
            description: 'A description',
            icon: 'settings',
            visible: false,
        );
        $array = $page->toArray();

        $this->assertSame('A description', $array['description']);
        $this->assertSame('settings', $array['icon']);
        $this->assertFalse($array['visible']);
    }
}
