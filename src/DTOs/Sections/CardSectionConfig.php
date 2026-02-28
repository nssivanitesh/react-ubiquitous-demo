<?php

namespace ReactUbiquitous\DTOs\Sections;

final class CardSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $footerElements = [],
        public readonly ?bool $padded = null,
        public readonly ?bool $bordered = null,
        public readonly string|bool|null $shadow = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'card'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'padded' => $this->padded,
            'bordered' => $this->bordered,
            'shadow' => $this->shadow,
        ], fn($v) => $v !== null);

        if (!empty($this->footerElements)) {
            $extra['footerElements'] = array_map(fn($e) => $e->toArray(), $this->footerElements);
        }

        return array_merge($this->baseArray(), $extra);
    }
}
