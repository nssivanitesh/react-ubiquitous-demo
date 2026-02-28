<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\TimelineEvent;

final class TimelineSectionConfig extends BaseSectionConfig
{
    /** @param TimelineEvent[] $events */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $events = [],
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'timeline'; }

    public function toArray(): array
    {
        $extra = ['events' => array_map(fn(TimelineEvent $e) => $e->toArray(), $this->events)];
        return array_merge($this->baseArray(), $extra);
    }
}
