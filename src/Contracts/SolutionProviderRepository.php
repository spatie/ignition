<?php

namespace Spatie\Ignition\Contracts;

use Throwable;

interface SolutionProviderRepository
{
    public function registerSolutionProvider(string $solutionProviderClass): self;

    public function registerSolutionProviders(array $solutionProviderClasses): self;

    /**
     * @param Throwable $throwable
     * @return \Spatie\Ignition\Contracts\Solution[]
     */
    public function getSolutionsForThrowable(Throwable $throwable): array;

    public function getSolutionForClass(string $solutionClass): ?Solution;
}
