<?php

namespace ReactUbiquitous\Tests\Unit\Helpers;

use PHPUnit\Framework\TestCase;
use ReactUbiquitous\Helpers\UIHelper;
use ReactUbiquitous\Builders\StageBuilder;
use ReactUbiquitous\Builders\PageBuilder;
use ReactUbiquitous\Builders\ValidationBuilder;
use ReactUbiquitous\DTOs\Supporting\SelectOption;
use ReactUbiquitous\DTOs\Supporting\NavLink;
use ReactUbiquitous\DTOs\Supporting\BadgeItem;
use ReactUbiquitous\DTOs\Supporting\StatItem;

class UIHelperTest extends TestCase
{
    public function test_stage_returns_builder(): void
    {
        $this->assertInstanceOf(StageBuilder::class, UIHelper::stage('s1'));
    }

    public function test_page_returns_builder(): void
    {
        $this->assertInstanceOf(PageBuilder::class, UIHelper::page('p1', 'Home'));
    }

    public function test_validation_returns_builder(): void
    {
        $this->assertInstanceOf(ValidationBuilder::class, UIHelper::validation());
    }

    public function test_select_option_creates_correctly(): void
    {
        $opt = UIHelper::selectOption('Label', 'value');

        $this->assertInstanceOf(SelectOption::class, $opt);
        $this->assertSame('Label', $opt->label);
        $this->assertSame('value', $opt->value);
    }

    public function test_select_options_from_array(): void
    {
        $opts = UIHelper::selectOptions([
            ['label' => 'One', 'value' => '1'],
            ['label' => 'Two', 'value' => '2'],
        ]);

        $this->assertCount(2, $opts);
        $this->assertInstanceOf(SelectOption::class, $opts[0]);
    }

    public function test_nav_link_creates_correctly(): void
    {
        $link = UIHelper::navLink('l1', 'Home', '/home', true);

        $this->assertInstanceOf(NavLink::class, $link);
        $array = $link->toArray();
        $this->assertSame('l1', $array['id']);
        $this->assertSame('/home', $array['href']);
        $this->assertTrue($array['active']);
    }

    public function test_badge_creates_correctly(): void
    {
        $badge = UIHelper::badge('b1', 'New', 'success');
        $this->assertInstanceOf(BadgeItem::class, $badge);
    }

    public function test_stat_creates_correctly(): void
    {
        $stat = UIHelper::stat('s1', '42', 'Total Users');
        $this->assertInstanceOf(StatItem::class, $stat);
        $this->assertSame('42', $stat->value);
    }

    public function test_stage_to_json(): void
    {
        $stage = UIHelper::stage('s1')
            ->title('My App')
            ->build();
        $json = UIHelper::stageToJson($stage);

        $this->assertJson($json);
        $data = json_decode($json, true);
        $this->assertSame('s1', $data['id']);
    }
}
