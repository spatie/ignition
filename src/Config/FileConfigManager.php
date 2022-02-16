<?php

namespace Spatie\Ignition\Config;

use Spatie\Ignition\Contracts\ConfigManager;

class FileConfigManager implements ConfigManager
{
    private const SETTINGS_FILE_NAME = '.ignition.json';

    private string $path;

    public function __construct()
    {
        $this->path = $this->findHomeDirectory();
    }

    protected function findHomeDirectory(): string
    {
        if ($this->isWindows()) {
            if (empty($_SERVER['HOMEDRIVE']) || empty($_SERVER['HOMEPATH'])) {
                return '';
            }

            $homeDirectory = $_SERVER['HOMEDRIVE'] . $_SERVER['HOMEPATH'];

            return $this->preparePath($homeDirectory);
        }

        if ($homeDirectory = getenv('HOME')) {
            return $this->preparePath($homeDirectory);
        }

        return '';
    }

    private function isWindows(): bool
    {
        return str_starts_with(strtoupper(PHP_OS), 'WIN');
    }

    public function load(): array
    {
        $file = $this->generateFullFilePath();

        if (!$this->isValidFile($file)) {
            return [];
        }

        $content = (string)file_get_contents($file);
        $options = json_decode($content, true) ?? [];

        return $options;
    }

    public function save(array $options): bool
    {
        $file = $this->generateFullFilePath();

        if (! $this->isValidFile($file)) {
            return false;
        }

        try {
            file_put_contents($file, json_encode($options));
        } catch (\Throwable) {
            return false;
        }

        return true;
    }

    protected function isValidFile(string $file): bool
    {
        return file_exists($file) && @is_writable($file);
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
            $this->path = $this->preparePath($path);

            return true;
        }

        return false;
    }

    protected function preparePath(string $path): string
    {
        return rtrim($path, DIRECTORY_SEPARATOR);
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
        $file = $this->generateFullFilePath();

        if (file_exists($file)) {
            return true;
        }

        try {
            file_put_contents($file, '');
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