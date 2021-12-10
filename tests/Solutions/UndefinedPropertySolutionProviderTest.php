<?php

use Spatie\Ignition\Solutions\SolutionProviders\UndefinedPropertySolutionProvider;

it('can solve an undefined property exception when there is a similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $canSolve = (new $providerClass)->canSolve(getUndefinedPropertyException());

    expect($canSolve)->toBeTrue();
});

it('cannot solve an undefined property exception when there is no similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $canSolve = (new $providerClass)->canSolve(getUndefinedPropertyException('balance'));

    expect($canSolve)->toBeFalse();
});

it('can recommend a property name when there is a similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $solution = (new $providerClass)->getSolutions(getUndefinedPropertyException())[0];

    expect($solution->getSolutionDescription())->toEqual('Did you mean Spatie\Ignition\Tests\TestClasses\Models\Car::$color ?');
});

it('cannot recommend a property name when there is no similar property', function () {
    $providerClass = UndefinedPropertySolutionProvider::class;

    $solution = (new $providerClass)->getSolutions(getUndefinedPropertyException('balance'))[0];

    expect($solution->getSolutionDescription())->toEqual('');
});

// Helpers
function getUndefinedPropertyException(string $property = 'colro'): ErrorException
{
    return new ErrorException("Undefined property: Spatie\Ignition\Tests\TestClasses\Models\Car::$$property ");
}
