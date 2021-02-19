import { HttpService } from '@nestjs/common';
import { AxiosRequestConfig, Method } from 'axios';

const httpService = new HttpService();
export const makeRequest = async (
  endpoint: string,
  method: string,
  params: object = {},
  headersConfig?: any,
): Promise<any> => {

  const url = `${endpoint}`;

  const options: AxiosRequestConfig = {
    method: method as Method,
    url,
    headers: headersConfig || {},
    responseType: 'json',
    data: {},
    params: {},
  };

  const methodsToSendData = ['DELETE', 'POST', 'PUT'];
  if (methodsToSendData.includes(method)) {
    options.data = params;
  } else {
    options.params = params;
  }

  return httpService
    .request(options)
    .toPromise()
    .then((response) => response.data);
};
