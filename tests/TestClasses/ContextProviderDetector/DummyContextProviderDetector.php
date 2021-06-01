<?php

namespace Spatie\Ignition\Tests\TestClasses\ContextProviderDetector;

use Spatie\FlareClient\Context\ContextProviderDetector;
use Spatie\FlareClient\Context\ContextProvider;

class DummyContextProviderDetector implements ContextProviderDetector
{
    public function detectCurrentContext(): ContextProvider
    {
        return new DummyContextProvider();
    }

}
