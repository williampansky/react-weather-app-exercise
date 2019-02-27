/**
 * Displays a single day of the upcoming 5-day week. It visually shows a user
 * an abbreviated day name, an icon representing the day's projected weather
 * conditions, and the temperature from the api call.
 *
 * @module AppDay
 * @version 0.1.8
 * @see [formatDate]{@link https://date-fns.org/v1.30.1/docs/format}
 */

import React from 'react';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';
import AppTooltip from '../components/AppTooltip';
import { timeOfDayIcon } from '../utils/timeOfDayIcon';
import CountUp from 'react-countup';
import { format } from 'date-fns';

const Article = styled.article`
    background: white;
    color: var(--color-black);
    margin: 0;
    padding: 0.25em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    position: relative;

    & + article {
        border-top: 1px solid #d8d8d8;
    }

    &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .icon {
        --icon-size: 30px;
        display: none;
        width: var(--icon-size);
        height: var(--icon-size);

        svg {
            width: var(--icon-size);
            height: var(--icon-size);
        }
    }

    @media (min-width: 320px) {
        flex-flow: column nowrap;
        justify-content: center;
        padding: 0.5em 1em;

        &:first-child {
            border-bottom-left-radius: 3px;
        }

        &:last-child {
            border-bottom-left-radius: 0;
        }

        .icon {
            display: block;
        }

        & + article {
            border-top: 0;
            border-left: 1px solid #d8d8d8;
        }
    }

    @media (min-width: 1024px) {
        padding: 1em 2em;

        .icon {
            width: calc(var(--icon-size) + 10px);
            height: calc(var(--icon-size) + 10px);

            svg {
                width: calc(var(--icon-size) + 10px);
                height: calc(var(--icon-size) + 10px);
            }
        }
    }
`;

const Header = styled.header`
    font-size: 0.625em;
    line-height: 1;
    font-weight: 700;
    text-transform: capitalize;

    @media (min-width: 320px) {
        font-size: 0.875em;
        margin-bottom: 0.25em;
    }

    @media (min-width: 1024px) {
        font-size: 1em;
        margin-bottom: 0.625em;
    }
`;

const Footer = styled.footer`
    font-size: 0.875em;
    line-height: 1;
    font-weight: 400;
    position: relative;
    left: 1px;

    @media (min-width: 320px) {
        font-size: 1.25em;
        margin-top: 0.25em;
    }

    @media (min-width: 1024px) {
        font-size: 1.625em;
        margin-top: 0.425em;
    }
`;

class AppDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            in: false,
            units: '',
            previousDegrees: null
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.degrees !== this.props.degrees)
            this.setState({ previousDegrees: prevProps.degrees });
    }

    render() {
        const active = this.state.hovering ? 'active' : undefined;
        const handleMouseEnter = () => this.setState({ hovering: true });
        const handleMouseLeave = () => this.setState({ hovering: false });

        return (
            <Article
                className={active}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <AppTooltip
                    conditions={this.props.conditions}
                    date={format(this.props.day, 'DD/MM/YYYY')}
                />
                <Header>{format(this.props.day, 'ddd')}</Header>
                <AppIcon
                    src={timeOfDayIcon(this.props.icon, this.props.time)}
                />
                <Footer>
                    <CountUp
                        start={Math.round(
                            this.state.previousDegrees
                                ? this.state.previousDegrees
                                : this.props.degrees
                        )}
                        end={Math.round(this.props.degrees)}
                        duration={this.props.stagger + this.props.index / 5}
                        delay={0}
                        useEasing={false}
                    />
                    °
                </Footer>
            </Article>
        );
    }
}

export default AppDay;
