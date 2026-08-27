<?php
declare(strict_types=1);

// Myip SDK configuration

class MyipConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Myip",
                "slug" => "myip",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.myip.ms",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_ip_info" => [],
                ],
            ],
            "entity" => [
        'get_ip_info' => [
          'fields' => [
            [
              'name' => 'browser',
              'short' => 'Detected browser',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'short' => 'Country where the IP is located',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'short' => 'ISO country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'hosting_info',
              'short' => 'Live hosting information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'short' => 'The queried IP address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ipv4',
              'short' => 'IPv4 address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ipv6',
              'short' => 'IPv6 address if available',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'short' => 'Geographic location information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'organization',
              'short' => 'Organization associated with the IP',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'os',
              'short' => 'Detected operating system',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_ip_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '217.199.217.100',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{ip}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MyipFeatures::make_feature($name);
    }
}
