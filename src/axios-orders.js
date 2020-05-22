import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-24e4c.firebaseio.com/'
});

export default instance;