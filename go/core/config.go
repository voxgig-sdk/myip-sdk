package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Myip",
			"slug": "myip",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.myip.ms",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_ip_info": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_ip_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "browser",
						"short": "Detected browser",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country where the IP is located",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hosting_info",
						"short": "Live hosting information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"short": "The queried IP address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ipv4",
						"short": "IPv4 address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ipv6",
						"short": "IPv6 address if available",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Geographic location information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "organization",
						"short": "Organization associated with the IP",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "os",
						"short": "Detected operating system",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "get_ip_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "217.199.217.100",
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
