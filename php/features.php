<?php
declare(strict_types=1);

// Myip SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MyipFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MyipBaseFeature();
            case "test":
                return new MyipTestFeature();
            default:
                return new MyipBaseFeature();
        }
    }
}
