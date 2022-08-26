<?php

namespace Spatie\Ignition\Contracts;

use Throwable;

interface SolutionProviderRepository
{
    /**
     * @param class-string<ProvidesSolution>|ProvidesSolution $solutionProviderClass
     *
     * @return $this
     */
    public function registerSolutionProvider(string|ProvidesSolution $solutionProviderClass): self;

    /**
     * @param array<class-string<ProvidesSolution>|ProvidesSolution> $solutionProviderClasses
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

    /**
     * @param class-string<Solution> $solutionClass
     *
     * @return null|Solution
     */
    public function getSolutionForClass(string $solutionClass): ?Solution;
}
