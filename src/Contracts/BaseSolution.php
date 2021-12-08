<?php

namespace Spatie\Ignition\Contracts;

class BaseSolution implements Solution
{
    protected string $title;

    protected string $description = '';

    /** @var array<int, string>  */
    protected array $links = [];

    public static function create(string $title = ''): self
    {
        return new self($title);
    }

    public function __construct(string $title = '')
    {
        $this->title = $title;
    }

    public function getSolutionTitle(): string
    {
        return $this->title;
    }

    public function setSolutionTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSolutionDescription(): string
    {
        return $this->description;
    }

    public function setSolutionDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /** @return array<int, string> */
    public function getDocumentationLinks(): array
    {
        return $this->links;
    }

    /** @param array<int, string> $links */
    public function setDocumentationLinks(array $links): self
    {
        $this->links = $links;

        return $this;
    }
}
