<?php

namespace Spatie\Ignition;

use Spatie\FlareClient\FlareConfig;

class IgnitionConfig
{
    /** @param array<string, mixed> $saveableOptions */
    public static function make(): self
    {
        return new self();
    }

    /**
     * @param array<string, mixed> $editorOptions
     * @param array<int, string> $documentationLinkResolvers
     */
    public function __construct(
        public bool $hideSolutions = false,
        public bool $shouldDisplayException = true,
        public bool $inProductionEnvironment = false,
        public string $editor = 'vscode',
        public ?string $remoteSitesPath = null,
        public ?string $localSitesPath = null,
        public string $theme = 'light',
        public bool $enableShareButton = true,
        public string $shareEndpoint = 'https://flareapp.io/api/public-reports',
        public string $customHtmlHead = '',
        public string $customHtmlBody = '',
        public ?string $configPath = null,
        public array $documentationLinkResolvers = [],
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
            'remoteSitesPath' => $this->remoteSitesPath,
            'localSitesPath' => $this->localSitesPath,
            'theme' => $this->theme,
            'enableShareButton' => $this->enableShareButton,
            'directorySeparator' => DIRECTORY_SEPARATOR,
            'shareEndpoint' => $this->shareEndpoint,
        ];
    }

    /** @return array{theme: string, editor: string, hide_solutions: bool} */
    public function toSaveableOptions(): array
    {
        return [
            'theme' => $this->theme,
            'editor' => $this->editor,
            'hide_solutions' => $this->hideSolutions,
        ];
    }

    /**
     * @param array<string, mixed> $options
     */
    public function loadSaveableOptions(array $options): self
    {
        if (isset($options['theme'])) {
            $this->theme = $options['theme'];
        }

        if (isset($options['editor'])) {
            $this->editor = $options['editor'];
        }

        if (isset($options['hide_solutions'])) {
            $this->hideSolutions = $options['hide_solutions'];
        }

        return $this;
    }
}
