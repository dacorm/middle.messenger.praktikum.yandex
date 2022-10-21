import {queryStringify} from "./queryStringify";


enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export type RequestOptions = {
    headers?: Record<string, string>;
    method?: string;
    timeout?: number;
    data?: any;
};

export class http {
    get = (url: string, options: RequestOptions = {}) => {
        return this.request(url, {...options, method: METHODS.GET});
    };

    post = (url: string, options: RequestOptions = {}) => {
        return this.request(url, {...options, method: METHODS.POST});
    };

    put = (url: string, options: RequestOptions = {}) => {
        return this.request(url, {...options, method: METHODS.PUT});
    };

    delete = (url: string, options: RequestOptions = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE});
    };

    request = (url: string, options: RequestOptions = {}) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
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

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
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