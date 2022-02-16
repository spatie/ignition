<?php

use Spatie\Ignition\Config\FileConfigManager;
use Spatie\Ignition\Config\IgnitionConfig;

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

// Helpers
if (! function_exists('app')) {
    function app()
    {
        $path = __DIR__ . '/../temp/';

        $manager = new FileConfigManager();
        $manager->updateSource(['path' => __DIR__ . '/../temp/']);

        return $manager;
    }
}
