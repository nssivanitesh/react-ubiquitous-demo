<?php

namespace ReactUbiquitous\DTOs\Sections;

final class ToastSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $message = null,
        public readonly ?string $severity = null,
        public readonly ?int $duration = null,
        public readonly ?string $position = null,
        public readonly ?bool $visible = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'toast'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'message' => $this->message,
            'severity' => $this->severity,
            'duration' => $this->duration,
            'position' => $this->position,
            'visible' => $this->visible,
        ], fn($v) => $v !== null));
    }
}
