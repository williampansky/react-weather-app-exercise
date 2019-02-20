import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
    width: 60px;
    height: 60px;
    background: gray;
    border-radius: 50%;
`;

class AppIcon extends React.Component {
    render() {
        return <Icon>{this.props.icon}</Icon>;
    }
}

export default AppIcon;
