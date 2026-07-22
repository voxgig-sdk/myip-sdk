-- Myip SDK error

local MyipError = {}
MyipError.__index = MyipError


function MyipError.new(code, msg, ctx)
  local self = setmetatable({}, MyipError)
  self.is_sdk_error = true
  self.sdk = "Myip"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MyipError:error()
  return self.msg
end


function MyipError:__tostring()
  return self.msg
end


return MyipError
