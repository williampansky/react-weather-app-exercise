import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 55px;
    height: 25px;
    border-radius: 12.5px;
    padding: 0 4px;
    background-color: #2685bd;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const Item = styled.button`
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    width: 21px;
    height: 21px;
    padding: 4px;
    background-color: ${props => (props.active ? '#fff' : 'none')};
    border-radius: 50%;
    border: 0;
    appearance: none;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position: relative;

    & span {
        position: relative;
        left: -1px;
    }

    &:before {
        content: '°';
        position: absolute;
        top: 0;
        right: 4px;
        font-size: 0.675em;
    }
`;

class AppSwitcher extends React.Component {
    render() {
        return (
            <Wrapper>
                <Item>
                    <span>C</span>
                </Item>
                <Item active>
                    <span>F</span>
                </Item>
            </Wrapper>
        );
    }
}

export default AppSwitcher;
