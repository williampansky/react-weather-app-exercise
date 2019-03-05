/**
 * @namespace App
 * @version 0.3.8
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
import MediaQuery from 'react-responsive';
import SVG from 'react-inlinesvg';
import { format } from 'date-fns';
import { getIcon } from './utils/getIcon';
import { breakpoints } from './static/breakpoints';

/**
 * Uses html.perspective CSS property, which is set to 100vh, to determine
 * a mobile browser's address bar height; such as Android Chrome's URL bar.
 *
 * @member addressBarSize
 * @memberof App
 * @type {Number}
 *
 * @see [StackOverflow]{@link https://stackoverflow.com/a/54796813}
 */
const addressBarSize =
    parseFloat(getComputedStyle(document.documentElement).perspective) -
    document.documentElement.clientHeight;

/**
 * Styled component background wrapper our entire app.
 * @member Background
 * @memberof App
 * @type {styled}
 */
const Background = styled.div`
    height: fit-content;
    overflow-x: hidden;
    transition: all 200ms ease-in-out;
    width: 100%;

    @media (min-width: ${breakpoints.minrange}px) {
        height: 100vh;
    }

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

/**
 * Styled component wrapper our entire <main /> app elem.
 * @member Main
 * @memberof App
 * @type {styled}
 */
const Main = styled.main`
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    margin: auto;
    max-width: ${breakpoints.minrange}px;
    position: relative;
    width: 100%;
    z-index: 1;

    @media (min-width: ${breakpoints.minrange}px) {
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        height: 92%;
        justify-content: center;
        width: 100%;
    }
