var builder = require('focus').component.builder;

/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {

    /**
     * Display name.
     */
    displayName: 'popin',

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function(){
        return {
            animation: 'right', // right, left, up, down
            type: 'full', // full, centered
            displaySelector: undefined, // Html selector of the element wich open/close the modal when click on it.
            contentLoadingFunction: undefined // Function wich returns the content of the modal.
        };
    },

    /**
     * Initial state.
     * @returns {object} Initial state values
     */
    getInitialState: function(){
        return {
            isDisplayed: false // True if modal is displayed
        };
    },
    /**
     * Declare the open action.
     */
    componentDidMount: function popinDidMount() {
        var source = document.querySelector(this.props.displaySelector);
        var currentView = this;
        source.onclick = function () {
            currentView.setState({isDisplayed: !currentView.state.isDisplayed});
        };
    },

    /**
     * Open the modal.
     */
    openModal: function openModal() {
        this.setState({isDisplayed: true});
    },
    /**
     * Close the modal.
     */
    closeModal: function closeModal() {
        this.setState({isDisplayed: false});
    },

    /**
     * Css class of modal.
     * @returns {string} css classes.
     * @private
     */
    _getModalCss: function() {
        var cssClass = 'popin animated float:right;';
        switch (this.props.animation) {
            case 'right':
                cssClass += ' bounceInRight right';
                break;
            case 'left':
                cssClass += ' bounceInLeft left';
                break;
            case 'down':
                cssClass += ' bounceInDown down';
                break;
            case 'up':
                cssClass += ' bounceInUp up';
                break;
        }
        return cssClass;
    },
    /**
     * Content css class.
     * @returns {string} css classes.
     * @private
     */
    _getModalContentCss: function() {
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
     * @returns {JSX} Html code.
     */
    render: function renderPopin(){
        if(!this.state.isDisplayed) {
            return <div />;
        }
        return (
            <span className={this._getModalCss()}>
                <div className={this._getModalContentCss()}>
                    {this.renderPopinHeader(this)}
                    <div className="modal-body" >
                        {this.renderContent(this)}
                    </div>
                    {this.renderPopinFooter(this)}
                </div>
            </span>
        );
    }
};

module.exports = builder(popinMixin);