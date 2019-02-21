/**
 * @namespace App
 * @version 0.1.4
 * @see [Components]{@link https://blog.bitsrc.io/reusable-components-in-react-a-practical-guide-ec15a81a4d71}
 */

import './styles/styles.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import AppGraphic from './components/AppGraphic';
import AppDay from './components/AppDay';
import AppLocation from './components/AppLocation';
import AppSwitcher from './components/AppSwitcher';
import AppToday from './components/AppToday';
import TodaysWeather from './components/TodaysWeather';
import Api from './api';
import createPersistedState from 'use-persisted-state';

const Main = styled.main`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 670px;
    height: 92%;
    margin: auto;
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
    padding: 1em;
    width: 100%;
    text-align: center;
    margin: 0 auto 20px;
`;

const TodaysWeatherAndControls = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 1;
    padding: 1.5em 2em;
`;

const Graphic = styled.footer`
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    position: relative;
`;

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

        console.log(result.data);
        setData(result.data);
    };

    useEffect(() => {
        // fetchData();
        if (localStorage.getItem(api)) fetchData();
    }, []);

    return (
        <Main>
            <Location>
                <Info>
                    <AppLocation city={api.city_name} state={api.state_code} />
                    <AppToday day={api.data[0].timestamp_utc} />
                </Info>
                <Graphic>
                    <TodaysWeatherAndControls>
                        <TodaysWeather
                            degrees={api.data[0].app_temp}
                            sky={api.data[0].weather.description}
                            wind={api.data[0].wind_spd}
                            icon="cloud-sun"
                        />
                        <AppSwitcher />
                    </TodaysWeatherAndControls>
                    <AppGraphic />
                </Graphic>
            </Location>
            <Week>
                <AppDay
                    day={api.data[3].timestamp_utc}
                    degrees={api.data[3].app_temp}
                    icon="cloud-drizzle"
                />
                <AppDay
                    day={api.data[11].timestamp_utc}
                    degrees={api.data[11].app_temp}
                    icon="cloud-sun"
                />
                <AppDay
                    day={api.data[19].timestamp_utc}
                    degrees={api.data[19].app_temp}
                    icon="cloud-drizzle-sun"
                />
                <AppDay
                    day={api.data[27].timestamp_utc}
                    degrees={api.data[27].app_temp}
                    icon="cloud-lightning"
                />
                <AppDay
                    day={api.data[35].timestamp_utc}
                    degrees={api.data[35].app_temp}
                    icon="cloud-sun"
                />
            </Week>
        </Main>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
