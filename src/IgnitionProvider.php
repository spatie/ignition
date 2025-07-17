<?php

namespace Spatie\Ignition;

use Spatie\ErrorSolutions\Contracts\SolutionProviderRepository as SolutionProviderRepositoryContract;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\FlareConfig;
use Spatie\FlareClient\Support\Container;
use Illuminate\Contracts\Container\Container as IlluminateContainer;


class IgnitionProvider
{
    public function __construct(
        protected FlareConfig $flareConfig,
        protected IgnitionConfig $ignitionConfig,
        protected Container|IlluminateContainer $container
    ) {
    }

    public function register(): void
    {
        $this->container ??= Container::instance();

        $this->container->singleton(Ignition::class, fn() => new Ignition(
            $this->container->get(Flare::class),
            $this->container->get(SolutionProviderRepositoryContract::class),
            $this->ignitionConfig->shouldDisplayException,
            $this->ignitionConfig->inProductionEnvironment,
            !empty($this->flareConfig->apiToken),
            $this->ignitionConfig,
        ));
    }

    public function boot(): void
    {
        $this->container->get(Flare::class)->registerExceptionHandler();
    }
}
