<?php

namespace Spatie\Ignition\Config;

use Spatie\Ignition\Contracts\ConfigManager;
use Throwable;

class FileConfigManager implements ConfigManager
{
    private const SETTINGS_FILE_NAME = '.ignition.json';

    private string $path;

    private string $file;

    public function __construct(string $path = '')
    {
        $this->path = $this->initPath($path);
        $this->file = $this->initFile();
    }

    protected function initPath(string $path): string
    {
        if ($path !== '') {
            return $this->initPathFromArgument($path);
        }

        return $this->initPathFromEnvironment();
    }

    private function initPathFromArgument(string $path): string
    {
        if ($this->isValidPathArgument($path)) {
            return $this->preparePath($path);
        }

        return '';
    }

    private function retrievePath(string $path): string
    {
        if ($path !== '') {
            return $path;
        }

        return $this->initPathFromEnvironment();
    }

    private function isValidPathArgument(string $path): bool
    {
        return file_exists($path) && @is_writable($path);
    }

    private function preparePath(string $path): string
    {
        return rtrim($path, DIRECTORY_SEPARATOR);
    }

    private function initPathFromEnvironment(): string
    {
        if (! empty($_SERVER['HOMEDRIVE']) && ! empty($_SERVER['HOMEPATH'])) {
            return $_SERVER['HOMEDRIVE'] . $_SERVER['HOMEPATH'];
        }

        if ($homeDirectory = getenv('HOME')) {
            return $this->preparePath($homeDirectory);
        }

        return '';
    }

    protected function initFile(): string
    {
        return $this->path . DIRECTORY_SEPARATOR . self::SETTINGS_FILE_NAME;
    }

    /** {@inheritDoc} */
    public function load(): array
    {
        return $this->readFromFile();
    }

    protected function readFromFile()
    {
        if (! $this->isValidFile()) {
            return [];
        }

        $content = (string)file_get_contents($this->file);
        $settings = json_decode($content, true) ?? [];

        return $settings;
    }

    protected function isValidFile(): bool
    {
        return ! $this->isEmptyPath() &&
            file_exists($this->file) &&
            @is_writable($this->file);
    }

    /** {@inheritDoc} */
    public function save(array $options): bool
    {
        if (! $this->createFile()) {
            return false;
        }

        return $this->saveToFile($options);
    }

    protected function createFile(): bool
    {
        if ($this->isEmptyPath()) {
            return false;
        }

        if (file_exists($this->file)) {
            return false;
        }

        return (file_put_contents($this->file, '') !== false);
    }

    private function isEmptyPath(): bool
    {
        return trim($this->path) === '';
    }

    protected function saveToFile(array $options): bool
    {
        try {
            $content = json_encode($options, JSON_THROW_ON_ERROR);
        } catch (Throwable) {
            return false;
        }

        return $this->writeToFile($content);
    }

    protected function writeToFile(string $content): bool
    {
        if (! $this->isValidFile()) {
            return false;
        }

        return (file_put_contents($this->file, $content) !== false);
    }

    /** {@inheritDoc} */
    public function getPersistentInfo(): array
    {
        return [
            'name' => self::SETTINGS_FILE_NAME,
            'path' => $this->path,
            'file' => $this->file,
        ];
    }
}
