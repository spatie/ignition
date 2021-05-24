<?php

namespace Spatie\Ignition;

use ErrorException;
use Spatie\FlareClient\Flare;
use Spatie\Ignition\Config\IgnitionConfig;
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

    protected Flare $flare;

    protected string $flareApiKey = '';

    protected string $flareApiSecret = '';

    protected string $applicationPath = '';

    protected array $middleware = [];

    protected IgnitionConfig $ignitionConfig;

    protected SolutionProviderRepository $solutionProviderRepository;

    public static function make(): self
    {
        return new static();
    }

    public function __construct()
    {
        $this->flare = Flare::make();

        $this->ignitionConfig = IgnitionConfig::loadFromConfigFile();

        $this->solutionProviderRepository = new SolutionProviderRepository($this->getDefaultSolutions());
    }

    public function applicationPath(string $applicationPath): self
    {
        $this->applicationPath = $applicationPath;

        return $this;
    }

    public function addSolutionProviders(array $solutions): self
    {
        $this->solutionProviderRepository->registerSolutionProviders($solutions);

        return $this;
    }

    public function anonymizeIp(): self
    {
        $this->anonymize = true;

        return $this;
    }

    public function theme(string $theme): self
    {
        $this->ignitionConfig->setOption('theme', $theme);

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
        ($callable)($this->flare);

        return $this;
    }

    public function registerMiddleware($middleware): self
    {
        if (! is_array($middleware)) {
            $middleware = [$middleware];
        }

        foreach ($middleware as $singleMiddleware) {
            $this->middleware[] = $middleware;
        }

        return $this;
    }

    public function reset(): self
    {
        $this->flare->reset();

        return $this;
    }

    public function register(): self
    {
        error_reporting(-1);

        set_error_handler([$this, 'renderError']);

        set_exception_handler([$this, 'renderException']);

        return $this;
    }

    public function renderError($level, $message, $file = '', $line = 0, $context = []): void
    {
        throw new ErrorException($message, 0, $level, $file, $line);
    }

    public function renderException(Throwable $throwable): void
    {

        $this->flare
            ->setApiToken($this->flareApiKey ?? '')
            ->setApiSecret($this->flareApiSecret ?? '');
        foreach ($this->middleware as $singleMiddleware) {
            $this->flare->registerMiddleware($singleMiddleware);
        }

        if ($this->applicationPath !== '') {
            $this->flare->applicationPath($this->applicationPath);
        }

        if ($this->anonymize) {
            $this->flare->anonymizeIp();
        }
     
        $report = $this->flare->createReport($throwable);

        $viewModel = new ErrorPageViewModel(
            $throwable,
            $this->ignitionConfig,
            $report,
            $this->solutionProviderRepository->getSolutionsForThrowable($throwable)
        );

        $renderer = new Renderer(__DIR__ . '/../resources/views');

        try {
            $renderer->render('errorPage', $viewModel->toArray());

        } catch (\Throwable $e) {
            dd($e);
        }

        if ($this->flareApiKey !== '') {
            $this->flare->report($throwable);
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
