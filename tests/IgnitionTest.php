<?php

namespace Spatie\Ignition\Tests;

use Exception;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\TestClasses\DummyFlareMiddleware;

class IgnitionTest extends TestCase
{
    /** @test */
    public function flare_middleware_can_be_added_to_ignition()
    {
        $report = Ignition::make()
            ->shouldDisplayException(false)
            ->registerMiddleware([
                DummyFlareMiddleware::class,
            ])
            ->handleException(new Exception('Original message'));

        $this->assertEquals($report->getMessage(), "Original message, now modified");
    }
}
