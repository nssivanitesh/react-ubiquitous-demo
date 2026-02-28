<?php

namespace ReactUbiquitous\DTOs\Sections;

final class EmptyStateSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $heading = null,
        public readonly ?string $message = null,
        public readonly ?string $icon = null,
        public readonly ?string $actionLabel = null,
        public readonly ?string $actionHref = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'empty-state'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'heading' => $this->heading,
            'message' => $this->message,
            'icon' => $this->icon,
            'actionLabel' => $this->actionLabel,
            'actionHref' => $this->actionHref,
        ], fn($v) => $v !== null));
    }
}
