<?php

use Symfony\Component\Process\Process;

uses(TestCase::class);

it('can render the error page for exceptions', function () {
    $output = getOutputOfApp('basic-exception.php');

    $this->assertStringContainsString('window.ignite', $output);
});

it('can render the error page for syntax errors', function () {
    $output = getOutputOfApp('syntax-error.php');

    $this->assertStringContainsString('window.ignite', $output);
});

it('will not render if everything ran ok', function () {
    $output = getOutputOfApp('all-ok.php');

    $this->assertEquals('ok', $output);
});

it('can show a solution', function () {
    $output = getOutputOfApp('exception-with-solution.php');

    $this->assertStringContainsString('Did you mean', $output);
});

it('will not show ignition in a production environment', function () {
    $output = getOutputOfApp('in-production-environment.php');

    $this->assertEquals('', $output);
});

// Helpers
function getOutputOfApp(string $script): string
{
    $process = Process::fromShellCommandline(
        "php {$script}",
        test()->getTestDirectory('/stubs/apps')
    );

    $process->run();

    return $process->getOutput();
}