`;

/**
 * Styled component wrapper for our single AppDay components.
 * @member Week
 * @memberof App
 * @type {styled}
 */
const Week = styled.section`
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    display: grid;
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;

    @media (min-width: ${breakpoints.minrange}px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;

/**
 * Styled component wrapper our entire today view;
 * contains the location name, the date string,
 * the weather display, the app switcher,
 * and image graphic.
 *
 * @member Location
 * @memberof App
 * @type {styled}
 */
const Location = styled.article`
    width: 100%;

    @media (max-width: ${breakpoints.maxrange}px) {
        height: calc(90vh - ${addressBarSize}px);
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    }

    @media (max-height: 500px) and (max-width: ${breakpoints.maxrange}px) {
        flex-flow: row nowrap;
    }
`;

/**
 * Styled component wrapper for our top-centered location and date.
 * @member Info
 * @memberof App
 * @type {styled}
 */
const Info = styled.header`
    color: var(--color-black);
    margin: 20px auto 0;
    padding: 1em;
    text-align: center;
    width: 100%;

    @media (min-width: ${breakpoints.minrange}px) {
        color: white;
        margin: 0 auto 20px;
        text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
    }
`;

/**
 * Styled component wrapper for our top-centered date string;
 * e.g: Tuesday, Mar 5, 2019
 *
 * @member DateToday
 * @memberof App
 * @type {styled}
 */
const DateToday = styled.time`
    color: inherit;
    display: block;
    font-size: 1em;
    font-weight: normal;
    line-height: 1;
    margin: 0;
`;

/**
 * Styled component wrapper for the weather display and
 * switcher component that sits at the top of our graphic.
 *
 * @member TodaysWeatherAndControls
 * @memberof App
 * @type {styled}
 */
const TodaysWeatherAndControls = styled.div`
    align-items: center;
    bottom: auto;
    display: flex;
    flex-flow: column nowrap;
    left: 0;
    padding: 1em 1.5em;
    /position: absolute;
    right: 0;
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

    @media (min-width: ${breakpoints.minrange}px) {
        align-items: flex-start;
        flex-flow: row nowrap;
        justify-content: space-between;
        position: absolute;

        form {
            margin: auto 0;
        }
    }

    @media (max-height: 600px) {
        position: relative;
    }

    @media (max-height: 600px) and (min-width: ${breakpoints.minrange}px) {
        background: var(--color-graphic-bg);
        position: relative;
    }
`;

/**
 * Styled component wrapper for our main Dallas image.
 *
 * @member Graphic
 * @memberof App
 * @type {styled}
 */
const Graphic = styled.footer`
    position: relative;
    width: 100%;

    picture {
        display: none;
        @media (min-height: 560px) {
            display: block;
        }
    }

    @media (min-width: ${breakpoints.minrange}px) {
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    }
`;

/**
 * Styled component wrapper for our SVG clouds.
 *
 * @member Cloud
 * @memberof App
 * @type {styled}
 */
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
        display: none;
    }

    @media (min-width: 1024px) {
        display: block;
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
            fog: false,
            background: '',
            data: '',
            scale: localStorage.getItem('degrees'),
            time: '',
            units: ''
        };

        this.setCelsius = this.setCelsius.bind(this);
        this.setFahrenheit = this.setFahrenheit.bind(this);
        this.handleDegreesChange = this.handleDegreesChange.bind(this);
    }

    /**
     * Sets the app's units to metric (Celsius).
     * @method setCelsius
     */
    setCelsius() {
        this.setState({
            data: this.props.dataC,
            units: 'm/s'
        });
    }

    /**
     * Sets the app's units to Fahrenheit.
     * @method setFahrenheit
     */
    setFahrenheit() {
        this.setState({
            data: this.props.data,
            units: 'mph'
        });
    }

    /**
     * Takes in a string and sets the background state.
     * @method setBackground
     * @param {String} value
     */
    setBackground(value) {
        this.setState({
            background: value
        });
    }

    /**
     * Takes in a string and sets the time state.
     * @method setStateTime
     * @param {String} value
     */
    setStateTime(value) {
        this.setState({
            time: value
        });
    }

    /**
     * Takes in a boolean and sets the fog state.
     * @method setFog
     * @param {Boolean} bool
     */
    setFog(bool) {
        this.setState({ fog: bool });
    }

    /**
     * Creates a new Date() and returns
     * a colloquial time of day phrase.
     *
     * @method getTimeOfDay
     * @see [StackOverflow]{@link https://stackoverflow.com/a/13245058}
     */
    getTimeOfDay() {
        var today = new Date();
        var currentHour = today.getHours();

        if (currentHour < 4) return 'evening';
        else if (currentHour < 12) return 'morning';
        else if (currentHour < 18) return 'afternoon';
        else return 'evening';
    }

    /**
     * Takes in an event and sets the app's degrees value;
     * such as setting the state to Celsius or Fahrenheit.
     *
     * @method handleDegreesChange
     * @param {Event}
     */
    handleDegreesChange = event => {
        localStorage.setItem('degrees', event.target.value);
        this.setState({ scale: event.target.value });
        event.target.value === 'C' ? this.setCelsius() : this.setFahrenheit();
    };

    /**
     * Takes in a param number and matches it against the internal
     * codes array. If the array includes the param, return true.
     *
     * @method renderFog
     * @param {Number} value
     */
    renderFog(value) {
        const codes = [801, 802, 803, 804];
        if (codes.includes(value)) return true;
    }

    /**
     * Applies fake values to this.state to
     * manually control dynamic elements.
     *
     * @method setFauxState
     * @param {Event}
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
            default:
                return;
        }
    };

    componentDidMount() {
        this.setStateTime(this.getTimeOfDay());
        this.state.scale === 'C' ? this.setCelsius() : this.setFahrenheit();

        if (this.state.fog) this.setFog(true);

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
        if (!this.props.data && !this.props.dataC && !this.props.time)
            return <div />;

        const data = this.state.data;
        const today = _.get(data, 'data', []).slice(0, 1);
        const todaysCode = _.get(data, 'data[0].weather.code', {});
        const week = _.get(data, 'data', []).slice(1);

        return (
            <Background className={'background ' + this.state.background}>
                <DebugBar
                    fog={this.state.fog}
                    time={this.state.time}
                    onSetDebugState={this.setFauxState}
                />
                <MediaQuery minWidth={breakpoints.minrange}>
                    <div className={'stars ' + this.state.time} />
                    <div
                        id="fog"
                        className={
                            this.state.fog || this.renderFog(todaysCode)
                                ? 'active'
                                : ''
                        }
                    />
                </MediaQuery>
                <Main>
                    <MediaQuery minWidth={breakpoints.minrange}>
                        <Cloud className={'left ' + this.state.time}>
                            <SVG cacheGetRequests src="media/cloud-01.svg" />
                        </Cloud>
                    </MediaQuery>
                    <Location>
                        <Info>
                            <AppLocation
                                city={data.city_name}
                                state={data.state_code}
                            />
                            {today.map((data, i) => (
                                <DateToday key={i}>
                                    {format(
                                        data.valid_date,
                                        'dddd, MMM D, YYYY'
                                    )}
                                </DateToday>
                            ))}
                        </Info>
                        <Graphic>
                            <TodaysWeatherAndControls>
                                {today.map((data, i) => (
                                    <AppToday
                                        key={i}
                                        day={data.valid_date}
                                        degrees={data.temp}
                                        icon={getIcon(data.weather.code)}
                                        sky={data.weather.description}
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
                                high={data.max_temp}
                                low={data.min_temp}
                                data={data}
                            />
                        ))}
                    </Week>
                    <MediaQuery minWidth={breakpoints.minrange}>
                        <Cloud className={'right ' + this.state.time}>
                            <SVG cacheGetRequests src="media/cloud-02.svg" />
                        </Cloud>
                    </MediaQuery>
                </Main>
            </Background>
        );
    }
}

export default App;
