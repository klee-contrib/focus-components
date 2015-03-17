var builder = require('focus').component.builder;


var stickyNavigationMixin = {

    /**
     * Display name.
     */
    displayName: "sticky-navigation",

    getDefaultProps: function(){
        return {
            menuDataAttribute: "[data-menu]"
        };
    },

    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderStickyNavigation(){
        var anchorList = document.querySelectorAll(this.props.menuDataAttribute);
        var menuList = [];
        for(var key in anchorList) {
            menuList.push(this._renderLink(anchorList[key]));
        }
        return <nav className="sticky-navigation bs-docs-sidebar hidden-print hidden-xs hidden-sm affix" id="navbar"><ul className="nav bs-docs-sidenav" role="tablist">{menuList}</ul></nav>;
    },

    componentDidMount: function stickyNavigationDidMount() {

    },

    _renderLink: function renderLink(anchor) {
        if(anchor.getAttribute) {
            var link = '#' + anchor.getAttribute("id");
            return (<li><a href={link}>{anchor.innerText}</a></li>);
        }
    }


};

module.exports =  builder(stickyNavigationMixin);
