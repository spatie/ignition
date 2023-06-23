<?php

namespace Spatie\Ignition\Arguments\Reducers;

use Spatie\FlareClient\Arguments\ReducedArgument\ReducedArgument;
use Spatie\FlareClient\Arguments\ReducedArgument\ReducedArgumentContract;
use Spatie\FlareClient\Arguments\ReducedArgument\UnReducedArgument;
use Spatie\FlareClient\Arguments\Reducers\ArgumentReducer;
use Symfony\Component\HttpFoundation\Request;

class SymphonyRequestArgumentReducer implements ArgumentReducer
{
    public function execute(mixed $argument): ReducedArgumentContract
    {
        if(! $argument instanceof Request) {
            return UnReducedArgument::create();
        }

        return new ReducedArgument(
            "{$argument->getMethod()} {$argument->getUri()}",
            get_class($argument),
        );
    }
}
