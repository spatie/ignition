<?php

use Spatie\Ignition\Solutions\SolutionProviders\UndefinedPropertySolutionProvider;
use Spatie\Ignition\Tests\TestCase;

uses(TestCase::class);

it('can solve an undefined property exception when there is a similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $canSolve = (new $providerClass)->canSolve(getUndefinedPropertyException());

    $this->assertTrue($canSolve);
});

it('cannot solve an undefined property exception when there is no similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $canSolve = (new $providerClass)->canSolve(getUndefinedPropertyException('balance'));

    $this->assertFalse($canSolve);
});

it('can recommend a property name when there is a similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $solution = (new $providerClass)->getSolutions(getUndefinedPropertyException())[0];

    $this->assertEquals('Did you mean Spatie\Ignition\Tests\TestClasses\Models\Car::$color ?', $solution->getSolutionDescription());
});

it('cannot recommend a property name when there is no similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $solution = (new $providerClass)->getSolutions(getUndefinedPropertyException('balance'))[0];

    $this->assertEquals('', $solution->getSolutionDescription());
});

// Helpers
function getUndefinedPropertyException(string $property = 'colro'): ErrorException
{
    return new ErrorException("Undefined property: Spatie\Ignition\Tests\TestClasses\Models\Car::$$property ");
}
