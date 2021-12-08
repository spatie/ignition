<?php

namespace Spatie\Ignition\Contracts;

use Throwable;

interface HasSolutionsForThrowable
{
    public function canSolve(Throwable $throwable): bool;

    /** \Spatie\Ignition\Contracts\Solution[] */
    public function getSolutions(Throwable $throwable): array;
}
