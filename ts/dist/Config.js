"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Myip',
        slug: "myip",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api.myip.ms",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            get_ip_info: {},
        }
    };
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
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "rename": {
                                "param": {
                                    "ip": "id"
                                }
                            },
                            "segments": [
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map