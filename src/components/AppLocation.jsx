/**
 * @module AppLocation
 * @version 0.1.7
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    & .icon svg {
        width: 1.875em;
        height: 1.465em;
    }
`;

const CityState = styled.h1`
    margin: 0 0.35em 0.25em 0.15em;
    font-size: 1.875em;
    line-height: 1;
    font-weight: 600;
`;

class AppLocation extends React.Component {
    render() {
        return (
            <Wrapper>
                <AppIcon src="media/location.svg" />
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
