<?php
declare(strict_types=1);

// Myip SDK utility: result_body

class MyipResultBody
{
    public static function call(MyipContext $ctx): ?MyipResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
