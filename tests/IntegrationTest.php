<?php

namespace Spatie\Ignition\Tests;

use Symfony\Component\Process\Process;

class IntegrationTest extends TestCase
{
    /** @test */
    public function it_can_render_the_error_page()
    {
        $output = $this->getOutputOfApp('basic-error-page.php');

        $this->assertStringContainsString('window.ignite', $output);
    }

    /** @test */
    public function it_will_not_render_if_everything_ran_ok()
    {
        $output = $this->getOutputOfApp('all-ok.php');

        $this->assertEquals('ok', $output);
    }

    protected function getOutputOfApp(string $script): string
    {
        $process = Process::fromShellCommandline(
            "php {$script}",
            $this->getTestDirectory('/Support/apps')
        );

        $process->run();

        return $process->getOutput();
    }
}
