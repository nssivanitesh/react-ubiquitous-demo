<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\ChartDataPoint;
use ReactUbiquitous\DTOs\Supporting\ChartSeries;

final class ChartSectionConfig extends BaseSectionConfig
{
    /** @param ChartDataPoint[] $data */
    /** @param ChartSeries[] $series */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly string $chartType = '',
        public readonly array $data = [],
        public readonly array $series = [],
        public readonly ?bool $showGrid = null,
        public readonly ?bool $showLegend = null,
        public readonly ?bool $showLabels = null,
        public readonly ?int $height = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'chart'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'chartType' => $this->chartType,
            'showGrid' => $this->showGrid,
            'showLegend' => $this->showLegend,
            'showLabels' => $this->showLabels,
            'height' => $this->height,
        ], fn($v) => $v !== null);

        $extra['data'] = array_map(fn(ChartDataPoint $d) => $d->toArray(), $this->data);

        if (!empty($this->series)) {
            $extra['series'] = array_map(fn(ChartSeries $s) => $s->toArray(), $this->series);
        }

        return array_merge($this->baseArray(), $extra);
    }
}
