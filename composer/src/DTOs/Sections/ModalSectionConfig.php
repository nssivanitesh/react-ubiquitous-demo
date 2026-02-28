<?php

namespace ReactUbiquitous\DTOs\Sections;

final class ModalSectionConfig extends BaseSectionConfig
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
        public readonly ?string $size = null,
        public readonly ?bool $closeOnBackdrop = null,
        public readonly ?bool $showCloseButton = null,
        public readonly ?string $confirmLabel = null,
        public readonly ?string $cancelLabel = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'modal'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'open' => $this->open,
            'size' => $this->size,
            'closeOnBackdrop' => $this->closeOnBackdrop,
            'showCloseButton' => $this->showCloseButton,
            'confirmLabel' => $this->confirmLabel,
            'cancelLabel' => $this->cancelLabel,
        ], fn($v) => $v !== null));
    }
}
