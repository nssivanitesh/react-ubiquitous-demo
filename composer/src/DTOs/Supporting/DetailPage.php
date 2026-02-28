<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class DetailPage implements SerializableInterface
{
    /** @param array $sections UISectionConfig[] */
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly array $sections,
        public readonly ?string $description = null,
        public readonly ?int $order = null,
        public readonly ?string $className = null,
    ) {}

    public function toArray(): array
    {
        $data = array_filter([
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'order' => $this->order,
            'sections' => array_map(fn($s) => $s->toArray(), $this->sections),
            'className' => $this->className,
        ], fn($v) => $v !== null);

        if (empty($data['sections'])) {
            $data['sections'] = [];
        }

        return $data;
    }
}
