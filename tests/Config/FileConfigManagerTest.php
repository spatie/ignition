<?php

use Spatie\Ignition\Config\FileConfigManager;

const SETTINGS_FILE_DIRECTORY = __DIR__ . '/../temp/';
const SETTINGS_FILE_NAME = '.ignition.json';

afterEach(function () {
    $settingsFile = retrieveSettingsFilePath();

    if (file_exists($settingsFile)) {
        unlink(realpath($settingsFile));
    }
});

test('the file config manager can use a default file in Unix-like environment', function () {
    putenv('HOME=' . realpath(SETTINGS_FILE_DIRECTORY));

    $configManager = new FileConfigManager();
    $configManager->createSource();

    $configSource = $configManager->getSource();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
})->skip(fn () => isWindows() === true, 'This test can be run only in the non-Windows environment.');

test('the file config manager can use a default file in Windows environment', function () {
    [$disk, $path] = explode(':', realpath(SETTINGS_FILE_DIRECTORY), 2);

    $_SERVER['HOMEDRIVE'] = "{$disk}:";
    $_SERVER['HOMEPATH'] = "{$path}";

    $configManager = new FileConfigManager();
    $configManager->createSource();

    $configSource = $configManager->getSource();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
})->skip(fn () => isWindows() === false, 'This test can be run only in the Windows environment.');

test('the file config manager can process a filepath', function () {
    $settings = [
        'path' => __DIR__ . '/../temp/'
    ];

    $configManager = new FileConfigManager();
    $configManager->updateSource($settings);

    $configSource = $configManager->getSource();

    $this->assertArrayHasKey('path', $configSource);
    $this->assertStringContainsString('temp', $configSource['path']);
});

test('the file config manager can create config file form a filepath', function () {
    $settings = [
        'path' => __DIR__ . '/../temp/'
    ];

    $configManager = new FileConfigManager();
    $configManager->updateSource($settings);
    $configManager->createSource();

    $configSource = $configManager->getSource();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
});

test('the file config manager can save to the config file form a filepath', function () {
    $settings = [
        'path' => __DIR__ . '/../temp/'
    ];

    $configManager = new FileConfigManager();
    $configManager->updateSource($settings);
    $configManager->createSource();
    $configManager->save([
        'test' => 'saved',
    ]);

    $configSource = $configManager->getSource();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
    $this->assertStringContainsString('saved', file_get_contents($configSource['file']));
});

test('the file config manager can load from the config file form a filepath', function () {
    $settings = [
        'path' => __DIR__ . '/../temp/'
    ];

    $configManager = new FileConfigManager();
    $configManager->updateSource($settings);
    $configManager->createSource();
    $configManager->save([
        'test' => 'saved',
    ]);

    $result = $configManager->load();

    $this->assertNotEmpty($result);
    $this->assertArrayHasKey('test', $result);
});

// Helpers
function isWindows(): bool
{
    return str_starts_with(strtoupper(PHP_OS), 'WIN');
}

function retrieveSettingsFilePath(): string
{
    $path = rtrim(SETTINGS_FILE_DIRECTORY, DIRECTORY_SEPARATOR);
    $file = SETTINGS_FILE_NAME;

    return realpath($path . DIRECTORY_SEPARATOR . $file);
}
