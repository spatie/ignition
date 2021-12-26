<?php

use Spatie\Ignition\Config\IgnitionConfig;

test('the config can be converted to an array', function () {
    $config = new IgnitionConfig([
        'editor' => 'phpstorm',
        'remote_sites_path' => 'remote',
        'local_sites_path' => 'local',
    ]);



    $this->assertEquals([
        'editor' => 'phpstorm',
        'remoteSitesPath' => 'remote',
        'localSitesPath' => 'local',
        'theme' => 'light',
        'enableShareButton' => false,
        'enableRunnableSolutions' => false,
        'directorySeparator' => DIRECTORY_SEPARATOR,
        'hideSolutions' => false,
    ], $config->toArray());
});
