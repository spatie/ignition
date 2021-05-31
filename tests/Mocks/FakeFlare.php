<?php

namespace Spatie\Ignition\Tests\Mocks;

use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Report;

class FakeFlare extends Flare
{
    public array $sentReports = [];

    public function sendReportToApi(Report $report): void
    {
        $this->sentReports[] = $report;
    }
}
