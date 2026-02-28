<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\Contracts\SectionConfigInterface;

abstract class BaseSectionConfig implements SectionConfigInterface
{
    /** @param array $elements UIElementConfig[] */
    public function __construct(
        public readonly string $id,
        public readonly array $elements,
        public readonly ?string $title = null,
        public readonly ?string $description = null,
        public readonly ?int $order = null,
        public readonly ?string $className = null,
        public readonly ?array $style = null,
    ) {}

    protected function baseArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'layout' => $this->getLayout(),
            'title' => $this->title,
            'description' => $this->description,
            'order' => $this->order,
            'className' => $this->className,
            'style' => $this->style,
            'elements' => array_map(fn($e) => $e->toArray(), $this->elements),
        ], fn($v) => $v !== null);
    }
}
