<?php

namespace Spatie\Ignition\ErrorPage;

class Renderer
{
    public function render(array $data): void
    {
        $viewFile = __DIR__ . '/../../resources/views/errorPage.php';

        /** @phpstan-ignore-next-line  */
        extract($data, EXTR_OVERWRITE);

        include $viewFile;
    }
}
