<?php

namespace ReactUbiquitous\Enums;

enum UIPageTransition: string
{
    case None = 'none';
    case Fade = 'fade';
    case SlideLeft = 'slide-left';
    case SlideRight = 'slide-right';
}
