/**
 * @module TodaysWeather
 * @version 0.1.6
 */

import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
            top: 2px;
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

const WindConditions = styled.div`
    display: block;
    font-size: 1em;
    line-height: 1;

    .units {
        position: absolute;
        margin-left: 4px;
    }
`;

class TodaysWeatherConditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            in: false,
            units: '',
            previousUnits: null,
            previousWind: null,
            previousDegrees: null
        };
    }

    toggleEnterState = () => {
        this.setState({ in: true });
    };

    toggleUnitState = () => {
        this.setState({ units: this.props.degrees });
    };

    componentDidMount() {
        this.toggleEnterState();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.degrees !== this.props.degrees) {
            this.toggleUnitState();
            this.setState({ previousDegrees: prevProps.degrees });
            this.setState({ previousUnits: prevProps.units });
            this.setState({ previousWind: prevProps.wind });
        }
    }

    render() {
        const uk = {
            slide: 'uk-animation-slide-left-small',
            reverse: 'uk-animation-slide-right-small uk-animation-reverse'
        };

        return (
            <Wrapper>
                <CSSTransition
                    classNames={{
                        enter: 'uk-animation-slide-bottom-small'
                    }}
                    in={this.state.in}
                    timeout={1200}>
                    {state => (
                        <Degrees>
                            <CountUp
                                start={Math.round(
                                    this.state.previousDegrees
                                        ? this.state.previousDegrees
                                        : this.props.degrees
                                )}
                                end={Math.round(this.props.degrees)}
                                duration={0.875}
                                delay={0.125}
                                useEasing={false}
                            />
                            <DegreesIcon>°</DegreesIcon>
                        </Degrees>
                    )}
                </CSSTransition>
                <AppIcon
                    className="uk-animation-fade"
                    src={'media/' + this.props.icon + '.svg'}
                />
                <Conditions>
                    <SkyConditions>{this.props.sky}</SkyConditions>
                    <WindConditions>
                        <CountUp
                            start={Math.round(
                                this.state.previousWind
                                    ? this.state.previousWind
                                    : this.props.wind
                            )}
                            end={Math.round(this.props.wind)}
                            duration={0.875}
                            delay={0.125}
                            useEasing={false}
                        />{' '}
                        <TransitionGroup component="span">
                            <CSSTransition
                                classNames={{
                                    enter: uk.slide,
                                    enterActive: uk.slide,
                                    enterDone: uk.slide,
                                    exit: uk.reverse,
                                    exitActive: uk.reverse,
                                    exitDone: uk.reverse
                                }}
                                in={this.state.in}
                                units={this.state.units}
                                key={this.props.units}
                                timeout={800}>
                                <span className="units">
                                    {this.props.units}
                                </span>
                            </CSSTransition>
                        </TransitionGroup>
                    </WindConditions>
                </Conditions>
            </Wrapper>
        );
    }
}

export default TodaysWeatherConditions;
