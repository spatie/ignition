<?php

namespace Spatie\Ignition\Config;

use Illuminate\Contracts\Support\Arrayable;
use Spatie\Ignition\Contracts\ConfigManager;
use Throwable;

/** @implements Arrayable<string, string|null|bool|array<string, mixed>> */
class IgnitionConfig implements Arrayable
{
    private ConfigManager $manager;

    public static function loadFromConfigFile(): self
    {
        return (new self())->loadConfigFile();
    }

    /**
     * @param array<string, mixed> $options
     */
    public function __construct(protected array $options = [])
    {
        $defaultOptions = $this->getDefaultOptions();

        $this->options = array_merge($defaultOptions, $options);
        $this->manager = $this->initConfigManager();
    }

    public function getOption(string $name): array|string|bool|null
    {
        return $this->options[$name] ?? $this->getOptionFromEnv($name);
    }

    public function getOptionFromEnv(string $name): string|bool|null
    {
        $key = 'IGNITION_' . mb_strtoupper($name);
        return array_key_exists($key, $_ENV)
            ? $this->parseEnvironmentValue($_ENV[$key])
            : null;
    }

    public function setOption(string $name, string $value): self
    {
        $this->options[$name] = $value;

        return $this;
    }

    private function initConfigManager(): ConfigManager
    {
        try {
            /** @phpstan-ignore-next-line  */
            return app(ConfigManager::class);
        } catch (Throwable) {
            return new FileConfigManager();
        }
    }

    /** @param array<string, string> $options */
    public function merge(array $options): self
    {
        $this->options = array_merge($this->options, $options);

        return $this;
    }

    public function loadConfigFile(): self
    {
        $this->merge($this->getConfigOptions());

        return $this;
    }

    /** @return array<string, mixed> */
    public function getConfigOptions(): array
    {
        return $this->manager->load();
    }

    /**
     * @param array<string, mixed> $options
     * @return bool
     */
    public function saveValues(array $options): bool
    {
        return $this->manager->save($options);
    }

    public function hideSolutions(): bool
    {
        return $this->getOption('hide_solutions') ?? false;
    }

    public function editor(): ?string
    {
        return $this->getOption('editor');
    }

    /**
     * @return array<string, mixed> $options
     */
    public function editorOptions(): array
    {
        return $this->getOption('editor_options') ?? [];
    }

    public function remoteSitesPath(): ?string
    {
        return $this->getOption('remote_sites_path');
    }

    public function localSitesPath(): ?string
    {
        return $this->getOption('local_sites_path');
    }

    public function theme(): ?string
    {
        return $this->getOption('theme');
    }

    public function shareButtonEnabled(): bool
    {
        return (bool)($this->getOption('enable_share_button') ?? false);
    }

    public function shareEndpoint(): string
    {
        return $this->getOption('share_endpoint')
            ?? $this->getDefaultOptions()['share_endpoint'];
    }

    public function runnableSolutionsEnabled(): bool
    {
        return (bool)($this->getOption('enable_runnable_solutions') ?? false);
    }

    /** @return array<string, string|null|bool|array<string, mixed>> */
    public function toArray(): array
    {
        return [
            'editor' => $this->editor(),
            'theme' => $this->theme(),
            'hideSolutions' => $this->hideSolutions(),
            'remoteSitesPath' => $this->remoteSitesPath(),
            'localSitesPath' => $this->localSitesPath(),
            'enableShareButton' => $this->shareButtonEnabled(),
            'enableRunnableSolutions' => $this->runnableSolutionsEnabled(),
            'directorySeparator' => DIRECTORY_SEPARATOR,
            'editorOptions' => $this->editorOptions(),
            'shareEndpoint' => $this->shareEndpoint(),
        ];
    }

    /**
     * @return array<string, mixed> $options
     */
    protected function getDefaultOptions(): array
    {
        return [
            'share_endpoint' => $this->getOptionFromEnv('share_endpoint') ?? 'https://flareapp.io/api/public-reports',
            'theme' => $this->getOptionFromEnv('theme') ?? 'light',
            'editor' => $this->getOptionFromEnv('editor') ?? 'vscode',
            'editor_options' => [
                'clipboard' => [
                    'label' => 'Clipboard',
                    'url' => '%path:%line',
                    'clipboard' => true,
                ],
                'sublime' => [
                    'label' => 'Sublime',
                    'url' => 'subl://open?url=file://%path&line=%line',
                ],
                'textmate' => [
                    'label' => 'TextMate',
                    'url' => 'txmt://open?url=file://%path&line=%line',
                ],
                'emacs' => [
                    'label' => 'Emacs',
                    'url' => 'emacs://open?url=file://%path&line=%line',
                ],
                'macvim' => [
                    'label' => 'MacVim',
                    'url' => 'mvim://open/?url=file://%path&line=%line',
                ],
                'phpstorm' => [
                    'label' => 'PhpStorm',
                    'url' => 'phpstorm://open?file=%path&line=%line',
                ],
                'phpstorm-remote' => [
                    'label' => 'PHPStorm Remote',
                    'url' => 'javascript:r = new XMLHttpRequest;r.open("get", "http://localhost:63342/api/file/%path:%line");r.send()',
                ],
                'idea' => [
                    'label' => 'Idea',
                    'url' => 'idea://open?file=%path&line=%line',
                ],
                'vscode' => [
                    'label' => 'VS Code',
                    'url' => 'vscode://file/%path:%line',
                ],
                'vscode-insiders' => [
                    'label' => 'VS Code Insiders',
                    'url' => 'vscode-insiders://file/%path:%line',
                ],
                'vscode-remote' => [
                    'label' => 'VS Code Remote',
                    'url' => 'vscode://vscode-remote/%path:%line',
                ],
                'vscode-insiders-remote' => [
                    'label' => 'VS Code Insiders Remote',
                    'url' => 'vscode-insiders://vscode-remote/%path:%line',
                ],
                'vscodium' => [
                    'label' => 'VS Codium',
                    'url' => 'vscodium://file/%path:%line',
                ],
                'atom' => [
                    'label' => 'Atom',
                    'url' => 'atom://core/open/file?filename=%path&line=%line',
                ],
                'nova' => [
                    'label' => 'Nova',
                    'url' => 'nova://open?path=%path&line=%line',
                ],
                'netbeans' => [
                    'label' => 'NetBeans',
                    'url' => 'netbeans://open/?f=%path:%line',
                ],
                'xdebug' => [
                    'label' => 'Xdebug',
                    'url' => 'xdebug://%path@%line',
                ],
            ],
        ];
    }

    private function parseEnvironmentValue($value)
    {
        switch (mb_strtolower($value)) {
            case 'true':
            case '(true)':
                return true;
            case 'false':
            case '(false)':
                return false;
            case 'empty':
            case '(empty)':
                return '';
            case 'null':
            case '(null)':
                return;
        }

        if (preg_match('/\A([\'"])(.*)\1\z/', $value, $matches)) {
            return $matches[2];
        }

        return $value;
    }
}
