<?php

namespace Spatie\Ignition;

use Closure;
use Spatie\FlareClient\Flare;
use Spatie\Ignition\ErrorPage\ErrorPageViewModel;
use Spatie\Ignition\ErrorPage\Renderer;
use Spatie\Ignition\SolutionProviders\BadMethodCallSolutionProvider;
use Spatie\Ignition\SolutionProviders\MergeConflictSolutionProvider;
use Spatie\Ignition\SolutionProviders\SolutionProviderRepository;
use Spatie\Ignition\SolutionProviders\UndefinedPropertySolutionProvider;
use Throwable;

class Ignition
{
    protected bool $anonymize = false;

    protected string $flareApiKey = '';

    protected string $flareApiSecret = '';

    protected string $applicationPath = '';

    protected ?Closure $configureFlareUsing = null;

    protected SolutionProviderRepository $solutionProviderRepository;

    public static function make()
    {
        return new static();
    }

    public function __construct()
    {
        $this->solutionProviderRepository = new SolutionProviderRepository($this->getDefaultSolutions());
    }

    public function register()
    {
        error_reporting(-1);

        set_error_handler([$this, 'handleError']);

        set_exception_handler([$this, 'handleException']);

        return $this;
    }


    public function applicationPath(string $applicationPath): self
    {
        $this->applicationPath = $applicationPath;

        return $this;
    }

    public function anonymizeIp(): self
    {
        $this->anonymize = true;

        return $this;
    }

    public function sendToFlare(string $apiKey, string $apiSecret = ''): self
    {
        $this->flareApiKey = $apiKey;

        $this->flareApiSecret = $apiSecret;

        return $this;
    }

    public function configureFlare(callable $callable): self
    {
        $this->configureFlareUsing = $callable;

        return $this;
    }

    public function handleError($level, $message, $file = '', $line = 0, $context = [])
    {
        throw new \ErrorException($message, 0, $level, $file, $line);
    }

    public function handleException(Throwable $throwable): void
    {
        $flare = Flare::register($this->flareApiKey, $this->flareApiSecret);

        if ($this->configureFlareUsing) {
            ($this->configureFlareUsing)($flare);
        }

        if ($this->applicationPath !== '') {
            $flare->applicationPath($this->applicationPath);
        }

        if ($this->anonymize) {
            $flare->anonymizeIp();
        }

        $report = $flare->createReport($throwable);
        $viewModel = new ErrorPageViewModel(
            $throwable,
            new IgnitionConfig(),
            $report,
            $this->solutionProviderRepository->getSolutionsForThrowable($throwable)
        );

        $renderer = new Renderer(__DIR__ . '/../resources/views');

        $renderer->render('errorPage', $viewModel->toArray());

        if ($this->flareApiKey !== '') {
            $flare->report($throwable);
        }
    }

    protected function getDefaultSolutions(): array
    {
        return [
            BadMethodCallSolutionProvider::class,
            MergeConflictSolutionProvider::class,
            UndefinedPropertySolutionProvider::class,
        ];
    }
}
