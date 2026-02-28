<?php

namespace ReactUbiquitous;

use Illuminate\Support\ServiceProvider;
use ReactUbiquitous\Helpers\UIHelper;

class ReactUbiquitousServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(UIHelper::class, fn() => new UIHelper());
    }

    public function boot(): void
    {
        // Package booted — no config or views needed for pure DTO package
    }
}
