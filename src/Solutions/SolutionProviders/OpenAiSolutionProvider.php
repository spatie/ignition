<?php

namespace Spatie\Ignition\Solutions\SolutionProviders;


use Psr\SimpleCache\CacheInterface;
use Spatie\Ignition\Contracts\HasSolutionsForThrowable;
use Spatie\Ignition\Solutions\OpenAiSolution;
use Throwable;

class OpenAiSolutionProvider implements HasSolutionsForThrowable
{
    public function __construct(
        protected string $openAiKey,
        protected CacheInterface $cache,
        protected $cacheTtlInSeconds = 60 * 60,
    ){

    }

    public function canSolve(Throwable $throwable): bool
    {
        return true;
    }

    public function getSolutions(Throwable $throwable): array
    {
        return [
            new OpenAiSolution(
                $throwable,
                $this->openAiKey,
                $this->cache,
                $this->cacheTtlInSeconds,
            )
        ];
    }
}
