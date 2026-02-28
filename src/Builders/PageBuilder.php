<?php

namespace ReactUbiquitous\Builders;

use ReactUbiquitous\DTOs\UIPageConfig;
use ReactUbiquitous\Contracts\SectionConfigInterface;

final class PageBuilder
{
    private array $sections = [];
    private ?string $description = null;
    private ?string $icon = null;
    private ?string $className = null;
    private ?bool $visible = null;

    public function __construct(
        private readonly string $id,
        private readonly string $title,
        private readonly int $order,
    ) {}

    public static function make(string $id, string $title, int $order = 1): self
    {
        return new self($id, $title, $order);
    }

    public function description(string $description): self
    {
        $clone = clone $this;
        $clone->description = $description;
        return $clone;
    }

    public function icon(string $icon): self
    {
        $clone = clone $this;
        $clone->icon = $icon;
        return $clone;
    }

    public function className(string $className): self
    {
        $clone = clone $this;
        $clone->className = $className;
        return $clone;
    }

    public function visible(bool $visible): self
    {
        $clone = clone $this;
        $clone->visible = $visible;
        return $clone;
    }

    public function addSection(SectionConfigInterface $section): self
    {
        $clone = clone $this;
        $clone->sections[] = $section;
        return $clone;
    }

    public function sections(array $sections): self
    {
        $clone = clone $this;
        $clone->sections = $sections;
        return $clone;
    }

    public function build(): UIPageConfig
    {
        return new UIPageConfig(
            id: $this->id,
            title: $this->title,
            order: $this->order,
            sections: $this->sections,
            description: $this->description,
            icon: $this->icon,
            className: $this->className,
            visible: $this->visible,
        );
    }
}
