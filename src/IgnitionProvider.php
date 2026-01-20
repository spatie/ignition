<?php

namespace Spatie\Ignition;

use Illuminate\Contracts\Container\Container as IlluminateContainer;
use Spatie\ErrorSolutions\Contracts\SolutionProviderRepository as SolutionProviderRepositoryContract;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Support\Container;


class IgnitionProvider
{
    public function __construct(
        protected IgnitionConfig $ignitionConfig,
        protected Container|IlluminateContainer $container
    ) {
    }

    public function register(): void
    {
        $this->container ??= Container::instance();

        $this->container->singleton(Ignition::class, fn () => new Ignition(
            $this->container->get(Flare::class),
            $this->container->get(SolutionProviderRepositoryContract::class),
            $this->ignitionConfig->shouldDisplayException,
            $this->ignitionConfig->inProductionEnvironment,
            $this->ignitionConfig,
            array_map(
                fn (string $class) => new $class(),
                $this->ignitionConfig->documentationLinkResolvers
            )
        ));
    }

    public function boot(): void
    {
    }
}
