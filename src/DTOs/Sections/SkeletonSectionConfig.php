<?php

namespace ReactUbiquitous\DTOs\Sections;

final class SkeletonSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $shape = null,
        public readonly ?int $lines = null,
        public readonly ?bool $avatar = null,
        public readonly ?string $width = null,
        public readonly ?string $height = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'skeleton'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'shape' => $this->shape,
            'lines' => $this->lines,
            'avatar' => $this->avatar,
            'width' => $this->width,
            'height' => $this->height,
        ], fn($v) => $v !== null));
    }
}
