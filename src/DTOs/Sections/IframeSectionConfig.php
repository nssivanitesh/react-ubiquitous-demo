<?php

namespace ReactUbiquitous\DTOs\Sections;

final class IframeSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly string $src = '',
        public readonly ?array $queryParams = null,
        public readonly ?string $frameWidth = null,
        public readonly ?string $frameHeight = null,
        public readonly ?string $sandbox = null,
        public readonly ?string $frameTitle = null,
        public readonly ?bool $allowFullscreen = null,
        public readonly ?bool $showLoader = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'iframe'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'src' => $this->src,
            'queryParams' => $this->queryParams,
            'frameWidth' => $this->frameWidth,
            'frameHeight' => $this->frameHeight,
            'sandbox' => $this->sandbox,
            'frameTitle' => $this->frameTitle,
            'allowFullscreen' => $this->allowFullscreen,
            'showLoader' => $this->showLoader,
        ], fn($v) => $v !== null));
    }
}
