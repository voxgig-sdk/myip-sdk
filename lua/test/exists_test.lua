-- Myip SDK exists test

local sdk = require("myip_sdk")

describe("MyipSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
