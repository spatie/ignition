<?php

namespace Spatie\Ignition\Contracts;

use Throwable;

interface SolutionProviderRepository
{
    public function registerSolutionProvider(string $solutionProviderClass): self;

    /**
     * @param array<int,class-string<ProvidesSolution>|ProvidesSolution> $solutionProviderClasses
     *
     * @return $this
     */
    public function registerSolutionProviders(array $solutionProviderClasses): self;

    /**
     * @param Throwable $throwable
     *
     * @return array<int, Solution>
     */
    public function getSolutionsForThrowable(Throwable $throwable): array;

    public function getSolutionForClass(string $solutionClass): ?Solution;
}
