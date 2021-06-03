<?php

namespace Spatie\Ignition\ErrorPage;

use Closure;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\FlareClient\Report;
use Spatie\Ignition\Config\IgnitionConfig;
use Spatie\Ignition\Solutions\SolutionTransformer;
use Throwable;

class ErrorPageViewModel implements Arrayable
{
    protected ?Throwable $throwable;

    protected array $solutions = [];

    protected IgnitionConfig $ignitionConfig;

    protected Report $report;

    protected string $defaultTab = 'trace';

    protected array $defaultTabProps = [];

    public function __construct(
        ?Throwable $throwable,
        IgnitionConfig $ignitionConfig,
        Report $report,
        array $solutions
    ) {
        $this->throwable = $throwable;

        $this->ignitionConfig = $ignitionConfig;

        $this->report = $report;

        $this->solutions = $solutions;
    }

    public function throwableString(): string
    {
        if (! $this->throwable) {
            return '';
        }

        $throwableString = sprintf(
            "%s: %s in file %s on line %d\n\n%s\n",
            get_class($this->throwable),
            $this->throwable->getMessage(),
            $this->throwable->getFile(),
            $this->throwable->getLine(),
            $this->report->getThrowable()->getTraceAsString()
        );

        return htmlspecialchars($throwableString);
    }

    public function title(): string
    {
        $message = htmlspecialchars($this->report->getMessage());

        return "🧨 {$message}";
    }

    public function config(): array
    {
        return $this->ignitionConfig->toArray();
    }

    public function solutions(): array
    {
        return array_map(function($solution) {
            return (new SolutionTransformer($solution))->toArray();
        }, $this->solutions);
    }

    public function report(): array
    {
        return $this->report->toArray();
    }

    public function jsonEncode($data): string
    {
        $jsonOptions = JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT;

        return json_encode($data, $jsonOptions);
    }

    public function getAssetContents(string $asset): string
    {
        $assetPath = __DIR__."/../../resources/compiled/{$asset}";

        return file_get_contents($assetPath);
    }


    protected function shareEndpoint(): string
    {
        return  'https://flareapp.io/share';
    }

    public function toArray(): array
    {
        return [
            'throwableString' => $this->throwableString(),
            'shareEndpoint' => $this->shareEndpoint(),
            'title' => $this->title(),
            'config' => $this->ignitionConfig,
            'solutions' => $this->solutions(),
            'report' => $this->report(),
            'housekeepingEndpoint' => '',
            'jsonEncode' => Closure::fromCallable([$this, 'jsonEncode']),
            'getAssetContents' => Closure::fromCallable([$this, 'getAssetContents']),
            'defaultTab' => $this->defaultTab,
            'defaultTabProps' => $this->defaultTabProps,
            'theme' => $this->ignitionConfig->theme(),
        ];
    }
}
