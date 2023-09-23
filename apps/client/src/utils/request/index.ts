import { request } from './request'
import { HttpMethod, IRequestOption } from './types'

type IShortRequestOption = Omit<IRequestOption, 'method' | 'body'>

type Action = <T = any>(url: string, payload?: any, options?: IShortRequestOption) => Promise<T>

export function constructHandyRequest<T = any>(
  request: (url: string, options: IRequestOption) => Promise<T>,
  method: HttpMethod
) {
  if (method === 'GET') {
    return (url: string, query?: Record<string, string>, options?: IShortRequestOption) => {
      const queryString = new URLSearchParams(query).toString()
      const fullUrl = queryString ? `${url}?${queryString}` : url
      return request(fullUrl, { ...options, method })
    }
  } else {
    return (url: string, body?: any, options?: IShortRequestOption) => {
      return request(url, { ...options, body, method })
    }
  }
}

export class HttpRequest {
  static Request = request

  static Get: Action = constructHandyRequest(request, 'GET')

  static Post: Action = constructHandyRequest(request, 'POST')

  static Put: Action = constructHandyRequest(request, 'PUT')

  static Patch: Action = constructHandyRequest(request, 'PATCH')

  static Delete: Action = constructHandyRequest(request, 'DELETE')
}
