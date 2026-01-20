<?php

namespace Spatie\Ignition\Contracts;

use Throwable;

interface DocumentationLinkResolver
{
    /** @return array<int, string> */
    public function find(Throwable $throwable): array;
}
