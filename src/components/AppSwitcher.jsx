/**
 * @module AppSwitcher
 * @version 0.2.3
 */

import React from 'react';
import styled from 'styled-components';

const SwitcherForm = styled.form`
    width: 55px;
    height: 25px;
    border-radius: 12.5px;
    padding: 0 2px;
    background-color: #2685bd;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const Item = styled.div`
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    width: 21px;
    height: 21px;
    padding: 0;
    color: ${props => (props.selectedValue ? '#2685bd' : '#fff')};
    background: ${props => (props.selectedValue ? '#2685bd' : 'transparent')};
    border-radius: 50%;
    border: 0;

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

    & label {
        cursor: pointer;
        padding: 4px 8px;
        position: relative;
        left: -1px;
    }

    & input {
        display: none;
        appearance: none;
    }

    & input:focus {
        outline: 1px solid;
    }

    &.active {
        color: #2685bd;
        background-color: #fff;
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
    state = {
        selectedValue: 'F'
    };

    handleChange = event => {
        this.setState({
            ...this.state,
            selectedValue: event.target.value
        });
    };

    change(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <SwitcherForm>
                <Item
                    className={
                        this.state.selectedValue === 'C' ? 'active' : ''
                    }>
                    <label>
                        <input
                            type="radio"
                            name="radio"
                            value="C"
                            tabIndex="0"
                            onChange={this.handleChange}
                        />
                        C
                    </label>
                </Item>
                <Item
                    className={
                        this.state.selectedValue === 'F' ? 'active' : ''
                    }>
                    <label>
                        <input
                            type="radio"
                            name="radio"
                            value="F"
                            tabIndex="0"
                            defaultChecked
                            onChange={this.handleChange}
                        />
                        F
                    </label>
                </Item>
            </SwitcherForm>
        );
    }
}

export default AppSwitcher;
