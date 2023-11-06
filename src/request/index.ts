import axios, { AxiosResponse } from 'axios';
import {
  GD_KEY,
  GD_HOST,
  get_cat_photo_api,
  get_dog_photo_api,
  rapid_key,
  get_quotations_from_famous_people,
  joke_api,
} from '../tools/constant';

export function getCityWeather(city: number): Promise<AxiosResponse<any, any>> {
  return axios({
    method: 'get',
    url: `${GD_HOST}?key=${GD_KEY}&city=${city}&extensions=all`,
  });
}

export function getDogPhoto() {
  return axios({
    method: 'get',
    url: get_dog_photo_api,
  });
}

export function getCatPhoto() {
  return axios({
    method: 'get',
    url: get_cat_photo_api,
  });
}

export function getQuotationsFromFamousPeople() {
  return axios({
    method: 'get',
    url: get_quotations_from_famous_people,
  });
}

export function getAJoke() {
  return axios({
    method: 'get',
    url: joke_api,
  });
}

// 去除图片背景
export function removeImgBackground(url: string) {
  const encodedParams = new URLSearchParams();
  encodedParams.set('image_url', url);
  encodedParams.set('output_format', 'url');
  encodedParams.set('to_remove', 'background');

  const options = {
    method: 'POST',
    url: 'https://background-removal.p.rapidapi.com/remove',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': rapid_key,
      'X-RapidAPI-Host': 'background-removal.p.rapidapi.com',
    },
    data: encodedParams,
  };
  return axios(options);
}
