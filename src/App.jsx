/**
 * @namespace App
 * @version 0.1.7
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
import TodaysWeather from './components/TodaysWeather';
import { getIcon } from './utils/getIcon';

const Main = styled.main`
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 92%;
    justify-content: center;
    margin: auto;
    max-width: 670px;
    width: 96%;

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

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            scale: localStorage.getItem('degrees'),
            units: ''
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

    handleDegreesChange = event => {
        localStorage.setItem('degrees', event.target.value);
        this.setState({ scale: event.target.value });
        event.target.value === 'C' ? this.toCelsius() : this.toFahrenheit();
    };

    componentDidMount() {
        if (!this.props.data && !this.props.dataC) return;
        this.state.scale === 'C' ? this.toCelsius() : this.toFahrenheit();
    }

    render() {
        const data = this.state.data;
        const today = _.get(data, 'data', []).slice(0, 1);
        const week = _.get(data, 'data', []).slice(1);

        return (
            <Main>
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
                            day={data.valid_date}
                            degrees={data.temp}
                            icon={getIcon(data.weather.code)}
                            tooltip={data.valid_date}
                        />
                    ))}
                </Week>
            </Main>
        );
    }
}

export default App;

// <Graphic>
//         <TodaysWeatherAndControls>
//             <TodaysWeather
//                 degrees={this.props.api.today.temp}
//                 sky={this.props.today.api.conditions}
//                 wind={this.props.today.wind}
//                 icon={getIcon(this.props.today.code)}
//             />
//             <AppSwitcher
//                 selectedValue={this.props.degreesType}
//                 onDegreesChange={this.props.onDegreesChange}
//             />
//         </TodaysWeatherAndControls>
//         <AppGraphic />
//     </Graphic>
// </Location>
// <Week>
//     <AppDay
//         day={this.props.tomorrow.date}
//         degrees={this.props.tomorrow.temp}
//         icon={getIcon(this.props.tomorrow.code)}
//         tooltip={this.props.tomorrow.date}
//     />
//     <AppDay
//         day={this.props.overmorrow.date}
//         degrees={this.props.overmorrow.temp}
//         icon={getIcon(this.props.overmorrow.code)}
//         tooltip={this.props.overmorrow.date}
//     />
//     <AppDay
//         day={this.props.humpday.date}
//         degrees={this.props.humpday.temp}
//         icon={getIcon(this.props.humpday.code)}
//         tooltip={this.props.humpday.date}
//     />
//     <AppDay
//         day={this.props.secondToLast.date}
//         degrees={this.props.secondToLast.temp}
//         icon={getIcon(this.props.secondToLast.code)}
//         tooltip={this.props.secondToLast.date}
//     />
//     <AppDay
//         day={this.props.theLastDay.date}
//         degrees={this.props.theLastDay.temp}
//         icon={getIcon(this.props.theLastDay.code)}
//         tooltip={this.props.theLastDay.date}
//     />
// </Week>
