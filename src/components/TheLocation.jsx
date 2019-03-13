/**
 * @module TheLocation
 * @version 0.2.1
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';
import { colors, breakpoints } from '../styles/styles';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    font-size: 18px;
    justify-content: center;

    .icon {
        margin-right: 6px;

        svg {
            width: 1em;
            height: 1.22em;

            @media (min-width: ${breakpoints.minrange}px) {
                width: 0.667em;
                height: 0.85em;
            }
        }

        svg path {
            fill: ${colors.black};

            @media (min-width: ${breakpoints.minrange}px) {
                fill: white;
            }
        }
    }
`;

const CityState = styled.h1`
    color: inherit;
    font-size: 1.275em;
    font-weight: 600;
    line-height: 1;
    margin: 0 0.35em 0.25em 0.15em;

    @media (min-width: 425px) {
        font-size: 1em;
    }
`;

class TheLocation extends React.Component {
    render() {
        return (
            <Wrapper>
                <AppIcon src="location" />
                <CityState>
                    {this.props.city ? this.props.city : 'Unknown'},{' '}
                    {this.props.state ? this.props.state : 'N/A'}
                </CityState>
            </Wrapper>
        );
    }
}

TheLocation.propTypes = {
    city: PropTypes.string,
    state: PropTypes.string
};

TheLocation.defaultProps = {
    city: 'Unknown',
    state: 'N/A'
};

export default TheLocation;
