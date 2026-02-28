<?php

namespace ReactUbiquitous\Contracts;

interface ElementConfigInterface extends SerializableInterface
{
    public function getType(): string;
}
