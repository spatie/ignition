<?php

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
