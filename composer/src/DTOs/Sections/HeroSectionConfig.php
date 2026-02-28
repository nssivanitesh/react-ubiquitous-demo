<?php

namespace ReactUbiquitous\DTOs\Sections;

final class HeroSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $subtitle = null,
        public readonly ?string $backgroundType = null,
        public readonly ?string $backgroundColor = null,
        public readonly ?string $gradientFrom = null,
        public readonly ?string $gradientTo = null,
        public readonly ?string $gradientDirection = null,
        public readonly ?string $backgroundImage = null,
        public readonly ?bool $overlay = null,
        public readonly ?int $overlayOpacity = null,
        public readonly ?string $minHeight = null,
        public readonly ?string $textAlign = null,
        public readonly ?string $verticalAlign = null,
        public readonly ?string $linkUrl = null,
        public readonly ?string $linkText = null,
        public readonly ?bool $linkRelative = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'hero'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'subtitle' => $this->subtitle,
            'backgroundType' => $this->backgroundType,
            'backgroundColor' => $this->backgroundColor,
            'gradientFrom' => $this->gradientFrom,
            'gradientTo' => $this->gradientTo,
            'gradientDirection' => $this->gradientDirection,
            'backgroundImage' => $this->backgroundImage,
            'overlay' => $this->overlay,
            'overlayOpacity' => $this->overlayOpacity,
            'minHeight' => $this->minHeight,
            'textAlign' => $this->textAlign,
            'verticalAlign' => $this->verticalAlign,
            'linkUrl' => $this->linkUrl,
            'linkText' => $this->linkText,
            'linkRelative' => $this->linkRelative,
        ], fn($v) => $v !== null));
    }
}
