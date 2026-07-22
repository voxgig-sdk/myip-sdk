// Typed models for the Myip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GetIpInfo is the typed data model for the get_ip_info entity.
type GetIpInfo struct {
	Browser *string `json:"browser,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	HostingInfo *map[string]any `json:"hosting_info,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Ipv4 *string `json:"ipv4,omitempty"`
	Ipv6 *string `json:"ipv6,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Organization *string `json:"organization,omitempty"`
	Os *string `json:"os,omitempty"`
}

// GetIpInfoLoadMatch is the typed request payload for GetIpInfo.LoadTyped.
type GetIpInfoLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
