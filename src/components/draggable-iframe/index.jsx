import React, {PropTypes} from 'react';
import './help-center.scss';
import {translate} from 'focus-core/translation';

export default class DraggableIframe extends React.Component {
    static propTypes = {
        iframeUrl: PropTypes.string.isRequired;
        width: PropTypes.number.isRequired;
        height: PropTypes.number.isRequired;
        title: PropTypes.string.isRequired;
        requestClose: PropTypes.func.isRequired;
    };

    state = {
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
        const {xPos, yPos, xElem, yElem, selected} = this.state;
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
        this.setState({selected: null});
    };
    
    render() {
        const {requestClose, title, iframeUrl, width, height} = this.props;
        return (
            <div className={`help-frame ${this.state.selected ? 'is-dragging' : ''}`} onMouseDown={this.dragInit} ref='helpFrame' style={{width}}>
                <span className='help-center-title'>{translate(title)}</span>
                <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect close-icon' onClick={requestClose}>
                    <i className='material-icons'>close</i>
                </div>
                <br />
                <iframe frameBorder={0} height={height} src={iframeUrl} width={width} />
            </div>
        );
    }
}