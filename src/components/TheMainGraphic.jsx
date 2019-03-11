/**
 * @module TheMainGraphic
 * @version 0.1.8
 */

import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, globals } from '../styles/styles';

const Wrapper = styled.section`
    height: 100%;
    overflow: hidden;
    width: 100%;
    display: none;
    background-color: ${colors.graphicBg};
    width: ${breakpoints.minrange}px;
    height: 368px;

    @media (min-height: 560px) {
        display: block;
    }

    @media (min-width: ${breakpoints.minrange}px) {
        border-top-left-radius: ${globals.borderRadius}px;
        border-top-right-radius: ${globals.borderRadius}px;
        max-height: 368px;
        min-height: 300px;
    }
`;

const Image = styled.img`
    height: auto;
    object-fit: cover;
    transform: translateX(-50vw);
    vertical-align: bottom;
    width: 200vw;
    transition: transform, width 300ms ease-in-out;

    @media (min-width: 400px) {
        transform: translateX(-40vw);
        width: 170vw;
    }

    @media (min-width: 500px) {
        transform: translateX(-20vw);
        width: 145vw;
    }

    @media (min-width: ${breakpoints.minrange}px) {
        object-fit: contain;
        transform: translateX(0);
        width: 100%;
    }
`;

class AppGraphic extends React.Component {
    render() {
        return (
            <Wrapper className="uk-animation-fade">
                <picture>
                    <source
                        type="image/jpeg"
                        srcSet="media/dallas@3x.jpg"
                        media="(min-width: 670px)"
                    />
                    <source
                        type="image/jpeg"
                        srcSet="media/dallas@2x.jpg"
                        media="(min-width: 411px)"
                    />
                    <Image alt="" src="media/dallas.jpg" />
                </picture>
            </Wrapper>
        );
    }
}

export default AppGraphic;
