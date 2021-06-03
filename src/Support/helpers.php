<?php

if (! function_exists('array_flatten')) {
    /**
     * This code snippet is inspired by Laravel.
     *
     * @see https://github.com/laravel/framework/blob/ecbc4622021b10287c36757a2867ba343f7698a0/src/Illuminate/Collections/Arr.php#L211-L232
     */
    function array_flatten(iterable $iter, float $depth = INF): array
    {
        $result = [];

        foreach ($iter as $item) {
            if (! is_array($item)) {
                $result[] = $item;

                continue;
            }

            $values = 1 === $depth ? array_values($item) : array_flatten($item, --$depth);

            foreach ($values as $value) {
                $result[] = $value;
            }
        }

        return $result;
    }
}
