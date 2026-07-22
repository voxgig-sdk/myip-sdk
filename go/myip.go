package voxgigmyipsdk

import (
	"github.com/voxgig-sdk/myip-sdk/go/core"
	"github.com/voxgig-sdk/myip-sdk/go/entity"
	"github.com/voxgig-sdk/myip-sdk/go/feature"
	_ "github.com/voxgig-sdk/myip-sdk/go/utility"
)

// Type aliases preserve external API.
type MyipSDK = core.MyipSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MyipEntity = core.MyipEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MyipError = core.MyipError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetIpInfoEntityFunc = func(client *core.MyipSDK, entopts map[string]any) core.MyipEntity {
		return entity.NewGetIpInfoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMyipSDK = core.NewMyipSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMyipSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MyipSDK  { return NewMyipSDK(nil) }
func Test() *MyipSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
