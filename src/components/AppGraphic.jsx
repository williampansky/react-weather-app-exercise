/**
 * @module AppGraphic
 * @version 0.1.2
 */

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    width: 100%;
    min-height: 300px;
    max-height: 368px;
    height: 100%;
    background: lightgray;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    overflow: hidden;
`;

const Image = styled.img`
    object-fit: contain;
`;

class AppGraphic extends React.Component {
    render() {
        return (
            <Wrapper>
                <picture>
                    <source
                        type="image/jpeg"
                        srcSet="media/dallas.jpg"
                        media="(min-width: 320px)"
                    />
                    <source
                        type="image/jpeg"
                        srcSet="media/dallas@2x.jpg"
                        media="(min-width: 768px)"
                    />
                    <source
                        type="image/jpeg"
                        srcSet="media/dallas@3x.jpg"
                        media="(min-width: 1024px)"
                    />
                    <Image alt="" src="media/dallas.jpg" />
                </picture>
            </Wrapper>
        );
    }
}

export default AppGraphic;
