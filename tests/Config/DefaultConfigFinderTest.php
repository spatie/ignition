<?php

namespace Spatie\Ignition\Tests\Config;

use Spatie\Ignition\Config\DefaultConfigFinder;
use Spatie\Ignition\Tests\TestCase;

class DefaultConfigFinderTest extends TestCase
{
    /** @test */
    public function it_can_retrieve_the_values_of_a_config_file()
    {
        $configDirectory = $this->getTestDirectory('/stubs/testConfig');

        $configValues = (new DefaultConfigFinder())->getSettingsFromConfig($configDirectory);

        $this->assertEquals(['name' => 'value'], $configValues);
    }
}
