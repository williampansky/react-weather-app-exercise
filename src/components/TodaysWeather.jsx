/**
 * @module TodaysWeather
 * @version 0.1.4
 */

import React from 'react';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const component = {
    margin: '12px'
};

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-right: ${component.margin};

    .icon {
        display: none;

        svg {
            height: 46px;
            width: 46px;
        }
    }

    @media (min-width: 320px) {
        .icon {
            display: block;
            left: -8px;
            position: relative;
            top: 5px;
        }
    }

    @media (min-width: 425px) {
        flex-flow: row nowrap;
        left: -4px;
    }
`;

const Degrees = styled.div`
    color: var(--color-primary);
    display: block;
    font-size: 48px;
    font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    line-height: 1;
    line-height: normal;
    margin-right: ${component.margin};
    text-align: center;
`;

const DegreesIcon = styled.sup`
    font-size: 0.675em;
    position: relative;
    top: 8px;
`;

const Conditions = styled.div`
    align-items: flex-start;
    color: var(--color-primary);
    display: flex;
    flex-flow: column nowrap;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;

    @media (min-width: 425px) {
        margin-left: calc(${component.margin} - 4px);
    }
`;

const SkyConditions = styled.span`
    display: block;
    font-size: 1em;
    line-height: 1.5;
    text-transform: capitalize;
`;

const WindConditions = styled.span`
    display: block;
    font-size: 1em;
    line-height: 1;
`;

class TodaysWeatherConditions extends React.Component {
    componentDidMount() {
        // console.log(this.props.data);
    }

    render() {
        return (
            <Wrapper>
                <Degrees>
                    {Math.round(this.props.degrees)}
                    <DegreesIcon>°</DegreesIcon>
                </Degrees>
                <AppIcon src={'media/' + this.props.icon + '.svg'} />
                <Conditions>
                    <SkyConditions>{this.props.sky}</SkyConditions>
                    <WindConditions>
                        {Math.round(this.props.wind)} mph
                    </WindConditions>
                </Conditions>
            </Wrapper>
        );
    }
}

export default TodaysWeatherConditions;
