<?php

const SETTINGS_FILE_DIRECTORY = __DIR__ . '/../temp/';
const SETTINGS_FILE_NAME = '.ignition.json';

if (! function_exists('removeTempSettingsFile')) {
    function removeTempSettingsFile(): void
    {
        $settingsFile = retrieveSettingsFilePath();

        if (file_exists($settingsFile)) {
            unlink(realpath($settingsFile));
        }
    }
}

if (! function_exists('retrieveSettingsFilePath')) {
    function retrieveSettingsFilePath(): string
    {
        $path = rtrim(SETTINGS_FILE_DIRECTORY, DIRECTORY_SEPARATOR);
        $file = SETTINGS_FILE_NAME;

        return realpath($path . DIRECTORY_SEPARATOR . $file);
    }
}
