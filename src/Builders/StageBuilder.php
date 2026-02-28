<?php

namespace ReactUbiquitous\Builders;

use ReactUbiquitous\DTOs\UIStageConfig;
use ReactUbiquitous\DTOs\UIPageConfig;
use ReactUbiquitous\Enums\UITheme;
use ReactUbiquitous\Enums\UIPageTransition;

final class StageBuilder
{
    private array $pages = [];
    private ?string $title = null;
    private ?string $description = null;
    private ?string $defaultPageId = null;
    private UITheme|string|null $theme = null;
    private ?string $className = null;
    private UIPageTransition|string|null $pageTransition = null;

    public function __construct(private readonly string $id) {}

    public static function make(string $id): self
    {
        return new self($id);
    }

    public function title(string $title): self
    {
        $clone = clone $this;
        $clone->title = $title;
        return $clone;
    }

    public function description(string $description): self
    {
        $clone = clone $this;
        $clone->description = $description;
        return $clone;
    }

    public function defaultPageId(string $pageId): self
    {
        $clone = clone $this;
        $clone->defaultPageId = $pageId;
        return $clone;
    }

    public function theme(UITheme|string $theme): self
    {
        $clone = clone $this;
        $clone->theme = $theme;
        return $clone;
    }

    public function className(string $className): self
    {
        $clone = clone $this;
        $clone->className = $className;
        return $clone;
    }

    public function pageTransition(UIPageTransition|string $transition): self
    {
        $clone = clone $this;
        $clone->pageTransition = $transition;
        return $clone;
    }

    public function addPage(UIPageConfig $page): self
    {
        $clone = clone $this;
        $clone->pages[] = $page;
        return $clone;
    }

    public function pages(array $pages): self
    {
        $clone = clone $this;
        $clone->pages = $pages;
        return $clone;
    }

    public function build(): UIStageConfig
    {
        return new UIStageConfig(
            id: $this->id,
            pages: $this->pages,
            title: $this->title,
            description: $this->description,
            defaultPageId: $this->defaultPageId,
            theme: $this->theme,
            className: $this->className,
            pageTransition: $this->pageTransition,
        );
    }
}
