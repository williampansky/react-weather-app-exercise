/**
 * @module AppSwitcher
 * @version 0.2.9
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const maxWidth = '670px';

const SwitcherForm = styled.form`
    align-items: center;
    background-color: #2685bd;
    border-radius: 12.5px;
    display: flex;
    flex-flow: row nowrap;
    height: 25px;
    justify-content: space-between;
    padding: 0 2px;
    width: 55px;

    @media (max-height: 560px) and (max-width: ${maxWidth}) {
        display: none;
    }
`;

const Item = styled.div`
    align-items: center;
    background: ${props => (props.selectedValue ? '#2685bd' : 'transparent')};
    border-radius: 50%;
    border: 0;
    color: ${props => (props.selectedValue ? '#2685bd' : '#fff')};
    display: flex;
    flex-flow: column nowrap;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 600;
    height: 21px;
    justify-content: center;
    letter-spacing: normal;
    line-height: normal;
    padding: 0;
    position: relative;
    text-align: center;
    width: 21px;

    & label {
        cursor: pointer;
        left: -1px;
        padding: 4px 8px;
        position: relative;
    }

    & input {
        appearance: none;
        display: none;
    }

    & input:focus {
        outline: 1px solid;
    }

    &.active {
        background-color: #fff;
        color: #2685bd;
    }

    &:before {
        content: '°';
        font-size: 0.675em;
        position: absolute;
        right: 4px;
        top: 0;
    }
`;

class AppSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValue: this.props.selectedValue
        };

        this.setCel = this.setCel.bind(this);
        this.setFar = this.setFar.bind(this);
    }

    setCel() {
        this.setState({
            selectedValue: 'C'
        });
    }

    setFar() {
        this.setState({
            selectedValue: 'F'
        });
    }

    componentDidMount() {
        if (!this.props.selectedValue) this.setFar();
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
                            onChange={this.props.onDegreesChange}
                            onClick={this.setCel}
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
                            onChange={this.props.onDegreesChange}
                            onClick={this.setFar}
                        />
                        F
                    </label>
                </Item>
            </SwitcherForm>
        );
    }
}

AppSwitcher.propTypes = {
    active: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onDegreesChange: PropTypes.func,
    selectedValue: PropTypes.string
};

export default AppSwitcher;
