<?php

namespace Spatie\Ignition\Contracts;

interface RunnableSolution extends Solution
{
    public function getSolutionActionDescription(): string;

    public function getRunButtonText(): string;

    /** @param array<int, mixed> $parameters */
    public function run(array $parameters = []): void;

    /** @return array<int, mixed> */
    public function getRunParameters(): array;
}
