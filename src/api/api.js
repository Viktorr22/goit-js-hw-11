import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPicture(path = '') {
  try {
    const responce = await axios.get(path);
    console.log(responce.data);
    return responce.data;
  } catch (error) {
    throw new Error(error);
  }
}
