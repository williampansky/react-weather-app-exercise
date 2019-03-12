/**
 * @namespace api
 * @see [Reference]{@link https://alligator.io/react/axios-react/}
 * @see [Webtask]{@link https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0.sandbox.auth0-extend.com/reactweatherapi}
 * @version 0.1.3
 */

import axios from 'axios';

const api = {
    endpoint: 'https://api.weatherbit.io/v2.0/forecast/daily',
    key: 'cf21dc715619499798c4781dc9601a77',
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
