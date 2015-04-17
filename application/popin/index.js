var builder = require('focus').component.builder;
var popinProperties = require('../mixin/popin-behaviour').mixin;
var type = require('focus').component.types;

/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {
  mixins: [popinProperties],
  /**
   * Display name.
   */
  displayName: 'popin',

  /** @inheritdoc */
  getDefaultProps: function () {
    return {
      type: 'full', // full, centered
      //  displaySelector: undefined, // Html selector of the element wich open/close the modal when click on it.
      contentLoadingFunction: undefined // Function wich returns the content of the modal.
    };
  },

  /** @inheritdoc */
  propTypes: {
    type: type('string'),
    contentLoadingFunction: type('string')
  },

  /** @inheritdoc */
  componentDidMount: function popinDidMount() {
    var source = document.querySelector(this.props.displaySelector);
    var currentView = this;
    if(source !== undefined && source !== null){
      source.onclick = function () {
        currentView.setState({open: !currentView.state.open});
      };
    }

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
    document.querySelector('#modal-layer').classList.remove('popin-layer');
  },

  /**
   * Css class of modal.
   * @returns {string} css classes.
   * @private
   */
  _getModalCss: function () {
    var cssClass = 'popin animated ';
    switch (this.props.position) {
      case 'right':
        cssClass = `${cssClass} fadeInRightBig right btn-close-left`;
        break;
      case 'left':
        cssClass = `${cssClass} fadeInLeftBig left btn-close-right`;
        break;
      case 'down':
        cssClass = `${cssClass} fadeInDownBig down btn-close-left`;
        break;
      case 'up':
        cssClass = `${cssClass} fadeInUpBig up btn-close-left`;
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
  _getCloseBtnCss: function () {
    var cssClass = 'popin-close-btn';
    switch (this.props.position) {
      case 'right':
        cssClass += ' left';
        break;
      default :
        cssClass += ' right';
    }
    return cssClass;
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
      <div>
        <div id='modal-layer' className='popin-layer' onClick={this.closeModal}></div>
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
