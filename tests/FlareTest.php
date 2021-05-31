<?php

namespace Spatie\Ignition\Tests;

use Exception;
use Spatie\FlareClient\Flare;
use Spatie\FlareClient\Http\Client;
use Spatie\Ignition\Ignition;
use Spatie\Ignition\Tests\Mocks\FakeFlare;

class FlareTest extends TestCase
{
    protected Ignition $ignition;

    protected FakeFlare $flare;

    public function setUp(): void
    {
        $this->ignition = Ignition::make();

        $this->ignition->shouldDisplayException(false);

        $client = new Client();

        $this->flare = new FakeFlare($client);

        $this->ignition->setFlare($this->flare);
    }

    /** @test */
    public function it_will_not_send_an_exception_to_flare_when_no_api_key_is_set()
    {
        $exception = new Exception();

        $this->ignition->handleException($exception);

        $this->assertCount(0, $this->flare->sentReports);
    }

    /** @test */
    public function it_will_send_an_exception_to_flare_when_an_api_key_is_set_on_ignition()
    {
        $exception = new Exception();

        $this->ignition
            ->sendToFlare('fake-api-key')
            ->handleException($exception);

        $this->assertCount(1, $this->flare->sentReports);
    }

    /** @test */
    public function it_will_send_an_exception_to_flare_when_an_api_key_is_set_on_flare()
    {
        $exception = new Exception();

        $this->ignition
            ->configureFlare(function (Flare $flare) {
                $flare->setApiToken('fake-api-token');
            })
            ->handleException($exception);

        $this->assertCount(1, $this->flare->sentReports);
    }
}
