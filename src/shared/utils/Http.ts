enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type RequestOptions = {
    headers?: Record<string, string>;
    method: string;
    timeout?: number;
    data?: any;
};

const baseUrl = 'https://ya-praktikum.tech/api/v2';

export class Http {
  async get<TResponse>(url: string, data?: {}): Promise<TResponse> {
    return this.request(url, { method: METHODS.GET, data });
  }

  async post<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHODS.POST, data });
  }

  async put<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHODS.PUT, data });
  }

  async delete<TResponse>(url: string, data: {}): Promise<TResponse> {
    return this.request(url, { method: METHODS.DELETE, data });
  }

  async request<TResponse>(
    url: string,
    options: RequestOptions = { method: METHODS.GET },
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const { method, data } = options;

      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET) {
        if (data) {
          url = `${url}?${Object.entries(data)
            .map(([key, value]: [key: string, value: any]): string => `${key}=${value}`)
            .join('&')}`;
        }
      }

      xhr.open(method, baseUrl + url);
      xhr.withCredentials = true;

      xhr.onload = function () {
        let resp;
        if (~xhr?.getResponseHeader('Content-Type')?.indexOf('application/json')!) {
          resp = JSON.parse(xhr.response);
        } else {
          resp = xhr.response;
        }
        if (xhr.status === 200) {
          resolve(resp);
        } else {
          reject(resp);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
