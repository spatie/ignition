<?php

use Spatie\Ignition\Contracts\Solution;
use Spatie\Ignition\Solutions\SolutionProviders\SolutionProviderRepository;

trait NoopSolution
{
    public function getSolutionTitle(): string
    {
        return '';
    }

    public function getSolutionDescription(): string
    {
        return '';
    }

    public function getDocumentationLinks(): array
    {
        return [];
    }
}

class ProviderWithoutConstructor implements Solution
{
    use NoopSolution;
}

class ProviderWithZeroArgumentConstructor implements Solution
{
    use NoopSolution;
}

class ProviderWithZeroRequiredArgumentConstructor implements Solution
{
    use NoopSolution;

    public function __construct(
        private string $foo = 'bar',
        private int $truth = 42,
    ) {}
}

class ProviderWithRequiredArgumentConstructor implements Solution
{
    use NoopSolution;

    public function __construct(
        private string $foo,
        private int $truth,
    ) {}
}

class NoSolution {}

beforeEach(function () {
   $this->repository = new SolutionProviderRepository([
       ProviderWithoutConstructor::class,
       ProviderWithZeroArgumentConstructor::class,
       ProviderWithZeroRequiredArgumentConstructor::class,
       ProviderWithRequiredArgumentConstructor::class,
   ]);
});

it('will not instantiate a class that is not a solution', function (string $class) {
   expect($this->repository->getSolutionForClass($class))->toBeNull();
})->with([
    'non existing class' => ['i do not exist'],
    'class does not implement solution interface' => [NoSolution::class],
]);

it('can instantiate solutions with simple constructors', function (string $class) {
    expect($this->repository->getSolutionForClass($class))->toBeInstanceOf(Solution::class);
})->with([
    'no constructor' => [ProviderWithoutConstructor::class],
    'constructor without arguments' => [ProviderWithZeroArgumentConstructor::class],
    'constructor without required arguments' => [ProviderWithZeroRequiredArgumentConstructor::class],
]);

it('will not instantiate solutions with constructors with required arguments', function (string $class) {
    expect($this->repository->getSolutionForClass($class))->toBeNull();
})->with([
    'constructor with required arguments' => [ProviderWithRequiredArgumentConstructor::class],
]);
