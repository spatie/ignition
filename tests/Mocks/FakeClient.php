<?php

namespace Spatie\Ignition\Tests\Mocks;

use PHPUnit\Framework\Assert;
use Spatie\FlareClient\Http\Client;
use Spatie\FlareClient\Http\Response;

class FakeClient extends Client
{
    public $requests = [];

    public function __construct()
    {
        parent::__construct(uniqid(), null);
    }

    public function makeCurlRequest(string $verb, string $fullUrl, array $headers = [], array $arguments = []): Response
    {
        $this->requests[] = compact('verb', 'fullUrl', 'headers', 'arguments');

        return new Response(['http_code' => 200], 'my response', '');
    }

    public function assertRequestsSent(int $expectedCount)
    {
        Assert::assertCount($expectedCount, $this->requests);
    }

    public function getLastRequest(): ?array
    {
        if (! count($this->requests)) {
            return null;
        }

        $reversedRequests = array_reverse($this->requests);

        $key = array_key_first($reversedRequests);

        return $reversedRequests[$key];
    }
}
