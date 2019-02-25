/**
 * @module AppIcon
 * @version 0.1.3
 * @see [react-inlinesvg]{@link https://github.com/gilbarbara/react-inlinesvg}
 */

import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import LoaderIcon from '../components/LoaderIcon';

const Icon = styled.i`
    span {
        display: block;
        width: inherit;
        height: inherit;
    }
`;

class AppIcon extends React.Component {
    myOnLoadHandler() {}
    render() {
        return (
            <Icon className="icon">
                <SVG
                    cacheGetRequests
                    preloader={<LoaderIcon />}
                    onLoad={src => {
                        this.myOnLoadHandler(this.props.src);
                    }}
                    src={this.props.src}
                />
            </Icon>
        );
    }
}

export default AppIcon;
