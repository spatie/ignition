<?php

use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Http\Client;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\Mocks\FakeFlare;

beforeEach(function () {
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
