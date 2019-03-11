/**
 * Displays a single day of the upcoming 5-day week. It visually shows a user
 * an abbreviated day name, an icon representing the day's projected weather
 * conditions, and the temperature from the api call.
 *
 * @module AppDay
 * @version 0.2.7
 * @see [formatDate]{@link https://date-fns.org/v1.30.1/docs/format}
 * @see [React-Responsive]{@link https://github.com/contra/react-responsive}
 */

import React from 'react';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';
import AppTooltip from '../components/AppTooltip';
import CountUp from 'react-countup';
import { format } from 'date-fns';
import MediaQuery from 'react-responsive';
import { colors, breakpoints, globals } from '../styles/styles';

const component = {
    divSize: 45,
    iconSize: 30
};

const Article = styled.article`
    background: white;
    max-width: 100vw;
    overflow-x: auto;
    position: relative;
    width: 100%;

    & + article {
        border-top: 1px solid ${colors.grayLight};
    }

    @media (min-width: ${breakpoints.minrange}px) {
        overflow-x: visible;
        overflow-y: visible;

        &:first-child {
            border-bottom-left-radius: ${globals.borderRadius}px;
        }

        &:last-child {
            border-bottom-right-radius: ${globals.borderRadius}px;
        }

        & + article {
            border-top: 0;
            border-left: 1px solid ${colors.grayLight};
        }
    }
`;

const Header = styled.header`
    color: ${colors.black};
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0;
    padding: 3.625vh 1.25em;
    text-align: center;

    & > div:first-child {
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        width: ${component.divSize}px;
    }

    & > div:nth-child(2) {
        align-items: flex-start;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        margin: 0 0 0 1.35em;
    }

    .icon {
        width: 100%;
        height: ${component.iconSize}px;

        svg {
            width: inherit;
            height: ${component.iconSize}px;
        }

        svg path {
            fill: ${colors.primary};
        }
    }

    @media (min-width: ${breakpoints.minrange}px) {
        flex-flow: column nowrap;
        justify-content: center;
        padding: 1em 2em;

        .icon {
            width: calc(${component.iconSize}px + 10px);
            height: calc(${component.iconSize}px + 10px);

            svg {
                width: calc(${component.iconSize}px + 10px);
                height: calc(${component.iconSize}px + 10px);
            }
        }
    }

    @media (min-width: ${breakpoints.large}px) {
        padding: 1em 2em;

        .icon {
            width: calc(${component.iconSize}px + 10px);
            height: calc(${component.iconSize}px + 10px);

            svg {
                width: calc(${component.iconSize}px + 10px);
                height: calc(${component.iconSize}px + 10px);
            }
        }
    }
`;

const DateAndConditions = styled.section`
    align-items: stretch;
    display: flex;
    flex-flow: row nowrap;
    line-height: 1;

    & > div:first-child {
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        width: ${component.divSize}px;
    }

    & > div:nth-child(2) {
        align-items: flex-start;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        margin: 0 0 0 1.35em;

        @media (min-width: ${breakpoints.minrange}px) {
            align-items: center;
            margin: 0;
        }
    }

    h1,
    h2 {
        text-transform: none;
        white-space: nowrap;
    }

    @media (min-width: ${breakpoints.minrange}px) {
        align-items: center;
        flex-flow: column-reverse nowrap;
        justify-content: center;
    }
`;

const DateName = styled.h1`
    font-size: 0.875em;
    font-weight: 700;
    margin: 0 0 0.365em;

    @media (min-width: ${breakpoints.minrange}px) {
        font-size: 1em;
        left: -2px;
        margin: 0 0 0.465em;
        position: relative;
    }
`;

const Conditions = styled.h2`
    font-size: 1em;
    font-weight: 400;
    margin: 0;
`;

const Degrees = styled.section`
    line-height: 1;
    min-width: 42px;
    text-align: right;

    @media (min-width: ${breakpoints.minrange}px) {
        text-align: center;
        margin: 0.465em 0 0;
    }
`;

const TempHigh = styled.div`
    font-size: 1em;
    font-weight: 700;

    @media (min-width: ${breakpoints.minrange}px) {
        font-size: 1.625em;
        font-weight: 400;
        position: relative;
        left: 1px;
    }
`;

const TempLow = styled.div`
    font-size: 0.875em;
    font-weight: 400;
    margin: 4px 0 0;
`;

