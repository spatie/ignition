<?php

namespace Spatie\Ignition\ErrorPage;

use Spatie\ErrorSolutions\Contracts\Solution;
use Spatie\ErrorSolutions\Solutions\SolutionTransformer;
use Spatie\FlareClient\Report;
use Spatie\FlareClient\Truncation\ReportTrimmer;
use Spatie\Ignition\Config\EditorOptions;
use Spatie\Ignition\IgnitionConfig;
use Throwable;

class ErrorPageViewModel
{
    /**
     * @param array<Solution> $solutions
     * @param array<string> $documentationLinks
     */
    public function __construct(
        protected ?Throwable $throwable,
        protected Report $report,
        protected IgnitionConfig $config,
        protected array $solutions,
        protected array $documentationLinks = [],
    ) {
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
            null
        );

        return htmlspecialchars($throwableString);
    }

    public function title(): string
    {
        return htmlspecialchars($this->report->message);
    }


    public function theme(): string
    {
        return $this->config->theme;
    }

    /**
     * @return array<int, mixed>
     */
    public function solutions(): array
    {
        $transformer = new SolutionTransformer();

        return array_map(
            fn (Solution $solution) => $transformer->toArray($solution),
            $this->solutions
        );
    }


    public function jsonEncode(mixed $data): string
    {
        $jsonOptions = JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT;

        return (string) json_encode($data, $jsonOptions, JSON_THROW_ON_ERROR);
    }

    public function getAssetContents(string $asset): string
    {
        $assetPath = __DIR__."/../../resources/compiled/{$asset}";

        return (string) file_get_contents($assetPath);
    }

    /**
     * @return array<int|string, mixed>
     */
    public function shareableReport(): array
    {
        return (new ReportTrimmer())->trim($this->report->toArray());
    }

    public function updateConfigEndpoint(): string
    {
        return '/_ignition/update-config';
    }

    public function customHtmlHead(): string
    {
        return $this->config->customHtmlHead;
    }

    public function customHtmlBody(): string
    {
        return $this->config->customHtmlBody;
    }

    public function toJson(): string
    {
        $data = [
            'report' => $this->report->toArray(),
            'shareableReport' => $this->shareableReport(),
            'solutions' => $this->solutions(),
            'documentationLinks' => $this->documentationLinks,
            'updateConfigEndpoint' => $this->updateConfigEndpoint(),
            'editorOptions' => (new EditorOptions())->toArray(),
            'config' => $this->config->toArray(),
        ];

        return (string) json_encode(
            $data,
            JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT | JSON_THROW_ON_ERROR
        );
    }
}
