<?php

namespace Spatie\Ignition\Config;

class DefaultConfigFinder
{
    /**
     * @param string|null $configDirectory
     *
     * @return array<string, string>
     */
    public function getSettingsFromConfig(string $configDirectory = null): array
    {
        $configFilePath = $this->searchConfigFilesOnDisk($configDirectory);

        if (! file_exists($configFilePath)) {
            return [];
        }

        $options = include $configFilePath;

        return $options ?? [];
    }

    protected function searchConfigFilesOnDisk(string $configDirectory = null): string
    {
        $configNames = [
            'ignition.php',
        ];

        $configDirectory = $configDirectory ?? (string)getcwd();
        while (@is_dir($configDirectory)) {
            foreach ($configNames as $configName) {
                $configFullPath = $configDirectory.DIRECTORY_SEPARATOR.$configName;
                if (file_exists($configFullPath)) {
                    return $configFullPath;
                }
            }

            $parentDirectory = dirname($configDirectory);

            // We do a direct comparison here since there's a difference between
            // the root directories on windows / *nix systems which does not
            // let us compare it against the DIRECTORY_SEPARATOR directly
            if ($parentDirectory === $configDirectory) {
                return '';
            }

            $configDirectory = $parentDirectory;
        }

        return '';
    }
}
