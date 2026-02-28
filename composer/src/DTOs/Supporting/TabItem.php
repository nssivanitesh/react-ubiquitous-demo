<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class TabItem implements SerializableInterface
{
    /** @param array $sections UISectionConfig[] */
    /** @param array $elements UIElementConfig[] */
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly array $sections = [],
        public readonly array $elements = [],
    ) {}

    public function toArray(): array
    {
        $data = [
            'id' => $this->id,
            'label' => $this->label,
        ];

        if (!empty($this->sections)) {
            $data['sections'] = array_map(fn($s) => $s->toArray(), $this->sections);
        }

        if (!empty($this->elements)) {
            $data['elements'] = array_map(fn($e) => $e->toArray(), $this->elements);
        }

        return $data;
    }
}
