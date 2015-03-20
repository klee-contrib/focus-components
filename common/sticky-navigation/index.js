var builder = require('focus').component.builder;

/**
 * Mixin component for the sticky navigation.
 * @type {Object}
 */
var stickyNavigationMixin = {

    /**
     * Display name.
     */
    displayName: "sticky-navigation",
    /**
     * Default props.
     * @returns {{contentId: Html id of the content to spy.}}
     */
    getDefaultProps: function(){
        return {
            contentSelector: undefined,
            contentId: undefined,
            navBarId: "navbar",
            titleSelector: "[data-menu]",
            style: {}
        };
    },
    getInitialState: function getStickyNavigationInitialState(){
      return {menuList: []};
    },
    /**
     * Build the menu list from the title attributes.
     */
    _buildMenuList: function buildMenuList(){
      var titleListElements = document.querySelectorAll(this.props.titleSelector);
      var menuList = [];
      for(var key in titleListElements) {
          menuList.push(this._renderLink(titleListElements[key]));
      }
      this.setState({menuList: menuList});
    },
    /**
     * Render the component.
     * @returns Htm code.
     */
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
     * Add the ttribute to iit the spy.
     */
    componentDidMount: function stickyNavigationDidMount() {
        this._buildMenuList();
        var content = document.querySelector(this.props.contentSelector);
        content.setAttribute("data-spy", "scroll");
        content.setAttribute("data-target", '#' + this.props.navBarId);
    },
    /**
     * Render the list of links.
     * @param anchor
     * @returns {XML}
     */
    _renderLink: function renderLink(title) {
        if(title.getAttribute) {
            var link = '#' + title.getAttribute("id");
            return (<li><a href={link}>{title.innerText}</a></li>);
        }
    }
};

module.exports =  builder(stickyNavigationMixin);
