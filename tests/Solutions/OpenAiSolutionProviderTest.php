<?php

namespace Spatie\Ignition\Tests\Solutions;

use Exception;
use Illuminate\Cache\ArrayStore;
use Illuminate\Cache\Repository;
use Spatie\Ignition\Solutions\OpenAi\OpenAiSolutionProvider;

it('can solve an an exception using ai', function () {
    $repository = new Repository(new ArrayStore());

    $solutionProvider = new OpenAiSolutionProvider(
        env('OPEN_API_KEY'),
        $repository,
    );

    $solutions = $solutionProvider->getSolutions(new Exception('T_PAAMAYIM_NEKUDOTAYIM expected'));

    $solution = $solutions[0];

    expect($solution->getSolutionDescription())->toBeString();
})->skip(fn () => empty(env('OPEN_API_KEY')), 'Open AI key is not set');
