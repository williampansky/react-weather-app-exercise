import React from 'react';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const component = {
    margin: '12px'
};

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
`;

const Degrees = styled.div`
    display: block;
    font-size: 48px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    margin-right: ${component.margin};
    line-height: 1;
`;

const DegreesIcon = styled.sup`
    font-size: 0.675em;
    position: relative;
    top: 10px;
`;

const Conditions = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    margin-left: ${component.margin};
    font-size: 14px;
`;

const SkyConditions = styled.span`
    display: block;
    font-size: 1em;
    line-height: 1.5;
`;

const WindConditions = styled.span`
    display: block;
    font-size: 1em;
    line-height: 1;
`;

class TodaysWeather extends React.Component {
    render() {
        return (
            <Wrapper>
                <Degrees>
                    {this.props.degrees}
                    <DegreesIcon>°</DegreesIcon>
                </Degrees>
                <AppIcon />
                <Conditions>
                    <SkyConditions>{this.props.sky}</SkyConditions>
                    <WindConditions>{this.props.wind}mph</WindConditions>
                </Conditions>
            </Wrapper>
        );
    }
}

export default TodaysWeather;
