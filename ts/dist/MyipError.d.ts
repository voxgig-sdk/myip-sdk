import { Context } from './Context';
declare class MyipError extends Error {
    isMyipError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MyipError };
