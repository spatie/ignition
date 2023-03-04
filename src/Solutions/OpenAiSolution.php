<?php

namespace Spatie\Ignition\Solutions;

use OpenAI;
use Psr\SimpleCache\CacheInterface;
use Spatie\Backtrace\Backtrace;
use Spatie\Backtrace\Frame;
use Spatie\Ignition\Contracts\Solution;
use Spatie\Ignition\ErrorPage\Renderer;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Support\ViewModels\AiPromptViewModel;
use Throwable;

class OpenAiSolution implements Solution
{
    public function __construct(
        protected Throwable      $throwable,
        protected string         $openAiKey,
        protected CacheInterface $cache,
        protected                $cacheTtlInSeconds = 60 * 60,
    ) {
    }

    public function getSolutionTitle(): string
    {
        return 'AI Generated Solution';
    }

    public function getSolutionDescription(): string
    {
        return $this->getAiSolutionText();
    }

    public function getDocumentationLinks(): array
    {
        return [];
    }

    public function getAiSolutionText(): string
    {
        $solution = $this->cache->get($this->getCacheKey());

        if ($solution) {
            return $solution;
        }

        $solutionText = OpenAI::client($this->openAiKey)
            ->chat()
            ->create([
                'model' => $this->getModel(),
                'messages' => [['role' => 'user', 'content' => $this->generatePrompt()]],
                'max_tokens' => 100,
                'temperature' => 0,
            ])->choices[0]->message->content;

        $this->cache->set($this->getCacheKey(), $solutionText, $this->cacheTtlInSeconds);

        return trim($solutionText);
    }

    protected function getCacheKey(): string
    {
        $hash = sha1($this->throwable->getTraceAsString());

        return "ignition-solution-{$hash}";
    }

    protected function generatePrompt(): string
    {
        $viewPath = Ignition::viewPath('aiPrompt');

        $viewModel = new AiPromptViewModel(
            $this->throwable->getFile(),
            $this->throwable->getMessage(),
            $this->getApplicationFrame($this->throwable)->getSnippetAsString(15),
            $this->throwable->getLine(),
        );

        return (new Renderer())->renderAsString(
            ['viewModel' => $viewModel],
            $viewPath,
        );
    }

    protected function getModel(): string
    {
        return 'gpt-3.5-turbo';
    }

    protected function getApplicationFrame(Throwable $throwable): ?Frame
    {
        $backtrace = Backtrace::createForThrowable($throwable);

        $frames = $backtrace->frames();

        return $frames[$backtrace->firstApplicationFrameIndex()] ?? null;
    }
}
