<?php

namespace ReactUbiquitous\DTOs\Sections;

final class AlertSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $severity = null,
        public readonly ?bool $dismissible = null,
        public readonly ?bool $icon = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'alert'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'severity' => $this->severity,
            'dismissible' => $this->dismissible,
            'icon' => $this->icon,
        ], fn($v) => $v !== null));
    }
}
