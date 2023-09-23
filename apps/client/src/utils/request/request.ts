import axios, { AxiosError } from "axios"
import { AUTH_USER_KEY } from "@/auth/constants"
import { his } from "@/navigate";
import { IRequestOption } from "./types";

// create axios instance
const client = axios.create()
// intercept response
const onRejected: (error: any) => Promise<any> = error => {
  if (!axios.isAxiosError(error)) {
    return Promise.reject(error)
  }
  const errorCode = (error as AxiosError).response?.status
  // alert("error code is" + errorCode)
  if (errorCode === 401) {
    localStorage.removeItem(AUTH_USER_KEY)
    // alert("redirecting")
    his.navigate("/login")
  }
  return Promise.reject(error)
}
client.interceptors.response.use(response => response, onRejected)

/**
 * Make http reqeust to API server
 * @description
 * 1. Default 'Accept' header in request: application/json
 *   Note: you can overwrite it in option.headers
 * 2. How response code is handled:
 *   - 2xx: response will be returned
 *   - 4xx & 5xx: an error will be thrown
 * @returns response (parsed)
 */
export async function request<T = any>(url: string, option: IRequestOption = {}): Promise<T> {
  console.log("Making axios api call")
  const { method = 'GET', body, headers = {} } = option
  const requestHeaders = {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    ...headers
  }
  const response = await client.request<T>({
    method: method.toLowerCase(), // axios uses lowercase for method
    url: url,
    headers: requestHeaders,
    data: body,
    responseType: 'json',
  })
  return response.data;
}