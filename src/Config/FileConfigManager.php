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
        $this->file = $this->createFile();
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
        if ($this->isValidPath($path)) {
            return $path;
        }

        return '';
    }

    private function isValidPath(string $path): bool
    {
        return file_exists($path) && is_writable($path);
    }

    protected function initPathFromEnvironment(): string
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

    protected function preparePath(string $path): string
    {
        return rtrim($path, DIRECTORY_SEPARATOR);
    }

    protected function createFile(): string
    {
        if ($this->createSource()) {
            return $this->generateFullFilePath();
        }

        return '';
    }

    /** {@inheritDoc} */
    public function load(): array
    {
        if (! $this->isFileCreated()) {
            return [];
        }

        return $this->readFromFile();
    }

    private function readFromFile()
    {
        if (! $this->isValidFile()) {
            return [];
        }

        $content = (string)file_get_contents($file);
        $settings = json_decode($content, true) ?? [];

        return $settings;
    }

    /** {@inheritDoc} */
    public function save(array $options): bool
    {
        if (! $this->isFileCreated()) {
            return false;
        }

        return $this->saveToFile($options);
    }

    private function saveToFile(array $options): bool
    {
        if (! $this->isValidFile()) {
            return false;
        }

        try {
            file_put_contents($file, json_encode($options, JSON_THROW_ON_ERROR));
        } catch (Throwable) {
            return false;
        }

        return true;
    }

    protected function isFileCreated(): bool
    {
        return $this->file !== '';
    }

    protected function isValidFile(): bool
    {
        return file_exists($this->file) && @is_writable($this->file);
    }

    /** {@inheritDoc} */
    public function getSource(): array
    {
        return [
            'name' => self::SETTINGS_FILE_NAME,
            'path' => $this->path,
            'file' => $this->file,
        ];
    }

    /** {@inheritDoc} */
    public function createSource(): bool
    {
        $file = $this->generateFullFilePath();

        if (file_exists($file)) {
            return true;
        }

        try {
            file_put_contents($file, '');
        } catch (Throwable) {
            return false;
        }

        return true;
    }

    private function generateFullFilePath(): string
    {
        return $this->path . DIRECTORY_SEPARATOR . self::SETTINGS_FILE_NAME;
    }
}
