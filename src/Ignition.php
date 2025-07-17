<?php

namespace Spatie\Ignition;

use ErrorException;
use Spatie\ErrorSolutions\Contracts\SolutionProviderRepository;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\FlareConfig;
use Spatie\FlareClient\Report;
use Spatie\FlareClient\Support\Container;
use Spatie\Ignition\ErrorPage\ErrorPageViewModel;
use Spatie\Ignition\ErrorPage\Renderer;
use Throwable;

class Ignition
{
    public static function make(
        string|FlareConfig|null $apiToken = null,
        IgnitionConfig|null $ignitionConfig = null,
    ): self {
        $flareConfig = $apiToken instanceof FlareConfig
            ? $apiToken
            : FlareConfig::make($apiToken);

        $ignitionConfig ??= IgnitionConfig::make()->useDefaults($flareConfig);

        $container = Container::instance();

        Flare::make($flareConfig);

        $provider = new IgnitionProvider(
            $flareConfig,
            $ignitionConfig,
            $container
        );

        $provider->register();
        $provider->boot();

        return $container->get(Ignition::class);
    }

    public function __construct(
        protected Flare $flare,
        protected SolutionProviderRepository $solutionProviderRepository,
        protected bool $shouldDisplayException,
        protected bool $inProductionEnvironment,
        protected bool $apiTokenIsSet,
        protected IgnitionConfig $ignitionConfig,
    ) {
    }

    public function register(?int $errorLevels = null): self
    {
        error_reporting($errorLevels ?? -1);

        $errorLevels
            ? set_error_handler([$this, 'renderError'], $errorLevels)
            : set_error_handler([$this, 'renderError']);

        set_exception_handler([$this, 'handleException']);

        return $this;
    }

    public function renderError(
        int $level,
        string $message,
        string $file = '',
        int $line = 0,
    ): void {
        if (error_reporting() === (E_ERROR | E_CORE_ERROR | E_COMPILE_ERROR | E_USER_ERROR | E_RECOVERABLE_ERROR | E_PARSE)) {
            // This happens when PHP version is >=8 and we caught an error that was suppressed with the "@" operator
            // See the first warning box in https://www.php.net/manual/en/language.operators.errorcontrol.php
            return;
        }

        throw new ErrorException($message, 0, $level, $file, $line);
    }

    public function handleException(Throwable $throwable): Report
    {
        $report = $this->flare->createReport($throwable);

        if ($this->shouldDisplayException && $this->inProductionEnvironment !== true) {
            $this->renderException($throwable, $report);
        }

        if ($this->apiTokenIsSet && $this->inProductionEnvironment !== false) {
            $this->flare->report($throwable, report: $report);
        }

        return $report;
    }

    public function renderException(Throwable $throwable, ?Report $report = null): void
    {
        $report ??= $this->flare->createReport($throwable);

        $viewModel = new ErrorPageViewModel(
            $throwable,
            $report,
            $this->ignitionConfig,
            $this->solutionProviderRepository->getSolutionsForThrowable($throwable),
        );

        $viewPath = __DIR__."/../resources/views/errorPage.php";

        (new Renderer())->render(['viewModel' => $viewModel], $viewPath);
    }

    public function flare(): Flare
    {
        return $this->flare;
    }
}
