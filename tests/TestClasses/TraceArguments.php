<?php

namespace Spatie\Ignition\Tests\TestClasses;

use DateTimeZone;
use Exception;

class TraceArguments
{
    public static function create(): self
    {
        return new self();
    }

    public function exception(
        string $sting,
        DateTimeZone $dateTimeZone,
    ): Exception {
        return new Exception('Hey');
    }
}
