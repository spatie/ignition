<?php

namespace Spatie\Ignition\ErrorPage;

class Renderer
{
    protected string $viewPath;

    public function __construct(string $viewPath)
    {
        $this->viewPath = $this->formatPath($viewPath);
    }

    public function render(string $viewName, array $_data)
    {
        $viewFile = "{$this->viewPath}{$viewName}.php";

        extract((array)$_data, EXTR_OVERWRITE);

        include $viewFile;
    }

    protected function formatPath(string $path): string
    {
        return preg_replace('/(?:\/)+$/u', '', $path) . '/';
    }
}
