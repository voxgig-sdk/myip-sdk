# frozen_string_literal: true

# Typed models for the Myip SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetIpInfo entity data model.
#
# @!attribute [rw] browser
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] hosting_info
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ipv4
#   @return [String, nil]
#
# @!attribute [rw] ipv6
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] organization
#   @return [String, nil]
#
# @!attribute [rw] os
#   @return [String, nil]
GetIpInfo = Struct.new(
  :browser,
  :country,
  :country_code,
  :hosting_info,
  :ip,
  :ipv4,
  :ipv6,
  :location,
  :organization,
  :os,
  keyword_init: true
)

# Request payload for GetIpInfo#load.
#
# @!attribute [rw] id
#   @return [String]
GetIpInfoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

