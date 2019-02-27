/**
 * @module AppLocation
 * @version 0.1.8
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    .icon {
        display: none;
        svg {
            width: 1.875em;
            height: 1.465em;
        }
    }

    @media (min-width: 425px) {
        .icon {
            display: block;
        }
    }
`;

const CityState = styled.h1`
    font-size: 1.275em;
    font-weight: 600;
    line-height: 1;
    margin: 0 0.35em 0.25em 0.15em;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);

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
