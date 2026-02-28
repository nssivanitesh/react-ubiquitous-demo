<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\NavLink;

final class NavbarSectionConfig extends BaseSectionConfig
{
    /** @param NavLink[] $links */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $logoText = null,
        public readonly ?string $logoUrl = null,
        public readonly array $links = [],
        public readonly ?string $position = null,
        public readonly ?string $theme = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'navbar'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'logoText' => $this->logoText,
            'logoUrl' => $this->logoUrl,
            'position' => $this->position,
            'theme' => $this->theme,
        ], fn($v) => $v !== null);

        if (!empty($this->links)) {
            $extra['links'] = array_map(fn(NavLink $l) => $l->toArray(), $this->links);
        }

        return array_merge($this->baseArray(), $extra);
    }
}
