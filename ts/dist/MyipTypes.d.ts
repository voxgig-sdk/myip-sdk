export interface GetIpInfo {
    browser?: string;
    country?: string;
    country_code?: string;
    hosting_info?: Record<string, any>;
    id?: string;
    ip?: string;
    ipv4?: string;
    ipv6?: string;
    location?: Record<string, any>;
    organization?: string;
    os?: string;
}
export interface GetIpInfoLoadMatch {
    id: string;
}
