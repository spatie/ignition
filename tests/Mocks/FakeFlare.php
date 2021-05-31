<?php

namespace Spatie\Ignition\Tests\Mocks;

use PHPUnit\Framework\Assert;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Http\Client;
use Spatie\FlareClient\Http\Response;
use Spatie\FlareClient\Report;
use Throwable;

class FakeFlare extends Flare
{
    public array $sentReports = [];

    public function sendReportToApi(Report $report): void
    {
        $this->sentReports[] = $report;
    }
}
