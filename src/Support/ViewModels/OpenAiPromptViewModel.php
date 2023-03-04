<?php

namespace Spatie\Ignition\Support\ViewModels;

class OpenAiPromptViewModel
{
    public function __construct(
        protected string $file,
        protected string $exceptionMessage,
        protected string $snippet,
        protected string $line,
        protected string|null $applicationType = null,
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

    public function applicationType(): string|null
    {
        return $this->applicationType;
    }
}
