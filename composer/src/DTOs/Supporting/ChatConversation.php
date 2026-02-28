<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ChatConversation implements SerializableInterface
{
    /** @param ChatMessage[] $messages */
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        public readonly ?string $sublabel = null,
        public readonly ?string $avatar = null,
        public readonly ?string $badge = null,
        public readonly array $messages = [],
    ) {}

    public function toArray(): array
    {
        $data = array_filter([
            'id' => $this->id,
            'label' => $this->label,
            'sublabel' => $this->sublabel,
            'avatar' => $this->avatar,
            'badge' => $this->badge,
        ], fn($v) => $v !== null);

        if (!empty($this->messages)) {
            $data['messages'] = array_map(fn(ChatMessage $m) => $m->toArray(), $this->messages);
        }

        return $data;
    }
}
