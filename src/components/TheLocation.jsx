/**
 * @module TheLocation
 * @version 0.1.9
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
    justify-content: center;

    .icon svg {
        width: 1.875em;
        height: 1.465em;
    }

    .icon svg path {
        fill: ${colors.black};
        @media (min-width: ${breakpoints.minrange}px) {
            fill: white;
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
        font-size: 1.875em;
    }
`;

class AppLocation extends React.Component {
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

AppLocation.propTypes = {
    city: PropTypes.string,
    state: PropTypes.string
};

AppLocation.defaultProps = {
    city: 'Unknown',
    state: 'N/A'
};

export default AppLocation;
