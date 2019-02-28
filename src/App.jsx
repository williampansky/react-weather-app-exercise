/**
 * @namespace App
 * @version 0.3.3
 * @see [Components]{@link https://blog.bitsrc.io/reusable-components-in-react-a-practical-guide-ec15a81a4d71}
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import AppDay from './components/AppDay';
import AppGraphic from './components/AppGraphic';
import AppLocation from './components/AppLocation';
import AppSwitcher from './components/AppSwitcher';
import AppToday from './components/AppToday';
import DebugBar from './components/DebugBar';
import { Stars } from './vendor/stars';
import { Weather } from './vendor/weather';
import SVG from 'react-inlinesvg';
import TodaysWeather from './components/TodaysWeather';
import { matchIcon } from './utils/matchIcon';
import { getIcon } from './utils/getIcon';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Background = styled.div`
    height: 100%;
    width: 100%;
    transition: all 600ms ease-in-out;

    &.fade-in {
        opacity: 0;
    }
    &.fade-in--active {
        transition: opacity 600ms ease-in-out;
    }
    &.fade-in--done {
        opacity: 1;
    }
    &.fade-out {
        opacity: 1;
    }
    &.fade-out--active {
        transition: opacity 300ms ease-in-out;
    }
    &.fade-out--done {
        opacity: 0;
    }
`;

const Main = styled.main`
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 92%;
    justify-content: center;
    margin: auto;
    max-width: 670px;
    position: relative;
    width: 96%;
    z-index: 1;

    @media (min-width: 1024px) {
        width: 100%;
    }
`;

const Week = styled.section`
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    display: grid;
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;

    @media (min-width: 320px) {
        grid-template-columns: repeat(5, 1fr);
    }
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
    align-items: flex-start;
    bottom: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    left: 0;
    padding: 1em 1.5em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    form {
        margin-top: 10px;
    }

    @media (min-width: 320px) {
        padding: 1.5em 2em;
    }

    @media (min-width: 425px) {
        align-items: center;

        form {
            margin-top: 0;
        }
    }
`;

const Graphic = styled.footer`
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    display: none;
    position: relative;
    width: 100%;

    @media (min-height: 600px) {
        display: block;
    }
`;

const floatDuration = '15'; // in seconds

const Cloud = styled.div`
    pointer-events: none;
    position: absolute;
    z-index: -1;

    &.left {
        animation: floatUp ${floatDuration}s ease-in-out infinite;
        left: -10%;
        top: 45%;
    }

    &.right {
        animation: floatDown calc(${floatDuration}s / 2) ease-in-out infinite;
        right: -15%;
        top: 38%;
    }

    &.morning {
        opacity: 0.425;
    }

    &.evening {
        filter: blur(25px);
        opacity: 0.425;
        z-index: -1;

        & svg path {
            fill: #09203f;
        }
    }

    @media (min-width: 1024px) {
        z-index: 1;
    }

    @keyframes floatUp {
        0% {
            transform: translatey(0);
        }
        50% {
            transform: translatey(-25px);
        }
        100% {
            transform: translatey(0);
        }
    }

    @keyframes floatDown {
        0% {
            transform: translatey(0);
        }
        50% {
            transform: translatey(15px);
        }
        100% {
            transform: translatey(0);
        }
    }
`;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            background: '',
            clouds: false,
            data: '',
            fog: true,
            rain: false,
            scale: localStorage.getItem('degrees'),
            stars: true,
            snow: false,
            thunder: false,
            time: '',
            units: '',
            wind: false
        };

        this.toCelsius = this.toCelsius.bind(this);
        this.toFahrenheit = this.toFahrenheit.bind(this);
        this.handleDegreesChange = this.handleDegreesChange.bind(this);
    }

    toCelsius() {
        this.setState({
            data: this.props.dataC,
            units: 'm/s'
        });
    }

    toFahrenheit() {
        this.setState({
            data: this.props.data,
            units: 'mph'
        });
    }

    setBackground(value) {
        this.setState({
            background: value
        });
    }

    /**
     * @see [StackOverflow]{@link https://stackoverflow.com/a/13245058}
     */
    getTimeOfDay() {
        var today = new Date();
        var curHr = today.getHours();

        if (curHr < 12) return 'morning';
        else if (curHr < 18) return 'afternoon';
        else return 'evening';
    }

    setStateTime(value) {
        this.setState({
            time: value
        });
    }

    setAppTheme() {}

    handleDegreesChange = event => {
        localStorage.setItem('degrees', event.target.value);
        this.setState({ scale: event.target.value });
        event.target.value === 'C' ? this.toCelsius() : this.toFahrenheit();
    };

    setClouds(bool) {
        Weather(
            bool,
            this.state.thunder,
            this.state.rain,
            this.state.snow,
            this.state.wind
        );
        this.setState({ clouds: bool });
    }

    setFog(bool) {
        this.setState({ fog: bool });
    }

    setThunder(bool) {
        Weather(
            this.state.clouds,
            bool,
            this.state.rain,
            this.state.snow,
            this.state.wind
        );
        this.setState({ thunder: bool });
    }

    setRain(bool) {
        Weather(
            this.state.clouds,
            this.state.thunder,
            bool,
            this.state.snow,
            this.state.wind,
            this.state.snow,
            this.state.wind
        );
        this.setState({ rain: bool });
    }

    setStars(bool) {
        if (bool) Stars(bool);
        else Stars();
        this.setState({ stars: bool ? true : false });
    }

    setSnow(bool) {
        Weather(
            this.state.clouds,
            this.state.thunder,
            this.state.rain,
            bool,
            this.state.wind
        );
        this.setState({ snow: bool });
    }

    setWind(bool) {
        Weather(
            this.state.clouds,
            this.state.thunder,
            this.state.rain,
            this.state.snow,
            bool
        );
        this.setState({ wind: bool });
    }

    /**
     * Applies fake values to this.state to
     * manually control dynamic elements.
     */
    setFauxState = event => {
        event.target.blur();
        switch (event.target.value) {
            case 'morning':
                this.setStateTime('morning');
                this.setBackground('morning');
                break;
            case 'afternoon':
                this.setStateTime('afternoon');
                this.setBackground('default');
                break;
            case 'evening':
                this.setStateTime('evening');
                this.setBackground('night');
                break;
            case 'fog':
                this.state.fog ? this.setFog(false) : this.setFog(true);
                break;
            case 'clouds':
                this.state.clouds
                    ? this.setClouds(false)
                    : this.setClouds(true);
                break;
            case 'rain':
                this.state.rain ? this.setRain(false) : this.setRain(true);
                break;
            case 'thunder':
                this.state.thunder
                    ? this.setThunder(false)
                    : this.setThunder(true);
                break;
            case 'stars':
                this.state.stars ? this.setStars(false) : this.setStars();
                break;
            case 'snow':
                this.state.snow ? this.setSnow(false) : this.setSnow(true);
                break;
            case 'wind':
                this.state.wind ? this.setWind(false) : this.setWind(true);
                break;
            default:
                return;
        }
    };

    componentDidMount() {
        if (!this.props.data && !this.props.dataC) return;
        this.setStateTime(this.getTimeOfDay());
        this.state.scale === 'C' ? this.toCelsius() : this.toFahrenheit();

        if (this.state.clouds) this.setClouds(true);
        if (this.state.fog) this.setFog(true);
        if (this.state.rain) this.setRain(true);
        if (this.state.thunder) this.setThunder(true);
        if (this.state.stars) this.setStars();
        if (this.state.snow) this.setSnow(true);
        if (this.state.wind) this.setWind(true);

        switch (this.getTimeOfDay()) {
            case 'morning':
                this.setBackground('morning');
                break;
            case 'afternoon':
                this.setBackground('default');
                break;
            case 'evening':
                this.setBackground('night');
                break;
            default:
                this.setBackground('default');
                break;
        }
    }

    render() {
        const data = this.state.data;
        const today = _.get(data, 'data', []).slice(0, 1);
        const week = _.get(data, 'data', []).slice(1);

        return (
            <Background className={'background ' + this.state.background}>
                <DebugBar
                    clouds={this.state.clouds}
                    fog={this.state.fog}
                    rain={this.state.rain}
                    time={this.state.time}
                    thunder={this.state.thunder}
                    stars={this.state.stars}
                    snow={this.state.snow}
                    wind={this.state.wind}
                    onSetDebugState={this.setFauxState}
                />
                <div className={'stars ' + this.state.time} />
                <div id="fog" className={this.state.fog ? 'active' : ''} />
                <canvas id="canvas" />
                <canvas id="stars" />
                <Main>
                    <Cloud className={'left ' + this.state.time}>
                        <SVG cacheGetRequests src="media/cloud-01.svg" />
                    </Cloud>
                    <Location>
                        <Info>
                            <AppLocation
                                city={data.city_name}
                                state={data.state_code}
                            />
                            {today.map((data, i) => (
                                <AppToday key={i} day={data.valid_date} />
                            ))}
                        </Info>
                        <Graphic>
                            <TodaysWeatherAndControls>
                                {today.map((data, i) => (
                                    <TodaysWeather
                                        key={i}
                                        day={data.valid_date}
                                        degrees={data.temp}
                                        icon={getIcon(data.weather.code)}
                                        sky={data.weather.description}
                                        time={this.state.time}
                                        wind={data.wind_spd}
                                        units={this.state.units}
                                    />
                                ))}
                                <AppSwitcher
                                    onDegreesChange={this.handleDegreesChange}
                                    selectedValue={this.state.scale}
                                />
                            </TodaysWeatherAndControls>
                            <AppGraphic />
                        </Graphic>
                    </Location>
                    <Week>
                        {week.map((data, i) => (
                            <AppDay
                                key={i}
                                conditions={data.weather.description}
                                day={data.valid_date}
                                degrees={data.temp}
                                icon={getIcon(data.weather.code)}
                                index={i}
                                stagger={0.25}
                                time={this.state.time}
                                tooltip={data.valid_date}
                            />
                        ))}
                    </Week>
                    <Cloud className={'right ' + this.state.time}>
                        <SVG cacheGetRequests src="media/cloud-02.svg" />
                    </Cloud>
                </Main>
            </Background>
        );
    }
}

export default App;
