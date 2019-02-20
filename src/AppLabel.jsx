import React from 'react';
import styled from 'styled-components';

const Element = styled.label`
    font-weight: ${props => (props.fontWeight ? 'bold' : 'normal')};
    font-size: 1em;
    line-height: 1;
`;

class Label extends React.Component {
    render() {
        return <Element>{this.props.text}</Element>;
    }
}

export default Label;
