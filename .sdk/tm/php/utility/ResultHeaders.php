<?php
declare(strict_types=1);

// Myip SDK utility: result_headers

class MyipResultHeaders
{
    public static function call(MyipContext $ctx): ?MyipResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
