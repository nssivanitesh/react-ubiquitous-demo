<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\AvatarItem;

final class AvatarSectionConfig extends BaseSectionConfig
{
    /** @param AvatarItem[] $avatars */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $avatars = [],
        public readonly ?string $size = null,
        public readonly ?bool $stacked = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'avatar'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'size' => $this->size,
            'stacked' => $this->stacked,
        ], fn($v) => $v !== null);

        $extra['avatars'] = array_map(fn(AvatarItem $a) => $a->toArray(), $this->avatars);

        return array_merge($this->baseArray(), $extra);
    }
}
