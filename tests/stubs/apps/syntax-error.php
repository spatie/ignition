<?php

use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\TestClasses\ClassWithSyntaxError;

include('../../../vendor/autoload.php');

Ignition::make()->register();

ClassWithSyntaxError::execute();