const Footer = styled.footer`
    --icon-color-high: ${colors.danger};
    --icon-color-low: ${colors.secondary};
    align-items: center;
    background: ${colors.whiteSlt};
    display: grid;
    flex: 1;
    grid-area: info;
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-columns: repeat(3, 1fr);
    height: 0;
    overflow: hidden;
    padding: 0 1.25em;
    position: relative;
    transition: height, padding 150ms ease-in-out;
    width: 100%;
    z-index: 1;

    & > div {
        transition: transform 150ms ease-in-out;
        transform: translateY(200%);
    }
`;

const Item = styled.div`
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    text-align: center;

    .icon,
    .icon svg {
        height: 20px;
        width: auto;
    }
`;

const Label = styled.h3`
    font-size: 0.525em;
    font-weight: 700;
    letter-spacing: 0.03em;
    margin: 0;
    text-transform: uppercase;
`;

const Display = styled.h3`
    font-size: 1.25em;
    font-weight: 300;
    line-height: 1.1;
    margin: 0;
`;

class AppDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            in: false,
            open: false,
            previousHigh: null,
            previousLow: null,
            units: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.high !== this.props.high)
            this.setState({ previousHigh: prevProps.high });
        if (prevProps.low !== this.props.low)
            this.setState({ previousLow: prevProps.low });
    }

    render() {
        const open = this.state.open ? 'open' : undefined;
        const hovering = this.state.hovering ? 'hovering' : undefined;
        const handleMouseEnter = () => this.setState({ hovering: true });
        const handleMouseLeave = () => this.setState({ hovering: false });
        const handleToggle = () => {
            if (!this.state.open) this.setState({ open: true });
            else this.setState({ open: false });
        };

        return (
            <Article
                className={[open, hovering]}
                onClick={handleToggle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <MediaQuery minWidth={breakpoints.minrange}>
                    <AppTooltip
                        conditions={this.props.conditions}
                        high={Math.round(this.props.high)}
                        low={Math.round(this.props.low)}
                    />
                </MediaQuery>
                <Header
                    className="uk-animation-fade"
                    style={{
                        animationDelay:
                            this.props.stagger * 800 +
                            this.props.index * 100 +
                            'ms'
                    }}>
                    <DateAndConditions>
                        <div>
                            <AppIcon src={this.props.icon} />
                        </div>
                        <div>
                            <DateName>
                                <MediaQuery minWidth={breakpoints.minrange}>
                                    {matches => {
                                        if (matches) {
                                            return (
                                                <time>
                                                    {format(
                                                        this.props.data
                                                            .valid_date,
                                                        'ddd'
                                                    )}
                                                </time>
                                            );
                                        } else {
                                            return (
                                                <time>
                                                    {format(
                                                        this.props.data
                                                            .valid_date,
                                                        'dddd, MMM D, YYYY'
                                                    )}
                                                </time>
                                            );
                                        }
                                    }}
                                </MediaQuery>
                            </DateName>
                            <MediaQuery maxWidth={breakpoints.maxrange}>
                                <Conditions>{this.props.conditions}</Conditions>
                            </MediaQuery>
                        </div>
                    </DateAndConditions>

                    <Degrees>
                        <TempHigh>
                            <CountUp
                                start={Math.round(
                                    this.state.previousHigh
                                        ? this.state.previousHigh
                                        : this.props.high
                                )}
                                end={Math.round(this.props.high)}
                                duration={
                                    this.props.stagger + this.props.index / 5
                                }
                                delay={0}
                                useEasing={false}
                            />
                            °
                        </TempHigh>
                        <MediaQuery maxWidth={breakpoints.maxrange}>
                            <TempLow>
                                <CountUp
                                    start={Math.round(
                                        this.state.previousLow
                                            ? this.state.previousLow
                                            : this.props.low
                                    )}
                                    end={Math.round(this.props.low)}
                                    duration={
                                        this.props.stagger +
                                        this.props.index / 5
                                    }
                                    delay={0}
                                    useEasing={false}
                                />
                                °
                            </TempLow>
                        </MediaQuery>
                    </Degrees>
                </Header>

                <MediaQuery maxWidth={breakpoints.maxrange}>
                    <Footer className="accordion-content">
                        <Item>
                            <Label>Cloud Coverage</Label>
                            <Display>{this.props.data.clouds}%</Display>
                        </Item>
                        <Item>
                            <Label>Precipitation</Label>
                            <Display>{this.props.data.pop}%</Display>
                        </Item>
                        <Item>
                            <Label>Humidity</Label>
                            <Display>{this.props.data.rh}%</Display>
                        </Item>
                    </Footer>
                </MediaQuery>
            </Article>
        );
    }
}

export default AppDay;
