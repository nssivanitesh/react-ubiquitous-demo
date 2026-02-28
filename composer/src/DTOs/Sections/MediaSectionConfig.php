<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\MediaItem;

final class MediaSectionConfig extends BaseSectionConfig
{
    /** @param MediaItem[] $items */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $items = [],
        public readonly ?string $aspectRatio = null,
        public readonly ?bool $showArrows = null,
        public readonly ?bool $showDots = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'media'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'aspectRatio' => $this->aspectRatio,
            'showArrows' => $this->showArrows,
            'showDots' => $this->showDots,
        ], fn($v) => $v !== null);

        $extra['items'] = array_map(fn(MediaItem $i) => $i->toArray(), $this->items);

        return array_merge($this->baseArray(), $extra);
    }
}
