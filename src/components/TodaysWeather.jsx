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

    & .icon {
        position: relative;
        top: 5px;
        left: -4px;
    }

    & .icon svg {
        width: 46px;
        height: 46px;
    }
`;

const Degrees = styled.div`
    color: var(--color-primary);
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
    top: 8px;
`;

const Conditions = styled.div`
    color: var(--color-primary);
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    margin-left: calc(${component.margin} - 4px);
    font-size: 14px;
    font-weight: 600;
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

class TodaysWeatherConditions extends React.Component {
    render() {
        return (
            <Wrapper>
                <Degrees>
                    {this.props.degrees}
                    <DegreesIcon>°</DegreesIcon>
                </Degrees>
                <AppIcon src={'media/' + this.props.icon + '.svg'} />
                <Conditions>
                    <SkyConditions>{this.props.sky}</SkyConditions>
                    <WindConditions>{this.props.wind}mph</WindConditions>
                </Conditions>
            </Wrapper>
        );
    }
}

export default TodaysWeatherConditions;
