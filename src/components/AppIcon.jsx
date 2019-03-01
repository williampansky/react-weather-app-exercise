/**
 * @module AppIcon
 * @version 0.1.4
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
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    onLoadHandler() {
        this.setState({ loaded: true });
    }
    render() {
        return (
            <Icon className="icon" data-icon={this.props.src}>
                <SVG
                    className={this.state.loaded ? 'uk-animation-fade' : ''}
                    cacheGetRequests
                    preloader={<LoaderIcon />}
                    onLoad={src => {
                        this.onLoadHandler('media/' + this.props.src + '.svg');
                    }}
                    src={'media/' + this.props.src + '.svg'}
                />
            </Icon>
        );
    }
}

export default AppIcon;
