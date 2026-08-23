-- Myip SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Myip",
      slug = "myip",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.myip.ms",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_ip_info"] = {},
      },
    },
    entity = {
      ["get_ip_info"] = {
        ["fields"] = {
          {
            ["name"] = "browser",
            ["short"] = "Detected browser",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country",
            ["short"] = "Country where the IP is located",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_code",
            ["short"] = "ISO country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "hosting_info",
            ["short"] = "Live hosting information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "ip",
            ["short"] = "The queried IP address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ipv4",
            ["short"] = "IPv4 address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ipv6",
            ["short"] = "IPv6 address if available",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "location",
            ["short"] = "Geographic location information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "organization",
            ["short"] = "Organization associated with the IP",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "os",
            ["short"] = "Detected operating system",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_ip_info",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "217.199.217.100",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "ip",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{ip}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["ip"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
