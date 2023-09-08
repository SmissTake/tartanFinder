import axios, { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import * as https from 'https';

export default async function UFetch(endpoint: string, method: string = 'GET', headers: any = {}, proxy: any = null, body: any = null, params: any = {}) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const config: AxiosRequestConfig = {
    method: method,
    url: process.env.URL + endpoint,
    headers: headers,
    proxy: proxy,
    httpAgent: proxy ? new HttpsProxyAgent(proxy) : null,
    data: body,
    httpsAgent: agent,
    params: params
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}