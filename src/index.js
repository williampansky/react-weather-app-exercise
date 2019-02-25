import './styles/styles.css';
import defaultStateF from './static/api-test.json';
import defaultStateC from './static/api-test-celcius.json';
import createPersistedState from 'use-persisted-state';
import { differenceInMinutes } from 'date-fns';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './App';
import Api from './api';

function App() {
    /**
     * @see [persisted-state]
     * {@link https://github.com/donavon/use-persisted-state}
     */
    const useWeatherState = createPersistedState('api'),
        useWeatherStateC = createPersistedState('apiC');
    const [api, setDataF] = useWeatherState(),
        [apiC, setDataC] = useWeatherStateC();

    /**
     * @see [Reference]
     * {@link https://www.robinwieruch.de/react-hooks-fetch-data/}
     */
    const fetchData = async () => {
        const result = await Api.get('?units=I');
        const resultCelcius = await Api.get();

        if (result.status_code !== 429) {
            console.log(result.data);
            setDataF(result.data);
        }

        if (resultCelcius.status_code !== 429) {
            console.log(resultCelcius.data);
            setDataC(resultCelcius.data);
        }
    };

    /**
     * Sets date timestamp tokens to localStorage. Compare token to
     * `threeHoursAgo`. If true, refresh our API.
     * @method refreshApi
     * @see [StackOverflow]{@link https://stackoverflow.com/a/42529483}
     */
    const refreshApi = () => {
        const HOUR = 1000 * 60 * 60;
        const THREEHOURS = HOUR * 3;
        let threeHoursAgo = Date.now() - THREEHOURS;

        let token = localStorage.getItem('token');
        if (!token) localStorage.setItem('token', new Date());

        token = localStorage.getItem('token');
        let minutes = differenceInMinutes(token, threeHoursAgo);

        if (minutes < 0) {
            localStorage.removeItem('token');
            return true;
        } else {
            console.log('Minutes until Api refresh:', minutes);
            return false;
        }
    };

    useEffect(() => {
        if (refreshApi() === true) fetchData();
    }, []);

    let defaultState = {
        city_name: 'Unknown',
        state_code: 'N/A',
        degrees_type: 'F',
        data: [
            { temp: 0, weather: {} },
            { temp: 0, weather: {} },
            { temp: 0, weather: {} },
            { temp: 0, weather: {} },
            { temp: 0, weather: {} },
            { temp: 0, weather: {} }
        ]
    };

    // let selection = localStorage.getItem('degrees');
    // if (selection === 'F') api = apiF;
    // else if (selection === 'C') api = apiC;

    // let state = {
    //     cityName: api.city_name,
    //     stateCode: api.state_code,
    //     degreesType: localStorage.getItem('degrees'),
    //     today: {
    //         temp: api.data[0].temp,
    //         date: api.data[0].valid_date,
    //         conditions: api.data[0].weather.description,
    //         wind: api.data[0].wind_spd,
    //         icon: api.data[0].weather.code
    //     },
    //     tomorrow: {
    //         temp: api.data[1].temp,
    //         date: api.data[1].valid_date,
    //         conditions: api.data[1].weather.description,
    //         wind: api.data[1].wind_spd,
    //         icon: api.data[1].weather.code
    //     },
    //     overmorrow: {
    //         temp: api.data[2].temp,
    //         date: api.data[2].valid_date,
    //         conditions: api.data[2].weather.description,
    //         wind: api.data[2].wind_spd,
    //         icon: api.data[2].weather.code
    //     },
    //     humpday: {
    //         temp: api.data[3].temp,
    //         date: api.data[3].valid_date,
    //         conditions: api.data[3].weather.description,
    //         wind: api.data[3].wind_spd,
    //         icon: api.data[3].weather.code
    //     },
    //     secondToLast: {
    //         temp: api.data[4].temp,
    //         date: api.data[4].valid_date,
    //         conditions: api.data[4].weather.description,
    //         wind: api.data[4].wind_spd,
    //         icon: api.data[4].weather.code
    //     },
    //     theLastDay: {
    //         temp: api.data[5].temp,
    //         date: api.data[5].valid_date,
    //         conditions: api.data[5].weather.description,
    //         wind: api.data[5].wind_spd,
    //         icon: api.data[5].weather.code
    //     }
    // };

    return (
        <AppRoot
            data={api}
            dataC={apiC}
            // city={state.cityName}
            // state={state.stateCode}
            // today={state.today}
            // tomorrow={state.tomorrow}
            // overmorrow={state.overmorrow}
            // humpday={state.humpday}
            // secondToLast={state.secondToLast}
            // theLastDay={state.theLastDay}
            // degreesType={state.degreesType}
            // onDegreesChange={handleDegreesChange.bind(this)}
        />
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
