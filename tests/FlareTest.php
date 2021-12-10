<?php

use Exception;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Http\Client;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\Mocks\FakeFlare;

uses(TestCase::class);

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

    $this->assertCount(0, $this->flare->sentReports);
});

it('will send an exception to flare when an api key is set on ignition', function () {
    $exception = new Exception();

    $this->ignition
        ->sendToFlare('fake-api-key')
        ->handleException($exception);

    $this->assertCount(1, $this->flare->sentReports);
});

it('will send an exception to flare when an api key is set on flare', function () {
    $exception = new Exception();

    $this->ignition
        ->configureFlare(function (Flare $flare) {
            $flare->setApiToken('fake-api-token');
        })
        ->handleException($exception);

    $this->assertCount(1, $this->flare->sentReports);
});

// Helpers
function it_will_not_send_an_exception_to_flare_if_production_mode_was_set_to_false()
{
    $exception = new Exception();

    test()->ignition
        ->runningInProductionEnvironment()
        ->sendToFlare('fake-api-key')
        ->handleException($exception);

    test()->assertCount(0, test()->flare->sentReports);
}
