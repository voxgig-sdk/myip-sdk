
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Myip',
        slug: "myip",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.myip.ms",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_ip_info: {
      },

    }
  }


  entity = {
    "get_ip_info": {
      "fields": [
        {
          "name": "browser",
          "short": "Detected browser",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "short": "Country where the IP is located",
          "type": "`$STRING`"
        },
        {
          "name": "country_code",
          "short": "ISO country code",
          "type": "`$STRING`"
        },
        {
          "name": "hosting_info",
          "short": "Live hosting information",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "short": "The queried IP address",
          "type": "`$STRING`"
        },
        {
          "name": "ipv4",
          "short": "IPv4 address",
          "type": "`$STRING`"
        },
        {
          "name": "ipv6",
          "short": "IPv6 address if available",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "short": "Geographic location information",
          "type": "`$OBJECT`"
        },
        {
          "name": "organization",
          "short": "Organization associated with the IP",
          "type": "`$STRING`"
        },
        {
          "name": "os",
          "short": "Detected operating system",
          "type": "`$STRING`"
        }
      ],
      "name": "get_ip_info",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "217.199.217.100",
                    "kind": "param",
                    "name": "id",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

