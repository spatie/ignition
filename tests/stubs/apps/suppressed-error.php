<?php

use Spatie\Ignition\Ignition;

include('../../../vendor/autoload.php');

Ignition::make()->register();

@include('./file-not-found.txt');

echo 'ok';
