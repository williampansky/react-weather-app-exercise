/**
 * @namespace App
 * @version 0.1.4
 * @see [Components]{@link https://blog.bitsrc.io/reusable-components-in-react-a-practical-guide-ec15a81a4d71}
 */

import './styles/styles.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Api from './api';
import AppDay from './components/AppDay';
import AppGraphic from './components/AppGraphic';
import AppLocation from './components/AppLocation';
import AppSwitcher from './components/AppSwitcher';
import AppToday from './components/AppToday';
import createPersistedState from 'use-persisted-state';
import TodaysWeather from './components/TodaysWeather';
import { format } from 'date-fns';

const Main = styled.main`
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 92%;
    justify-content: center;
    margin: auto;
    max-width: 670px;
    width: 100%;
`;

const Week = styled.section`
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    display: grid;
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
`;

const Location = styled.article`
    width: 100%;
`;

const Info = styled.header`
    color: white;
    margin: 0 auto 20px;
    padding: 1em;
    text-align: center;
    width: 100%;
`;

const TodaysWeatherAndControls = styled.div`
    align-items: center;
    bottom: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    left: 0;
    padding: 1.5em 2em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

const Graphic = styled.footer`
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    width: 100%;
`;

/**
 * Matches available icons to api code strings. This is required
 * considering there are a possible 38 different codes coming down
 * from the api—but we currently only have four icons available.
 *
 * @function getIcon
 * @param {Number} code Value from api.weather.code.
 */
const getIcon = code => {
    const icons = {
        cloudDrizzle: 'cloud-drizzle-sun',
        cloudDrizzleSun: 'cloud-drizzle-sun',
        cloudLightning: 'cloud-lightning',
        cloudSun: 'cloud-sun'
    };

    const groups = {
        drizzle: [300, 301, 302],
        general: [800, 801, 802, 803, 804, 900],
        hazards: [700, 711, 721, 731, 741, 751],
        rain: [500, 501, 502, 511, 520, 521, 522],
        snow: [600, 601, 602, 610, 611, 612, 621, 622, 623],
        thunderstorms: [200, 201, 202, 230, 231, 232, 233]
    };

    if (groups.drizzle.includes(code)) return icons.cloudDrizzle;
    else if (groups.general.includes(code)) return icons.cloudSun;
    else if (groups.hazards.includes(code)) return icons.cloudSun;
    else if (groups.rain.includes(code)) return icons.cloudDrizzle;
    else if (groups.snow.includes(code)) return icons.cloudDrizzle;
    else if (groups.thunderstorms.includes(code)) return icons.cloudLightning;
    else return icons.cloudSun;
};

function App() {
    /**
     * @see [persisted-state]
     * {@link https://github.com/donavon/use-persisted-state}
     */
    const useWeatherState = createPersistedState('api');
    const [api, setData] = useWeatherState();

    /**
     * @see [Reference]
     * {@link https://www.robinwieruch.de/react-hooks-fetch-data/}
     */
    const fetchData = async () => {
        const result = await Api.get();

        if (result.status_code !== 429) {
            console.log(result.data);
            setData(result.data);
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
        const threeHoursAgo = Date.now() - THREEHOURS;

        const token = localStorage.getItem('token');
        if (!token) localStorage.setItem('token', new Date());

        if (token < threeHoursAgo) {
            localStorage.setItem('token', new Date());
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (refreshApi() === true) fetchData();
    }, []);

    return (
        <Main>
            <Location>
                <Info>
                    <AppLocation city={api.city_name} state={api.state_code} />
                    <AppToday day={api.data[0].valid_date} />
                </Info>
                <Graphic>
                    <TodaysWeatherAndControls>
                        <TodaysWeather
                            degrees={api.data[0].temp}
                            sky={api.data[0].weather.description}
                            wind={api.data[0].wind_spd}
                            icon={getIcon(api.data[0].weather.code)}
                        />
                        <AppSwitcher />
                    </TodaysWeatherAndControls>
                    <AppGraphic />
                </Graphic>
            </Location>
            <Week>
                <AppDay
                    day={api.data[1].valid_date}
                    degrees={api.data[1].temp}
                    icon={getIcon(api.data[1].weather.code)}
                    tooltip={api.data[1].valid_date}
                />
                <AppDay
                    day={api.data[2].valid_date}
                    degrees={api.data[2].temp}
                    icon={getIcon(api.data[2].weather.code)}
                />
                <AppDay
                    day={api.data[3].valid_date}
                    degrees={api.data[3].temp}
                    icon={getIcon(api.data[3].weather.code)}
                />
                <AppDay
                    day={api.data[4].valid_date}
                    degrees={api.data[4].temp}
                    icon={getIcon(api.data[4].weather.code)}
                />
                <AppDay
                    day={api.data[5].valid_date}
                    degrees={api.data[5].temp}
                    icon={getIcon(api.data[5].weather.code)}
                />
            </Week>
        </Main>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
