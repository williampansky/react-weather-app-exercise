import React from 'react';
import styled from 'styled-components';
import AppIcon from '../components/AppIcon';

const Article = styled.article`
    background: white;
    color: var(--color-black);
    margin: 0;
    padding: 1em 2em;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    text-align: center;

    & + article {
        border-left: 1px solid #d8d8d8;
    }

    &:first-child {
        border-bottom-left-radius: 3px;
    }

    &:last-child {
        border-bottom-right-radius: 3px;
    }

    & .icon svg {
        width: 45px;
        height: 45px;
    }
`;

const Header = styled.header`
    font-size: 1em;
    line-height: 1;
    margin-bottom: 0.625em;
    font-weight: 700;
    text-transform: capitalize;
`;

const Footer = styled.footer`
    font-size: 1.625em;
    line-height: 1;
    font-weight: 400;
    margin-top: 0.425em;
    position: relative;
    left: 4px;
`;

// const DayOfWeek = props => <div>{props.day}</div>;

class AppDay extends React.Component {
    render() {
        return (
            <Article>
                <Header>{this.props.day}</Header>
                <AppIcon src={'media/' + this.props.icon + '.svg'} />
                <Footer>{this.props.temperature}°</Footer>
            </Article>
        );
    }
}

export default AppDay;
