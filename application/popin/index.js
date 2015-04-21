/*global document*/
var builder = require('focus').component.builder;
var popinProperties = require('../mixin/popin-behaviour').mixin;
var type = require('focus').component.types;
var capitalize = require('lodash/string/capitalize');
/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {
  /** @inheritdoc */
  mixins: [popinProperties],
  /** @inheritdoc */
  displayName: 'popin',
  /** @inheritdoc */
  getDefaultProps: function getPopinDefaultProps() {
    return {
      type: 'full', // full, centered
      //  displaySelector: undefined, // Html selector of the element wich open/close the modal when click on it.
      contentLoadingFunction: undefined // Function wich returns the content of the modal.
    };
  },
  /** @inheritdoc */
  propTypes: {
    open: type('bool'),
    type: type('string'),
    contentLoadingFunction: type('string')
  },
  /** @inheritdoc */
  componentDidMount: function popinDidMount() {
    var source = document.querySelector(this.props.displaySelector);
    var currentView = this;
    //todo @joanna / remy
    //J'aurais plutôt exposé une méthode open sur la modale et ajouté un handler sur l'élément appellant.
    if(source !== undefined && source !== null){
      source.onclick = function () {
        currentView._toggleOpen();
      };
    }
  },
  /**
   * Toggle the open state on the modal.
   */
  _toggleOpen: function modalToggleOpen(){
    this.setState({open: !this.state.open});
  },
  /**
   * Open the modal.
   */
  openModal: function openModal() {
    this.setState({open: true});
  },
  /**
   * Close the modal
   */
  closeModal: function closeModal() {
    this.setState({open: false});
    //todo: joanna / remy
    //replaced with a this.ref
    //And add a popin-layer in the state and do a getLayerClassName which returns popin layer if open.
    React.findDOMNode(this.refs.layer).classList.remove('popin-layer');
  },
  /**
   * Css class of modal.
   * @returns {string} css classes.
   * @private
   */
  _getModalCss: function () {
    var position = this.props.position;
    var cssClass = `popin animated ${position} fadeIn${capitalize(position)}Big`;
    switch (this.props.position) {
      case 'right':
      case 'down':
      case 'up':
        cssClass = `${cssClass} btn-close-left`;
        break;
      case 'left':
        cssClass = `${cssClass} fadeInLeftBig left btn-close-right`;
        break;
    }
    if (this.props.style.className !== undefined && this.props.style.className !== null) {
      cssClass = `${cssClass}  ${this.props.style.className}`;
    }
    return cssClass;
  },

  /**
   * Css class of close btn.
   * @returns {string} - css classes.
   * @private
   */
  _getCloseBtnCss: function getCloseButtonCss() {
    return `popin-close-btn ${this.props.position === 'right' ? 'left': 'right'}`;
  },
  /**
   * Content css class.
   * @returns {string} - css classes.
   * @private
   */
  _getModalContentCss: function () {
    var cssClass = 'modal-content';
    switch (this.props.type) {
      case 'full':
        cssClass += ' full';
        break;
      case 'centered':
        cssClass += ' centered';
        break;
    }
    return cssClass;
  },

  /**
   * Render the component.
   * @returns {JSX} - Html code.
   */
  render: function renderPopin() {
    if (!this.state.open) {
      return <div />;
    }
    return (
      <div ref='modal'>
        <div ref='layer' className='popin-layer' onClick={this.closeModal}></div>
        <span className={this._getModalCss()}>
          <div className = {this._getCloseBtnCss()} onClick={this.closeModal}></div>
          <div className={this._getModalContentCss()}>
            {this.renderPopinHeader(this)}
            <div className="modal-body" >
              {this.renderContent(this)}
            </div>
            {this.renderPopinFooter(this)}
          </div>
        </span>
      </div>
    );
  }
};

module.exports = builder(popinMixin);
