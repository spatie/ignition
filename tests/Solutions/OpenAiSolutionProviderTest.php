<?php

namespace Spatie\Ignition\Tests\Solutions;

use Illuminate\Cache\ArrayStore;
use Illuminate\Cache\Repository;
use Spatie\Ignition\Solutions\SolutionProviders\OpenAiSolutionProvider;

it('can solve an an exception using ai', function () {
    $repository = new Repository(new ArrayStore());

    $solutionProvider = new OpenAiSolutionProvider(
        env('OPEN_API_KEY'),
        $repository
    );

    $solutions = $solutionProvider->getSolutions(new \Exception('T_PAAMAYIM_NEKUDOTAYIM expected'));

    $solution = $solutions[0];

    dd($solution->getSolutionDescription());
});

