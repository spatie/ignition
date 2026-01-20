<?php

namespace Spatie\Ignition\Config;

class EditorOptions
{
    public function toArray(): array
    {
        return [
            'clipboard' => [
                'label' => 'Clipboard',
                'url' => '%path:%line',
                'clipboard' => true,
            ],
            'sublime' => [
                'label' => 'Sublime',
                'url' => 'subl://open?url=file://%path&line=%line',
            ],
            'textmate' => [
                'label' => 'TextMate',
                'url' => 'txmt://open?url=file://%path&line=%line',
            ],
            'emacs' => [
                'label' => 'Emacs',
                'url' => 'emacs://open?url=file://%path&line=%line',
            ],
            'macvim' => [
                'label' => 'MacVim',
                'url' => 'mvim://open/?url=file://%path&line=%line',
            ],
            'phpstorm' => [
                'label' => 'PhpStorm',
                'url' => 'phpstorm://open?file=%path&line=%line',
            ],
            'phpstorm-remote' => [
                'label' => 'PHPStorm Remote',
                'url' => 'javascript:r = new XMLHttpRequest;r.open("get", "http://localhost:63342/api/file/%path:%line");r.send()',
            ],
            'idea' => [
                'label' => 'Idea',
                'url' => 'idea://open?file=%path&line=%line',
            ],
            'vscode' => [
                'label' => 'VS Code',
                'url' => 'vscode://file/%path:%line',
            ],
            'vscode-insiders' => [
                'label' => 'VS Code Insiders',
                'url' => 'vscode-insiders://file/%path:%line',
            ],
            'vscode-remote' => [
                'label' => 'VS Code Remote',
                'url' => 'vscode://vscode-remote/%path:%line',
            ],
            'vscode-insiders-remote' => [
                'label' => 'VS Code Insiders Remote',
                'url' => 'vscode-insiders://vscode-remote/%path:%line',
            ],
            'vscodium' => [
                'label' => 'VS Codium',
                'url' => 'vscodium://file/%path:%line',
            ],
            'cursor' => [
                'label' => 'Cursor',
                'url' => 'cursor://file/%path:%line',
            ],
            'atom' => [
                'label' => 'Atom',
                'url' => 'atom://core/open/file?filename=%path&line=%line',
            ],
            'nova' => [
                'label' => 'Nova',
                'url' => 'nova://open?path=%path&line=%line',
            ],
            'netbeans' => [
                'label' => 'NetBeans',
                'url' => 'netbeans://open/?f=%path:%line',
            ],
            'xdebug' => [
                'label' => 'Xdebug',
                'url' => 'xdebug://%path@%line',
            ],
        ];
    }
}
