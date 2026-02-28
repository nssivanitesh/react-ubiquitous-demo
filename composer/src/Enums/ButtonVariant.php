<?php

namespace ReactUbiquitous\Enums;

enum ButtonVariant: string
{
    case Default = 'default';
    case Outline = 'outline';
    case Ghost = 'ghost';
    case Destructive = 'destructive';
    case Secondary = 'secondary';
    case Link = 'link';
}
