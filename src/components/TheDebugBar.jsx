import React from 'react';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const Bar = styled.div`
    align-items: center;
    background: #333;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    height: 20px;
    justify-content: space-between;
    position: fixed;
    width: 100vw;
    transition: transform 600ms cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: translateY(-100%);
    z-index: 100;

    &.open {
        transform: translateY(0);
    }
`;

const FlexItem = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    height: 20px;

    &:first-of-type {
        justify-content: flex-start;
    }

    &:last-of-type {
        justify-content: flex-end;
    }
`;

const Menu = styled.div`
    cursor: pointer;
    display: none;
    height: auto;
    line-height: 1;
    padding: 10px 15px;
    position: absolute;
    right: 0;
    top: 20px;

    svg path {
        fill: #fff;
        opacity: 0.425;
        transition: opacity 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    &:hover svg path,
    &:focus svg path {
        opacity: 0.675;
    }

    &.open svg path {
        opacity: 1;
    }

    @media (min-width: 768px) {
        display: block;
    }
`;

const Button = styled.button`
    appearance: none;
    background: #2685bd;
    border: 0;
    border: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: 'Verdana', sans-serif;
    font-size: 8.875px;
    height: 20px;
    letter-spacing: 0.0875em;
    line-height: 1;
    margin: 0;
    margin: 0;
    overflow: visible;
    padding: 0 10px;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    text-transform: uppercase;
    text-transform: uppercase;
    transition-property: color, background-color, border-color;
    transition: 0.1s ease-in-out;
    vertical-align: middle;

    & + button {
        margin-left: 2px;
    }

    &:hover,
    &:focus {
        background-color: #3d9cd4;
    }

    &.active {
        color: #fff;
        background-color: #28a745;
    }
`;

class DebugBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    toggleBar = () => {
        this.setState({
            open: !this.state.open ? true : false
        });
    };

    render() {
        const times = [
            { name: 'Morning', value: 'morning' },
            { name: 'Afternoon', value: 'afternoon' },
            { name: 'Evening', value: 'evening' }
        ];

        const conditions = [
            { name: 'Clouds', value: 'clouds', enabled: false },
            { name: 'Fog', value: 'fog', enabled: true },
            { name: 'Rain', value: 'rain', enabled: false },
            { name: 'Snow', value: 'snow', enabled: false },
            { name: 'Stars', value: 'stars', enabled: false },
            { name: 'Thunder', value: 'thunder', enabled: true },
            { name: 'Wind', value: 'wind', enabled: false }
        ];

        return (
            <Bar className={this.state.open ? 'open' : ''}>
                <Menu
                    className={this.state.open ? 'open' : ''}
                    onClick={this.toggleBar}>
                    <AppIcon src="umbrella" />
                </Menu>
                <FlexItem>
                    {times.map((item, idx) => (
                        <Button
                            key={idx}
                            value={item.value}
                            type="button"
                            className={
                                this.props.time === item.value ? 'active' : ''
                            }
                            onClick={this.props.onSetDebugState}>
                            {item.name}
                        </Button>
                    ))}
                </FlexItem>
                <FlexItem>
                    <Button
                        value="fog"
                        type="button"
                        className={this.props.fog ? 'active' : ''}
                        onClick={this.props.onSetDebugState}>
                        fog
                    </Button>
                    <Button
                        value="rain"
                        type="button"
                        className={this.props.rain ? 'active' : ''}
                        onClick={this.props.onSetDebugState}>
                        rain
                    </Button>
                    <Button
                        value="thunder"
                        type="button"
                        className={this.props.thunder ? 'active' : ''}
                        onClick={this.props.onSetDebugState}>
                        thunder
                    </Button>
                </FlexItem>
            </Bar>
        );
    }
}

export default DebugBar;
