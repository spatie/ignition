<?php

namespace Spatie\Ignition\Tests;

use Illuminate\Foundation\Auth\User;
use RuntimeException;
use Spatie\Ignition\Solutions\SolutionProviders\BadMethodCallSolutionProvider;
use Spatie\Ignition\Solutions\SolutionProviders\MissingAppKeySolutionProvider;
use Spatie\Ignition\Solutions\SolutionProviders\SolutionProviderRepository;
use Spatie\Ignition\Tests\Exceptions\AlwaysFalseSolutionProvider;
use Spatie\Ignition\Tests\Exceptions\AlwaysTrueSolutionProvider;
use Spatie\IgnitionContracts\BaseSolution;

class ExceptionSolutionTest extends TestCase
{
    /** @test */
    public function it_returns_possible_solutions()
    {

    }
}
