/**
 * @namespace api
 * @see [Reference]{@link https://alligator.io/react/axios-react/}
 * @version 0.1.1
 */

import axios from 'axios';

const api = {
    endpoint: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    key: localStorage.getItem('key'),
    lat: '32.7766642',
    lon: '-96.7969879'
};

export default axios.create({
    baseURL: api.endpoint,
    headers: {
        'X-RapidAPI-Key': api.key
    },
    params: {
        lat: api.lat,
        lon: api.lon,
        units: 'I'
    }
});
