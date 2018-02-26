// quadplatform.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
class QuadPlatform extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            currentquad: this.props.currentquad,
            split: this.props.split,
        };
        this.positions = null;
        this.dimensions = null;
        this.element = null;
        this.changeCurrentQuad = nextProps => {
            let element = this.element;
            // set top left for animation
            let nextquad = nextProps.currentquad;
            let top = this.element.offsetTop + 'px';
            let left = this.element.offsetLeft + 'px';
            let bottom = 'auto';
            let right = 'auto';
            this.positions = {
                top,
                left,
                right,
                bottom,
            };
            this.forceUpdate(() => {
                setTimeout(() => {
                    // prepare for animation transition
                    this.calculateTransitionPosition(nextquad);
                    this.setState({
                        currentquad: nextquad,
                    }, () => {
                        setTimeout(() => {
                            this.calculatePosition(nextquad);
                            this.setState({
                                currentquad: nextquad,
                            });
                        }, 600);
                    });
                });
            });
        };
        this.calculateTransitionPosition = quadrant => {
            let { split } = this.state;
            let top = null;
            let left = null;
            let right = 'auto';
            let bottom = 'auto';
            switch (quadrant) {
                case 'topleft': {
                    switch (split) {
                        case 'none':
                            top = '0';
                            left = '0';
                            break;
                        case 'horizontal':
                            top = '0';
                            left = '0';
                            break;
                        case 'vertical':
                            top = '0';
                            left = '0';
                            break;
                        case 'matrix':
                            top = '0';
                            left = '0';
                            break;
                    }
                    break;
                }
                case 'topright': {
                    switch (split) {
                        case 'none':
                            top = '0';
                            left = -this.element.parentElement.offsetWidth + 'px';
                            break;
                        case 'horizontal':
                            top = '0';
                            left = '0';
                            break;
                        case 'vertical':
                            top = '0';
                            left = -this.element.parentElement.offsetWidth + 'px';
                            break;
                        case 'matrix':
                            top = '0';
                            left = '0';
                            break;
                    }
                    break;
                }
                case 'bottomleft': {
                    switch (split) {
                        case 'none':
                            top = -this.element.parentElement.offsetHeight + 'px';
                            left = '0';
                            break;
                        case 'horizontal':
                            top = -this.element.parentElement.offsetHeight + 'px';
                            left = '0';
                            break;
                        case 'vertical':
                            top = '0';
                            left = '0';
                            break;
                        case 'matrix':
                            top = '0';
                            left = '0';
                            break;
                    }
                    break;
                }
                case 'bottomright': {
                    switch (split) {
                        case 'none':
                            top = -this.element.parentElement.offsetHeight + 'px';
                            left = -this.element.parentElement.offsetWidth + 'px';
                            break;
                        case 'horizontal':
                            top = -this.element.parentElement.offsetHeight + 'px';
                            left = '0';
                            break;
                        case 'vertical':
                            top = '0';
                            left = -this.element.parentElement.offsetWidth + 'px';
                            break;
                        case 'matrix':
                            top = '0';
                            left = '0';
                            break;
                    }
                    break;
                }
            }
            this.positions = {
                top,
                left,
                right,
                bottom,
            };
        };
        this.calculatePosition = (quadrant) => {
            let top = 'auto';
            let left = 'auto';
            let right = 'auto';
            let bottom = 'auto';
            switch (quadrant) {
                case 'topleft': {
                    top = '0';
                    left = '0';
                    break;
                }
                case 'topright': {
                    top = '0';
                    right = '0';
                    break;
                }
                case 'bottomleft': {
                    bottom = '0';
                    left = '0';
                    break;
                }
                case 'bottomright': {
                    bottom = '0';
                    right = '0';
                    break;
                }
            }
            this.positions = {
                top,
                left,
                right,
                bottom,
            };
        };
        this.calculateDimensions = (split) => {
            let width = null;
            let height = null;
            switch (split) {
                case 'none': {
                    width = '200%';
                    height = '200%';
                    break;
                }
                case 'horizontal': {
                    width = '100%';
                    height = '200%';
                    break;
                }
                case 'vertical': {
                    width = '200%';
                    height = '100%';
                    break;
                }
                case 'matrix': {
                    width = '100%';
                    height = '100%';
                    break;
                }
            }
            this.dimensions = {
                width,
                height,
            };
        };
    }
    componentWillMount() {
        this.calculateDimensions(this.state.split);
        this.calculatePosition(this.state.currentquad);
    }
    componentWillReceiveProps(nextProps) {
        // should be either one or the other
        if (nextProps.split != this.state.split) {
            this.calculateDimensions(nextProps.split);
            this.setState({
                split: nextProps.split
            });
        }
        if (nextProps.currentquad != this.state.currentquad) {
            setTimeout(() => {
                this.changeCurrentQuad(nextProps);
            });
        }
    }
    render() {
        let { left, right, top, bottom } = this.positions;
        let { width, height } = this.dimensions;
        return (<div id="quadplatform" style={{
            position: 'absolute',
            width,
            height,
            top,
            left,
            bottom,
            right,
            transition: 'top .5s ease,left .5s ease, width .5s ease, height .5s ease'
        }} ref={el => {
            this.element = el;
        }}>
                {this.props.children}
            </div>);
    }
}
export default QuadPlatform;
//# sourceMappingURL=quadplatform.view.jsx.map