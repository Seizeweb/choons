import axios from 'axios';
import { ReleaseInterface, ListInterface, UserInterface } from './interfaces';

const baseUrl = 'http://localhost:3001';

export const pullRelease = async (url: string): Promise<ReleaseInterface> => {
  const token = localStorage.getItem('token');
  const encodedUrl = btoa(url);
  const { data } = await axios.get(baseUrl + '/release/' + encodedUrl, {
    headers: { 'auth-token': token },
  });
  return data;
};

export const listUserLists = async (): Promise<ListInterface[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(baseUrl + '/lists', {
    headers: { 'auth-token': token },
  });
  return data;
};

export const getListReleases = async (listId: string): Promise<ReleaseInterface[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(baseUrl + '/list/' + listId, {
    headers: { 'auth-token': token },
  });
  return data;
};

export const addReleaseToList = async (listId: string, releaseId: string): Promise<ListInterface> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(baseUrl + '/list/' + listId + '/' + releaseId, null, {
    headers: { 'auth-token': token },
  });
  return data;
};

export const deleteReleaseFromList = async (listId: string, releaseId: string): Promise<ListInterface> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.put(baseUrl + '/list/' + listId + '/' + releaseId, {
    headers: { 'auth-token': token },
  });
  return data;
};

export const createList = async (name: string): Promise<ListInterface> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(
    baseUrl + '/new-list',
    { name },
    {
      headers: { 'auth-token': token },
    }
  );
  return data;
};

export const deleteList = async (listId: string): Promise<ListInterface[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.delete(baseUrl + '/list/' + listId, {
    headers: { 'auth-token': token },
  });
  return data;
};

export const login = async (email: string, password: string): Promise<UserInterface> => {
  const { data } = await axios.post(baseUrl + '/login', { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.post(baseUrl + '/logout', null, {
    headers: { 'auth-token': token },
  });
  localStorage.removeItem('token');
};

export const getUser = async (): Promise<UserInterface> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(baseUrl + '/profile', {
    headers: { 'auth-token': token },
  });
  return data;
};
