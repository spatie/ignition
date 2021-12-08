<?php

namespace Spatie\Ignition\ErrorPage;

use Closure;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\FlareClient\Report;
use Spatie\FlareClient\Truncation\ReportTrimmer;
use Spatie\Ignition\Config\IgnitionConfig;
use Spatie\Ignition\Contracts\Solution;
use Spatie\Ignition\Solutions\SolutionTransformer;
use Throwable;

class ErrorPageViewModel implements Arrayable
{
    protected ?Throwable $throwable;

    /** @var array<int, \Spatie\Ignition\Contracts\Solution> */
    protected array $solutions = [];

    protected IgnitionConfig $ignitionConfig;

    protected Report $report;

    protected string $defaultTab = 'trace';

    /** @var array<int, string> */
    protected array $defaultTabProps = [];

    protected string $solutionTransformerClass;

    /**
     * @param \Throwable|null $throwable
     * @param \Spatie\Ignition\Config\IgnitionConfig $ignitionConfig
     * @param \Spatie\FlareClient\Report $report
     * @param array<int, Solution> $solutions
     * @param string|null $solutionTransformerClass
     */
    public function __construct(
        ?Throwable $throwable,
        IgnitionConfig $ignitionConfig,
        Report $report,
        array $solutions,
        string $solutionTransformerClass = null
    ) {
        $this->throwable = $throwable;

        $this->ignitionConfig = $ignitionConfig;

        $this->report = $report;

        $this->solutions = $solutions;

        $this->solutionTransformerClass = $solutionTransformerClass ?? SolutionTransformer::class;
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
            $this->report->getThrowable()?->getTraceAsString()
        );

        return htmlspecialchars($throwableString);
    }

    public function title(): string
    {
        $message = htmlspecialchars($this->report->getMessage());

        return "🧨 {$message}";
    }

    /** @return array<string, mixed> */
    public function config(): array
    {
        return $this->ignitionConfig->toArray();
    }

    /** @return array<int, array<int, Solution>> */
    public function solutions(): array
    {
        return array_map(function (Solution $solution) {
            /** @var class-string $transformerClass */
            $transformerClass = $this->solutionTransformerClass;

            /** @var SolutionTransformer $transformer */
            $transformer = new $transformerClass($solution);

            return ($transformer)->toArray();
        }, $this->solutions);
    }

    /** @return array<int, mixed> */
    public function report(): array
    {
        return $this->report->toArray();
    }

    public function jsonEncode(mixed $data): string
    {
        $jsonOptions = JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT;

        return (string)json_encode($data, $jsonOptions);
    }

    public function getAssetContents(string $asset): string
    {
        $assetPath = __DIR__."/../../resources/compiled/{$asset}";

        return (string)file_get_contents($assetPath);
    }


    protected function shareEndpoint(): string
    {
        return  'https://flareapp.io/api/public-reports';
    }

    /** @phpstan-ignore-next-line */
    public function toArray(): array
    {
        return [
            'throwableString' => $this->throwableString(),
            'shareEndpoint' => $this->shareEndpoint(),
            'title' => $this->title(),
            'config' => $this->config(),
            'solutions' => $this->solutions(),
            'report' => $this->report(),
            'shareableReport' => (new ReportTrimmer())->trim($this->report()),
            'housekeepingEndpoint' => '',
            'jsonEncode' => Closure::fromCallable([$this, 'jsonEncode']),
            'getAssetContents' => Closure::fromCallable([$this, 'getAssetContents']),
            'defaultTab' => $this->defaultTab,
            'defaultTabProps' => $this->defaultTabProps,
            'theme' => $this->ignitionConfig->theme(),
        ];
    }
}
