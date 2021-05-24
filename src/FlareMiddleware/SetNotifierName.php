<?php

namespace Spatie\Ignition\FlareMiddleware;

use Spatie\FlareClient\Report;

class SetNotifierName
{
    const NOTIFIER_NAME = 'PHP Client';

    public function handle(Report $report, $next)
    {
        $report->notifierName(static::NOTIFIER_NAME);

        return $next($report);
    }
}
