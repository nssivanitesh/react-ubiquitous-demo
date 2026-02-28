<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\AccordionPanel;

final class AccordionSectionConfig extends BaseSectionConfig
{
    /** @param AccordionPanel[] $panels */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $panels = [],
        public readonly ?bool $allowMultiple = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'accordion'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'allowMultiple' => $this->allowMultiple,
        ], fn($v) => $v !== null);

        $extra['panels'] = array_map(fn(AccordionPanel $p) => $p->toArray(), $this->panels);

        return array_merge($this->baseArray(), $extra);
    }
}
