<?php

namespace Spatie\Ignition\Contracts;

interface ConfigManager
{
    /** @return array<string, mixed> */
    public function load(): array;

    public function save(): bool;

    /** @return array<string, mixed> */
    public function getSource(): array;

    /** @param array<string, mixed> $settings */
    public function updateSource(array $settings): bool;

    public function createSource(): bool;
}
