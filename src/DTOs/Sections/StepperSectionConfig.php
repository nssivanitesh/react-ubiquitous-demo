<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\StepperStep;

final class StepperSectionConfig extends BaseSectionConfig
{
    /** @param StepperStep[] $steps */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly array $steps = [],
        public readonly ?int $currentStep = null,
        public readonly ?string $orientation = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'stepper'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'currentStep' => $this->currentStep,
            'orientation' => $this->orientation,
        ], fn($v) => $v !== null);

        $extra['steps'] = array_map(fn(StepperStep $s) => $s->toArray(), $this->steps);

        return array_merge($this->baseArray(), $extra);
    }
}
