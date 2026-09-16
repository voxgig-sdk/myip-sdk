# Myip SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MyipFeatures
  def self.make_feature(name)
    case name
    when "base"
      MyipBaseFeature.new
    when "ratelimit"
      MyipRatelimitFeature.new
    when "retry"
      MyipRetryFeature.new
    when "test"
      MyipTestFeature.new
    when "timeout"
      MyipTimeoutFeature.new
    else
      MyipBaseFeature.new
    end
  end
end
