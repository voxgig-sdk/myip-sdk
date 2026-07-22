<?php
declare(strict_types=1);

// Myip SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MyipMakeContext
{
    public static function call(array $ctxmap, ?MyipContext $basectx): MyipContext
    {
        return new MyipContext($ctxmap, $basectx);
    }
}
