<?php

namespace Spatie\Ignition;

use Spatie\FlareClient\FlareConfig;

class IgnitionConfig
{
    public static function make(): self
    {
        return new self();
    }

    /**
     * @param array<string, mixed> $editorOptions
     */
    public function __construct(
        public bool $hideSolutions = false,
        public bool $shouldDisplayException = true,
        public bool $inProductionEnvironment = false,
        public string $editor = 'vscode',
        public array $editorOptions = [],
        public ?string $remoteSitesPath = null,
        public ?string $localSitesPath = null,
        public string $theme = 'light',
        public bool $enableShareButton = true,
        public string $shareEndpoint = 'https://flareapp.io/api/public-reports',
        public string $customHtmlHead = '',
        public string $customHtmlBody = '',
    ) {
    }

    public function useDefaults(
        FlareConfig $flareConfig,
    ): self {
        if ($flareConfig->applicationStage === 'production' || $flareConfig->applicationStage === 'staging') {
            $this->inProductionEnvironment = true;
        }

        return $this;
    }

    public function darkMode(): self
    {
        $this->theme = 'dark';

        return $this;
    }

    public function runningInProductionEnvironment(bool $boolean = true): self
    {
        $this->inProductionEnvironment = $boolean;

        return $this;
    }

    public function toArray(): array
    {
        return [
            'editor' => $this->editor,
            'editorOptions' => $this->editorOptions,
            'remoteSitesPath' => $this->remoteSitesPath,
            'localSitesPath' => $this->localSitesPath,
            'theme' => $this->theme,
            'enableShareButton' => $this->enableShareButton,
            'directorySeparator' => DIRECTORY_SEPARATOR,
            'shareEndpoint' => $this->shareEndpoint,
        ];
    }
}
