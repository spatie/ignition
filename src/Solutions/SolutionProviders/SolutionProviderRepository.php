<?php

namespace Spatie\Ignition\Solutions\SolutionProviders;

use Spatie\Ignition\Support\Arr;
use Spatie\IgnitionContracts\HasSolutionsForThrowable;
use Spatie\IgnitionContracts\ProvidesSolution;
use Spatie\IgnitionContracts\Solution;
use Spatie\IgnitionContracts\SolutionProviderRepository as SolutionProviderRepositoryContract;
use Throwable;

class SolutionProviderRepository implements SolutionProviderRepositoryContract
{
    protected array $solutionProviders = [];

    public function __construct(array $solutionProviders = [])
    {
        $this->solutionProviders = $solutionProviders;
    }

    public function registerSolutionProvider(string $solutionProviderClass): SolutionProviderRepositoryContract
    {
        $this->solutionProviders[] = $solutionProviderClass;

        return $this;
    }

    public function registerSolutionProviders(array $solutionProviderClasses): SolutionProviderRepositoryContract
    {
        $this->solutionProviders = array_merge($this->solutionProviders, $solutionProviderClasses);

        return $this;
    }

    public function getSolutionsForThrowable(Throwable $throwable): array
    {
        $solutions = [];

        if ($throwable instanceof Solution) {
            $solutions[] = $throwable;
        }

        if ($throwable instanceof ProvidesSolution) {
            $solutions[] = $throwable->getSolution();
        }

        $providedSolutions = array_filter($this->solutionProviders, static function (string $solutionClass): bool {
            if (! in_array(HasSolutionsForThrowable::class, class_implements($solutionClass), true)) {
                return false;
            }

            /*
            if (in_array($solutionClass, config('ignition.ignored_solution_providers', []))) {
                return false;
            }
            */

            return true;
        });
        $providedSolutions = array_map(function (string $solutionClass) {
            return new $solutionClass();
        }, $providedSolutions);
        $providedSolutions = array_filter($providedSolutions, function (HasSolutionsForThrowable $provider) use ($throwable) {
            try {
                return $provider->canSolve($throwable);
            } catch (Throwable $e) {
                return false;
            }
        });
        $providedSolutions = array_map(function (HasSolutionsForThrowable $provider) use ($throwable) {
            try {
                return $provider->getSolutions($throwable);
            } catch (Throwable $e) {
                return [];
            }
        }, $providedSolutions);

        $providedSolutions = Arr::flatten($providedSolutions);

        return array_merge($solutions, $providedSolutions);
    }

    public function getSolutionForClass(string $solutionClass): ?Solution
    {
        if (! class_exists($solutionClass)) {
            return null;
        }

        if (! in_array(Solution::class, class_implements($solutionClass))) {
            return null;
        }

        return app($solutionClass);
    }
}
