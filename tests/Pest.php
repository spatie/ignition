<?php

use Dotenv\Dotenv;
use Spatie\FlareClient\Glows\Glow;
use Spatie\FlareClient\Report;
use Spatie\Ignition\Tests\TestClasses\FakeTime;

if (file_exists(__DIR__ . '/../.env')) {
    $dotEnv = Dotenv::createImmutable(__DIR__ . '/..');

    $dotEnv->load();
}

function useTime(string $dateTime, string $format = 'Y-m-d H:i:s')
{
    $fakeTime = new FakeTime($dateTime, $format);

    Report::useTime($fakeTime);
    Glow::useTime($fakeTime);
}

function getTestDirectory($subDirectory = ''): string
{
    return __DIR__ . $subDirectory;
}
