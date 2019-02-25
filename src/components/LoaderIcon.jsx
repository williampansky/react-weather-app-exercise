/**
 * @module LoaderIcon
 * @version 0.1.1
 * @see [uikit]{@link https://getuikit.com/docs/spinner}
 */

import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
    width: inherit;
    height: inherit;
    animation: uk-spinner-rotate 1.4s linear infinite;

    svg {
        stroke: var(--color-gray);
        width: inherit;
        height: inherit;
    }

    @keyframes uk-spinner-rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(270deg);
        }
    }

    & > * > * {
        stroke-dasharray: 88px;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: uk-spinner-dash 1.4s ease-in-out infinite;
        stroke-width: 1;
        stroke-linecap: round;
    }

    @keyframes uk-spinner-dash {
        0% {
            stroke-dashoffset: 88px;
        }

        50% {
            stroke-dashoffset: 22px;
            transform: rotate(135deg);
        }

        100% {
            stroke-dashoffset: 88px;
            transform: rotate(450deg);
        }
    }
`;

class LoaderIcon extends React.Component {
    render() {
        return (
            <Spinner>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                        fill="none"
                        stroke="inherit"
                        cx="15"
                        cy="15"
                        r="14"
                    />
                </svg>
            </Spinner>
        );
    }
}

export default LoaderIcon;
