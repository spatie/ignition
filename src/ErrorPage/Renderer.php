<?php

namespace Spatie\Ignition\ErrorPage;

class Renderer
{
    /**
     * @param array<string, mixed> $data
     *
     * @return void
     */
    public function render(array $data, string $viewPath): void
    {
        $viewFile = $viewPath;

        extract($data, EXTR_OVERWRITE);

        include $viewFile;
    }

    public function renderAsString(array $data, string $viewPath): string
    {
        ob_start();

        $this->render($data, $viewPath);

        return ob_get_clean();
    }
}
