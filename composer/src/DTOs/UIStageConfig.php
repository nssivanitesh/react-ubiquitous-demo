<?php

namespace ReactUbiquitous\DTOs;

use ReactUbiquitous\Contracts\SerializableInterface;
use ReactUbiquitous\Enums\UITheme;
use ReactUbiquitous\Enums\UIPageTransition;

final class UIStageConfig implements SerializableInterface
{
    /** @param UIPageConfig[] $pages */
    public function __construct(
        public readonly string $id,
        public readonly array $pages,
        public readonly ?string $title = null,
        public readonly ?string $description = null,
        public readonly ?string $defaultPageId = null,
        public readonly UITheme|string|null $theme = null,
        public readonly ?string $className = null,
        public readonly UIPageTransition|string|null $pageTransition = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'defaultPageId' => $this->defaultPageId,
            'pages' => array_map(fn(UIPageConfig $p) => $p->toArray(), $this->pages),
            'theme' => $this->theme instanceof UITheme ? $this->theme->value : $this->theme,
            'className' => $this->className,
            'pageTransition' => $this->pageTransition instanceof UIPageTransition
                ? $this->pageTransition->value
                : $this->pageTransition,
        ], fn($v) => $v !== null);
    }
}
