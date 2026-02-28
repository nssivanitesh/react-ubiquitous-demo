<?php

namespace ReactUbiquitous\DTOs\Sections;

final class FlexSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $flexDirection = null,
        public readonly ?string $flexWrap = null,
        public readonly ?string $justifyContent = null,
        public readonly ?string $alignItems = null,
        public readonly ?string $alignContent = null,
        public readonly string|int|null $gap = null,
        public readonly string|int|null $rowGap = null,
        public readonly string|int|null $columnGap = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'flex'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'flexDirection' => $this->flexDirection,
            'flexWrap' => $this->flexWrap,
            'justifyContent' => $this->justifyContent,
            'alignItems' => $this->alignItems,
            'alignContent' => $this->alignContent,
            'gap' => $this->gap,
            'rowGap' => $this->rowGap,
            'columnGap' => $this->columnGap,
        ], fn($v) => $v !== null));
    }
}
