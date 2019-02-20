import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Date = styled.time`
    display: block;
    margin: 0;
    font-weight: normal;
    font-size: 1em;
    line-height: 1;
`;

class AppToday extends React.Component {
    render() {
        return (
            <Wrapper>
                <Date>{this.props.day}</Date>
            </Wrapper>
        );
    }
}

export default AppToday;
