import AxiosRequest from "./axios";

export const myAxios = AxiosRequest;

const axios = new AxiosRequest();

export const request = axios.request;
export const get = axios.get;
export const head = axios.head;
export const options = axios.options;
export const post = axios.post;
export const put = axios.put;
export const patch = axios.patch;
export const postForm = axios.postForm;
export const putForm = axios.putForm;
export const patchForm = axios.patchForm;

export default axios;
