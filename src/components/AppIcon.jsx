import React from 'react';
// import styled from 'styled-components';
import SVG from 'react-inlinesvg';

class AppIcon extends React.Component {
    render() {
        return (
            <i>
                <SVG src={this.props.src} className="icon" />
            </i>
        );
    }
}

export default AppIcon;
