<?php

namespace ReactUbiquitous\Helpers;

use ReactUbiquitous\Builders\StageBuilder;
use ReactUbiquitous\Builders\PageBuilder;
use ReactUbiquitous\Builders\ValidationBuilder;
use ReactUbiquitous\DTOs\UIStageConfig;
use ReactUbiquitous\DTOs\UIPageConfig;
use ReactUbiquitous\DTOs\Sections\FlexSectionConfig;
use ReactUbiquitous\DTOs\Sections\GridSectionConfig;
use ReactUbiquitous\DTOs\Supporting\SelectOption;
use ReactUbiquitous\DTOs\Supporting\RadioOption;
use ReactUbiquitous\DTOs\Supporting\NavLink;
use ReactUbiquitous\DTOs\Supporting\BreadcrumbItem;
use ReactUbiquitous\DTOs\Supporting\TableColumn;
use ReactUbiquitous\DTOs\Supporting\BadgeItem;
use ReactUbiquitous\DTOs\Supporting\AvatarItem;
use ReactUbiquitous\DTOs\Supporting\StatItem;
use ReactUbiquitous\DTOs\Supporting\TimelineEvent;
use ReactUbiquitous\DTOs\Supporting\ChartDataPoint;

final class UIHelper
{
    public static function stage(string $id): StageBuilder
    {
        return StageBuilder::make($id);
    }

    public static function page(string $id, string $title, int $order = 1): PageBuilder
    {
        return PageBuilder::make($id, $title, $order);
    }

    public static function validation(): ValidationBuilder
    {
        return ValidationBuilder::make();
    }

    public static function selectOption(string $label, string $value, bool $disabled = false): SelectOption
    {
        return new SelectOption($label, $value, $disabled ?: null);
    }

    public static function selectOptions(array $items): array
    {
        return array_map(
            fn(array $item) => new SelectOption($item['label'], $item['value'], $item['disabled'] ?? null),
            $items
        );
    }

    public static function radioOption(string $label, string $value, bool $disabled = false): RadioOption
    {
        return new RadioOption($label, $value, $disabled ?: null);
    }

    public static function navLink(string $id, string $label, ?string $href = null, bool $active = false): NavLink
    {
        return new NavLink($id, $label, $href, $active ?: null);
    }

    public static function breadcrumb(string $id, string $label, ?string $href = null): BreadcrumbItem
    {
        return new BreadcrumbItem($id, $label, $href);
    }

    public static function tableColumn(string $key, string $label, bool $sortable = false, ?string $width = null): TableColumn
    {
        return new TableColumn($key, $label, $sortable ?: null, $width);
    }

    public static function badge(string $id, string $label, ?string $variant = null): BadgeItem
    {
        return new BadgeItem($id, $label, $variant);
    }

    public static function avatar(string $id, ?string $src = null, ?string $initials = null, ?string $name = null): AvatarItem
    {
        return new AvatarItem($id, $initials, $src, null, $name);
    }

    public static function stat(string $id, string $value, string $label): StatItem
    {
        return new StatItem($id, $value, $label);
    }

    public static function timelineEvent(string $id, string $title, ?string $description = null): TimelineEvent
    {
        return new TimelineEvent($id, $title, $description);
    }

    public static function chartPoint(string $label, ?float $value = null, array $extra = []): ChartDataPoint
    {
        return new ChartDataPoint($label, $value, $extra);
    }

    public static function stageToJson(UIStageConfig $stage, int $flags = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE): string
    {
        return json_encode($stage->toArray(), $flags);
    }

    public static function pageToJson(UIPageConfig $page, int $flags = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE): string
    {
        return json_encode($page->toArray(), $flags);
    }
}
