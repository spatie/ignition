<?php

namespace Spatie\Ignition\Tests;

use Exception;
use Spatie\FlareClient\Flare;
use Spatie\Ignition\Config\IgnitionConfig;
use Spatie\Ignition\ErrorPage\ErrorPageViewModel;

class ErrorPageViewModelTest extends TestCase
{
    /** @test */
    public function it_can_encode_invalid_user_data()
    {
        $flareClient = Flare::make();

        $exception = new Exception('Test Exception');

        $report = $flareClient->createReport($exception);

        $report->group('bad-utf8', [
            'name' => 'JohnDoe'.utf8_decode('ø'),
        ]);

        $model = new ErrorPageViewModel($exception, new IgnitionConfig([]), $report, []);

        $this->assertNotEmpty($model->jsonEncode($report->toArray()));
    }
}
