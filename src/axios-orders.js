import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-8f24e.firebaseio.com/'
});

export default instance;