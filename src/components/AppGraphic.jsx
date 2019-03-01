/**
 * @module AppGraphic
 * @version 0.1.3
 */

import React from 'react';
import styled from 'styled-components';

const maxWidth = '670px';

const Wrapper = styled.section`
    width: 100%;
    min-height: 300px;
    height: 100%;
    overflow: hidden;

    @media (min-width: ${maxWidth}) {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        max-height: 368px;
    }
`;

const Image = styled.img`
    object-fit: cover;
    width: 200vw;
    height: auto;
    vertical-align: bottom;
    transform: translateX(-50vw);

    @media (min-width: ${maxWidth}) {
        object-fit: contain;
    }
`;

class AppGraphic extends React.Component {
    render() {
        return (
            <Wrapper>
                <picture>
                    <source
                    // type="image/jpeg"
                    // srcSet="media/dallas.jpg"
                    // media="(min-width: 320px)"
                    />
                    <source
                    // type="image/jpeg"
                    // srcSet="media/dallas@2x.jpg"
                    // media="(min-width: 768px)"
                    />
                    <source
                    // type="image/jpeg"
                    // srcSet="media/dallas@3x.jpg"
                    // media="(min-width: 1024px)"
                    />
                    <Image alt="" src="media/dallas@3x.jpg" />
                </picture>
            </Wrapper>
        );
    }
}

export default AppGraphic;
