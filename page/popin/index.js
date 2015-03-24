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

    _getModalCss: function() {
        var cssClass = 'popin animated';
        switch (this.props.animation) {
            case 'right':
                cssClass += ' bounceInRight';
                break;
            case 'left':
                cssClass += ' bounceInLeft';
                break;
            case 'down':
                cssClass += ' bounceInDown';
                break;
            case 'up':
                cssClass += ' bounceInUp';
                break;
        }
        return cssClass;
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderPopin(){
        var source = document.querySelector(this.props.displaySelector);
        var currentView = this;
        source.onclick = function () {
            currentView.setState({isDisplayed: !currentView.state.isDisplayed});
        };

        if(!this.state.isDisplayed) {
            return <div />;
        }

        return (
            <span className={this._getModalCss()}>
                <div className="modal-content">
                {this.props.contentLoadingFunction()}
                </div>
            </span>
        );
    }

};

module.exports =  builder(popinMixin);
