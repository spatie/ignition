<?php

namespace Spatie\Ignition\Solutions;

use Illuminate\Contracts\Support\Arrayable;
use Spatie\IgnitionContracts\Solution;

class SolutionTransformer implements Arrayable
{
    protected Solution $solution;

    public function __construct(Solution $solution)
    {
        $this->solution = $solution;
    }

    public function toArray(): array
    {
        return [
            'class' => get_class($this->solution),
            'title' => $this->solution->getSolutionTitle(),
            'links' => $this->solution->getDocumentationLinks(),
            'description' => $this->solution->getSolutionDescription(),
            'is_runnable' => false,
        ];
    }
}
