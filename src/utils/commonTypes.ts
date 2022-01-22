export interface RequestConfig<T> {
  api: string;
  method?: 'post' | 'get';
  data?: T;
}

export interface RequestFunc<Request, Response> {
  (config: RequestConfig<Request>): Promise<Response>;
}
