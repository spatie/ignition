<?php

namespace Spatie\Ignition\Contracts;

interface ConfigManager
{
    /** @return array<string, mixed> */
    public function load(): array;

    /** @param array<string, mixed> $options */
    public function save(array $options): bool;

    /** @return array<string, mixed> */
    public function getSource(): array;

    /** @param array<string, mixed> $settings */
    public function updateSource(array $settings): bool;

    public function createSource(): bool;
}
