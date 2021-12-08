<?php

namespace Spatie\Ignition\Config;

use Illuminate\Contracts\Support\Arrayable;

class IgnitionConfig implements Arrayable
{
    /** @var array<string, string> */
    protected array $options = [];

    public static function loadFromConfigFile(): self
    {
        $defaultConfigValues = (new DefaultConfigFinder)->getSettingsFromConfig();

        return new self($defaultConfigValues);
    }

    /** @param array<string, string> $options */
    public function __construct(array $options = [])
    {
        $defaultOptions = [
            'theme' => 'light',
        ];

        $this->options = array_merge($defaultOptions, $options);
    }

    /** @param array<string, string> $newDefaults */
    public function mergeAsDefault(array $newDefaults): self
    {
        $this->options = array_merge($newDefaults, $this->options);

        return $this;
    }

    /** @param array<string, string> $options */
    public function merge(array $options): self
    {
        $this->options = array_merge($this->options, $options);

        return $this;
    }

    public function setOption(string $name, string $value): self
    {
        $this->options[$name] = $value;

        return $this;
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
