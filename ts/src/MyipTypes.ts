// Typed models for the Myip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetIpInfo {
  browser?: string
  country?: string
  country_code?: string
  hosting_info?: Record<string, any>
  ip?: string
  ipv4?: string
  ipv6?: string
  location?: Record<string, any>
  organization?: string
  os?: string
}

export interface GetIpInfoLoadMatch {
  id: string
}

