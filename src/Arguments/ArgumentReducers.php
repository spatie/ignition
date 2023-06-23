<?php

namespace Spatie\Ignition\Arguments;

use Spatie\Backtrace\Arguments\ArgumentReducers as BaseArgumentReducers;
use Spatie\Backtrace\Arguments\Reducers\ArrayArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\BaseTypeArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\ClosureArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\DateTimeArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\DateTimeZoneArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\EnumArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\SensitiveParameterArrayReducer;
use Spatie\Backtrace\Arguments\Reducers\StdClassArgumentReducer;
use Spatie\Backtrace\Arguments\Reducers\StringableArgumentReducer;
use Spatie\Ignition\Arguments\Reducers\SymphonyRequestArgumentReducer;

class ArgumentReducers extends BaseArgumentReducers
{
    protected static function defaultReducers(): array
    {
        return [
            new BaseTypeArgumentReducer(),
            new ArrayArgumentReducer(),
            new StdClassArgumentReducer(),
            new EnumArgumentReducer(),
            new ClosureArgumentReducer(),
            new SensitiveParameterArrayReducer(),
            new DateTimeArgumentReducer(),
            new DateTimeZoneArgumentReducer(),
            new SymphonyRequestArgumentReducer(),
            new StringableArgumentReducer(),
        ];
    }
}
