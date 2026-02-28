<?php

namespace ReactUbiquitous\DTOs\Sections;

final class TooltipSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $content = null,
        public readonly ?string $placement = null,
        public readonly ?string $triggerLabel = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'tooltip'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'content' => $this->content,
            'placement' => $this->placement,
            'triggerLabel' => $this->triggerLabel,
        ], fn($v) => $v !== null));
    }
}
