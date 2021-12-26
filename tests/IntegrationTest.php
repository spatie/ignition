<?php

use Symfony\Component\Process\Process;

it('can render the error page for exceptions', function () {
    $output = getOutputOfApp('basic-exception.php');

    expect($output)->toContain('window.ignite');
});

it('can render the error page for syntax errors', function () {
    $output = getOutputOfApp('syntax-error.php');

    expect($output)->toContain('window.ignite');
});

it('will not render if everything ran ok', function () {
    $output = getOutputOfApp('all-ok.php');

    expect($output)->toEqual('ok');
});

it('can show a solution', function () {
    $output = getOutputOfApp('exception-with-solution.php');

    expect($output)->toContain('Did you mean');
});

it('will not show ignition in a production environment', function () {
    $output = getOutputOfApp('in-production-environment.php');

    expect($output)->toEqual('');
});

// Helpers
function getOutputOfApp(string $script): string
{
    $process = Process::fromShellCommandline(
        "php {$script}",
        getTestDirectory('/stubs/apps')
    );

    $process->run();

    return $process->getOutput();
}
