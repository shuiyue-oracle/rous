import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
export interface BaseAxiosRequestConfig<D = any> extends AxiosRequestConfig {
}
export interface BaseAxiosResponse<T = any, D = any> extends AxiosResponse {
}
export type RequestInterceptorResolve = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
export type RequestInterceptorRejected = (error: any) => any;
export type ResponseInterceptorResolve = (config: BaseAxiosResponse) => BaseAxiosResponse;
export type ResponseInterceptorRejected = (error: any) => any;
declare class AxiosRequest {
    instance: AxiosInstance;
    requestInterceptorResolve?: RequestInterceptorResolve;
    requestInterceptorRejected?: RequestInterceptorRejected;
    responseInterceptorResolve?: ResponseInterceptorResolve;
    responseInterceptorRejected?: ResponseInterceptorRejected;
    constructor(config?: BaseAxiosRequestConfig);
    requestInterceptor: (reqResolve?: RequestInterceptorResolve, reqRejected?: RequestInterceptorRejected) => void;
    responseInterceptor: (resResolve?: ResponseInterceptorResolve, resRejected?: ResponseInterceptorRejected) => void;
    request: (config: BaseAxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
    get: <T = any>(url: string, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    head: <T = any>(url: string, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    options: <T = any>(url: string, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    post: <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    put: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    patch: <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    postForm: <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    putForm: <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
    patchForm: <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig) => Promise<BaseAxiosResponse<T, any>>;
}
export default AxiosRequest;
