// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;


let StickyNavigation = {
    getDefaultProps() {
        return ({
            scrollSpyTargetSelector: 'body',
            titleSelector: '[data-menu]'
        });
    },
    componentDidMount() {
        this._scrollCarrier = document.querySelector(this.props.scrollSpyTargetSelector);
        this._attachScrollSpy();
    },
    componentWillUnmount() {
        this._detachScrollSpy();
    },
    _getTitleList() {
        let rawTitleList = document.querySelectorAll(this.props.titleSelector);
        return [].map.call(rawTitleList, (titleElement) => {
            return {
                label: titleElement.innerText,
                id: titleElement.getAttribute('id'),
                offsetTop: titleElement.offsetTop
            }
        });
    },
    _attachScrollSpy() {
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
    },
    _detachScrollSpy() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    _scrollSpy() {

    },
    _renderList() {
        let titleList = this._getTitleList();
        return titleList.map((title) => {
            return <div onClick={this._linkClickHandler(title)} key={title.id}>{title.label}</div>;
        });
    },
    _linkClickHandler(title) {
        return () => {
            this._scrollCarrier.scrollTop = title.offsetTop;
        }
    },
    render() {
        return (
            <nav data-focus='sticky-navigation'>
                {this._renderList()}
            </nav>
        )
    }
};



/**
 * Mixin component for the sticky navigation.
 * @type {Object}
 */
let stickyNavigationMixin = {

    /** @inheritedDoc */
    displayName: 'sticky-navigation',

    /** @inheritedDoc */
    getDefaultProps() {
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
    getInitialState() {
      return {menuList: []};
    },
    /** @inheritedDoc */
    componentDidMount() {
        //The list is processed only when the component is mounted.
        this._buildMenuList();
        //Set bootstrap data attributes to register the spy.
        this._registerScrollSpyAttributes();
    },
    /**
     * Build the menu list from the title attributes read in the selector.
     */
    _buildMenuList() {
      //Get all title elements form the DOM elements read in the selector.
      let titleListElements = document.querySelectorAll(this.props.titleSelector);
      let menuList = [];
      for(let key in titleListElements) {
          menuList.push(this._renderLink(titleListElements[key]));
      }
      //Update the menu list into the state.
      this.setState({menuList: menuList});
    },
    _registerScrollSpyAttributes(){
      let content = document.querySelector(this.props.contentSelector);
      content.setAttribute('data-spy', 'scroll');
      content.setAttribute('data-target', '#' + this.props.navBarId);
    },
    /** @inheritedDoc */
    render() {
        let className = `bs-docs-sidebar hidden-print affix ${this.props.style.className}`;
        return(
          <nav className={className} id={this.props.navBarId} data-focus="sticky-navigation" data-spy="affix" data-offset-top="60" data-offset-bottom="0">
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
    _renderLink(title) {
        if(title.getAttribute) {
            let active = this.state.currentLink ==  title.getAttribute("id") ? 'active' : '';
            return (<li><div className={active} onClick={this._linkClick(title.getAttribute("id"))}>{title.innerText}</div></li>);
        }
    },
    _linkClick(id) {
        return () => {
            Backbone.history.navigate('#' + id);
            this.setState({currentLink: id});
        };
    }
};

module.exports =  builder(StickyNavigation);
