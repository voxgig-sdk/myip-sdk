<?php
declare(strict_types=1);

// Myip SDK utility: prepare_body

class MyipPrepareBody
{
    public static function call(MyipContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
