<?php

use Spatie\Ignition\Config\DefaultConfigFinder;

const SETTINGS_FILE_DIRECTORY = __DIR__ . '/../temp/';

test('the config finder can run without a filepath on linux', function () {
    putenv('HOME=' . realpath(SETTINGS_FILE_DIRECTORY));

    $configFinder = new DefaultConfigFinder();

    $configFilePath = $configFinder->getConfigFilePath();

    $this->assertNotEmpty($configFilePath);
})->skip(fn() => isWindows() === false, 'This test runs only in non-Windows environment.');

test('the config finder can run without a filepath on windows', function () {
    [$disk, $path] = explode(':', realpath(SETTINGS_FILE_DIRECTORY), 2);

    $_SERVER['HOMEDRIVE'] = "{$disk}:";
    $_SERVER['HOMEPATH'] = "{$path}";

    $configFinder = new DefaultConfigFinder();

    $configFilePath = $configFinder->getConfigFilePath();

    $this->assertNotEmpty($configFilePath);
})->skip(fn() => isWindows() === true, 'This test runs only in Windows environment.');


test('the config finder can accept a filepath', function () {
    $path = __DIR__ . '/../temp/';

    $configFinder = new DefaultConfigFinder($path);

    $configFilePath = $configFinder->getConfigFilePath();

    $this->assertNotEmpty($configFilePath);
});

// Helpers
function isWindows(): bool
{
    return str_starts_with('WIN', PHP_OS);
}
