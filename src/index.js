// https://blog.bitsrc.io/reusable-components-in-react-
// a-practical-guide-ec15a81a4d71
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './styles.css';
import AppGraphic from './AppGraphic';
import AppDay from './AppDay';
import AppLocation from './AppLocation';
import AppToday from './AppToday';

const Main = styled.main`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;

const Week = styled.section`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
`;

const Location = styled.article`
    width: 100%;
`;

const Info = styled.header`
    color: white;
    padding: 1em;
    width: 100%;
    text-align: center;
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
    padding: 2em 2.5em;
`;

const Graphic = styled.footer`
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
                        <div>93</div>
                        <div>C/F</div>
                    </TodaysWeatherAndControls>
                    <AppGraphic />
                </Graphic>
            </Location>
            <Week>
                <AppDay day="sun" temperature="92" />
                <AppDay day="mon" temperature="87" />
                <AppDay day="tue" temperature="93" />
                <AppDay day="wed" temperature="95" />
                <AppDay day="thur" temperature="88" />
            </Week>
        </Main>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
