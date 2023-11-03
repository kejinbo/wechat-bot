import axios, { AxiosResponse } from 'axios';
import { GD_KEY, GD_HOST } from '../tools/constant';

export function getCityWeather(city: number): Promise<AxiosResponse<any, any>> {
  return axios({
    method: 'get',
    url: `${GD_HOST}?key=${GD_KEY}&city=${city}&extensions=all`,
  });
}
