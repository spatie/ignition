<?php

use Spatie\Ignition\Config\DefaultConfigFinder;

test('the config finder can accept a filepath', function () {
    $path = __DIR__ . '/../temp/';

    $configFinder = new DefaultConfigFinder($path);

    $configFilePath = $configFinder->getConfigFilePath();

    $this->assertNotEmpty($configFilePath);
});

