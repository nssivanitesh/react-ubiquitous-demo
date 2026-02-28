<?php

namespace ReactUbiquitous\Tests\Unit\Builders;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\Builders\StageBuilder;
use ReactUbiquitous\Builders\PageBuilder;
use ReactUbiquitous\DTOs\UIStageConfig;
use ReactUbiquitous\Enums\UITheme;

class StageBuilderTest extends TestCase
{
    public function test_can_build_minimal_stage(): void
    {
        $stage = StageBuilder::make('stage1')->build();

        $this->assertInstanceOf(UIStageConfig::class, $stage);
        $this->assertSame('stage1', $stage->id);
    }

    public function test_builder_is_immutable(): void
    {
        $builder1 = StageBuilder::make('stage1');
        $builder2 = $builder1->title('My Stage');

        $this->assertNotSame($builder1, $builder2);
        $this->assertNull($builder1->build()->title);
        $this->assertSame('My Stage', $builder2->build()->title);
    }

    public function test_can_build_stage_with_all_fields(): void
    {
        $page = PageBuilder::make('p1', 'Home')->build();
        $stage = StageBuilder::make('stage1')
            ->title('My App')
            ->description('App description')
            ->defaultPageId('p1')
            ->theme(UITheme::Dark)
            ->className('my-class')
            ->pageTransition('fade')
            ->addPage($page)
            ->build();

        $this->assertSame('My App', $stage->title);
        $this->assertSame('App description', $stage->description);
        $this->assertSame('p1', $stage->defaultPageId);
        $this->assertSame(UITheme::Dark, $stage->theme);
        $this->assertSame('my-class', $stage->className);
        $this->assertCount(1, $stage->pages);
    }

    public function test_to_array_serializes_correctly(): void
    {
        $stage = StageBuilder::make('stage1')
            ->title('App')
            ->theme(UITheme::Light)
            ->build();

        $array = $stage->toArray();

        $this->assertSame('stage1', $array['id']);
        $this->assertSame('App', $array['title']);
        $this->assertSame('light', $array['theme']);
    }
}
