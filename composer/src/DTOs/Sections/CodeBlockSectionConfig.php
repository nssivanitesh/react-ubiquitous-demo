<?php

namespace ReactUbiquitous\DTOs\Sections;

final class CodeBlockSectionConfig extends BaseSectionConfig
{
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly string $code = '',
        public readonly ?string $language = null,
        public readonly ?bool $lineNumbers = null,
        public readonly ?bool $copyable = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'code-block'; }

    public function toArray(): array
    {
        return array_merge($this->baseArray(), array_filter([
            'code' => $this->code,
            'language' => $this->language,
            'lineNumbers' => $this->lineNumbers,
            'copyable' => $this->copyable,
        ], fn($v) => $v !== null));
    }
}
