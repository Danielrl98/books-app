import { globalConfig } from "@/shared/config";

export interface IHttpParams {
  url: string;
  headers?: any;
  body?: any;
  method: string;
}

export class HttpClient {
  public async request(input: IHttpParams) {
    const result: any = {
      input: {
        ...input,
      },
      headers: {},
      body: {},
      status: 400,
    };

    try {
      const response = await fetch(input.url, {
        method: input.method,
        headers: input.headers,
        body: input.body,
      });

      result.status = response.status;
      result.headers = response.headers;

      const contentType = response.headers.get("content-type");

      let data = {};

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else if (contentType?.includes("text/plain")) {
        data = {
          text: await response.text(),
        };
      } else {
        data = {
          text: await response.text(),
        };
      }

      result.body = data;
    } catch (error: any) {
      result.body = {
        error: error?.message || "BAD_REQUEST",
      };
    }

    if (globalConfig.DEBUG_HTTP) {
      console.log(result);
    }

    return result;
  }
}
