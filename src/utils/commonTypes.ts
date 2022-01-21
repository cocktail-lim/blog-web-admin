export interface RequestConfig<T> {
  api: string;
  method?: 'post' | 'get';
  data?: T;
}
