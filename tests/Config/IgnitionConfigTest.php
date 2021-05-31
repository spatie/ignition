<?php

namespace Spatie\Ignition\Tests\Config;

use Spatie\Ignition\Config\IgnitionConfig;
use Spatie\Ignition\Tests\TestCase;

class IgnitionConfigTest extends TestCase
{
    /** @test */
    public function the_config_can_be_converted_to_an_array()
    {
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
        ], $config->toArray());
    }
}
