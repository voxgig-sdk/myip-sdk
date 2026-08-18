
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


  main = {
    name: 'Myip',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "country_code",
          "type": "`$STRING`"
        },
        {
          "name": "hosting_info",
          "type": "`$OBJECT`"
        },
        {
          "name": "ip",
          "type": "`$STRING`"
        },
        {
          "name": "ipv4",
          "type": "`$STRING`"
        },
        {
          "name": "ipv6",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "type": "`$OBJECT`"
        },
        {
          "name": "organization",
          "type": "`$STRING`"
        },
        {
          "name": "os",
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

