/**
 * @module AppToday
 * @version 0.1.3
 * @see [formatDate]{@link https://date-fns.org/v1.30.1/docs/format}
 */

import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Wrapper = styled.div``;

const Date = styled.time`
    display: block;
    font-size: 1em;
    font-weight: normal;
    line-height: 1;
    margin: 0;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
`;

class AppToday extends React.Component {
    render() {
        return (
            <Wrapper>
                <Date>{format(this.props.day, 'dddd, MMM D, YYYY')}</Date>
            </Wrapper>
        );
    }
}

export default AppToday;
