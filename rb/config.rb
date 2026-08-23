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
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "short" => "Detected browser",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "short" => "Country where the IP is located",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "short" => "ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "hosting_info",
              "short" => "Live hosting information",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "ip",
              "short" => "The queried IP address",
              "type" => "`$STRING`",
            },
            {
              "name" => "ipv4",
              "short" => "IPv4 address",
              "type" => "`$STRING`",
            },
            {
              "name" => "ipv6",
              "short" => "IPv6 address if available",
              "type" => "`$STRING`",
            },
            {
              "name" => "location",
              "short" => "Geographic location information",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "organization",
              "short" => "Organization associated with the IP",
              "type" => "`$STRING`",
            },
            {
              "name" => "os",
              "short" => "Detected operating system",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_ip_info",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "217.199.217.100",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}",
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
