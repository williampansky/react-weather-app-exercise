import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    width: 100%;
    max-width: 780px;
    min-height: 400px;
    max-height: 430px;
    height: 100%;
    background: gray;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`;

class Graphic extends React.Component {
    render() {
        return <Wrapper />;
    }
}

export default Graphic;
