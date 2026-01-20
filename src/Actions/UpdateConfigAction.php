<?php

namespace Spatie\Ignition\Actions;

use Spatie\Ignition\Config\EditorOptions;
use Spatie\Ignition\Config\FileConfigManager;
use Spatie\Ignition\IgnitionConfig;
use Symfony\Component\HttpFoundation\Request;

class UpdateConfigAction
{
    public function __construct(
        protected FileConfigManager $fileConfigManager,
    ) {
    }

    public function execute(?Request $request = null): bool
    {
        $request ??= Request::createFromGlobals();

        if (! $request->isMethod('POST')) {
            return false;
        }

        $validatedInput = $this->validateInput($request->toArray());

        return $this->fileConfigManager->save(IgnitionConfig::make()->loadSaveableOptions($validatedInput)->toSaveableOptions());
    }

    private function validateInput(array $input): array
    {
        $validated = [];

        if (isset($input['theme'])) {
            $validated['theme'] = $this->validateTheme($input['theme']);
        }

        if (isset($input['editor'])) {
            $validated['editor'] = $this->validateEditor($input['editor']);
        }

        if (isset($input['hide_solutions'])) {
            $validated['hide_solutions'] = $this->validateHideSolutions($input['hide_solutions']);
        }

        return $validated;
    }

    private function validateTheme(mixed $theme): string
    {
        if (! is_string($theme) || ! in_array($theme, ['light', 'dark', 'auto'])) {
            return 'light';
        }

        return $theme;
    }

    private function validateEditor(mixed $editor): string
    {
        if (! is_string($editor)) {
            return 'vscode';
        }

        $validEditors = array_keys((new EditorOptions())->toArray());

        if (! in_array($editor, $validEditors)) {
            return 'vscode';
        }

        return $editor;
    }

    private function validateHideSolutions(mixed $hideSolutions): bool
    {
        return (bool) $hideSolutions;
    }
}
