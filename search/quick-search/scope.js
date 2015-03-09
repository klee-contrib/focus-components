var builder = require('focus/component/builder');
var type = require('focus/component/types');
var React = require('react');

//var type = require('../../core/validation/types');
var find = require('lodash/collection/find');
var uuid = require('uuid');
var scopeMixin = {
	/**
	 * Component tag name.
	 * @type {String}
	 */
	displayName: "Scope",
	/**
	 * Component default properties.
	 */
	getDefaultProps: function getScopeDefaultProperties() {
		return {
			list: [],
			value: undefined,
			isDeployed: false
		};
	},
	/**
	 * Scope property validation.
	 * @type {Object}
	 */
	 propTypes:{
	    list: type('array'),
	    isDeployed: type('bool'),
	    value: type(['string', 'number'])
	  },
	/**
	 * Get the initial state from the data.
	 */
	getInitialState: function getScopeInitialState() {
		return {
			isDeployed: this.props.isDeployed,
			value: this.props.value
		};
	},
	/**
	 * Get the value of the scope.
	 */
	getValue: function() {
		return this.state.value;
	},
	/**
	 * Define the scope label.
	 */
	scopeLabel: function scopeLabel() {
		return;
		if (!this.state.value) {
			return "Choose your scope";
		}
		return this.state.value;
	},
	/**
	 * Internal function which handles the click on the scope line element and call the real handleOnclick if it is defined.
	 * @param {object} event - Event trigger by the search.
	 */
	_handleOnClick: function(event) {
		var val = event.target.hasAttribute("value") ? event.target.value :
			undefined;
		this.setState({
			value: val,
			isDeployed: false
		}, this.props.handleOnClick);
	},
	/**
	 * Handle the click on the scope element.
	 */
	handleDeployClick: function() {
		this.setState({
			isDeployed: !this.state.isDeployed
		});
	},
	/**
	 * Get the current active scope.
	 */
	getActiveScope: function getActiveScope() {
		return find(this.props.list, (scope) => {
			return scope.code === this.state.value;
		});
	},
	/**
	 * Return the css class for the scope.
	 */
	scopeStyle: function scopeStyle() {
		return `${this.getActiveScope().style}`;
	},
	renderScopeList: function renderScopeList() {
		if (!this.state.isDeployed) {
			return;
		}
		var scopes = this.props.list.map((scope) => {
			var selectedValue = this.state.value === scope.code ? "active" : "";
			return ( <li key={scope.code || uuid.v4()}
			  value={scope.code}
				className={`${selectedValue} ${scope.style}`}
				onClick = {this._handleOnClick}>
				{scope.label}
				</li>
			);
		});
		return ( <ul className="qs-scope-list"> {
					scopes
				} </ul>);
			},
			/**
			 * Render the complete scope element.
			 * @return {object} - The jsx element.
			 */
			render: function renderScopeComponent() {
        var cssClass = `qs-icon qs-scope-deploy-${this.state.isDeployed ? "up": "down"}`;
				return ( <div className = {
						this.props.className + " qs-scope"
					}>
					<div className={cssClass}
					onClick={this.handleDeployClick}>
					<div className = {
						this.scopeStyle()
					}> {
						this.scopeLabel()
					} </div>

					</div> {
					this.renderScopeList()
				} </div>
			);
	}
};

module.exports = builder(scopeMixin);
