<?php

namespace Spatie\Ignition\Contracts;

interface Solution
{
    public function getSolutionTitle(): string;

    public function getSolutionDescription(): string;

    /** @return array<int, string> */
    public function getDocumentationLinks(): array;
}
