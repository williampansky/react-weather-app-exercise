import React from 'react';
import styled from 'styled-components';

const Article = styled.article`
    background: white;
    color: black;
    margin: 0;
    padding: 1em 2.5em;
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
`;

const Header = styled.header`
    font-size: 1em;
    line-height: 1;
    margin-bottom: 0.625em;
    font-weight: 700;
    text-transform: capitalize;
`;

const Icon = styled.div`
    width: 60px;
    height: 60px;
    background: gray;
`;

const Footer = styled.footer`
    font-size: 1.5em;
    line-height: 1;
    font-weight: 300;
    margin-top: 0.425em;
`;

// const DayOfWeek = props => <div>{props.day}</div>;

class Day extends React.Component {
    render() {
        return (
            <Article>
                <Header>{this.props.day}</Header>
                <Icon />
                <Footer>{this.props.temperature}</Footer>
            </Article>
        );
    }
}

export default Day;
