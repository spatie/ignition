<?php

use Spatie\Ignition\Config\FileConfigManager;

const SETTINGS_FILE_DIRECTORY = __DIR__ . '/../temp/';
const SETTINGS_FILE_NAME = '.ignition.json';

test('the file config manager can process a filepath', function () {
    $settings = [
        'path' => __DIR__ . '/../temp/'
    ];

    $configManager = new FileConfigManager();
    $configManager->updateSource($settings);

    $configSource = $configManager->getSource();

    $this->assertNotEmpty($configSource);
    $this->assertArrayHasKey('path', $configSource);
    $this->assertStringContainsString('temp', $configSource['path']);
});

test('the file config manager can create config file form a filepath', function () {
    $settings = [
        'path' => __DIR__ . '/../temp/'
    ];

    $configManager = new FileConfigManager();
    $configManager->updateSource($settings);
    $configManager->createSource();

    $configSource = $configManager->getSource();

    $this->assertNotEmpty($configSource);
    $this->assertArrayHasKey('file', $configSource);
    $this->assertTrue(file_exists($configSource['file']));
});
