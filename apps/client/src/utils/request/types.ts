export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface IRequestOption {
  method?: HttpMethod
  body?: any // either an object or array
  headers?: Record<string, string>
}
