<?php

namespace Spatie\Ignition\Config;

use Illuminate\Contracts\Support\Arrayable;
use Throwable;

class IgnitionConfig implements Arrayable
{
    /** @var array<string, string> */
    protected array $options = [];

    public static function loadFromConfigFile(): self
    {
        return (new self())->loadConfigFile();
    }

    /** @param array<string, string> $options */
    public function __construct(array $options = [])
    {
        // theme {dark, light, auto}, editor, hide solutions (bool),
        
        $defaultOptions = [
            'theme' => 'light',
        ];

        $this->options = array_merge($defaultOptions, $options);
    }

    public function setOption(string $name, string $value): self
    {
        $this->options[$name] = $value;

        return $this;
    }

    /** @param array<string, string> $options */
    public function merge(array $options): self
    {
        $this->options = array_merge($this->options, $options);

        return $this;
    }

    public function loadConfigFile(): self
    {
        $this->options = $this->getConfigOptions();

        return $this;
    }

    /** @return array<string, mixed> */
    public function getConfigOptions(): array
    {
        $configFilePath = (new DefaultConfigFinder())->getConfigFilePath();

        $options = [];

        if (file_exists($configFilePath)) {
            $content = (string)file_get_contents($configFilePath);

            $options = json_decode($content, true) ?? [];
        }

        return $options;
    }

    /**
     * @param array<string, mixed> $newOptions
     *
     * @return bool
     */
    public function saveValues(array $newOptions): bool
    {
        $options = array_merge(
            $this->getConfigOptions(),
            $newOptions
        );

        $configFilePath = (new DefaultConfigFinder())->getConfigFilePath();

        if (! $configFilePath) {
            return false;
        }

        try {
            file_put_contents($configFilePath, json_encode($options));
        } catch (Throwable) {
            return false;
        }

        return true;
    }

    public function editor(): ?string
    {
        return $this->options['editor'] ?? null;
    }

    public function remoteSitesPath(): ?string
    {
        return $this->options['remote_sites_path'] ?? null;
    }

    public function localSitesPath(): ?string
    {
        return $this->options['local_sites_path'] ?? null;
    }

    public function theme(): ?string
    {
        return $this->options['theme'] ?? null;
    }

    public function shareButtonEnabled(): bool
    {
        return (bool)($this->options['enable_share_button'] ?? false);
    }

    public function runnableSolutionsEnabled(): bool
    {
        return (bool)($this->options['enable_runnable_solutions'] ?? false);
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'editor' => $this->editor(),
            'remoteSitesPath' => $this->remoteSitesPath(),
            'localSitesPath' => $this->localSitesPath(),
            'theme' => $this->theme(),
            'enableShareButton' => $this->shareButtonEnabled(),
            'enableRunnableSolutions' => $this->runnableSolutionsEnabled(),
            'directorySeparator' => DIRECTORY_SEPARATOR,
        ];
    }
}
