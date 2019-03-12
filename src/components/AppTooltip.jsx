/**
 * @module AppTooltip
 * @version 0.1.7
 * @since 0.1.3 - Can use single props.text or multi line props
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const Wrapper = styled.div`
    background: #666;
    border-radius: 1.5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    color: #fff;
    display: none;
    font-family: 'Verdana', sans-serif;
    font-size: 12px;
    letter-spacing: 0.0425em;
    max-width: 200px;
    padding: 3px 6px;
    pointer-events: none;
    position: absolute;
    text-align: center;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
    top: -30px;
    transform-origin: 50% 100%;
    width: 100%;
    z-index: 1030;

    .icon[data-icon='triangle-up'],
    .icon[data-icon='triangle-up'] svg,
    .icon[data-icon='triangle-down'],
    .icon[data-icon='triangle-down'] svg {
        --tooltip-icon-size: 14px;
        width: var(--tooltip-icon-size);
        height: var(--tooltip-icon-size);
        fill: white;
    }
`;

const HighLow = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    [class*='uk-animation-'] {
        animation-duration: 300ms;
    }
`;

const High = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &:after {
        content: '/';
        margin: 0 4px;
    }
`;

const Low = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

class AppTooltip extends React.Component {
    render() {
        return (
            <Wrapper className="tooltip">
                <div>{this.props.conditions}</div>
                <HighLow>
                    <High className="uk-animation-slide-bottom-small">
                        <AppIcon src="triangle-up" />
                        {this.props.high}
                    </High>
                    <Low className="uk-animation-slide-top-small">
                        {this.props.low}
                        <AppIcon src="triangle-down" />
                    </Low>
                </HighLow>
            </Wrapper>
        );
    }
}

AppTooltip.propTypes = {
    conditions: PropTypes.string,
    high: PropTypes.number,
    low: PropTypes.number
};

AppTooltip.defaultProps = {
    conditions: 'Unknown',
    high: 0,
    low: 0
};

export default AppTooltip;
