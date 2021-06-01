<?php

namespace Spatie\Ignition\Tests\TestClasses\ContextProviderDetector;

use Spatie\FlareClient\Context\ContextProvider;

class DummyContextProvider implements ContextProvider
{
    public function toArray(): array
    {
        return [
            'dummy-context-name' => 'dummy-context-value',
        ];
    }
}
