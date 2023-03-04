<?php

namespace Spatie\Ignition\Support\ViewModels;

class AiPromptViewModel
{
    public function __construct(
        protected string $file,
        protected string $exceptionMessage,
        protected string $snippet,
        protected string $line,
    ) {
    }

    public function file(): string
    {
        return $this->file;
    }

    public function line(): string
    {
        return $this->line;
    }

    public function snippet(): string
    {
        return $this->snippet;
    }

    public function exceptionMessage(): string
    {
        return $this->exceptionMessage;
    }
}
