<?php

namespace Spatie\Ignition\Config;

use Spatie\Ignition\Contracts\ConfigManager;

class FileConfigManager implements ConfigManager
{
    private const SETTINGS_FILE_NAME = '.ignition.json';

    private string $path;

    public function save(): bool
    {
        return true;
    }

    public function load(): array
    {
        return [];
    }

    public function getSource(): array
    {
        return [
            'name' => self::SETTINGS_FILE_NAME,
            'path' => $this->path,
            'file' => $this->generateFullFilePath(),
        ];
    }

    public function updateSource(array $settings): bool
    {
        if (!array_key_exists('path', $settings)) {
            return false;
        }

        if ($path = $this->initPath($settings['path'])) {
            $this->path = rtrim($path, DIRECTORY_SEPARATOR);

            return true;
        }

        return false;
    }

    private function initPath(string $path): string
    {
        $path = realpath($path);

        if ($this->isValidPath($path)) {
            return $path;
        }

        return '';
    }

    private function isValidPath(string $path): bool
    {
        return ($path !== '') && file_exists($path) && is_writable($path);
    }

    public function createSource(): bool
    {
        try {
            file_put_contents($this->generateFullFilePath(), '');
        } catch (\Throwable) {
            return false;
        }

        return true;
    }

    private function generateFullFilePath(): string
    {
        return $this->path . DIRECTORY_SEPARATOR . self::SETTINGS_FILE_NAME;
    }
}
