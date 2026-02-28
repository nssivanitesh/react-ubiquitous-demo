<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class AccordionPanel implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $description = null,
        public readonly ?bool $defaultOpen = null,
        public readonly array $sections = [],
        public readonly array $elements = [],
    ) {}

    public function toArray(): array
    {
        $data = array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'description' => $this->description,
            'defaultOpen' => $this->defaultOpen,
        ], fn($v) => $v !== null);

        if (!empty($this->sections)) {
            $data['sections'] = array_map(fn($s) => $s->toArray(), $this->sections);
        }

        if (!empty($this->elements)) {
            $data['elements'] = array_map(fn($e) => $e->toArray(), $this->elements);
        }

        return $data;
    }
}
