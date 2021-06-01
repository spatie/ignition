<?php

namespace Spatie\Ignition\Tests;

use Exception;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\TestClasses\SolutionProviders\AlwaysTrueSolutionProvider;
use Spatie\Ignition\Tests\TestClasses\DummyFlareMiddleware;
use Spatie\Ignition\Tests\TestClasses\SolutionProviders\AlwaysFalseSolutionProvider;

class IgnitionTest extends TestCase
{
    protected Ignition $ignition;

    public function setUp(): void
    {
        parent::setUp();

        $this->ignition = Ignition::make()
            ->shouldDisplayException(false);
    }

    /** @test */
    public function flare_middleware_can_be_added_to_ignition()
    {
        $report = $this->ignition
            ->registerMiddleware([
                DummyFlareMiddleware::class,
            ])
            ->handleException(new Exception('Original message'));

        $this->assertEquals($report->getMessage(), "Original message, now modified");
    }

    /** @test */
    public function custom_solution_providers_can_be_added()
    {
        $report = $this->ignition
            ->addSolutionProviders([
                AlwaysFalseSolutionProvider::class,
                AlwaysTrueSolutionProvider::class,
            ])
            ->handleException(new Exception('Hey'));

        $this->assertEquals($report->toArray()['solutions'][0]['title'], 'My custom solution');
    }
}
