<?php

namespace Spatie\Ignition\Tests;

use PHPUnit\Framework\TestCase as PHPUnitTestCase;
use Spatie\FlareClient\Glows\Glow;
use Spatie\FlareClient\Report;
use Spatie\Ignition\Tests\TestClasses\FakeTime;

class TestCase extends PHPUnitTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        ray()->newScreen($this->getName());
    }

    public function useTime(string $dateTime, string $format = 'Y-m-d H:i:s')
    {
        $fakeTime = new FakeTime($dateTime, $format);

        Report::useTime($fakeTime);
        Glow::useTime($fakeTime);
    }

    public function getTestDirectory($subDirectory = ''): string
    {
        return __DIR__ . $subDirectory;
    }
}
