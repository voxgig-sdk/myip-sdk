# Myip SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MyipFeatures
  def self.make_feature(name)
    case name
    when "base"
      MyipBaseFeature.new
    when "test"
      MyipTestFeature.new
    else
      MyipBaseFeature.new
    end
  end
end
