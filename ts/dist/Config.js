"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                    "title": "Browser",
                    "type": "`$STRING`",
                    "short": "Detected browser"
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "Country where the IP is located"
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "short": "ISO country code"
                },
                {
                    "name": "hosting_info",
                    "title": "Hosting Info",
                    "type": "`$OBJECT`",
                    "short": "Live hosting information"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "ip",
                    "title": "Ip",
                    "type": "`$STRING`",
                    "short": "The queried IP address"
                },
                {
                    "name": "ipv4",
                    "title": "Ipv4",
                    "type": "`$STRING`",
                    "short": "IPv4 address"
                },
                {
                    "name": "ipv6",
                    "title": "Ipv6",
                    "type": "`$STRING`",
                    "short": "IPv6 address if available"
                },
                {
                    "name": "location",
                    "title": "Location",
                    "type": "`$OBJECT`",
                    "short": "Geographic location information"
                },
                {
                    "name": "organization",
                    "title": "Organization",
                    "type": "`$STRING`",
                    "short": "Organization associated with the IP"
                },
                {
                    "name": "os",
                    "title": "Os",
                    "type": "`$STRING`",
                    "short": "Detected operating system"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/{ip}",
                            "segments": [
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "ip": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "ip",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "217.199.217.100"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
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