import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const CityState = styled.h1`
    margin: 0 0 0.25em;
    font-size: 1.875em;
    line-height: 1;
    font-weight: 600;
`;

class Location extends React.Component {
    render() {
        return (
            <Wrapper>
                <CityState>{this.props.location}</CityState>
            </Wrapper>
        );
    }
}

export default Location;
