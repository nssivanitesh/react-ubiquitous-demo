<?php

namespace ReactUbiquitous\DTOs\Supporting;

use ReactUbiquitous\Contracts\SerializableInterface;

final class ChatMessage implements SerializableInterface
{
    public function __construct(
        public readonly string $id,
        public readonly string $text,
        public readonly string $sender,
        public readonly string $role, // 'me' | 'other'
        public readonly ?string $timestamp = null,
        public readonly ?string $avatar = null,
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'text' => $this->text,
            'sender' => $this->sender,
            'role' => $this->role,
            'timestamp' => $this->timestamp,
            'avatar' => $this->avatar,
        ], fn($v) => $v !== null);
    }
}
