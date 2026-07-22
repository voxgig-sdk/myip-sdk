# Myip SDK utility: make_context
require_relative '../core/context'
module MyipUtilities
  MakeContext = ->(ctxmap, basectx) {
    MyipContext.new(ctxmap, basectx)
  }
end
