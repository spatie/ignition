<?php

require_once __DIR__ . '/helpers.php';

use Spatie\Ignition\Config\FileConfigManager;
use Spatie\Ignition\Config\IgnitionConfig;

afterEach(function () {
    removeTempSettingsFile();
});

test('the config can be converted to an array', function () {
    $config = new IgnitionConfig([
        'editor' => 'phpstorm',
        'remote_sites_path' => 'remote',
        'local_sites_path' => 'local',
    ]);

    $configArray = $config->toArray();

    $this->assertEquals('phpstorm', $configArray['editor']);
    $this->assertEquals('remote', $configArray['remoteSitesPath']);
    $this->assertEquals('local', $configArray['localSitesPath']);
});

test('the config can be retrieved from a file', function () {
    $config = new IgnitionConfig();

    $config->saveValues([
        'editor' => 'test',
    ]);

    $config->loadConfigFile();
    $configArray = $config->toArray();

    $this->assertEquals('test', $configArray['editor']);
});

test('the config can be retrieved from environment variable', function () {
    $_ENV['IGNITION_EDITOR'] = 'long string';
    $_ENV['IGNITION_THEME'] = 'auto';
    $_ENV['IGNITION_HIDE_SOLUTIONS'] = "false";
    $_ENV['IGNITION_ENABLE_SHARE_BUTTON'] = "true";

    $config = new IgnitionConfig();

    $config->loadConfigFile();
    $configArray = $config->toArray();

    $this->assertEquals('long string', $configArray['editor']);
    $this->assertEquals('auto', $configArray['theme']);
    $this->assertFalse($configArray['hideSolutions']);
    $this->assertTrue($configArray['enableShareButton']);
});

if (! function_exists('app')) {
    function app()
    {
        return new FileConfigManager(SETTINGS_FILE_DIRECTORY);
    }
}
