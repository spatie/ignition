<?php

namespace Spatie\Ignition\Config;

class DefaultConfigFinder
{
    private const SETTINGS_FILE_NAME = '.ignition.json';

    public function getConfigFilePath(): string
    {
        if (! $homeDirectory = $this->findHomeDirectory()) {
            return '';
        }

        $filepath = $this->generateFilePath($homeDirectory);

        return @is_readable($filepath) ? $filepath : '';
    }

    private function generateFilePath(string $path): string
    {
        return $path . DIRECTORY_SEPARATOR . self::SETTINGS_FILE_NAME;
    }

    protected function findHomeDirectory(): ?string
    {
        if ($this->isWindows()) {
            if (empty($_SERVER['HOMEDRIVE']) || empty($_SERVER['HOMEPATH'])) {
                return null;
            }

            $homeDirectory = $_SERVER['HOMEDRIVE'] . $_SERVER['HOMEPATH'];

            return rtrim($homeDirectory, DIRECTORY_SEPARATOR);
        }

        if ($homeDirectory = getenv('HOME')) {
            return rtrim($homeDirectory, DIRECTORY_SEPARATOR);
        }

        return null;
    }

    private function isWindows(): bool
    {
        return str_starts_with(strtoupper(PHP_OS), 'WIN');
    }
}
