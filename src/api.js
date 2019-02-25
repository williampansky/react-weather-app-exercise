/**
 * @namespace api
 * @see [Reference]{@link https://alligator.io/react/axios-react/}
 * @version 0.1.1
 */

import axios from 'axios';

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
    // headers: {
    //     'X-RapidAPI-Key': api.key
    // },
    params: {
        key: api.key,
        city: api.city,
        // lat: api.lat,
        // lon: api.lon,
        days: api.days
    }
});
