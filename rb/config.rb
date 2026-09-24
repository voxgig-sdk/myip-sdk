# Myip SDK configuration

module MyipConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Myip",
        "slug" => "myip",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.myip.ms",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_ip_info" => {},
        },
      },
      "entity" => {
        "get_ip_info" => {
          "fields" => [
            {
              "name" => "browser",
              "title" => "Browser",
              "type" => "`$STRING`",
              "short" => "Detected browser",
            },
            {
              "name" => "country",
              "title" => "Country",
              "type" => "`$STRING`",
              "short" => "Country where the IP is located",
            },
            {
              "name" => "country_code",
              "title" => "Country Code",
              "type" => "`$STRING`",
              "short" => "ISO country code",
            },
            {
              "name" => "hosting_info",
              "title" => "Hosting Info",
              "type" => "`$OBJECT`",
              "short" => "Live hosting information",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "title" => "Ip",
              "type" => "`$STRING`",
              "short" => "The queried IP address",
            },
            {
              "name" => "ipv4",
              "title" => "Ipv4",
              "type" => "`$STRING`",
              "short" => "IPv4 address",
            },
            {
              "name" => "ipv6",
              "title" => "Ipv6",
              "type" => "`$STRING`",
              "short" => "IPv6 address if available",
            },
            {
              "name" => "location",
              "title" => "Location",
              "type" => "`$OBJECT`",
              "short" => "Geographic location information",
            },
            {
              "name" => "organization",
              "title" => "Organization",
              "type" => "`$STRING`",
              "short" => "Organization associated with the IP",
            },
            {
              "name" => "os",
              "title" => "Os",
              "type" => "`$STRING`",
              "short" => "Detected operating system",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_ip_info",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}",
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "ip",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "217.199.217.100",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MyipFeatures.make_feature(name)
  end
end
