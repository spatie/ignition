<?php

use Spatie\Backtrace\Arguments\ArgumentReducers;
use Spatie\Backtrace\Arguments\ReducedArgument\ReducedArgument;
use Spatie\Backtrace\Arguments\ReducedArgument\ReducedArgumentContract;
use Spatie\Backtrace\Arguments\Reducers\ArgumentReducer;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Http\Client;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\Mocks\FakeFlare;
use Spatie\Ignition\Tests\TestClasses\TraceArguments;

beforeEach(function () {
    ini_set('zend.exception_ignore_args', 0); // Enabled on GH actions

    $this->ignition = Ignition::make();

    $this->ignition->shouldDisplayException(false);

    $client = new Client();

    $this->flare = new FakeFlare($client);

    $this->ignition->setFlare($this->flare);
});

it('will not send an exception to flare when no api key is set', function () {
    $exception = new Exception();

    $this->ignition->handleException($exception);

    expect($this->flare->sentReports)->toHaveCount(0);
});

it('will send an exception to flare when an api key is set on ignition', function () {
    $exception = new Exception();

    $this->ignition
        ->sendToFlare('fake-api-key')
        ->handleException($exception);

    expect($this->flare->sentReports)->toHaveCount(1);
});

it('will send an exception to flare when an api key is set on flare', function () {
    $exception = new Exception();

    $this->ignition
        ->configureFlare(function (Flare $flare) {
            $flare->setApiToken('fake-api-token');
        })
        ->handleException($exception);

    expect($this->flare->sentReports)->toHaveCount(1);
});

it('has stack trace arguments', function () {
    $report = $this->ignition->handleException(
        TraceArguments::create()->exception('Hello', new DateTimeZone('Europe/Brussels'))
    );

    expect($report->toArray()['stacktrace'][1]['arguments'][0]['value'])->toEqual('Hello');
    expect($report->toArray()['stacktrace'][1]['arguments'][1]['value'])->toEqual('Europe/Brussels');
});

it('can disable stack trace arguments', function () {
    $this->flare->withStackFrameArguments(false);

    $report = $this->ignition->handleException(
        TraceArguments::create()->exception('Hello', new DateTimeZone('Europe/Brussels'))
    );

    expect($report->toArray()['stacktrace'][1]['arguments'])->toBeNull();
});

it('can use custom argument reducers', function () {
    $this->flare->argumentReducers(
        ArgumentReducers::default([new class implements ArgumentReducer {
            public function execute($argument): ReducedArgumentContract
            {
                return new ReducedArgument('FAKE', gettype($argument));
            }
        }])
    );

    $report = $this->ignition->handleException(
        TraceArguments::create()->exception('Hello', new DateTimeZone('Europe/Brussels'))
    );

    expect($report->toArray()['stacktrace'][1]['arguments'][0]['value'])->toEqual('FAKE');
    expect($report->toArray()['stacktrace'][1]['arguments'][1]['value'])->toEqual('FAKE');
});
