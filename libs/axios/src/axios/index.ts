import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from 'axios';

export interface BaseAxiosRequestConfig<D = any> extends AxiosRequestConfig {}

export interface BaseAxiosResponse<T = any, D = any> extends AxiosResponse {}

// 拦截器类型
export type RequestInterceptorResolve = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
export type RequestInterceptorRejected = (error: any) => any;
export type ResponseInterceptorResolve = (config: BaseAxiosResponse) => BaseAxiosResponse;
export type ResponseInterceptorRejected = (error: any) => any;

const defaultResponseErrorInterceptor = (error: any) => {
  console.log(error);
  // 这里用来处理http常见错误，进行全局提示
  let message = "";
  switch (error.status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `系统错误，请稍后重试(${error.code})!`;
  }
  return Promise.reject({message, error: error});
};
class AxiosRequest{
  public instance: AxiosInstance
  requestInterceptorResolve?: RequestInterceptorResolve
  requestInterceptorRejected?: RequestInterceptorRejected
  responseInterceptorResolve?: ResponseInterceptorResolve
  responseInterceptorRejected?: ResponseInterceptorRejected = defaultResponseErrorInterceptor

  constructor(config?: BaseAxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(this.requestInterceptorResolve, this.requestInterceptorRejected);
    this.instance.interceptors.response.use(this.responseInterceptorResolve, this.responseInterceptorRejected);
  }
  // 自定义请求拦截器
  requestInterceptor = (reqResolve?: RequestInterceptorResolve, reqRejected?: RequestInterceptorRejected) => {
    this.instance.interceptors.request.use(reqResolve, reqRejected);
  }
  // 自定义响应拦截器
  responseInterceptor = (resResolve?: ResponseInterceptorResolve, resRejected?: ResponseInterceptorRejected) => {
    this.instance.interceptors.response.use(resResolve, resRejected);
  }

  request = (config: BaseAxiosRequestConfig) => {
    return this.instance.request(config);
  }

  get = <T = any>(url: string, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.get(url, config)
  }

  head = <T = any>(url: string, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.get(url, config)
  }

  options = <T = any>(url: string, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.get(url, config)
  }

  post = <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.post(url, data, config);
  }
  
  put = <T = any> (url: string, config?: AxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.post(url, config);
  }

  patch = <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.post(url, data, config);
  }

  postForm = <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.post(url, data, config);
  }

  putForm = <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.post(url, data, config);
  }

  patchForm = <T = any>(url: string, data: any, config?: BaseAxiosRequestConfig): Promise<BaseAxiosResponse<T>> => {
    return this.instance.post(url, data, config);
  }

}

export default AxiosRequest;