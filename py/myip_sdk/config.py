# Myip SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Myip",
            "slug": "myip",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.myip.ms",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_ip_info": {},
            },
        },
        "entity": {
      "get_ip_info": {
        "fields": [
          {
            "name": "browser",
            "title": "Browser",
            "type": "`$STRING`",
            "short": "Detected browser",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "short": "Country where the IP is located",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "short": "ISO country code",
          },
          {
            "name": "hosting_info",
            "title": "Hosting Info",
            "type": "`$OBJECT`",
            "short": "Live hosting information",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "short": "The queried IP address",
          },
          {
            "name": "ipv4",
            "title": "Ipv4",
            "type": "`$STRING`",
            "short": "IPv4 address",
          },
          {
            "name": "ipv6",
            "title": "Ipv6",
            "type": "`$STRING`",
            "short": "IPv6 address if available",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$OBJECT`",
            "short": "Geographic location information",
          },
          {
            "name": "organization",
            "title": "Organization",
            "type": "`$STRING`",
            "short": "Organization associated with the IP",
          },
          {
            "name": "os",
            "title": "Os",
            "type": "`$STRING`",
            "short": "Detected operating system",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "get_ip_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}",
                "segments": [
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ip",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "217.199.217.100",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
