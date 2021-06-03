<?php

namespace Spatie\Ignition\Tests;

use Spatie\Ignition\Support\Arr;

class ArrTest extends TestCase
{
    /** @test */
    public function it_returns_and_empty_array_when_the_provided_array_is_empty()
    {
        $this->assertEmpty(Arr::flatten([]));
    }

    /** @test */
    public function it_flat_array_is_returned_as_is()
    {
        $arr = [1 ,2 ,3];

        $this->assertSame($arr, Arr::flatten($arr));
    }

    /** @test */
    public function it_flattens_an_array_a_single_level_deep()
    {
        $this->assertSame([1, 2, 3], Arr::flatten([1, [2], 3]));
    }

    /** @test */
    public function it_flattens_an_array_several_level_deep()
    {
        $expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        $given = [1, [2], [[3, [4]]], 5, 6, 7, [8], 9];

        $this->assertSame($expected, Arr::flatten($given));
    }
}
