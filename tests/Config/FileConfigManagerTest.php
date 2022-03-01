<?php

require_once __DIR__ . '/helpers.php';

use Spatie\Ignition\Config\FileConfigManager;

afterEach(function () {
    removeTempSettingsFile();
});

test('the file config manager can use a default file in Unix-like environment', function () {
    putenv('HOME=' . realpath(SETTINGS_FILE_DIRECTORY));

    $configManager = new FileConfigManager();

    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
})->skip(fn () => isWindows() === true, 'This test can be run only in the non-Windows environment.');

test('the file config manager can use a default file in Windows environment', function () {
    [$disk, $path] = explode(':', realpath(SETTINGS_FILE_DIRECTORY), 2);

    $_SERVER['HOMEDRIVE'] = "{$disk}:";
    $_SERVER['HOMEPATH'] = "{$path}";

    $configManager = new FileConfigManager();

    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
})->skip(fn () => isWindows() === false, 'This test can be run only in the Windows environment.');

test('the file config manager cannot process an empty filepath', function () {
    $configManager = new FileConfigManager('   ');
    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertEmpty($configSource['file']);
});

test('the file config manager cannot process a wrong filepath', function () {
    $configManager = new FileConfigManager(__DIR__ . '/wrong_file_path');
    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertEmpty($configSource['file']);
});

test('the file config manager can process a filepath', function () {
    $configManager = new FileConfigManager(SETTINGS_FILE_DIRECTORY);
    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('path', $configSource);
    $this->assertStringContainsString('temp', $configSource['path']);
});

test('the file config manager can create a config file from a filepath', function () {
    $configManager = new FileConfigManager(SETTINGS_FILE_DIRECTORY);

    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
});

test('the file config manager can save to a config file created from a filepath', function () {
    $configManager = new FileConfigManager(SETTINGS_FILE_DIRECTORY);
    $configManager->save([
        'test' => 'saved',
    ]);

    $configSource = $configManager->getPersistentInfo();

    $this->assertArrayHasKey('file', $configSource);
    $this->assertFileExists($configSource['file']);
    $this->assertStringContainsString('saved', file_get_contents($configSource['file']));
});

test('the file config manager can load from a config file created from a filepath', function () {
    $configManager = new FileConfigManager(SETTINGS_FILE_DIRECTORY);
    $configManager->save([
        'test' => 'saved',
    ]);

    $result = $configManager->load();

    $this->assertNotEmpty($result);
    $this->assertArrayHasKey('test', $result);
});

function isWindows(): bool
{
    return str_starts_with(strtoupper(PHP_OS), 'WIN');
}
