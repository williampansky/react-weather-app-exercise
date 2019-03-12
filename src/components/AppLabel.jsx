/**
 * @module AppLabel
 * @version 0.1.2
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Element = styled.label`
    font-weight: ${props => (props.fontWeight ? 'bold' : 'normal')};
    font-size: 1em;
    line-height: 1;
`;

class AppLabel extends React.Component {
    render() {
        return <Element>{this.props.text}</Element>;
    }
}

AppLabel.propTypes = {
    text: PropTypes.string
};

AppLabel.defaultProps = {
    text: 'Unknown'
};

export default AppLabel;
