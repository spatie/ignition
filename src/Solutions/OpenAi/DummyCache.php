<?php

namespace Spatie\Ignition\Solutions\OpenAi;

use Psr\SimpleCache\CacheInterface;

class DummyCache implements CacheInterface
{
    public function get(string $key, mixed $default = null): mixed
    {
        return null;
    }

    public function set(string $key, mixed $value, \DateInterval|int|null $ttl = null): bool
    {
    }

    public function delete(string $key): bool
    {
    }

    public function clear(): bool
    {
    }

    public function getMultiple(iterable $keys, mixed $default = null): iterable
    {
    }

    public function setMultiple(iterable $values, \DateInterval|int|null $ttl = null): bool
    {
        return true;
    }

    public function deleteMultiple(iterable $keys): bool
    {
        return true;
    }

    public function has(string $key): bool
    {
        return false;
    }
}
