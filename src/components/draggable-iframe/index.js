import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'focus-core/translation';

class DraggableIframe extends React.Component {

    static propTypes = {
        iframeUrl: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        toggleFunctionName: PropTypes.string,
        queryUrl: PropTypes.array
    };

    constructor(props) {
        super(props);
        if (props.toggleFunctionName) {
            window[props.toggleFunctionName] = this.toggle;
        }
    }

    state = {
        isShown: false,
        params: [],
        xPos: 0,
        yPos: 0,
        xElem: 0,
        yElem: 0,
        selected: null
    };

    dragInit = (e) => {
        e.preventDefault();
        document.onmousemove = this.moveElem;
        document.onmouseup = this.destroy;
        this.setState({
            xPos: e.pageX,
            yPos: e.pageY,
            selected: this.refs.helpFrame,
            xElem: e.pageX - this.refs.helpFrame.offsetLeft,
            yElem: e.pageY - this.refs.helpFrame.offsetTop
        });
    };

    moveElem = (e) => {
        const { xPos, yPos, xElem, yElem, selected } = this.state;
        this.setState({
            xPos: e.pageX,
            yPos: e.pageY
        });
        if (selected !== null) {
            selected.style.left = (xPos - xElem) + 'px';
            selected.style.top = (yPos - yElem) + 'px';
        }
    };

    destroy = (e) => {
        e.preventDefault();
        document.onmousemove = null;
        document.onmouseup = null;
        this.setState({ selected: null });
    };

    toggle = (...params) => {
        const { yPos: oldPos, isShown, yElem } = this.state;
        const { pageYOffset, outerHeight } = window;
        const yPos = isShown ? oldPos : pageYOffset > oldPos ? pageYOffset + 50 : pageYOffset + outerHeight < oldPos ? pageYOffset + outerHeight - this.props.height - 100 : oldPos;
        this.setState({ isShown: !this.state.isShown, params, yPos });
        this.refs.helpFrame.style.top = (yPos - yElem) + 'px';
    }

    render() {
        const { title, iframeUrl, width, height, queryUrl } = this.props;
        const { selected, isShown, params } = this.state;
        const url = iframeUrl + params.map((param, i) => typeof queryUrl[i] === 'string' ? queryUrl[i] + param : '').join('');
        return (
            <div className={`help-frame ${selected ? 'is-dragging' : ''}`} onMouseDown={this.dragInit} ref='helpFrame' style={{ width, display: isShown ? 'block' : 'none' }}>
                <span className='help-center-title'>{translate(title)}</span>
                <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect close-icon' onClick={this.toggle}>
                    <i className='material-icons'>close</i>
                </div>
                <br />
                <IFrame height={height} src={url} width={width} />
            </div>
        );
    }
}

class IFrame extends React.Component {
    shouldComponentUpdate({ src }) {
        return src !== this.props.src;
    }

    render() {
        const { height, src, width } = this.props;
        return <iframe frameBorder={0} height={height} src={src} width={width} />;
    }
}

export default DraggableIframe;