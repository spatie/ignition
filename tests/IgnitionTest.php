<?php

use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\TestClasses\ContextProviderDetector\DummyContextProviderDetector;
use Spatie\Ignition\Tests\TestClasses\DummyFlareMiddleware;
use Spatie\Ignition\Tests\TestClasses\SolutionProviders\AlwaysFalseSolutionProvider;
use Spatie\Ignition\Tests\TestClasses\SolutionProviders\AlwaysTrueSolutionProvider;

uses(TestCase::class);

beforeEach(function () {
    $this->ignition = Ignition::make()
        ->shouldDisplayException(false);
});

test('flare middleware can be added to ignition', function () {
    $report = $this->ignition
        ->registerMiddleware([
            DummyFlareMiddleware::class,
        ])
        ->handleException(new Exception('Original message'));

    expect($report->getMessage())->toEqual('Original message, now modified');
});

test('custom solution providers can be added', function () {
    $report = $this->ignition
        ->addSolutionProviders([
            AlwaysFalseSolutionProvider::class,
            AlwaysTrueSolutionProvider::class,
        ])
        ->handleException(new Exception('Hey'));

    expect($report->toArray()['solutions'][0]['title'])->toEqual('My custom solution');
});

test('a documentation link resolver can be added', function () {
    $report = $this->ignition
        ->resolveDocumentationLink(
            fn (Throwable $throwable) => 'https://spatie.be/docs'
        )
        ->handleException(new Exception('hey'));

    expect($report->toArray()['documentation_links'])->toEqual(['https://spatie.be/docs']);
});

test('multiple documentation resolvers can return both arrays and strings', function () {
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
});

test('documentation link will only contain unique values', function () {
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
});

test('a custom context provider detector can be used', function () {
    $report = $this->ignition
        ->setContextProviderDetector(new DummyContextProviderDetector())
        ->handleException(new Exception('Hey'));

    $this->assertEquals([
        'dummy-context-name' => 'dummy-context-value',
    ], $report->toArray()['context']);
});

test('a glow can be added', function () {
    $report = $this->ignition
        ->glow('my glow')
        ->handleException(new Exception('Hey'));

    expect($report->toArray()['glows'][0]['name'])->toEqual('my glow');
});
