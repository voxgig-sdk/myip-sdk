-- Typed models for the Myip SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetIpInfo
---@field browser? string
---@field country? string
---@field country_code? string
---@field hosting_info? table
---@field ip? string
---@field ipv4? string
---@field ipv6? string
---@field location? table
---@field organization? string
---@field os? string

---@class GetIpInfoLoadMatch
---@field id string

local M = {}

return M
