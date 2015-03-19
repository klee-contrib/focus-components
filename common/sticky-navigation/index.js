var builder = require('focus').component.builder;


var stickyNavigationMixin = {

    /**
     * Display name.
     */
    displayName: "sticky-navigation",
    /**
     * Id of the navbar.
     */
    navBarId: "navbar",
    /**
     * Title data attribute.
     */
    titleAttribute: "[data-menu]",
    /**
     * Default props.
     * @returns {{contentId: Html id of the content to spy.}}
     */
    getDefaultProps: function(){
        return {
            contentId: undefined
        };
    },
    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderStickyNavigation(){
        var titleList = document.querySelectorAll(this.titleAttribute);
        var menuList = [];
        for(var key in titleList) {
            menuList.push(this._renderLink(titleList[key]));
        }
        return(
          <nav className="sticky-navigation bs-docs-sidebar hidden-print hidden-xs hidden-sm affix" id={this.navBarId}>
            <ul className="nav bs-docs-sidenav" role="tablist">
              {menuList}
            </ul>
          </nav>
        );
    },
    /**
     * Add the ttribute to iit the spy.
     */
    componentDidMount: function stickyNavigationDidMount() {
        var content = document.getElementById(this.props.contentId);
        content.setAttribute("data-spy", "scroll");
        content.setAttribute("data-target", '#' + this.navBarId);
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
