<?php

namespace ReactUbiquitous\DTOs\Sections;

final class DrawerSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?bool $open = null,
        public readonly ?string $placement = null,
        public readonly ?string $size = null,
        public readonly ?bool $closeOnBackdrop = null,
        public readonly ?bool $showCloseButton = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'drawer'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'open' => $this->open,
            'placement' => $this->placement,
            'size' => $this->size,
            'closeOnBackdrop' => $this->closeOnBackdrop,
            'showCloseButton' => $this->showCloseButton,
        ], fn($v) => $v !== null));
    }
}
