<?php

namespace Spatie\Ignition\Tests;

use Exception;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\TestClasses\ContextProviderDetector\DummyContextProviderDetector;
use Spatie\Ignition\Tests\TestClasses\DummyFlareMiddleware;
use Spatie\Ignition\Tests\TestClasses\SolutionProviders\AlwaysFalseSolutionProvider;
use Spatie\Ignition\Tests\TestClasses\SolutionProviders\AlwaysTrueSolutionProvider;
use Throwable;

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

        $this->assertEquals('Original message, now modified', $report->getMessage());
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

        $this->assertEquals('My custom solution', $report->toArray()['solutions'][0]['title']);
    }

    /** @test */
    public function a_documentation_link_resolver_can_be_added()
    {
        $report = $this->ignition
            ->resolveDocumentationLink(
                fn (Throwable $throwable) => 'https://spatie.be/docs'
            )
            ->handleException(new Exception('hey'));

        $this->assertEquals(['https://spatie.be/docs'], $report->toArray()['documentation_links']);
    }

    /** @test */
    public function multiple_documentation_resolvers_can_return_both_arrays_and_strings()
    {
        $report = $this->ignition
            ->resolveDocumentationLink(
                fn (Throwable $throwable) => 'https://one.com'
            )
            ->resolveDocumentationLink(
                fn (Throwable $throwable) => ['https://two.com', 'https://three.com']
            )
            ->handleException(new Exception('hey'));

        $this->assertEquals([
            'https://one.com',
            'https://two.com',
            'https://three.com',

        ], $report->toArray()['documentation_links']);
    }

    /** @test */
    public function documentation_link_will_only_contain_unique_values()
    {
        $report = $this->ignition
            ->resolveDocumentationLink(
                fn (Throwable $throwable) => 'https://one.com'
            )
            ->resolveDocumentationLink(
                fn (Throwable $throwable) => ['https://one.com', 'https://two.com']
            )
            ->handleException(new Exception('hey'));

        $this->assertEquals([
            'https://one.com',
            'https://two.com',

        ], $report->toArray()['documentation_links']);
    }

    /** @test */
    public function a_custom_context_provider_detector_can_be_used()
    {
        $report = $this->ignition
            ->setContextProviderDetector(new DummyContextProviderDetector())
            ->handleException(new Exception('Hey'));

        $this->assertEquals([
            'dummy-context-name' => 'dummy-context-value',
        ], $report->toArray()['context']);
    }

    /** @test */
    public function a_glow_can_be_added()
    {
        $report = $this->ignition
            ->glow('my glow')
            ->handleException(new Exception('Hey'));

        $this->assertEquals('my glow', $report->toArray()['glows'][0]['name']);
    }
}
