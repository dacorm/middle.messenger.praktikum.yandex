import { queryStringify } from './queryStringify';

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type RequestOptions = {
    headers?: Record<string, string>;
    method?: string;
    timeout?: number;
    data?: any;
};

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>

export class Http {
  get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET });

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: RequestOptions = {}) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = options.timeout || 5000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
