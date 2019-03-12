/**
 * @module TheMainGraphic
 * @version 0.1.9
 */

import React from 'react';
import PropTypes from 'prop-types';
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

class TheMainGraphic extends React.Component {
    render() {
        return (
            <Wrapper className="uk-animation-fade">
                <picture>
                    <source
                        type="image/jpeg"
                        srcSet={`media/${this.props.image}@3x.jpg`}
                        media="(min-width: 670px)"
                    />
                    <source
                        type="image/jpeg"
                        srcSet={`media/${this.props.image}@2x.jpg`}
                        media="(min-width: 411px)"
                    />
                    <Image
                        alt={this.props.alt}
                        src={`media/${this.props.image}.jpg`}
                    />
                </picture>
            </Wrapper>
        );
    }
}

TheMainGraphic.propTypes = {
    alt: PropTypes.string,
    image: PropTypes.string
};

TheMainGraphic.defaultProps = {
    alt: 'Vector illustration of the Dallas skyline.',
    image: 'dallas'
};

export default TheMainGraphic;
