/**
 * @module AppToday
 * @version 0.1.8
 * @see [CSSTransition]{@link http://reactcommunity.org/react-transition-group}
 */

import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import AppIcon from '../components/AppIcon';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { breakpoints } from '../static/breakpoints';

const component = {
    margin: '12px'
};

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-bottom: ${component.margin};

    .icon {
        left: -8px;
        position: relative;
        top: 2px;

        svg {
            height: 46px;
            width: 46px;
        }

        &[data-icon='cloud-lightning'] {
            top: 6px;
        }

        &[data-icon='cloud-rain'] {
            top: 4px;
        }
    }

    @media (min-width: 425px) {
        flex-flow: row nowrap;
        left: -4px;
    }

    @media (min-width: ${breakpoints.mindrange}) {
        margin-bottom: 0;
        margin-right: ${component.margin};
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
    left: -2px;
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

class AppToday extends React.Component {
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
            <Wrapper className="today">
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
                <AppIcon className="uk-animation-fade" src={this.props.icon} />
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

export default AppToday;
