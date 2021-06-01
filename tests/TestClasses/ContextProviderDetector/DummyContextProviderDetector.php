<?php

namespace Spatie\Ignition\Tests\TestClasses\ContextProviderDetector;

use Spatie\FlareClient\Context\ContextProvider;
use Spatie\FlareClient\Context\ContextProviderDetector;

class DummyContextProviderDetector implements ContextProviderDetector
{
    public function detectCurrentContext(): ContextProvider
    {
        return new DummyContextProvider();
    }
}
