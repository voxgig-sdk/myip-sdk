<?php
declare(strict_types=1);

// Myip SDK base feature

class MyipBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MyipContext $ctx, array $options): void {}
    public function PostConstruct(MyipContext $ctx): void {}
    public function PostConstructEntity(MyipContext $ctx): void {}
    public function SetData(MyipContext $ctx): void {}
    public function GetData(MyipContext $ctx): void {}
    public function GetMatch(MyipContext $ctx): void {}
    public function SetMatch(MyipContext $ctx): void {}
    public function PrePoint(MyipContext $ctx): void {}
    public function PreSpec(MyipContext $ctx): void {}
    public function PreRequest(MyipContext $ctx): void {}
    public function PreResponse(MyipContext $ctx): void {}
    public function PreResult(MyipContext $ctx): void {}
    public function PreDone(MyipContext $ctx): void {}
    public function PreUnexpected(MyipContext $ctx): void {}
}
