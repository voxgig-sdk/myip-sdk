"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyipError = void 0;
class MyipError extends Error {
    isMyipError = true;
    sdk = 'Myip';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MyipError = MyipError;
//# sourceMappingURL=MyipError.js.map