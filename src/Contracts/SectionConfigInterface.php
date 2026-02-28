<?php

namespace ReactUbiquitous\Contracts;

interface SectionConfigInterface extends SerializableInterface
{
    public function getLayout(): string;
}
