<?php

namespace Spatie\Ignition\Solutions\SolutionProviders;

use ErrorException;
use ReflectionClass;
use ReflectionProperty;
use Spatie\IgnitionContracts\BaseSolution;
use Spatie\IgnitionContracts\HasSolutionsForThrowable;
use Throwable;

class UndefinedPropertySolutionProvider implements HasSolutionsForThrowable
{
    protected const REGEX = '/([a-zA-Z\\\\]+)::\$([a-zA-Z]+)/m';
    protected const MINIMUM_SIMILARITY = 80;

    public function canSolve(Throwable $throwable): bool
    {
        if (! $throwable instanceof ErrorException) {
            return false;
        }

        if (is_null($this->getClassAndPropertyFromExceptionMessage($throwable->getMessage()))) {
            return false;
        }

        if (! $this->similarPropertyExists($throwable)) {
            return false;
        }

        return true;
    }

    public function getSolutions(Throwable $throwable): array
    {
        return [
            BaseSolution::create('Unknown Property')
            ->setSolutionDescription($this->getSolutionDescription($throwable)),
        ];
    }

    public function getSolutionDescription(Throwable $throwable): string
    {
        if (! $this->canSolve($throwable) || ! $this->similarPropertyExists($throwable)) {
            return '';
        }

        extract($this->getClassAndPropertyFromExceptionMessage($throwable->getMessage()), EXTR_OVERWRITE);

        $possibleProperty = $this->findPossibleProperty($class, $property);

        return "Did you mean {$class}::\${$possibleProperty->name} ?";
    }

    protected function similarPropertyExists(Throwable $throwable)
    {
        extract($this->getClassAndPropertyFromExceptionMessage($throwable->getMessage()), EXTR_OVERWRITE);

        $possibleProperty = $this->findPossibleProperty($class, $property);

        return $possibleProperty !== null;
    }

    protected function getClassAndPropertyFromExceptionMessage(string $message): ?array
    {
        if (! preg_match(self::REGEX, $message, $matches)) {
            return null;
        }

        return [
            'class' => $matches[1],
            'property' => $matches[2],
        ];
    }

    protected function findPossibleProperty(string $class, string $invalidPropertyName)
    {
        $properties = $this->getAvailableProperties($class);

        usort($properties, function (ReflectionProperty $property) use ($invalidPropertyName) {
            similar_text($invalidPropertyName, $property->name, $percentage);

            return $percentage;
        });

        $properties = array_filter($properties, function (ReflectionProperty $property) use ($invalidPropertyName) {
            similar_text($invalidPropertyName, $property->name, $percentage);

            return $percentage >= self::MINIMUM_SIMILARITY;
        });

        $property = current($properties);

        if (false !== $property) {
            return $property;
        }

        return null;
    }

    protected function getAvailableProperties($class): array
    {
        $class = new ReflectionClass($class);

        return $class->getProperties();
    }
}
