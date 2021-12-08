<?php

namespace Spatie\Ignition\ErrorPage;

class Renderer
{
    /**
     * @param array<string, mixed> $data
     *
     * @return void
     */
    public function render(array $data): void
    {
        $viewFile = __DIR__ . '/../../resources/views/errorPage.php';

        /** @phpstan-ignore-next-line  */
        extract((array)$data, EXTR_OVERWRITE);

        include $viewFile;
    }
}
