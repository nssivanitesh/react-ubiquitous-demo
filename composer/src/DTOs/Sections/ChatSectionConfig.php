<?php

namespace ReactUbiquitous\DTOs\Sections;

use ReactUbiquitous\DTOs\Supporting\ChatConversation;

final class ChatSectionConfig extends BaseSectionConfig
{
    /** @param ChatConversation[] $conversations */
    public function __construct(
        string $id,
        array $elements = [],
        ?string $title = null,
        ?string $description = null,
        ?int $order = null,
        ?string $className = null,
        ?array $style = null,
        public readonly ?string $listTitle = null,
        public readonly ?string $listWidth = null,
        public readonly array $conversations = [],
        public readonly ?string $inputPlaceholder = null,
        public readonly ?string $sendButtonText = null,
        public readonly ?string $currentUserName = null,
    ) {
        parent::__construct($id, $elements, $title, $description, $order, $className, $style);
    }

    public function getLayout(): string { return 'chat'; }

    public function toArray(): array
    {
        $extra = array_filter([
            'listTitle' => $this->listTitle,
            'listWidth' => $this->listWidth,
            'inputPlaceholder' => $this->inputPlaceholder,
            'sendButtonText' => $this->sendButtonText,
            'currentUserName' => $this->currentUserName,
        ], fn($v) => $v !== null);

        $extra['conversations'] = array_map(fn(ChatConversation $c) => $c->toArray(), $this->conversations);

        return array_merge($this->baseArray(), $extra);
    }
}
