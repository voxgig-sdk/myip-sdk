

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MyipSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetIpInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MYIP_TEST_LIVE=TRUE.
  afterEach(liveDelay('MYIP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MyipSDK.test()
    const ent = testsdk.GetIpInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MYIP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_ip_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser":{"a":true,"h":"Browser","n":"browser","r":false,"sh":"Detected browser","t":"`$STRING`","key$":"browser","index$":0},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country where the IP is located","t":"`$STRING`","key$":"country","index$":1},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":false,"sh":"ISO country code","t":"`$STRING`","key$":"country_code","index$":2},"hosting_info":{"a":true,"h":"Hosting Info","n":"hosting_info","r":false,"sh":"Live hosting information","t":"`$OBJECT`","key$":"hosting_info","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"The queried IP address","t":"`$STRING`","key$":"ip","index$":5},"ipv4":{"a":true,"h":"Ipv4","n":"ipv4","r":false,"sh":"IPv4 address","t":"`$STRING`","key$":"ipv4","index$":6},"ipv6":{"a":true,"h":"Ipv6","n":"ipv6","r":false,"sh":"IPv6 address if available","t":"`$STRING`","key$":"ipv6","index$":7},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Geographic location information","t":"`$OBJECT`","key$":"location","index$":8},"organization":{"a":true,"h":"Organization","n":"organization","r":false,"sh":"Organization associated with the IP","t":"`$STRING`","key$":"organization","index$":9},"os":{"a":true,"h":"Os","n":"os","r":false,"sh":"Detected operating system","t":"`$STRING`","key$":"os","index$":10}},"id":{"field":"id","name":"id"},"name":"get_ip_info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{ip}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"217.199.217.100","k":"param","n":"id","or":"ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{ip}","q":{"exist":["id"]},"r":{"param":{"ip":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_ip_info","name__orig":"get_ip_info","Name":"GetIpInfo","name_":"get_ip_info","name-":"get-ip-info","NAME":"GET_IP_INFO","index$":0}, {"active":true,"entity":"get_ip_info","key$":"BasicGetIpInfoFlow","kind":"basic","name":"BasicGetIpInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_ip_info_ref01","srcdatavar":"get_ip_info_ref01_data","suffix":"_dt0"},"m":{"id":"get_ip_info01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_ip_info_ref01"}}],"index$":0}]}, 'GetIpInfo', {"GET /{ip}":{"protocol":"http","operationId":"getIpInfo","responses":{"200":{"description":"Successful response with IP information","content":{"application/json":{"schema":{"type":"object","properties":{"ip":{"description":"The queried IP address","example":"217.199.217.100","key$":"ip","type":"string"},"ipv4":{"description":"IPv4 address","example":"217.199.217.100","key$":"ipv4","type":"string"},"ipv6":{"description":"IPv6 address if available","key$":"ipv6","nullable":true,"type":"string"},"os":{"description":"Detected operating system","example":"Windows","key$":"os","type":"string"},"browser":{"description":"Detected browser","example":"Chrome","key$":"browser","type":"string"},"organization":{"description":"Organization associated with the IP","example":"Example ISP","key$":"organization","type":"string"},"country":{"description":"Country where the IP is located","example":"United States","key$":"country","type":"string"},"country_code":{"description":"ISO country code","example":"US","key$":"country_code","type":"string"},"location":{"description":"Geographic location information","key$":"location","properties":{"city":{"description":"City name","type":"string"},"latitude":{"description":"Latitude coordinate","format":"double","type":"number"},"longitude":{"description":"Longitude coordinate","format":"double","type":"number"},"region":{"description":"Region or state","type":"string"}},"type":"object"},"hosting_info":{"description":"Live hosting information","key$":"hosting_info","properties":{"asn":{"description":"Autonomous System Number","type":"string"},"host":{"description":"Hostname","type":"string"},"isp":{"description":"Internet Service Provider","type":"string"}},"type":"object"}},"index$":0}}}},"400":{"description":"Bad request - Invalid IP address format","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Invalid IP address format"}}}}}},"404":{"description":"IP address not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"IP address not found"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Internal server error"}}}}}}},"parameters":[{"name":"ip","in":"path","description":"The IP address to lookup (IPv4 or IPv6)","required":true,"schema":{"type":"string","example":"217.199.217.100"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_ip_info_ref01_data = Object.values(setup.data.existing.get_ip_info)[0] as any

    // LOAD
    const get_ip_info_ref01_ent = client.GetIpInfo()
    const get_ip_info_ref01_match_dt0: any = {}
    get_ip_info_ref01_match_dt0.id = get_ip_info_ref01_data.id
    const get_ip_info_ref01_data_dt0 = (await get_ip_info_ref01_ent.load(get_ip_info_ref01_match_dt0)).data()
    assert(get_ip_info_ref01_data_dt0.id === get_ip_info_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_ip_info/GetIpInfoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MyipSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_ip_info01','get_ip_info02','get_ip_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MYIP_TEST_GET_IP_INFO_ENTID': idmap,
    'MYIP_TEST_LIVE': 'FALSE',
    'MYIP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MYIP_TEST_GET_IP_INFO_ENTID']

  const live = 'TRUE' === env.MYIP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MYIP_TEST_GET_IP_INFO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MyipSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MYIP_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
