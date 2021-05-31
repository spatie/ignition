<?php

namespace Spatie\Ignition\Tests\TestClasses;

use Closure;
use Spatie\FlareClient\FlareMiddleware\FlareMiddleware;
use Spatie\FlareClient\Report;

class DummyFlareMiddleware implements FlareMiddleware
{
    public function handle(Report $report, Closure $next)
    {
        $report->message("{$report->getMessage()}, now modified");

        return $next($report);
    }
}
