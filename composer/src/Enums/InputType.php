<?php

namespace ReactUbiquitous\Enums;

enum InputType: string
{
    case Text = 'text';
    case Password = 'password';
    case Number = 'number';
    case Email = 'email';
    case Date = 'date';
    case DatetimeLocal = 'datetime-local';
    case Time = 'time';
    case Month = 'month';
    case Week = 'week';
    case Tel = 'tel';
    case Url = 'url';
    case Search = 'search';
    case Color = 'color';
    case Range = 'range';
    case File = 'file';
    case Hidden = 'hidden';
}
