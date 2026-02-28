<?php

namespace ReactUbiquitous\Enums;

enum ResizeBehaviour: string
{
    case None = 'none';
    case Both = 'both';
    case Horizontal = 'horizontal';
    case Vertical = 'vertical';
}
