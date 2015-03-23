var builder = require('focus').component.builder;
var type = require('focus').component.types;
/**
 * Mixin component for the sticky navigation.
 * @type {Object}
 */
var stickyNavigationMixin = {

    /** @inheritedDoc */
    displayName: 'sticky-navigation',

    /** @inheritedDoc */
    getDefaultProps: function(){
        return {
            /**
             * Selector for the content to be watched.
             * @type {String}
             */
            contentSelector: undefined,
            /**
             * Identifier of the Navbar created for the sticky navigation.
             * @type {String}
             */
            navBarId: 'navbar',
            /**
             * Selector for the title elements to display in the sticky navigation.
             * @type {String}
             */
            titleSelector: '[data-menu]',
            /**
             * Style informations such as the className.
             * @type {Object}
             */
            style: {}
        };
    },
    /** @inheritedDoc */
    propTypes: {
      contentSelector: type('string'),
      navBarId: type('string'),
      titleSelector: type('string'),
      style: type('object')
    },
    /** @inheritedDoc */
    getInitialState: function getStickyNavigationInitialState(){
      return {menuList: []};
    },
    /** @inheritedDoc */
    componentDidMount: function stickyNavigationDidMount() {
        //The list is processed only when the component is mounted.
        this._buildMenuList();
        //Set bootstrap data attributes to register the spy.
        this._registerScrollSpyAttributes();
    },
    /**
     * Build the menu list from the title attributes read in the selector.
     */
    _buildMenuList: function buildMenuList(){
      //Get all title elements form the DOM elements read in the selector.
      var titleListElements = document.querySelectorAll(this.props.titleSelector);
      var menuList = [];
      for(var key in titleListElements) {
          menuList.push(this._renderLink(titleListElements[key]));
      }
      //Update the menu list into the state.
      this.setState({menuList: menuList});
    },
    _registerScrollSpyAttributes: function registerScrollSpyAttributes(){
      var content = document.querySelector(this.props.contentSelector);
      content.setAttribute('data-spy', 'scroll');
      content.setAttribute('data-target', '#' + this.props.navBarId);
    },
    /** @inheritedDoc */
    render: function renderStickyNavigation(){
        var className = `sticky-navigation bs-docs-sidebar hidden-print hidden-xs hidden-sm affix ${this.props.style.className}`;
        return(
          <nav className={className} id={this.props.navBarId}>
            <ul className="nav bs-docs-sidenav" role="tablist">
              {this.state.menuList}
            </ul>
          </nav>
        );
    },
    /**
     * Render the list of links.
     * @param anchor
     * @returns {JSX}
     */
    _renderLink: function renderLink(title) {
        if(title.getAttribute) {
            var link = '#' + title.getAttribute("id");
            return (<li><a href={link}>{title.innerText}</a></li>);
        }
    }
};

module.exports =  builder(stickyNavigationMixin);
