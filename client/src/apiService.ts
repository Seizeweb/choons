import axios from 'axios';
import { Release } from './interfaces';

const baseUrl = 'http://localhost:3001';

export const pullRelease = async (url: string): Promise<Release> => {
  const encodedUrl = btoa(url);
  const { data } = await axios.get(baseUrl + '/release/' + encodedUrl);
  return data;
};
