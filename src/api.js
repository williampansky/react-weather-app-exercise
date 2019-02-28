/**
 * @namespace api
 * @see [Reference]{@link https://alligator.io/react/axios-react/}
 * @version 0.1.1
 */
// https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0.sandbox.auth0-extend.com/reactweatherapi
import axios from 'axios';

const getKey = () => {
    const endpoint = {
        string: 'https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0',
        com: '.sandbox.auth0-extend.com',
        func: 'reactweatherapi'
    };
    axios
        .get(endpoint.string + endpoint.com + endpoint.func)
        .then(response => {
            localStorage.setItem('key', response.data.key);
            // return response.data.key;
        })
        .catch(error => {
            console.error(error);
        });
};

const api = {
    endpoint: 'https://api.weatherbit.io/v2.0/forecast/daily',
    key: localStorage.getItem('key'),
    city: 'Dallas,TX',
    lat: '32.7766642',
    lon: '-96.7969879',
    days: 6
};

export default axios.create({
    baseURL: api.endpoint,
    params: {
        key: api.key,
        city: api.city,
        days: api.days
    }
});
