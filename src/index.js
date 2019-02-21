// https://blog.bitsrc.io/reusable-components-in-react-
// a-practical-guide-ec15a81a4d71
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './styles/styles.css';
import AppGraphic from './components/AppGraphic';
import AppDay from './components/AppDay';
import AppLocation from './components/AppLocation';
import AppSwitcher from './components/AppSwitcher';
import AppToday from './components/AppToday';
import TodaysWeather from './components/TodaysWeather';

const Main = styled.main`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 670px;
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
    return (
        <Main>
            <Location>
                <Info>
                    <AppLocation location="Dallas, TX" />
                    <AppToday day="Saturday, Sep 16, 2018" temperature="93" />
                </Info>
                <Graphic>
                    <TodaysWeatherAndControls>
                        <TodaysWeather
                            degrees="93"
                            sky="Partly Cloudy"
                            wind="12"
                            icon="cloud-sun"
                        />
                        <AppSwitcher />
                    </TodaysWeatherAndControls>
                    <AppGraphic />
                </Graphic>
            </Location>
            <Week>
                <AppDay day="sun" icon="cloud-drizzle" temperature="92" />
                <AppDay day="mon" icon="cloud-sun" temperature="87" />
                <AppDay day="tue" icon="cloud-drizzle-sun" temperature="93" />
                <AppDay day="wed" icon="cloud-lightning" temperature="95" />
                <AppDay day="thur" icon="cloud-sun" temperature="88" />
            </Week>
        </Main>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
