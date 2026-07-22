# Myip SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MyipUtility.registrar = ->(u) {
  u.clean = MyipUtilities::Clean
  u.done = MyipUtilities::Done
  u.make_error = MyipUtilities::MakeError
  u.feature_add = MyipUtilities::FeatureAdd
  u.feature_hook = MyipUtilities::FeatureHook
  u.feature_init = MyipUtilities::FeatureInit
  u.fetcher = MyipUtilities::Fetcher
  u.make_fetch_def = MyipUtilities::MakeFetchDef
  u.make_context = MyipUtilities::MakeContext
  u.make_options = MyipUtilities::MakeOptions
  u.make_request = MyipUtilities::MakeRequest
  u.make_response = MyipUtilities::MakeResponse
  u.make_result = MyipUtilities::MakeResult
  u.make_point = MyipUtilities::MakePoint
  u.make_spec = MyipUtilities::MakeSpec
  u.make_url = MyipUtilities::MakeUrl
  u.param = MyipUtilities::Param
  u.prepare_auth = MyipUtilities::PrepareAuth
  u.prepare_body = MyipUtilities::PrepareBody
  u.prepare_headers = MyipUtilities::PrepareHeaders
  u.prepare_method = MyipUtilities::PrepareMethod
  u.prepare_params = MyipUtilities::PrepareParams
  u.prepare_path = MyipUtilities::PreparePath
  u.prepare_query = MyipUtilities::PrepareQuery
  u.result_basic = MyipUtilities::ResultBasic
  u.result_body = MyipUtilities::ResultBody
  u.result_headers = MyipUtilities::ResultHeaders
  u.transform_request = MyipUtilities::TransformRequest
  u.transform_response = MyipUtilities::TransformResponse
}
