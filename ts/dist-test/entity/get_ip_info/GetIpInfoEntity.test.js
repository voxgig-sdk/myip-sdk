"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetIpInfoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MYIP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MYIP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MyipSDK.test();
        const ent = testsdk.GetIpInfo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MYIP_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_ip_info.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "browser", "req": false, "short": "Detected browser", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "country", "req": false, "short": "Country where the IP is located", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "country_code", "req": false, "short": "ISO country code", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "hosting_info", "req": false, "short": "Live hosting information", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "ip", "req": false, "short": "The queried IP address", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "ipv4", "req": false, "short": "IPv4 address", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "ipv6", "req": false, "short": "IPv6 address if available", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "location", "req": false, "short": "Geographic location information", "type": "`$OBJECT`", "index$": 8 }, { "active": true, "name": "organization", "req": false, "short": "Organization associated with the IP", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "os", "req": false, "short": "Detected operating system", "type": "`$STRING`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "get_ip_info", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "217.199.217.100", "kind": "param", "name": "id", "orig": "ip", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{ip}", "json": "{\"operationId\":\"getIpInfo\",\"parameters\":[{\"description\":\"The IP address to lookup (IPv4 or IPv6)\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"example\":\"217.199.217.100\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"browser\":{\"description\":\"Detected browser\",\"example\":\"Chrome\",\"type\":\"string\"},\"country\":{\"description\":\"Country where the IP is located\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"example\":\"US\",\"type\":\"string\"},\"hosting_info\":{\"description\":\"Live hosting information\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"type\":\"string\"},\"host\":{\"description\":\"Hostname\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"description\":\"The queried IP address\",\"example\":\"217.199.217.100\",\"type\":\"string\"},\"ipv4\":{\"description\":\"IPv4 address\",\"example\":\"217.199.217.100\",\"type\":\"string\"},\"ipv6\":{\"description\":\"IPv6 address if available\",\"nullable\":true,\"type\":\"string\"},\"location\":{\"description\":\"Geographic location information\",\"properties\":{\"city\":{\"description\":\"City name\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"region\":{\"description\":\"Region or state\",\"type\":\"string\"}},\"type\":\"object\"},\"organization\":{\"description\":\"Organization associated with the IP\",\"example\":\"Example ISP\",\"type\":\"string\"},\"os\":{\"description\":\"Detected operating system\",\"example\":\"Windows\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid IP address format\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid IP address format\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"IP address not found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"IP address not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{ip}", "rename": { "param": { "ip": "id" } }, "segments": [{ "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_ip_info", "name__orig": "get_ip_info", "Name": "GetIpInfo", "name_": "get_ip_info", "name-": "get-ip-info", "NAME": "GET_IP_INFO", "index$": 0 }, { "active": true, "entity": "get_ip_info", "key$": "BasicGetIpInfoFlow", "kind": "basic", "name": "BasicGetIpInfoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "get_ip_info_ref01", "srcdatavar": "get_ip_info_ref01_data", "suffix": "_dt0" }, "match": { "id": "get_ip_info01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_ip_info_ref01" } }], "index$": 0 }] }, 'GetIpInfo');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_ip_info_ref01_data = Object.values(setup.data.existing.get_ip_info)[0];
        // LOAD
        const get_ip_info_ref01_ent = client.GetIpInfo();
        const get_ip_info_ref01_match_dt0 = {};
        get_ip_info_ref01_match_dt0.id = get_ip_info_ref01_data.id;
        const get_ip_info_ref01_data_dt0 = (await get_ip_info_ref01_ent.load(get_ip_info_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_ip_info_ref01_data_dt0.id === get_ip_info_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_ip_info/GetIpInfoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MyipSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_ip_info01', 'get_ip_info02', 'get_ip_info03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MYIP_TEST_GET_IP_INFO_ENTID': idmap,
        'MYIP_TEST_LIVE': 'FALSE',
        'MYIP_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MYIP_TEST_GET_IP_INFO_ENTID'];
    const live = 'TRUE' === env.MYIP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MYIP_TEST_GET_IP_INFO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MyipSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=GetIpInfoEntity.test.js.map