<?php

namespace Spatie\Ignition\Solutions\SolutionProviders;

use BadMethodCallException;
use ReflectionClass;
use ReflectionMethod;
use Spatie\IgnitionContracts\BaseSolution;
use Spatie\IgnitionContracts\HasSolutionsForThrowable;
use Throwable;

class BadMethodCallSolutionProvider implements HasSolutionsForThrowable
{
    protected const REGEX = '/([a-zA-Z\\\\]+)::([a-zA-Z]+)/m';

    public function canSolve(Throwable $throwable): bool
    {
        if (! $throwable instanceof BadMethodCallException) {
            return false;
        }

        if (is_null($this->getClassAndMethodFromExceptionMessage($throwable->getMessage()))) {
            return false;
        }

        return true;
    }

    public function getSolutions(Throwable $throwable): array
    {
        return [
            BaseSolution::create('Bad Method Call')
            ->setSolutionDescription($this->getSolutionDescription($throwable)),
        ];
    }

    public function getSolutionDescription(Throwable $throwable): string
    {
        if (! $this->canSolve($throwable)) {
            return '';
        }

        extract($this->getClassAndMethodFromExceptionMessage($throwable->getMessage()), EXTR_OVERWRITE);

        $possibleMethod = $this->findPossibleMethod($class, $method);

        return "Did you mean {$class}::{$possibleMethod->name}() ?";
    }

    protected function getClassAndMethodFromExceptionMessage(string $message): ?array
    {
        if (! preg_match(self::REGEX, $message, $matches)) {
            return null;
        }

        return [
            'class' => $matches[1],
            'method' => $matches[2],
        ];
    }

    protected function findPossibleMethod(string $class, string $invalidMethodName)
    {
        $methods = $this->getAvailableMethods($class);

        usort($methods, static function (ReflectionMethod $method) use ($invalidMethodName): float {
            similar_text($invalidMethodName, $method->name, $percentage);

            return $percentage;
        });

        $method = current($methods);

        if (false !== $method) {
            return $method;
        }

        return null;
    }

    protected function getAvailableMethods($class): array
    {
        $class = new ReflectionClass($class);

        return $class->getMethods();
    }
}
