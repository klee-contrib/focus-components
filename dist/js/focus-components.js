(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FocusComponents = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

//Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus-COMPONENTS
var infos = require("./package.json");
var infosFn = function infos() {
  console.log("\n    _____   _____   _____   _   _   _____        _____   _____       ___  ___   _____   _____   __   _   _____   __   _   _____   _____\n  |  ___| /  _  \\ /  ___| | | | | /  ___/      /  ___| /  _  \\     /   |/   | |  _  \\ /  _  \\ |  \\ | | | ____| |  \\ | | |_   _| /  ___/\n  | |__   | | | | | |     | | | | | |___       | |     | | | |    / /|   /| | | |_| | | | | | |   | |  | |__   |   \\| |   | |   | |___\n  |  __|  | | | | | |     | | | | \\___  \\      | |     | | | |   / / |__/ | | |  ___/ | | | | | |\\   | |  __|  | |\\   |   | |   \\___  \\\n  | |     | |_| | | |___  | |_| |  ___| |      | |___  | |_| |  / /       | | | |     | |_| | | | \\  | | |___  | | \\  |   | |    ___| |\n  |_|     \\_____/ \\_____| \\_____/ /_____/      \\_____| \\_____/ /_/        |_| |_|     \\_____/ |_|  \\_| |_____| |_|  \\_|   |_|   /_____/\n\n   version: " + infos.version + "\n   focus-components: " + infos.homepage + "\n   documentation: " + infos.documentation + "\n   issues: " + infos.bugs.url + "\n  ");
};

module.exports = {
  VERSION: infos.version,
  AUTHORS: infos.author,
  NAME: infos.name,
  DOCUMENTATION: function DOCUMENTATION() {
    console.log("documentation: http://kleegroup.github.io/focus-components");
    console.log("components available");
    console.table(infos.components);
    console.log("repository: " + infos.repository.url);
    console.log("issues: " + infos.bugs.url);
  },
  common: require("./common"),
  list: require("./list"),
  search: require("./search"),
  page: require("./page"),
  message: require("./message"),
  application: require("./application"),
  infos: infosFn
};

},{"./application":7,"./common":30,"./list":58,"./message":72,"./package.json":256,"./page":258,"./search":265}],2:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var applicationStore = window.Focus.application.builtInStore();

var barMixin = {
  getDefaultProps: function getCartridgeDefaultProps() {
    return {
      appName: "",
      style: {}
    };
  },
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount() {
    applicationStore.removeSummaryComponentChangeListener(this._onComponentChange);
  },
  _getStateFromStore: function getCartridgeStateFromStore() {
    return { summaryComponent: applicationStore.getSummaryComponent() || { component: "div", props: {} } };
  },
  _handleComponentChange: function _handleComponentChangeBarSummary() {
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderBar() {
    var className = "bar " + this.props.style.className;
    return React.createElement(
      "div",
      { className: className, "data-focus": "bar" },
      React.createElement(
        "div",
        { "data-focus": "bar-app-name" },
        this.props.appName
      ),
      React.createElement(
        "div",
        { "data-focus": "bar-actions-left" },
        this.props.actionLeft
      ),
      React.createElement(
        "div",
        { "data-focus": "bar-summary" },
        React.createElement(this.state.summaryComponent.component, this.state.summaryComponent.props)
      ),
      React.createElement(
        "div",
        { "data-focus": "bar-user-infos" },
        React.createElement("i", { className: "mdi-action-language" }),
        React.createElement("i", { className: "mdi-social-notifications" }),
        React.createElement("i", { className: "mdi-action-account-circle" })
      )
    );
  }
};

module.exports = builder(barMixin);

},{}],3:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var applicationStore = window.Focus.application.builtInStore();

var cartridgeMixin = {
  getDefaultProps: function getCartridgeDefaultProps() {
    return {
      style: {}
    };
  },
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount() {
    applicationStore.removeCartridgeComponentChangeListener(this._onComponentChange);
  },
  _getStateFromStore: function getCartridgeStateFromStore() {
    return { cartridgeComponent: applicationStore.getCartridgeComponent() || { component: "div", props: {} } };
  },
  _handleComponentChange: function _handleComponentChange() {
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderCartridge() {
    var className = "cartridge " + this.props.style.className;
    return React.createElement(
      "div",
      { className: className, "data-focus": "cartridge" },
      React.createElement(this.state.cartridgeComponent.component, this.state.cartridgeComponent.props)
    );
  }
};

module.exports = builder(cartridgeMixin);

},{}],4:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var popin = require("../popin").mixin;
var Button = require("../../common/button/action").component;
var type = window.Focus.component.types;

/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {
  mixins: [popin],
  /**
   * Display name.
   */
  displayName: "confirmation-popin",

  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      btnClose: "Cancel",
      btnConfirm: "Ok"
    };
  },

  /** @inheritdoc */
  propTypes: {
    btnClose: type("string"),
    btnConfirm: type("string")
  },

  /**
   * Confirmation action
   */
  _handleConfirm: function openModal() {
    this.closeModal();
    this.handleClikOnOk();
  },
  /**
   * Cancel action
   */
  _handleCancel: function closeModal() {
    this.closeModal();
    this.handleClikOnCancel();
  },
  /**
   * Render the footer content.
   * @returns {XML} - footer content
   */
  renderPopinFooter: function renderPopinFooter() {
    var closeStyle = {
      className: "confirmation-popin-close"
    };
    var confirmStyle = {
      className: "confirmation-popin-confirm btn-primary"
    };
    return React.createElement(
      "div",
      { className: "btns-confirmation-popin" },
      React.createElement(Button, { handleOnClick: this._handleCancel, label: this.props.btnClose, style: closeStyle }),
      React.createElement(Button, { handleOnClick: this._handleConfirm, label: this.props.btnConfirm, style: confirmStyle })
    );
  }

};

module.exports = builder(popinMixin);

},{"../../common/button/action":13,"../popin":11}],5:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;

var headerMixin = {
  /** @inheriteddoc */
  render: function renderContentBar() {
    return React.createElement(
      "div",
      { "data-focus": "content-bar" },
      this.props.children
    );
  }
};

module.exports = builder(headerMixin);

},{}],6:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;

var _require = require("lodash/collection");

var pluck = _require.pluck;
var sortBy = _require.sortBy;

var headerMixin = {
  /** @inheriteddoc */
  getDefaultProps: function getMenuDefaultProps() {
    return {
      /**
       * Selector for the domNode on which the scroll is attached.
       * @type {string}
       */
      scrollTargetSelector: undefined,
      /**
       * Default style of the component.s
       * @type {Object}
       */
      style: {},
      /**
       * Default size of the bar. Should be present in sizeMap.
       * @type {String}
       */
      size: "medium",
      /**
       * Map which defines sizes exists for the components and their border.
       * @type {Object}
       */
      sizeMap: {
        small: {
          sizeBorder: 200
        },
        medium: {
          sizeBorder: 0
        }
      },
      /**
       * A way to redefine the process size of the element.
       * @type {function}
       */
      processSize: undefined,
      /**
       * A handler to notify other elements that the size has changed.
       * @type {[type]}
       */
      notifySizeChange: undefined
    };
  },
  /** @inheritdoc */
  propTypes: {
    size: type("string"),
    scrollTargetSelector: type("string"),
    style: type("object"),
    sizeMap: type("object"),
    notifySizeChange: type(["function", "object"]),
    processSize: type(["function", "object"])
  },
  /** @inheritdoc */
  getInitialState: function getMenuDefaultState() {
    /** @inheriteddoc */
    return {
      open: this.props.open,
      size: this.props.size
    };
  },
  /** @inheriteddoc */
  componentWillMount: function barWillMount() {
    this._processSizes();
    this.scrollTargetNode = this.props.scrollTargetSelector && this.props.scrollTargetSelector !== "" ? document.querySelector(this.props.scrollTargetSelector) : window;
  },
  /** @inheriteddoc */
  componentDidMount: function barDidMount() {
    this.attachScrollListener();
  },
  /** @inheriteddoc */
  componentWillUnMount: function barWillUnMount() {
    this.detachScrollListener();
  },
  /**
   * Process the sizeMap in order to sort them by border size and create a sizes array.
   */
  _processSizes: function processSizes() {
    var sizes = [];
    for (var sz in this.props.sizeMap) {
      sizes.push({ name: sz, sizeBorder: this.props.sizeMap[sz].sizeBorder });
    }
    this.sizes = pluck(sortBy(sizes, "sizeBorder"), "name");
  },
  /**
   * Get the current element size.
   * @returns {int} - The size in pixel of the current element in the browser.
   */
  _processElementSize: function processElementSize() {
    return React.findDOMNode(this).offsetHeight;
  },
  /**
   * Get the scroll position from the top of the screen.
   * @returns {int} - The position in pixel from the top of the scroll container.
   */
  _getScrollPosition: function getScrollPosition() {
    //The pageYOffset is done in order to deal with the window case. Another possibility would have been to use window.docment.body as a node for scrollTop.
    //But the scrollListener on the page is only on the window element.
    return this.scrollTargetNode.pageYOffset !== undefined ? this.scrollTargetNode.pageYOffset : this.scrollTargetNode.scrollTop;
  },
  /**
   * Notify other elements that the size has changed.
   */
  _notifySizeChange: function notifySizeChanged() {
    if (this.props.notifySizeChange) {
      this.props.notifySizeChange(this.state.size);
    }
  },
  /**
   * Change the size of the bar.
   * @param {string} newSize - The new size.
   * @returns {undefined} -  A way to stop the propagation.
   */
  _changeSize: function changeSize(newSize) {
    // Todo: see if the notification of the changed size can be called before.
    return this.setState({ size: newSize }, this._notifySizeChange);
  },
  /**
   * Process the size in order to know if the size should be changed depending on the scroll position and the border of each zone.
   * @returns {object} - The return is used to stop the treatement.
   */
  _processSize: function _processSize() {
    //Allow the user to redefine the process size function.
    if (this.props.processSize) {
      return this.props.processSize();
    }
    var currentIndex = this.sizes.indexOf(this.state.size);
    var currentScrollPosition = this._getScrollPosition();
    //Process increase treatement.
    if (currentIndex < this.sizes.length - 1) {
      var increaseBorder = this.props.sizeMap[this.sizes[currentIndex + 1]].sizeBorder;
      if (currentScrollPosition > increaseBorder) {
        return this._changeSize(this.sizes[currentIndex + 1]);
      }
    }
    //Process decrease treatement.
    if (currentIndex > 0) {
      var decreaseBorder = this.props.sizeMap[this.sizes[currentIndex - 1]].sizeBorder;
      if (currentScrollPosition <= decreaseBorder) {
        return this._changeSize(this.sizes[currentIndex - 1]);
      }
    }
  },
  /**
   * Handle the scroll event in order to resize the page.
   * @param {object} event [description]
   */
  handleScroll: function handleScrollEvent(event) {
    this._processSize();
  },

  /**
   * Attach scroll listener on the scroll target node.
   */
  attachScrollListener: function attachScrollListener() {
    this.scrollTargetNode.addEventListener("scroll", this.handleScroll);
    this.scrollTargetNode.addEventListener("resize", this.handleScroll);
  },

  /**
   * Detach scroll handler on the scroll target node.
   */
  detachScrollListener: function detachScrollListener() {
    this.scrollTargetNode.removeEventListener("scroll", this.handleScroll);
    this.scrollTargetNode.removeEventListener("resize", this.handleScroll);
  },
  /** @inheriteddoc */
  render: function renderBar() {
    var className = "header header-" + this.state.size + " " + this.props.style.className;
    return React.createElement(
      "header",
      { className: className, "data-focus": "header", "data-size": this.state.size },
      this.props.children
    );
  }
};

module.exports = builder(headerMixin);

},{"lodash/collection":75}],7:[function(require,module,exports){
"use strict";

module.exports = {
  header: require("./header"),
  bar: require("./bar"),
  cartridge: require("./cartridge"),
  menu: require("./menu"),
  popin: require("./popin"),
  confirmationPopin: require("./confirmation-popin"),
  messageCenter: require("./message-center"),
  contentBar: require("./content-bar")
};

},{"./bar":2,"./cartridge":3,"./confirmation-popin":4,"./content-bar":5,"./header":6,"./menu":8,"./message-center":9,"./popin":11}],8:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var popinProperties = require("../mixin/popin-behaviour").mixin;

var menuMixin = {
  mixins: [popinProperties],

  /** @inheritedProps*/
  getDefaultProps: function getMenuDefaultProps() {
    return {
      links: []
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle: function toggleOpenMenu() {
    this.setState({ open: !this.state.open });
  },
  /**
   * Render the links of the menu
   */
  renderLinks: function renderLinks() {
    return this.props.links.map(function (link) {
      return React.createElement(
        "a",
        { href: link.url },
        link.name
      );
    });
  },
  /** @inheriteddoc */
  render: function render() {
    var className = "menu menu-" + this.props.direction + " menu-" + this.props.position + " menu-" + (this.state.open ? "open" : "");
    if (this.props.style.className !== undefined && this.props.style.className !== null) {
      className = className + " " + this.props.style.className;
    }
    return React.createElement(
      "nav",
      { className: className },
      this.renderTitle(),
      this.renderContent()
    );
  }
};

module.exports = builder(menuMixin);

},{"../mixin/popin-behaviour":10}],9:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var messageStore = window.Focus.message.builtInStore();
var Message = require("../../message").component;
var assign = require("object-assign");

var messageCenterMixin = {
  getDefaultProps: function getCartridgeDefaultProps() {
    return {
      style: {}
    };
  },
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    messageStore.addPushedMessageListener(this._handlePushMessage);
    messageStore.addClearMessagesListener(this._handleClearMessage);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount() {
    messageStore.removePushedMessageListener(this._handlePushMessage);
    messageStore.removeClearMessagesListener(this._handleClearMessage);
  },
  _getStateFromStore: function getCartridgeStateFromStore() {
    return { messages: messageStore.getMessages() || {} };
  },
  _handlePushMessage: function _handlePushMessage(messageId) {
    var messages = this.state.messages;
    messages[messageId] = messageStore.getMessage(messageId);
    this.setState({ messages: messages });
  },
  _handleClearMessage: function _handleClearMessage() {
    this.setState({ messages: {} });
  },
  _handleRemoveMessage: function _handleRemoveMessage(messageId) {
    var msgs = this.state.messages;
    delete msgs[messageId];
    this.setState({ messages: msgs });
  },
  renderMessages: function renderMessages() {
    var msgs = [];
    for (var msgKey in this.state.messages) {
      msgs.push(React.createElement(Message, assign(this.state.messages[msgKey], { handleOnClick: this._handleRemoveMessage, key: msgKey })));
    }
    return msgs;
  },
  /** @inheriteddoc */
  render: function renderMessageCenter() {
    var className = "message-center " + this.props.style.className;
    return React.createElement(
      "div",
      { className: className, "data-focus-message-center": true },
      this.renderMessages()
    );
  }
};

module.exports = builder(messageCenterMixin);

},{"../../message":72,"object-assign":253}],10:[function(require,module,exports){
"use strict";

var type = window.Focus.component.types;
/**
 * Mixin used in order to create a popin or a menu.
 * @type {Object} - popin behavour mixin
 */
var PopinProperties = {
  /** @inheritdoc */
  getDefaultProps: function getMenuDefaultProps() {
    return {
      direction: "vertical", //horizontal
      position: "left", // top, bottom, right, left
      open: false,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    open: type("bool")
  },
  /** @inheritdoc */
  getInitialState: function getDefaultState() {
    return {
      open: this.props.open
    };
  }
};

module.exports = { mixin: PopinProperties };

},{}],11:[function(require,module,exports){
"use strict";

/*global document*/
var builder = window.Focus.component.builder;
var popinProperties = require("../mixin/popin-behaviour").mixin;
var type = window.Focus.component.types;
var capitalize = require("lodash/string/capitalize");
/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {
  /** @inheritdoc */
  mixins: [popinProperties],
  /** @inheritdoc */
  displayName: "popin",
  /** @inheritdoc */
  getDefaultProps: function getPopinDefaultProps() {
    return {
      type: "full", // full, centered
      //  displaySelector: undefined, // Html selector of the element wich open/close the modal when click on it.
      contentLoadingFunction: undefined // Function wich returns the content of the modal.
    };
  },
  /** @inheritdoc */
  propTypes: {
    open: type("bool"),
    type: type("string"),
    contentLoadingFunction: type("string")
  },
  /** @inheritdoc */
  componentDidMount: function popinDidMount() {
    var source = document.querySelector(this.props.displaySelector);
    var currentView = this;
    //todo @joanna / remy
    //J'aurais plutôt exposé une méthode open sur la modale et ajouté un handler sur l'élément appellant.
    if (source !== undefined && source !== null) {
      source.onclick = function () {
        currentView._toggleOpen();
      };
    }
  },
  /**
   * Toggle the open state on the modal.
   */
  _toggleOpen: function modalToggleOpen() {
    this.setState({ open: !this.state.open });
  },
  /**
   * Open the modal.
   */
  openModal: function openModal() {
    this.setState({ open: true });
  },
  /**
   * Close the modal
   */
  closeModal: function closeModal() {
    this.setState({ open: false });
    //todo: joanna / remy
    //replaced with a this.ref
    //And add a popin-layer in the state and do a getLayerClassName which returns popin layer if open.
    React.findDOMNode(this.refs.layer).classList.remove("popin-layer");
  },
  /**
   * Css class of modal.
   * @returns {string} css classes.
   * @private
   */
  _getModalCss: function _getModalCss() {
    var position = this.props.position;
    var cssClass = "popin animated " + position + " fadeIn" + capitalize(position) + "Big";
    switch (this.props.position) {
      case "right":
      case "down":
      case "up":
        cssClass = "" + cssClass + " btn-close-left";
        break;
      case "left":
        cssClass = "" + cssClass + " fadeInLeftBig left btn-close-right";
        break;
    }
    if (this.props.style.className !== undefined && this.props.style.className !== null) {
      cssClass = "" + cssClass + "  " + this.props.style.className;
    }
    return cssClass;
  },

  /**
   * Css class of close btn.
   * @returns {string} - css classes.
   * @private
   */
  _getCloseBtnCss: function getCloseButtonCss() {
    return "popin-close-btn " + (this.props.position === "right" ? "left" : "right");
  },
  /**
   * Content css class.
   * @returns {string} - css classes.
   * @private
   */
  _getModalContentCss: function _getModalContentCss() {
    var cssClass = "modal-content";
    switch (this.props.type) {
      case "full":
        cssClass += " full";
        break;
      case "centered":
        cssClass += " centered";
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
      return React.createElement("div", null);
    }
    return React.createElement(
      "div",
      { ref: "modal" },
      React.createElement("div", { ref: "layer", className: "popin-layer", onClick: this.closeModal }),
      React.createElement(
        "span",
        { className: this._getModalCss() },
        React.createElement("div", { className: this._getCloseBtnCss(), onClick: this.closeModal }),
        React.createElement(
          "div",
          { className: this._getModalContentCss() },
          this.renderPopinHeader(this),
          React.createElement(
            "div",
            { className: "modal-body" },
            this.renderContent(this)
          ),
          this.renderPopinFooter(this)
        )
      )
    );
  }
};

module.exports = builder(popinMixin);

},{"../mixin/popin-behaviour":10,"lodash/string/capitalize":246}],12:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.Focus.component.builder;
var Title = require("../title").component;
var i18nMixin = require("../i18n").mixin;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  mixins: [i18nMixin],
  getDefaultProps: function getDefaultProps() {
    return {
      style: {},
      actions: function actions() {
        return; // override this to add actions.
      }
    };
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return this.i18n(this.props.title);
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      "div",
      { className: "" + this.props.style.className, "data-focus": "block" },
      React.createElement(
        "header",
        null,
        React.createElement(Title, { id: this.props.style.titleId, title: this.heading() }),
        React.createElement(
          "div",
          { className: "actions" },
          this.props.actions()
        )
      ),
      React.createElement(
        "div",
        { className: "block-content" },
        this.props.children
      )
    );
  }
};
module.exports = builder(blockMixin);
// actions -->

},{"../i18n":26,"../title":54}],13:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.Focus.component.builder;
var Img = require("../../img").component;

/**
 * Mixin button.
 * @type {Object}
 */
var buttonMixin = {
  /** inheritedDoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: "submit",
      action: undefined,
      isPressed: false,
      style: {},
      label: undefined,
      imgSrc: undefined
    };
  },
  /**
   * Clickhandler on the button.
   */
  handleOnClick: function handleButtonOnclick() {
    if (this.props.handleOnClick) {
      return this.props.handleOnClick.apply(this, arguments);
    }
    if (!this.props.action || !this.action[this.props.action]) {
      console.warn("Your button action is not implemented");
      return;
    }
    return this.action[this.props.action].apply(this, arguments);
  },
  /** inheritedDoc */
  getInitialState: function getActionButtonInitialState() {
    return {
      isPressed: this.props.isPressed
    };
  },
  /**
   * ClassName of the button.
   */
  _className: function buttonClassName() {
    return "btn btn-raised " + (this.props.style.className ? "btn-" + this.props.style.className : "");
  },
  /**
  * Render the pressed state of the button.
  */
  renderPressedButton: function renderPressedButton() {
    return React.createElement(
      "button",
      null,
      "Loading..."
    );
  },
  /** inheritedDoc */
  render: function renderInput() {
    if (this.state.isPressed) {
      return this.renderPressedButton();
    }
    if (this.props.imgSrc) {
      return React.createElement(Img, { src: this.props.imgSrc, onClick: this.handleOnClick });
    }
    return React.createElement(
      "button",
      { href: "javascript:void(0)", onClick: this.handleOnClick, type: this.props.type, className: this._className() },
      this.props.label
    );
  }
};

module.exports = builder(buttonMixin);

},{"../../img":29}],14:[function(require,module,exports){
"use strict";

module.exports = {
	action: require("./action")
};

},{"./action":13}],15:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.Focus.component.builder;
//var i18nMixin = require('../i18n').mixin;
var StickyNavigation = require("../sticky-navigation").component;
var type = window.Focus.component.types;
var stylable = require("../../mixin/stylable");
/**
 * Mixin used in order to create a Detail.
 * @type {Object}
 */
var detailMixin = {
  mixins: [stylable],
  /** @inheritedDoc */
  getDefaultProps: function getDetailDefaultProps() {
    return {
      /**
       * Activate the presence of the sticky navigation component.
       * @type {Boolean}
       */
      navigation: true
    };
  },
  /** @inheritedDoc */
  propTypes: {
    navigation: type("bool")
  },
  /**
   * Render the navigation component if the props navigation is true.
   * @returns {Object} - The jsx component.
   */
  renderNavigation: function renderNavigation() {
    if (this.props.navigation) {
      return React.createElement(StickyNavigation, { contentSelector: "[data-focus=\"detail-content\"" });
    }return;
  },
  /** @inheritedDoc */
  render: function renderDetail() {
    return React.createElement(
      "div",
      { className: "" + this._getStyleClassName(), "data-focus": "detail" },
      this.renderNavigation(),
      React.createElement(
        "div",
        { "data-focus": "detail-content" },
        this.props.children
      )
    );
  }
};
module.exports = builder(detailMixin);

},{"../../mixin/stylable":73,"../sticky-navigation":53}],16:[function(require,module,exports){
"use strict";

//Dependencies.
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var i18nBehaviour = require("../../i18n/mixin");
/**
 * Input text mixin.
 * @type {Object}
 */
var displayCheckboxMixin = {
  mixins: [i18nBehaviour],
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type("string"),
    value: type("bool"),
    name: type("string"),
    style: type("object")
  },
  /**
   * Render the boolean value.
   */
  renderValue: function renderValueDisplayText() {
    var stringValue = this.props.value === true ? "true" : "false";
    return this.i18n("display.checkbox." + stringValue);
  },
  /**
   * Render a display field.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return React.createElement(
      "div",
      {
        id: this.props.name,
        name: this.props.name,
        className: this.props.style["class"]
      },
      this.renderValue()
    );
  }
};

module.exports = builder(displayCheckboxMixin);

},{"../../i18n/mixin":27}],17:[function(require,module,exports){
"use strict";

module.exports = {
  text: require("./text"),
  checkbox: require("./checkbox")
};

},{"./checkbox":16,"./text":18}],18:[function(require,module,exports){
"use strict";

//Dependencies.
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var displayTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      name: undefined,
      formatter: function formatter(data) {
        return data;
      },
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type("string"),
    value: type(["string", "number"]),
    name: type("string"),
    style: type("object")
  },
  renderValue: function renderValueDisplayText() {
    return this.props.formatter(this.props.value);
  },
  /**
   * Render a display field.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return React.createElement(
      "div",
      {
        id: this.props.name,
        name: this.props.name,
        className: this.props.style["class"]
      },
      this.renderValue()
    );
  }
};

module.exports = builder(displayTextMixin);

},{}],19:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
var React = window.React;
var valueBehaviour = require("./mixin/value-behaviour");
var validationBehaviour = require("./mixin/validation-behaviour");
var builtInComponents = require("./mixin/built-in-components");
var FieldMixin = {
  mixins: [valueBehaviour, validationBehaviour, builtInComponents],
  /**
  * Get field default properties.
  */
  getDefaultProps: function getFieldDefaultProps() {
    return {

      /**
       * Edition mode of the field.
       * @type {Boolean}
       */
      isEdit: true,
      /**
       * HTML input type.
       * @type {String}
       */
      type: "text",
      /**
       * Field name.
       * @type {string}
       */
      name: undefined,
      /**
       * Css properties of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    isEdit: type("bool"),
    type: type("string"),
    name: type("string"),
    value: type(["string", "number"])
  },

  /** @inheritdoc */
  componentWillReceiveProps: function fieldWillReceiveProps(newProps) {
    this.setState({ value: newProps.value, values: newProps.values });
  },
  /**
  * Get the css class of the field component.
  */
  _className: function _className() {
    var stateClass = this.state.error ? "has-feedback has-error" : "";
    return "form-group " + stateClass + " " + this.props.style.className;
  },

  render: function renderField() {
    return React.createElement(
      "div",
      { className: this._className(), "data-focus": "field" },
      this.label(),
      this.props.isEdit ? this.props.values ? this.select() : this.input() : this.display(),
      this.help(),
      this.error()
    );
  }
};
module.exports = builder(FieldMixin);

},{"./mixin/built-in-components":20,"./mixin/validation-behaviour":21,"./mixin/value-behaviour":22}],20:[function(require,module,exports){
"use strict";

var InputText = require("../../input/text").component;
var DisplayText = require("../../display/text").component;
var SelectClassic = require("../../select/classic").component;
var Label = require("../../label").component;
var fieldGridBehaviourMixin = require("../../mixin/field-grid-behaviour");
var type = window.Focus.component.types;

var fieldBuiltInComponentsMixin = {
  mixins: [fieldGridBehaviourMixin],
  /** @inheriteDoc */
  getDefaultProps: function getDefaultPropsBuiltInComponents() {
    return {
      /**
       * Does the component has a Label.
       * @type {Boolean}
       */
      hasLabel: true,
      /**
       * Redefine complety the component.
       * @type {Object}
       */
      FieldComponent: undefined,
      /**
       * Redefine only the input and label component.
       * @type {Object}
       */
      InputLabelComponent: undefined,
      /**
       * Component for the input.
       * @type {Object}
       */
      InputComponent: InputText,
      /**
       * Component for the select.
       * @type {Object}
       */
      SelectComponent: SelectClassic,
      /**
       * Component for the display.
       * @type {Object}
       */
      DisplayComponent: DisplayText
    };
  },
  /** @inheriteDoc */
  propTypes: {
    hasLabel: type("bool"),
    labelSize: type("number"),
    FieldComponent: type("object"),
    InputLabelComponent: type("object"),
    InputComponent: type("object"),
    SelectComponent: type("object"),
    DisplayComponent: type("object")
  },
  /**
   * Render the label part of the component.
   * @returns {[type]} [description]
   */
  label: function fieldLabel() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return undefined;
    }
    if (this.props.hasLabel) {
      var labelClassName = this._getLabelGridClassName();
      return React.createElement(Label, {
        style: { className: labelClassName },
        name: this.props.name,
        key: this.props.name
      });
    }
  },
  /**
   * Rendet the input part of the component.
   * @return {[type]} [description]
   */
  input: function renderInput() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return this.renderFieldComponent();
    }
    var inputClassName = "form-control }";
    return React.createElement(
      "div",
      { className: "" + this._getContentGridClassName() + " input-group" },
      React.createElement(this.props.InputComponent, {
        style: { "class": inputClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.state.value,
        type: this.props.type,
        onChange: this.onInputChange,
        ref: "input"
      })
    );
  },
  /**
   * [select description]
   * @return {[type]} [description]
   */
  select: function renderSelect() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return this.renderFieldComponent();
    }
    var selectClassName = "form-control " + this._getContentGridClassName();
    return React.createElement(
      "div",
      { className: "input-group" },
      React.createElement(this.props.SelectComponent, {
        style: { "class": selectClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.state.value,
        values: this.state.values,
        type: this.props.type,
        onChange: this.onInputChange,
        ref: "input"
      })
    );
  },
  /**
   * Render the display part of the component.
   * @return {object} - The display part of the compoennt if the mode is not edit.
   */
  display: function renderDisplay() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return this.renderFieldComponent();
    }
    var selectClassName = "form-control " + this._getContentGridClassName();
    return React.createElement(
      "div",
      { className: "input-group" },
      React.createElement(this.props.DisplayComponent, {
        style: { "class": selectClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.state.value,
        type: this.props.type,
        ref: "display",
        formatter: this.props.formatter
      })
    );
  },
  /**
   * Render the error part of the component.
   * @return {object} - The error part of the component.
   */
  error: function renderError() {
    if (this.state.error) {
      if (this.props.FieldComponent) {
        return;
      }
      return (
        /*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
        React.createElement(
          "span",
          { className: "help-block" },
          this.state.error
        )
      );
    }
  },
  /**
   * Render the help component.
   * @return {object} - The help part of the component.
   */
  help: function renderHelp() {
    if (this.props.help) {
      if (this.props.FieldComponent) {
        return;
      }
      return React.createElement(
        "span",
        { className: "help-block" },
        this.props.help
      );
    }
  },
  /**
   * Render the field component if it is overriden in the component definition.
   */
  renderFieldComponent: function renderFieldComponent() {
    var Component = this.props.FieldComponent || this.props.InputLabelComponent;
    return React.createElement(Component, {
      id: this.props.name,
      name: this.props.name,
      label: this.props.label,
      value: this.state.value,
      type: this.props.type,
      style: this.props.style.input,
      labelSize: this.props.labelSize,
      error: this.state.error,
      help: this.props.help,
      onChange: this.onInputChange,
      ref: "input"
    });
  }
};

module.exports = fieldBuiltInComponentsMixin;

},{"../../display/text":18,"../../input/text":35,"../../label":38,"../../mixin/field-grid-behaviour":43,"../../select/classic":50}],21:[function(require,module,exports){
"use strict";

var i18nMixin = require("../../i18n").mixin;

var validationMixin = {
  mixins: [i18nMixin],

  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      isRequired: false,
      validator: undefined
    };
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validateInput: function validateInputText() {
    var value = this.getValue();
    if (this.props.isRequired && (value === undefined || value === "")) {
      return this.i18n("field.required", { name: this.i18n(this.props.label) });
    }
    if (this.props.validator) {
      return this.props.validator(value);
    }
    return true;
  },
  /**
  * Validate the field.
  * @return {object} - undefined if valid, {name: "errors"} if not valid.
  */
  validate: function validateField() {
    var validationStatus = this.validateInput();
    if (validationStatus !== true) {
      this.setError(validationStatus);
      return validationStatus;
    }
    return;
  },
  /**
   * Set the error on the field.
   * @param error Error to set.
   */
  setError: function setErrorOnField(error) {
    console.log("VALUEs : " + this.getValue());
    this.setState({ error: error });
  }
};
module.exports = validationMixin;

},{"../../i18n":26}],22:[function(require,module,exports){
"use strict";

var _require = require("lodash/lang");

var isObject = _require.isObject;
var isFunction = _require.isFunction;

var valueBehaviourMixin = {
  /** @inheritdoc */
  getDefaultProps: function getDefaultValueBehaviourProps() {
    return {
      error: undefined,
      value: undefined
    };
  },
  /** @inheritdoc */
  getInitialState: function getFieldInitialState() {
    return {
      error: this.props.error,
      value: this.props.value
    };
  },
  /**
  * Get the value from the field.
  */
  getValue: function getValue() {
    if (isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)) {
      return this.refs.input.getValue();
    } else if (this.state && this.state.value !== undefined) {
      return this.state.value;
    } else if (this.props && this.props.value !== undefined) {
      return this.props.value;
    }
  },
  /**
   * Handler called when the input Change its value.
   * @param {event} event - The event to set.
   */
  onInputChange: function fieldOnInputChanges(event) {
    this.setState({ error: undefined, value: this.getValue() });
  }
};

module.exports = valueBehaviourMixin;

},{"lodash/lang":207}],23:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var builder = window.Focus.component.builder;
var React = window.React;
var assign = require("object-assign");

var _require = require("lodash/lang");

var isEmpty = _require.isEmpty;
var isFunction = _require.isFunction;

// Common mixins.
var definitionMixin = require("../mixin/definition");
//var fieldComponentBehaviour = require('../mixin/field-component-behaviour');
var builtInComponents = require("../mixin/built-in-components");
var storeBehaviour = require("../mixin/store-behaviour");

//Form mixins.
var referenceBehaviour = require("./mixin/reference-behaviour");
var actionBehaviour = require("./mixin/action-behaviour");

/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [definitionMixin, referenceBehaviour, storeBehaviour, actionBehaviour, builtInComponents],
  /** @inheritdoc */
  getDefaultProps: function getFormDefaultProps() {
    return {
      /**
       * Defines it the form can have  an edit mode.
       * @type {Boolean}
       */
      hasEdit: true,
      /**
       * Defines
       * @type {Boolean}
       */
      isEdit: false,
      /**
       * Style of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /** @inheritdoc */
  getInitialState: function getFormInitialState() {
    return {
      /**
       * Identifier of the entity.
       * @type {[type]}
       */
      id: this.props.id,
      isEdit: this.props.isEdit
    };
  },
  /**
   * Display a message on change.
   */
  _displayMessageOnChange: function displayMessageOnChange(changeInfos) {
    if (this.displayMessageOnChange) {
      return this.displayMessageOnChange(changeInfos);
    }
    if (changeInfos && changeInfos.status && changeInfos.status.name) {
      switch (changeInfos.status.name) {
        case "loading":
          Focus.message.addInformationMessage("loading");
          break;
        case "loaded":
          Focus.message.addSuccessMessage("loaded");
          break;
        case "saving":
          Focus.message.addInformationMessage("saving");
          break;
        case "saved":
          Focus.message.addSuccessMessage("saved");
          break;
      }
    }
  },
  /**
   * After change informations.
   * You can override this method using afterChange function.
   * @param {object} changeInfos - All informations relative to the change.
   * @returns {undefined} -  The return value is the callback.
   */
  _afterChange: function afterChangeForm(changeInfos) {
    if (this.afterChange) {
      return this.afterChange(changeInfos);
    }
    return this._displayMessageOnChange(changeInfos);
  },
  /**
   * Event handler for 'change' events coming from the stores
   * @param {object} changeInfos - The changing informations.
   */
  _onChange: function onFormStoreChangeHandler(changeInfos) {
    this.setState(this._getStateFromStores(), this._afterChange(changeInfos));
  },
  /**
     * Event handler for 'error' events coming from the stores.
      */
  _onError: function onFormErrorHandler() {
    var errorState = this._getErrorStateFromStores();
    for (var key in errorState) {
      if (this.refs[key]) {
        this.refs[key].setError(errorState[key]);
      }
    }
  },

  /** @inheritdoc */
  callMountedActions: function formCallMountedActions() {
    this._loadData();
    this._loadReference();
  },
  /** @inheritdoc */
  componentDidMount: function formDidMount() {
    //Build the definitions.
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  /** @inheritdoc */
  componentWillUnmount: function formWillMount() {
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },

  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @returns {boolean} - A boolean ttue if the
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      //validate only the reference elements which have valide function
      // todo: @pierr see if it is sufficient
      if (isFunction(this.refs[inptKey].validate)) {
        var validationRes = this.refs[inptKey].validate();
        if (validationRes !== undefined) {
          assign(validationMap, _defineProperty({}, inptKey, validationRes));
        }
      }
    }
    if (isEmpty(validationMap)) {
      return true;
    }

    return false;
  },
  _editClass: function _editClass() {
    if (this.editClass) {
      return this.editClass();
    }
    return "form-" + (this.state.isEdit ? "edit" : "consult");
  },
  _className: function formClassName() {
    return "form-horizontal " + this.props.style.className + " " + this._editClass();
  },
  _renderActions: function renderActions() {
    if (this.renderActions) {
      return this.renderActions();
    }
    if (this.state.isEdit) {
      return this._renderEditActions();
    }
    return this._renderConsultActions();
  },
  _renderEditActions: function _renderEditActions() {
    if (this.renderEditActions) {
      return this.renderEditActions();
    }
    return React.createElement(
      "div",
      { className: "button-bar" },
      this.buttonSave(),
      this.buttonCancel()
    );
  },
  _renderConsultActions: function _renderConsultActions() {
    if (this.renderConsultActions) {
      return this.renderConsultActions();
    }
    return this.buttonEdit();
  },
  /**
   * Handle the form submission.
   * @param {Event} e - React sanityze event from the form submit.
   */
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    if (this.validate()) {
      this.action.save(this._getEntity());
    }
    //return false;
  },
  /** @inheritdoc */
  render: function renderForm() {
    console.log("state form", this.state);
    return React.createElement(
      "form",
      {
        onSubmit: this._handleSubmitForm,
        className: this._className()
      },
      React.createElement(
        "fieldset",
        null,
        this.renderContent()
      )
    );
  }
};

module.exports = builder(formMixin);

},{"../mixin/built-in-components":40,"../mixin/definition":41,"../mixin/store-behaviour":46,"./mixin/action-behaviour":24,"./mixin/reference-behaviour":25,"lodash/lang":207,"object-assign":253}],24:[function(require,module,exports){
"use strict";

var assign = require("object-assign");
var isFunction = require("lodash/lang/isFunction");
var omit = require("lodash/object/omit");
var actionMixin = {

  /**
     * Get the entity identifier for the form loading.
     * @returns {object} - The identifier of the entity.
     */
  _getId: function formGetId() {
    if (this.getId) {
      return this.getId();
    }
    return this.state.id;
  },
  /**
   * Get a clean state to send data to the server.
   * @returns {object} - The state json cleanded
   */
  _getCleanState: function _getCleanState() {
    return omit(this.state, ["reference", "isLoading", "isEdit"]);
  },
  /**
   * Compute the entity read from the html givent the keys and the definition Path, this operation is reversed from the _computeEntityFromStore operation.
   * @param {object} htmlData - Data read from the html form.
   */
  _computeEntityFromHtml: function _computeEntityFromHtml(htmlData) {
    var DEF = "" + this.definitionPath + ".";
    var EMPTY = "";
    var computedEntity = {};
    for (var prop in htmlData) {
      computedEntity[prop.replace(DEF, EMPTY)] = htmlData[prop];
    }
    return computedEntity;
  },
  /**
   * Get the constructed entity from the state.
   * @returns {object} - the entity informations.
   */
  _getEntity: function formGetEntity() {
    if (this.getEntity) {
      return this.getEntity();
    }
    //Build the entity value from the ref getVaue.
    var htmlData = {};
    for (var r in this.refs) {
      //If the reference has a getValue function if is read.
      if (this.refs[r] && isFunction(this.refs[r].getValue)) {
        htmlData[r] = this.refs[r].getValue();
      }
    }
    //Maybe a merge cold be done if we need a deeper property merge.
    return assign({}, this._getCleanState(), this._computeEntityFromHtml(htmlData));
  },
  /**
   * Load data action call.
   */
  _loadData: function formLoadData() {
    this.action.load(this._getId());
  }
};

module.exports = actionMixin;

},{"lodash/lang/isFunction":222,"lodash/object/omit":243,"object-assign":253}],25:[function(require,module,exports){
"use strict";

//Focus.reference.builder.loadListByName('papas').then(function(data){Focus.dispatcher.dispatch({action: {type: "update",data: {papas: data}}})})

var builtInRefStoreAccessor = window.Focus.reference.builtInStore;
var builtInActionReferenceLoader = window.Focus.reference.builtInAction;
var isEmpty = require("lodash/lang/isEmpty");
var referenceMixin = {
  /** @inheritdoc */
  /*  getDefaultProps: function getReferenceDefaultProps(){
      return {*/
  /**
   * Array which contains all the reference lists.
   * If the referenceNames are set into the object, they are set into the default props.
   * @type {Array}
   */
  /*  referenceNames: this.referenceNames || []
  };
  },*/
  getInitialState: function getInitialState() {
    return { reference: {} };
  },
  /**
   * Build actions associated to the reference.
   */
  _buildReferenceActions: function _buildReferenceActions() {
    this.action = this.action || {};
    this.action.loadReference = builtInActionReferenceLoader(this.referenceNames);
  },
  _loadReference: function _loadReference() {
    return this.action.loadReference();
  },
  /**
   * Build the reference names and set the store into the application.
   */
  _buildReferenceStoreConfig: function _buildReferenceStoreConfig() {
    //Get the store for references.
    var referenceStore = builtInRefStoreAccessor();

    //If the reference store is empty don't do anything.
    if (isEmpty(this.referenceNames)) {
      return;
    }
    this.stores = this.stores || [];
    //Set as referencestore the referencestore of the application.
    this.stores.push({
      store: referenceStore,
      properties: this.referenceNames
    });
  },
  /**
   * Build store and actions related to the reference.
   */
  _buildReference: function buildReference() {
    this._buildReferenceStoreConfig();
    this._buildReferenceActions();
  },
  /** @inheritdoc */
  componentWillMount: function formWillMount() {
    this._buildReference();
  }
};

module.exports = referenceMixin;

},{"lodash/lang/isEmpty":218}],26:[function(require,module,exports){
"use strict";

module.exports = {
  mixin: require("./mixin")
};

},{"./mixin":27}],27:[function(require,module,exports){
"use strict";

/*global window*/
/*todo check the library presence*/
module.exports = {
    /**
     * Compute the translated label.
     * @param key {string}- Key in the dictionnary of translations.
     * @param data {object} - Data to interpole in the translated string.
     * @returns {string} - Translated string.
     */
    i18n: function translate(key, data) {
        var fn = window.i18n && window.i18n.t ? window.i18n.t : function defaulti18n(trKey) {
            return trKey;
        };
        return fn(key, data);
    }
};

},{}],28:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;

var type = window.Focus.component.types;

var iconMixin = {
  /**
   * Display name.
   */
  displayName: "icon",
  /**
   * Default props.
   * @returns {object} Initial props.
   */
  getDefaultProps: function getDefaultProps() {
    return {
      prefix: "fa fa-",
      name: ""
    };
  },
  propTypes: {
    prefix: type("string"),
    name: type("string")
  },
  /**
   * Render the img.
   * @returns {XML} Html code.
   */
  render: function renderIcon() {
    var className = "" + this.props.prefix + "" + this.props.name;
    return React.createElement("i", { className: className, onClick: this.props.onClick });
  }
};

module.exports = builder(iconMixin);

},{}],29:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;

var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {object} Initial props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderImg() {
        var className = "icon " + this.props.src;
        return React.createElement(
            "span",
            { className: className, onClick: this.props.onClick },
            " "
        );
    }
};

module.exports = builder(imgMixin);

},{}],30:[function(require,module,exports){
"use strict";

module.exports = {
  block: require("./block"),
  button: require("./button"),
  field: require("./field"),
  form: require("./form"),
  img: require("./img"),
  i18n: require("./i18n"),
  icon: require("./icon"),
  input: require("./input"),
  label: require("./label"),
  panel: require("./panel"),
  select: require("./select"),
  selectAction: require("./select-action"),
  stickyNavigation: require("./sticky-navigation"),
  title: require("./title"),
  topicDisplayer: require("./topic-displayer"),
  list: require("./list"),
  mixin: require("./mixin"),
  display: require("./display"),
  detail: require("./detail")
};

},{"./block":12,"./button":14,"./detail":15,"./display":17,"./field":19,"./form":23,"./i18n":26,"./icon":28,"./img":29,"./input":33,"./label":38,"./list":39,"./mixin":44,"./panel":47,"./select":51,"./select-action":48,"./sticky-navigation":53,"./title":54,"./topic-displayer":55}],31:[function(require,module,exports){
"use strict";

//Target
//http://codepen.io/Sambego/pen/zDLxe
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var fieldGridBehaviourMixin = require("../../mixin/field-grid-behaviour");
var jQuery = window.jQuery;
var isBoolean = require("lodash/lang/isBoolean");

var checkBoxMixin = {
  mixins: [fieldGridBehaviourMixin],
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type("bool"),
    label: type("string"),
    style: type("object"),
    onChange: type("function")
  },
  getInitialState: function getInitialState() {
    return {
      isChecked: this.props.isChecked ? this.props.isChecked : this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    }, this.props.onChange);
  },
  /**
   * Get the value from the input in  the DOM.
   * @returns The DOM node value.
   */
  getValue: function getValue() {
    if (isBoolean(this.props.value)) {
      return this.state.isChecked;
    }
    return this.state.isChecked ? this.props.value : undefined;
  },
  /**
   * Build the label class name.
   * @returns The label classame with the grid informations.
   */
  _labelClassName: function labelClassName() {
    return "paper-cb-label " + this._getContentOffsetClassName() + " " + this._getContentGridClassName();
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderCheckBox() {
    return React.createElement(
      "div",
      { className: "paper-cb" },
      React.createElement(
        "label",
        { className: this._labelClassName() },
        React.createElement("input", { ref: "checkbox", checked: this.state.isChecked, onChange: this._onChange, type: "checkbox", className: "paper-cbx", value: this.props.value }),
        this.props.label ? this.props.label : ""
      )
    );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({ isChecked: nextProps.value });
    }
  }
};

module.exports = builder(checkBoxMixin);

},{"../../mixin/field-grid-behaviour":43,"lodash/lang/isBoolean":215}],32:[function(require,module,exports){
"use strict";

var jQuery = window.jQuery;
//Dependencies.
////http://www.daterangepicker.com/#ex2
var builder = window.Focus.component.builder;
var React = window.React;
var inputTextMixin = require("../text").mixin;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputDateMixin = {
  /** @inheritdoc */
  mixins: [inputTextMixin],
  /** @inheritdoc */
  componentDidMount: function inputDateDidMount() {
    if (!jQuery.fn.daterangepicker) {
      console.warn("The jquery daterangepicker plugin should be loaded: see https://github.com/dangrossman/bootstrap-daterangepicker.");
    }
    var component = this;
    jQuery(React.findDOMNode(this)).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    }, function (start) {
      ///*, end, label*/
      component.setState({ value: start.format("L") });
    });
  }
};

module.exports = builder(inputDateMixin);

},{"../text":35}],33:[function(require,module,exports){
"use strict";

module.exports = {
  checkbox: require("./checkbox"),
  date: require("./date"),
  text: require("./text"),
  textarea: require("./textarea"),
  toggle: require("./toggle"),
  markdown: require("./markdown")
};

},{"./checkbox":31,"./date":32,"./markdown":34,"./text":35,"./textarea":36,"./toggle":37}],34:[function(require,module,exports){
"use strict";

//Dependencies.
var builder = window.Focus.component.builder;
var React = window.React;

var markdownEditorMixin = {
  /** @inherideddoc */
  getInitialState: function getMarkdownInitialState() {
    return { value: this.props.value };
  },
  /** @inherideddoc */
  componentDidMount: function markdownComponentDidMount() {
    if (!window.Showdown) {
      console.warn("The showdown library should be imported. See https://github.com/showdownjs/showdown");
    }
  },
  /**
   * Handle the change of the value.
   */
  handleChange: function handleMarkdownChange() {
    this.setState({ value: React.findDOMNode(this.refs.textarea).value });
  },
  /** @inherideddoc */
  render: function renderMarkdownComponent() {
    var converter = window.Showdown ? function (data) {
      console.warn("showdown should be imported/");return data;
    } : new window.Showdown.converter();
    return React.createElement(
      "div",
      { className: "MarkdownEditor" },
      React.createElement("textarea", {
        onChange: this.handleChange,
        ref: "textarea",
        defaultValue: this.state.value }),
      React.createElement("div", {
        className: "content",
        dangerouslySetInnerHTML: {
          __html: converter.makeHtml(this.state.value)
        }
      })
    );
  }
};

module.exports = builder(markdownEditorMixin);

},{}],35:[function(require,module,exports){
"use strict";

//Dependencies.
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: "text",
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type("string"),
    value: type(["string", "number"]),
    name: type("string"),
    style: type("object")
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateInputText() {
    return {
      value: this.props.value
    };
  },
  /**
   * Update the component.
   * @param {object} newProps - The new props to update.
   */
  componentWillReceiveProps: function inputWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getInputTextValue() {
    return this.getDOMNode().value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function inputOnChange(event) {
    //On change handler.
    if (this.props.onChange) {
      return this.props.onChange(event);
    } else {
      //Set the state then call the change handler.
      this.setState({ value: event.target.value });
    }
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return React.createElement("input", {
      id: this.props.name,
      name: this.props.name,
      value: this.state.value,
      type: this.props.type,
      className: this.props.style["class"],
      onChange: this._handleOnChange
    });
  }
};

module.exports = builder(inputTextMixin);

},{}],36:[function(require,module,exports){
"use strict";

//Target
/*
<div class="checkbox">
  <label>
    <input type="checkbox"> Checkbox
  </label>
</div>
 */
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
/**
*
* @type {Object}
*/
var textAreaMixin = {
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      minlength: 0,
      maxlength: undefined,
      wrap: "soft",
      required: false,
      label: undefined,
      style: {},
      rows: 5,
      cols: 50
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    minlength: type("number"),
    maxlength: type("number"),
    wrap: type("string"),
    required: type("bool"),
    value: type("string"),
    label: type("string"),
    style: type("object"),
    rows: type("number"),
    cols: type("number")
  },
  /** inheritedDoc */
  getInitialState: function getTextAreaInitialState() {
    return {
      value: this.props.value
    };
  },
  /**
   * On change handler.
   * @param {object} event - Sanitize event.
   */
  _onChange: function onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getTextAreaValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderTextArea() {
    return React.createElement(
      "textarea",
      {
        ref: "textarea",
        onChange: this._onChange,
        cols: this.props.cols,
        rows: this.props.rows,
        minlength: this.props.minlength,
        maxlength: this.props.maxlength,
        className: this.props.style.className
      },
      this.state.value
    );
  }
};

module.exports = builder(textAreaMixin);

},{}],37:[function(require,module,exports){
"use strict";

//Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var fieldGridBehaviourMixin = require("../../mixin/field-grid-behaviour");

var toggleMixin = {
  mixins: [fieldGridBehaviourMixin],
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type("bool"),
    label: type("string"),
    style: type("object")
  },
  getInitialState: function getInitialState() {
    return {
      isChecked: this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  _labelClassName: function labelClassName() {
    return "" + this._getContentGridClassName();
  },
  /**
   * Get the value from the input in  the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderToggle() {
    return React.createElement(
      "div",
      { className: "togglebutton form-group" },
      React.createElement(
        "label",
        { className: this._getLabelGridClassName() },
        this.props.label ? this.props.label : ""
      ),
      React.createElement(
        "label",
        { className: this._labelClassName() },
        React.createElement("input", { ref: "checkbox", checked: this.state.isChecked, onChange: this._onChange, type: "checkbox" })
      )
    );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function toggleWillreceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({ isChecked: nextProps.value });
    }
  }
};

module.exports = builder(toggleMixin);

},{"../../mixin/field-grid-behaviour":43}],38:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
/**
 * Label mixin for form.
 * @type {Object}
 */
var labelMixin = {
  mixins: [require("../i18n/mixin")],
  getDefaultProps: function getDefaultProps() {
    return {
      name: undefined,
      key: undefined,
      style: { className: "" }
    };
  },
  render: function render() {
    return React.createElement(
      "label",
      { className: this.props.style.className, htmlFor: this.props.name },
      this.i18n(this.props.name)
    );
  }
};

module.exports = builder(labelMixin);

},{"../i18n/mixin":27}],39:[function(require,module,exports){
"use strict";

//var SelectionList = Focus.components.list.selection.list.component;
var builder = window.Focus.component.builder;
var React = window.React;
var Button = require("../button/action").component;
var selectionListMixin = require("../../list/selection/list").mixin;
var assign = require("object-assign");
//Pour étendre SelectionList
//TODO Comment étendre une méthode d'un mixin d'une meilleur façon que celle la ?
var MySelectionList = React.createClass(assign(selectionListMixin, {
  _renderManualFetch: function renderManualFetch() {
    if (this.props.isManualFetch && this.props.hasMoreData) {
      var style = { className: "primary" };
      return React.createElement(
        "li",
        { className: "sl-button" },
        React.createElement(Button, { label: "Next",
          type: "button",
          handleOnClick: this._handleShowMore,
          style: style })
      );
    }
  }
}));

module.exports = React.createClass({
  displayName: "exports",

  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      reference: {}
    };
  },
  /** @inheritdoc */
  getInitialState: function getInitialState() {
    return { maxElements: this.props.perPage * page };
  },
  fetchNextPage: function fetchNextPage(page) {
    /** @inheritdoc */
    this.setState({ maxElements: this.props.perPage * page });
  },
  /** @inheritdoc */
  getDataToUse: function getDataToUse() {
    if (!this.props.data) {
      return [];
    }
    return this.props.data.slice(0, this.state.maxElements ? this.state.maxElements : this.props.perPage);
  },
  getReference: function getReference() {
    return this.state.reference || this.props.reference;
  },
  /** @inheritdoc */
  render: function renderFormList() {
    var data = this.props.data || [];
    var hasMoreData = data.length > (this.state.maxElements ? this.state.maxElements : this.props.perPage);
    return React.createElement(MySelectionList, {
      data: this.getDataToUse(),
      hasMoreData: hasMoreData,
      lineComponent: this.props.line,
      isSelection: false,
      isManualFetch: true,
      fetchNextPage: this.fetchNextPage,
      reference: this.getReference()
    });
  }
});

},{"../../list/selection/list":64,"../button/action":13,"object-assign":253}],40:[function(require,module,exports){
"use strict";

var React = window.React;
var Field = require("../field").component;
var Text = require("../display/text").component;
var Button = require("../button/action").component;
var List = require("../list");
var fieldComponentBehaviour = require("./field-component-behaviour");
var assign = require("object-assign");
module.exports = {
  mixins: [fieldComponentBehaviour],
  /**
   * Create a field for the given property metadata.
   * @param {string} name - property name.
   * @param {object} options - An object which contains all options for the built of the field.
   * @returns {object} - A React Field.
   */
  fieldFor: function fieldFor(name, options) {
    options = assign({}, {
      style: { className: "" }
    }, options);

    var fieldProps = this._buildFieldProps(name, options, this);
    return React.createElement(Field, fieldProps);
  },
  /**
   * Select component for the component.
   * @param {string} name - property name.
   * @param {string} listName - list name.
   * @param {object} options - options object.
   * @returns {object} - A React Field.
   */
  selectFor: function selectFor(name, listName, options) {
    options = options || {};
    options.listName = listName || options.listName;
    var fieldProps = this._buildFieldProps(name, options, this);
    return React.createElement(Field, fieldProps);
  },
  /**
   * Display a field.
   * @param {string} name - property name.
   * @param {object} options - options object.
   * @returns {object} - A React Field.
   */
  displayFor: function displayFor(name, options) {
    options = options || {};
    options.isEdit = false;
    var fieldProps = this._buildFieldProps(name, options, this);
    return React.createElement(Field, fieldProps);
  },
  /**
   * Display the text for a given property.
   * @param {string} name  - property name.
   * @param {object} options - Option object
   * @returns {object} - A React component.
   */
  textFor: function textFor(name, options) {
    options = options || {};
    var def = this.definition && this.definition[name] ? this.definition[name] : {};
    return React.createElement(Text, {
      name: options.name || "" + this.definitionPath + "." + name,
      style: options.style,
      FieldComponent: def.FieldComponent,
      formatter: options.formatter || def.formatter,
      value: this.state[name]
    });
  },
  /**
   * Display a list component.
   * @param {string} name - Property name.
   * @param {object} options - Options object.
   * @returns {object} - The react component for the line.
   */
  listFor: function listFor(name, options) {
    options = options || {};
    options.reference = options.reference || this.state.reference;
    return React.createElement(List, {
      data: this.state[name],
      line: options.LineComponent || this.props.LineComponent || this.LineComponent,
      perPage: options.perPage || 5,
      reference: options.reference,
      isEdit: options.isEdit !== undefined ? options.isEdit : false
    });
  },
  /**
   * Button delete generation.
   * @returns {object} - A Reacte button.
   */
  buttonDelete: function buttonDelete() {
    var form = this;
    return React.createElement(Button, {
      label: "delete",
      type: "button",
      style: { className: "delete" },
      handleOnClick: function handleOnClickEdit() {
        form.action["delete"](form._getId());
      }
    });
  },
  /**
   * Edition button.
   * @returns {object} - The React component for the button.
   */
  buttonEdit: function buttonEdit() {
    var form = this;
    return React.createElement(Button, {
      label: "edit",
      type: "button",
      style: { className: "edit icon" },
      handleOnClick: function handleOnClickEdit() {
        form.setState({ isEdit: !form.state.isEdit });
      }
    });
  },
  /**
   * Cancel button.
   * @returns {object} - The React component for the button.
   */
  buttonCancel: function buttonCancel() {
    var form = this;
    return React.createElement(Button, {
      label: "cancel",
      type: "button",
      style: { className: "cancel icon" },
      handleOnClick: function handleOnClickCancel() {
        console.log("cancel icon");
        form.setState({ isEdit: !form.state.isEdit });
      }
    });
  },
  /**
   * Button save generation.
   * @returns {object} - A React  save button.
   */
  buttonSave: function buttonSave() {
    //var form = this;
    return React.createElement(Button, {
      label: "save",
      type: "submit",
      style: { className: "save icon primary" } });
  } };

/*handleOnClick: function handleClickOnSave(e){
  if(form.validate()){
    form.action.save(form._getEntity());
  }
  return;
}*/

},{"../button/action":13,"../display/text":18,"../field":19,"../list":39,"./field-component-behaviour":42,"object-assign":253}],41:[function(require,module,exports){
"use strict";

//Dependencies.
/**
 * Accessor on the entity informations.
 * @type {function} - Get the entity definition for a given key.
 */
var getEntityDefinition = window.Focus.definition.entity.builder.getEntityInformations;

var definitionMixin = {
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition() {
    if (!this.definitionPath) {
      throw new Error("the definition path should be defined to know the domain of your entity property.");
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /** @inheritdoc */
  componentWillMount: function definitionWillMount() {
    this._buildDefinition();
  }
};

module.exports = definitionMixin;

},{}],42:[function(require,module,exports){
"use strict";

var assign = require("object-assign");
var fieldBehaviourMixin = {
  /**
   * Build the field properties.
   * @param {string} name - property name.
   * @param {object} options - An object which contains all options for the built of the field
   * @param {object} context - Function context, this by default.
   * @returns {object} - The constructed props for the field.
   */
  _buildFieldProps: function buildFieldProps(name, options, context) {
    options = options || {};
    context = context || this;
    //Properties.
    var isEdit = options.isEdit !== undefined ? options.isEdit : context.state.isEdit;
    var value = options.value !== undefined ? options.value : context.state[name];
    var def = context.definition && context.definition[name] ? context.definition[name] : {};
    var listName = options.listName || def.listName;
    //hasLabel
    var hasLabel = (function hasLabel() {
      if (options.hasLabel !== undefined) {
        return options.hasLabel;
      }
      if (def.hasLabel !== undefined) {
        return options.hasLabel;
      }return true;
    })();
    //Build a container for the props.
    var name = options.name || "" + this.definitionPath + "." + name;
    var propsContainer = {
      name: name,
      label: def.label || name,
      ref: name,
      value: value,
      error: context.state.error ? context.state.error[name] : undefined,
      //Mode
      isEdit: isEdit,
      hasLabel: hasLabel,
      isRequired: def.isRequired,
      //Style
      style: options.style,
      //Methods
      validator: def.validator,
      formatter: def.formatter,
      //Component
      FieldComponent: def.FieldComponent,
      InputLabelComponent: def.InputLabelComponent,
      InputComponent: def.InputComponent,
      TextComponent: def.TextComponent,
      DisplayComponent: def.DisplayComponent
    };
    // Values list.
    var refContainer = options.refContainer || context.state.reference;
    if (refContainer && refContainer[listName]) {
      assign(propsContainer, { values: refContainer[listName] });
    }
    return propsContainer;
  }
};

module.exports = fieldBehaviourMixin;

},{"object-assign":253}],43:[function(require,module,exports){
"use strict";

var gridSize = 12;

var fieldGridBehaviourMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      /**
       * Size of the label in the grid system.
       * @type {Number}
       */
      labelSize: 2
    };
  },
  /**
   * Get the label gridClass.
   * @returns {string} - The label gridSize.
   */
  _getLabelGridClassName: function getLabelClassName() {
    return "col-sm-" + this.props.labelSize;
  },
  /**
   * Get the content class Name.
   * @returns {string} - The content gridSize.
   */
  _getContentGridClassName: function getContentClassName() {
    return "col-sm-" + (gridSize - this.props.labelSize);
  },
  /**
   * Get the content offset className.
   * @returns {string} - The label gridSize.
   */
  _getContentOffsetClassName: function getContentOffsetClassName() {
    return "col-sm-offset-" + this.props.labelSize;
  }
};
module.exports = fieldGridBehaviourMixin;

},{}],44:[function(require,module,exports){
"use strict";

module.exports = {
  definition: require("./definition"),
  fieldComponentBehaviour: require("./field-component-behaviour"),
  fieldGridBehaviour: require("./field-grid-behaviour"),
  referenceProperty: require("./reference-property"),
  storeBehaviour: require("./store-behaviour")
};

},{"./definition":41,"./field-component-behaviour":42,"./field-grid-behaviour":43,"./reference-property":45,"./store-behaviour":46}],45:[function(require,module,exports){
"use strict";

var type = window.Focus.component.types;
var referenceMixin = {
  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      /**
       * Size of the label in the grid system.
       * @type {Number}
       */
      reference: {}
    };
  },

  /** @inheritdoc */
  propTypes: {
    reference: type("object")
  },

  /**
   * @returns {object} -
   */
  _getReference: function getReference() {
    return this.props.reference;
  }
};
module.exports = referenceMixin;

},{}],46:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var capitalize = require("lodash/string/capitalize");
var assign = require("object-assign");
var isArray = require("lodash/lang/isArray");

var storeMixin = {
  /**
   * Get the state informations from the store.
   * @returns {object} - The js object constructed from store data.
   */
  _getStateFromStores: function formGetStateFromStore() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    var newState = {};
    this.stores.map(function (storeConf) {
      storeConf.properties.map(function (property) {
        newState[property] = storeConf.store["get" + capitalize(property)]();
      });
    });
    return assign(this._computeEntityFromStoresData(newState), this._getLoadingStateFromStores());
  },
  /**
   * Get the error state informations from the store.
   * @returns {object} - The js error object constructed from the store data.
   */
  _getErrorStateFromStores: function formGetErrorStateFromStore() {
    if (this.getErrorStateFromStore) {
      return this.getErrorStateFromStore();
    }
    var newState = {};
    this.stores.map(function (storeConf) {
      storeConf.properties.map(function (property) {
        newState[property] = storeConf.store["getError" + capitalize(property)]();
      });
    });
    return this._computeEntityFromStoresData(newState);
  },
  /**
   * Get the isLoading state from  all the store.
   */
  _getLoadingStateFromStores: function getLoadingStateFromStores() {
    if (this.getLoadingStateFromStores) {
      return this.getLoadingStateFromStores();
    }
    var isLoading = false;
    this.stores.map(function (storeConf) {
      if (!isLoading) {
        storeConf.properties.map(function (property) {
          if (!isLoading) {
            var propStatus = storeConf.store.getStatus(property) || {};
            isLoading = propStatus.isLoading;
          }
        });
      }
    });
    return { isLoading: isLoading };
  },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   * @returns {object} - The js object transformed from store data.
   */
  _computeEntityFromStoresData: function _computeEntityFromStoresData(data) {
    if (this.computeEntityFromStoresData) {
      return this.computeEntityFromStoresData(data);
    }
    var entity = { reference: {} };
    for (var key in data) {
      if (this.referenceNames && this.referenceNames.indexOf(key) !== -1) {
        entity.reference[key] = data[key];
      } else {
        var d = data[key];
        if (isArray(d)) {
          d = _defineProperty({}, key, d);
        }
        assign(entity, d);
      }
    }
    return entity;
  },
  /**
   * Register all the listeners related to the page.
   */
  _registerListeners: function registerStoreListeners() {
    var _this = this;

    if (this.stores) {
      this.stores.map(function (storeConf) {
        storeConf.properties.map(function (property) {
          storeConf.store["add" + capitalize(property) + "ChangeListener"](_this._onChange);
          storeConf.store["add" + capitalize(property) + "ErrorListener"](_this._onError);
        });
      });
    }
  },
  /**
  * Unregister all the listeners related to the page.
  */
  _unRegisterListeners: function unregisterListener() {
    var _this = this;

    if (this.stores) {
      this.stores.map(function (storeConf) {
        storeConf.properties.map(function (property) {
          storeConf.store["remove" + capitalize(property) + "ChangeListener"](_this._onChange);
          storeConf.store["remove" + capitalize(property) + "ErrorListener"](_this._onError);
        });
      });
    }
  },
  /** @inheritdoc */
  componentWillMount: function storeBehaviourWillMount() {
    //These listeners are registered before the mounting because they are not correlated to the DOM.
    //Build the definitions.
    this._registerListeners();
  },
  /** @inheritdoc */
  componentWillUnmount: function storeBehaviourWillUnmount() {
    this._unRegisterListeners();
  }
};

module.exports = storeMixin;

},{"lodash/lang/isArray":214,"lodash/string/capitalize":246,"object-assign":253}],47:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.Focus.component.builder;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var panelMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      style: {}
    };
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return React.createElement(
        "div",
        { className: "panel-heading" },
        this.props.title
      );
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      "div",
      { className: "panel panel-default " + this.props.style.className },
      this.heading(),
      React.createElement(
        "div",
        { className: "panel-body" },
        this.props.children
      )
    );
  }
};
module.exports = builder(panelMixin);

},{}],48:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var Img = require("../img").component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {object} Defauilt props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            style: "dots-three-vertical"
        };
    },

    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */
    _handleAction: function _handleAction(action) {
        var _this = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
            } else {
                action();
            }
        };
    },

    /**
     * Generate the list of actions.
     * @param {object} operationList List of operations.
     * @returns {Array} List of action in li component.
     * @private
     */
    _getList: function _getList(operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(React.createElement(
                "li",
                { key: key, onClick: this._handleAction(operation.action), className: operation.style },
                React.createElement(
                    "a",
                    { href: "javascript:void(0)" },
                    operation.label
                )
            ));
            if (operation.childOperationList) {
                var subKey = "sub_" + key;
                liList.push(React.createElement(
                    "li",
                    { key: subKey },
                    React.createElement(
                        "ul",
                        null,
                        this._getList(operation.childOperationList)
                    )
                ));
            }
        }
        return liList;
    },

    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render: function renderSelectAcion() {
        if (this.props.operationList.length == 0) {
            return React.createElement("div", null);
        }
        var liList = this._getList(this.props.operationList);
        return React.createElement(
            "div",
            { className: "select-action btn-group" },
            React.createElement(
                "a",
                { href: window.location.pathname, "data-target": "#", className: "dropdown-toggle", "data-toggle": "dropdown" },
                React.createElement(Img, { src: this.props.style })
            ),
            React.createElement(
                "ul",
                { className: "dropdown-menu" },
                liList
            )
        );
    }

};

module.exports = builder(selectActionMixin);

},{"../img":29}],49:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var Checkbox = require("../../input/checkbox");

var checkboxMixin = {
    /**
     * Tag name.
     */
    displayName: "select-checkbox",

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            value: [],
            values: [],
            valueKey: "value",
            labelKey: "label"
        };
    },

    /** @inheritdoc */
    propTypes: function propTypes() {
        return {
            value: type("array"),
            values: type("array"),
            valueKey: type("string"),
            labelKey: type("string"),
            name: type("string"),
            style: type("object")
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialStateSelect() {
        return {
            value: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function selectWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    },

    /**
     * Get the value from the select in the DOM.
     */
    getValue: function getSelectTextValue() {
        return this.state.value;
    },

    _handleChange: function handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        } else {
            var currentValue = this.state.value;
            var selectedValue = event.target.value;
            var idx = currentValue.indexOf(event.target.value);
            if (idx >= 0) {
                currentValue.splice(idx, 1);
            } else {
                currentValue.push(selectedValue);
            }
            this.setState({ value: currentValue });
        }
    },

    /**
     * Render all selection checkbox.
     */
    renderCheckbox: function renderCheckbox() {
        var _this = this;

        var key = 0;
        return this.props.values.map(function (val) {
            var value = val[_this.props.valueKey];
            var label = val[_this.props.labelKey];
            var isChecked = _this.state.value.indexOf(value) >= 0;
            return React.createElement(
                "div",
                { className: "paper-cb", key: key++ },
                React.createElement(
                    "label",
                    { className: "paper-cb-label" },
                    React.createElement("input", { type: "checkbox",
                        name: _this.props.name,
                        value: value,
                        checked: isChecked,
                        onChange: _this._handleChange,
                        className: "paper-cbx"
                    }),
                    React.createElement(
                        "div",
                        null,
                        label
                    )
                )
            );
        });
    },

    /** @inheritdoc */
    render: function render() {
        return React.createElement(
            "div",
            {
                className: this.props.style.className,
                name: this.props.name
            },
            this.renderCheckbox()
        );
    }
};

module.exports = builder(checkboxMixin);

},{"../../input/checkbox":31}],50:[function(require,module,exports){
"use strict";

//Dependencies.
var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var selectTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getSelectDefaultProps() {
    return {
      multiple: false,
      value: undefined,
      values: [],
      valueKey: "value",
      labelKey: "code",
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    multiple: type("bool"),
    value: type(["number", "string"]),
    values: type("array"),
    valueKey: type("string"),
    labelKey: type("string"),
    name: type("string"),
    style: type("object")
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateSelect() {
    return {
      value: this.props.value
    };
  },
  /** @inheritdoc */
  componentWillReceiveProps: function selectWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  },
  /**
   * Get the value from the select in the DOM.
   */
  getValue: function getSelectTextValue() {
    return React.findDOMNode(this).value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function selectOnChange(event) {
    //On change handler.
    if (this.props.onChange) {
      this.props.onChange(event);
    } else {
      //Set the state then call the change handler.
      this.setState({ value: event.target.value });
    }
  },
  /**
   * Render options.
   */
  renderOptions: function renderOptions() {
    var _this = this;

    return this.props.values.map(function (val) {
      var value = val[_this.props.valueKey];
      return React.createElement(
        "option",
        { key: value, value: value },
        val[_this.props.labelKey]
      );
    });
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderSelect() {
    return React.createElement(
      "select",
      {
        multiple: this.props.multiple,
        value: this.state.value,
        className: this.props.style.className,
        name: this.props.name,
        onChange: this._handleOnChange
      },
      this.renderOptions()
    );
  }
};

module.exports = builder(selectTextMixin);

},{}],51:[function(require,module,exports){
"use strict";

module.exports = {
  classic: require("./classic"),
  radio: require("./radio"),
  checkbox: require("./checkbox")
};

},{"./checkbox":49,"./classic":50,"./radio":52}],52:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;

var radioMixin = {
    /**
     * Tag name.
     */
    displayName: "select-radio",

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            values: [],
            valueKey: "value",
            labelKey: "label"
        };
    },

    /** @inheritdoc */
    propTypes: function propTypes() {
        return {
            value: type(["number", "string"]),
            values: type("array"),
            valueKey: type("string"),
            labelKey: type("string"),
            name: type("string"),
            style: type("object")
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialStateSelect() {
        return {
            value: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function selectWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    },

    /**
     * Get the value from the select in the DOM.
     */
    getValue: function getSelectTextValue() {
        return this.state.value;
    },

    /**
     * handle click on radio
     * @param {object} event - the click event
     */
    _handleChange: function selectOnChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        } else {
            //Set the state then call the change handler.
            this.setState({ value: event.target.value });
        }
    },

    /**
     * Render radio for each values
     * @return {XML} the different radio values
     */
    renderRadios: function renderRadio() {
        var _this = this;

        var key = 0;
        return this.props.values.map(function (val) {
            var value = val[_this.props.valueKey];
            var label = val[_this.props.labelKey];
            var isChecked = value == _this.state.value;
            return React.createElement(
                "div",
                { className: "radio radio-primary", key: key++ },
                React.createElement(
                    "label",
                    null,
                    React.createElement("input", { type: "radio",
                        name: _this.props.name,
                        value: value,
                        checked: isChecked,
                        onChange: _this._handleChange
                    }),
                    React.createElement("span", { className: "circle" }),
                    React.createElement("span", { className: "check" }),
                    React.createElement(
                        "div",
                        null,
                        label
                    )
                )
            );
        });
    },

    /** @inheritdoc */
    render: function renderRadio() {
        return React.createElement(
            "div",
            {
                className: this.props.style.className,
                name: this.props.name
            },
            this.renderRadios()
        );
    }
};

module.exports = builder(radioMixin);

},{}],53:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
/**
 * Mixin component for the sticky navigation.
 * @type {Object}
 */
var stickyNavigationMixin = {

    /** @inheritedDoc */
    displayName: "sticky-navigation",

    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
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
            navBarId: "navbar",
            /**
             * Selector for the title elements to display in the sticky navigation.
             * @type {String}
             */
            titleSelector: "[data-menu]",
            /**
             * Style informations such as the className.
             * @type {Object}
             */
            style: {}
        };
    },
    /** @inheritedDoc */
    propTypes: {
        contentSelector: type("string"),
        navBarId: type("string"),
        titleSelector: type("string"),
        style: type("object")
    },
    /** @inheritedDoc */
    getInitialState: function getStickyNavigationInitialState() {
        return { menuList: [] };
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
    _buildMenuList: function buildMenuList() {
        //Get all title elements form the DOM elements read in the selector.
        var titleListElements = document.querySelectorAll(this.props.titleSelector);
        var menuList = [];
        for (var key in titleListElements) {
            menuList.push(this._renderLink(titleListElements[key]));
        }
        //Update the menu list into the state.
        this.setState({ menuList: menuList });
    },
    _registerScrollSpyAttributes: function registerScrollSpyAttributes() {
        var content = document.querySelector(this.props.contentSelector);
        content.setAttribute("data-spy", "scroll");
        content.setAttribute("data-target", "#" + this.props.navBarId);
    },
    /** @inheritedDoc */
    render: function renderStickyNavigation() {
        var className = "sticky-navigation bs-docs-sidebar hidden-print hidden-xs hidden-sm affix " + this.props.style.className;
        return React.createElement(
            "nav",
            { className: className, id: this.props.navBarId },
            React.createElement(
                "ul",
                { className: "nav bs-docs-sidenav", role: "tablist" },
                this.state.menuList
            )
        );
    },
    /**
     * Render the list of links.
     * @param anchor
     * @returns {JSX}
     */
    _renderLink: function renderLink(title) {
        if (title.getAttribute) {
            var link = "#" + title.getAttribute("id");
            return React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: link },
                    title.innerText
                )
            );
        }
    }
};

module.exports = builder(stickyNavigationMixin);

},{}],54:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;

var titleMixin = {

    /**
     * Display name.
     */
    displayName: "title",

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            id: undefined,
            title: undefined
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderStickyNavigation() {
        return React.createElement(
            "h3",
            { id: this.props.id, "data-menu": true },
            this.props.title
        );
    }

};

module.exports = builder(titleMixin);

},{}],55:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;

var topicDisplayerMixin = {

    /**
     * Display name.
     */
    displayName: "topic-displayer",

    /**
     * Default props.
     * @returns {object} Defautl props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction: function topicClickAction(key) {}, // Action when click on topic
            topicList: {} // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderSelectAcion() {
        var topicList = [];
        var className = "btn btn-primary btn-raised topic";
        for (var key in this.props.topicList) {
            topicList.push(React.createElement(
                "a",
                { key: key, href: "javascript:void(0)", onClick: this.topicClickHandler(key), className: className },
                this.props.topicList[key]
            ));
        }
        var style = "topic-displayer bs-component ";
        if (this.props.style) {
            style += this.props.style;
        }
        return React.createElement(
            "p",
            { className: style },
            topicList
        );
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(key) {
        var _this = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            _this.props.topicClickAction(key);
        };
    }
};

module.exports = builder(topicDisplayerMixin);

},{}],56:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var SelectAction = require("../../common/select-action").component;
var ActionContextual = require("../action-contextual").component;
var TopicDisplayer = require("../../common/topic-displayer").component;

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-bar",

    /**
     * INit default props
     * @returns {object} Defautkl props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            selectionStatus: "none", // none, selected, partial
            selectionAction: function selectionAction(selectionStatus) {
                console.warn(selectionStatus);
            }, // Action on selection click
            orderableColumnList: undefined, // [{key:"columnKey", label:"columnLabel"}]
            orderAction: function orderAction(key, order) {
                console.warn(key + "-" + order);
            }, // Action on click on order function
            orderSelected: {},
            facetClickAction: function facetClickAction(key) {
                console.warn(key);
            }, // Action when click on facet
            facetList: {}, // {facet1: "Label of facet one", facet2:"Label of facet 2"} List of facets
            groupableColumnList: {}, // {col1: "Label1", col2: "Label2"}
            groupAction: function groupAction(key) {
                console.warn(key);
            }, // Action on group function
            groupSelectedKey: undefined, // Defautl grouped key.
            operationList: [] // List of contextual operations
        };
    },

    /**
     * @returns {JSX} Selection component.
     * @private
     */
    _getSelectionObject: function _getSelectionObject() {
        // Selection datas
        var selectionOperationList = [{ action: this._selectionFunction("selected"), label: "all", style: this._getSelectedStyle(this.props.selectionStatus, "selected") }, { action: this._selectionFunction("none"), label: "none", style: this._getSelectedStyle(this.props.selectionStatus, "none") }];
        return React.createElement(SelectAction, { style: this._getSelectionObjectStyle(), operationList: selectionOperationList });
    },

    /**
     * @returns {JSX} Order component.
     * @private
     */
    _getOrderObject: function _getOrderObject() {
        if (this.props.orderableColumnList) {
            var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;
            var orderOperationList = []; // [{key:"columnKey", order:"asc", label:"columnLabel"}]
            for (var key in this.props.orderableColumnList) {
                var description = this.props.orderableColumnList[key];
                orderOperationList.push({
                    action: this._orderFunction(description.key, description.order),
                    label: description.label,
                    style: this._getSelectedStyle(description.key + description.order, orderSelectedParsedKey)
                });
            }
            var orderStyle = this.props.orderSelected.order ? "circle-up" : "chevron-up";
            return React.createElement(SelectAction, { key: "down", style: orderStyle, operationList: orderOperationList });
        }
        return "";
    },

    /**
     * @returns {JSX} Grouping component.
     * @private
     */
    _getGroupObject: function _getGroupObject() {
        var groupList = [];
        for (var key in this.props.groupableColumnList) {
            groupList.push({
                action: this._groupFunction(key),
                label: this.props.groupableColumnList[key],
                style: this._getSelectedStyle(key, this.props.groupSelectedKey)
            });
        }
        var groupOperationList = [{ label: "action.group", childOperationList: groupList }, { label: "action.ungroup", action: this._groupFunction(null) }];
        var groupStyle = this.props.groupSelectedKey ? "controller-record" : "dots-three-vertical";
        return React.createElement(SelectAction, { style: groupStyle, operationList: groupOperationList });
    },

    /**
     * @param {string} currentKey Current selected key.
     * @param {string} selectedKey Key corresponding to the selected one.
     * @returns {string} Class selected if currentKey corresponds to the selectedKey.
     * @private
     */
    _getSelectedStyle: function _getSelectedStyle(currentKey, selectedKey) {
        if (currentKey == selectedKey) {
            return " selected ";
        }
        return undefined;
    },

    /**
     * @return {string} Class of the selection component icon.
     * @private
     */
    _getSelectionObjectStyle: function _getSelectionObjectStyle() {
        if (this.props.selectionStatus == "none") {
            return "checkbox-unchecked";
        } else if (this.props.selectionStatus == "selected") {
            return "checkbox-checked";
        }
        return "notification";
    },

    _selectionFunction: function _selectionFunction(selectionStatus) {
        var _this = this;

        return function () {
            _this.props.selectionAction(selectionStatus);
        };
    },
    _orderFunction: function _orderFunction(key, order) {
        var _this = this;

        return function () {
            _this.props.orderAction(key, order);
        };
    },
    _groupFunction: function _groupFunction(key) {
        var _this = this;

        return function () {
            _this.props.groupAction(key);
        };
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     */
    render: function renderActionBar() {
        return React.createElement(
            "div",
            { className: "action-bar" },
            React.createElement(
                "div",
                { className: "general-action" },
                this._getSelectionObject(),
                " ",
                this._getOrderObject(),
                " ",
                this._getGroupObject()
            ),
            React.createElement(
                "div",
                { className: "facet-container" },
                React.createElement(TopicDisplayer, { topicList: this.props.facetList, topicClickAction: this.props.facetClickAction })
            ),
            React.createElement(
                "div",
                { className: "contextual-action" },
                React.createElement(ActionContextual, { operationList: this.props.operationList })
            )
        );
    }
};

module.exports = builder(actionBarMixin);

},{"../../common/select-action":48,"../../common/topic-displayer":55,"../action-contextual":57}],57:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var Button = require("../../common/button/action").component;
var SelectAction = require("../../common/select-action").component;

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-contextual",

    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            operationParam: undefined
        };
    },
    /**
     * Init default state.
     * @returns {oject} Initial state.
     */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false // true if secondary actionList is expanded.
        };
    },

    /**
     * handle contextual action on click.
     * @param {string} key Action key.
     */
    _handleAction: function handleContextualAction(key) {
        var _this = this;

        return function (event) {
            event.preventDefault();
            if (_this.props.operationParam) {
                _this.props.operationList[key].action(_this.props.operationParam);
            } else {
                _this.props.operationList[key].action();
            }
        };
    },

    /**
     * render the component.
     * @returns {JSX} Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push(React.createElement(Button, { key: key, style: operation.style, handleOnClick: this._handleAction(key), label: operation.label }));
            } else {
                secondaryActionList.push(operation);
            }
        }
        return React.createElement(
            "div",
            { className: "list-action-contextual" },
            React.createElement(
                "span",
                null,
                " ",
                primaryActionList
            ),
            React.createElement(SelectAction, { operationList: secondaryActionList, operationParam: this.props.operationParam, isExpanded: this.state.isSecondaryActionListExpanded })
        );
    }
};

module.exports = builder(actionContextualMixin);

},{"../../common/button/action":13,"../../common/select-action":48}],58:[function(require,module,exports){
"use strict";

module.exports = {
	actionBar: require("./action-bar"),
	actionContextual: require("./action-contextual"),
	selection: require("./selection"),
	summary: require("./summary"),
	timeline: require("./timeline"),
	table: require("./table")
};

},{"./action-bar":56,"./action-contextual":57,"./selection":62,"./summary":65,"./table":66,"./timeline":69}],59:[function(require,module,exports){
"use strict";

var React = window.React;
var fielBehaviourMixin = require("../../common/mixin/field-component-behaviour");
var assign = require("object-assign");
var Field = require("../../common/field").component;
var Text = require("../../common/display/text").component;

var builtInComponentsMixin = {
    /**
     * inherited minxins
     */
    mixins: [fielBehaviourMixin],

    /**
     * @inheritDoc
     */
    getDefaultProps: function getbuiltInComponentsMixinDefaultProps() {
        return {
            isEdit: false
        };
    },

    /**
     * create an edit field for the given property metadata.
     * @param {string} name - name of the field.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    fieldFor: function fieldForInLine(name, options) {
        options = assign({}, {
            isEdit: this.props.isEdit,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference,
            style: { className: "form-list" }
        }, options);

        var fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },
    /**
     * Add a select with a list name component It is a shortcut for the fieldComponent.
     * @param {string} name         - The property name.
     * @param {string} referenceKey - The list name in the references.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    selectFor: function selectForInLine(name, referenceKey, options) {
        options = options || {};
        options.listName = referenceKey;
        return this.fieldFor(name, options);
    },
    /**
     * Display a field.
     * @param {string} name - property name.
     * @param {object} options - options object.
     * @returns {object} - A React Field in display mode.
     */
    displayFor: function displayForInLine(name, options) {
        options = assign({}, {
            isEdit: false,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference,
            style: { className: "form-list" }
        }, options);

        var fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },

    /**
     * Display the text for a given property.
     * @param {string} name  - property name.
     * @param {object} options - Option object
     * @returns {object} - A React component.
     */
    textFor: function textFor(name, options) {
        options = options || {};
        var def = this.definition && this.definition[name] ? this.definition[name] : {};
        return React.createElement(Text, {
            name: options.name || "" + this.definitionPath + "." + name,
            style: options.style,
            FieldComponent: def.FieldComponent,
            formatter: options.formatter || def.formatter,
            value: this.props.data[name]
        });
    }
};

module.exports = builtInComponentsMixin;

},{"../../common/display/text":18,"../../common/field":19,"../../common/mixin/field-component-behaviour":42,"object-assign":253}],60:[function(require,module,exports){
"use strict";

var topOfElement = (function (_topOfElement) {
    var _topOfElementWrapper = function topOfElement(_x) {
        return _topOfElement.apply(this, arguments);
    };

    _topOfElementWrapper.toString = function () {
        return _topOfElement.toString();
    };

    return _topOfElementWrapper;
})(function (element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
});

var paginationMixin = require("../mixin/pagination").mixin;
/**
 *
 * Mixin which add infinite scroll behavior.
 */
var InfiniteScrollMixin = {

    mixins: [paginationMixin],
    /**
     * defaults props for the mixin.
     * @returns {object} - the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount: function componentWillMount() {
        this.nextPage = this.props.initialPage;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount: function componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount: function componentDidMount() {
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate: function componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener: function scrollListener() {
        var el = this.getDOMNode();
        var scrollTop = this.parentNode.pageYOffset !== undefined ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }

        //calculate visible index in the list
        /*var topHeader = topOfElement(el);
        var pageHeight = topHeader+el.offsetHeight;
        var scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        var visibleIndex = (scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length;
        console.log(visibleIndex);*/
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener: function attachScrollListener() {
        if (!this.props.hasMoreData) {
            return;
        }
        this.parentNode.addEventListener("scroll", this.scrollListener);
        this.parentNode.addEventListener("resize", this.scrollListener);
        this.scrollListener();
    },

    /**
     * detach scroll listener on the component
     */
    detachScrollListener: function detachScrollListener() {
        this.parentNode.removeEventListener("scroll", this.scrollListener);
        this.parentNode.removeEventListener("resize", this.scrollListener);
    }
};

module.exports = { mixin: InfiniteScrollMixin };

},{"../mixin/pagination":61}],61:[function(require,module,exports){
"use strict";

var type = window.Focus.component.types;

var paginationMixin = {
    /**
     * @inheritDoc
     */
    getDefaultProps: function getPaginationDefaultProps() {
        return {
            hasMoreData: false,
            isManualFetch: false
        };
    },

    propTypes: {
        hasMoreData: type("bool"),
        fetchNextPage: type("func"),
        isManualFetch: type("bool")
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*} the next page
     */
    fetchNextPage: function fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param {object} event event received
     */
    handleShowMore: function handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    }
};

module.exports = { mixin: paginationMixin };

},{}],62:[function(require,module,exports){
"use strict";

module.exports = {
    line: require("./line"),
    list: require("./list")
};

},{"./line":63,"./list":64}],63:[function(require,module,exports){
"use strict";

/**@jsx*/
var React = window.React;
var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
var ContextualActions = require("../action-contextual").component;
var CheckBox = require("../../common/input/checkbox").component;
var translationMixin = require("../../common/i18n").mixin;
var referenceMixin = require("../../common/mixin/reference-property");
var definitionMixin = require("../../common/mixin/definition");
var builtInComponentsMixin = require("../mixin/built-in-components");

var lineMixin = {
    /**
     * React component name.
     */
    displayName: "selection-line",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**
     * Default properties for the line.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            operationList: []
        };
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("object"),
        isSelection: type("bool"),
        isSelected: type("bool"),
        onLineClick: type("func"),
        onSelection: type("func"),
        operationList: type("array")
    },

    /**
     * State initialization.
     * @returns {{isSelected: boolean, lineItem: *}}
     */
    getInitialState: function getLineInitialState() {
        return {
            isSelected: this.props.isSelected || false
        };
    },

    /**
     * Update properties on component.
     * @param nextProps next properties
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isSelected !== undefined) {
            this.setState({ isSelected: nextProps.isSelected });
        }
    },

    /**
     * Get the line value.
     * @returns {{item: *, isSelected: (*|isSelected|boolean)}}
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data,
            isSelected: this.state.isSelected
        };
    },

    /**
     * Selection Click handler.
     * @param event
     */
    _handleSelectionClick: function handleSelectionClick(event) {
        var select = !this.state.isSelected;
        this.setState({ isSelected: select });
        if (this.props.onSelection) {
            this.props.onSelection(this.props.data, select);
        }
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event) {
        if (this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * Render the left box for selection
     * @returns {XML}
     */
    _renderSelectionBox: function renderSelectionBox() {
        if (this.props.isSelection) {
            var selectionClass = this.state.isSelected ? "selected" : "no-selection";
            //var image = this.state.isSelected? undefined : <img src={this.state.lineItem[this.props.iconfield]}/>
            return React.createElement(
                "div",
                { className: "sl-selection " + selectionClass },
                React.createElement(CheckBox, { value: this.state.isSelected, onChange: this._handleSelectionClick })
            );
        }
        return null;
    },

    /**
     * render content for a line.
     * @returns {*}
     */
    _renderLineContent: function renderLineContent() {
        if (this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        } else {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    this.props.data.title
                ),
                React.createElement(
                    "div",
                    null,
                    this.props.data.body
                )
            );
        }
    },

    /**
     * Render actions wich can be applied on the line
     */
    _renderActions: function renderLineActions() {
        if (this.props.operationList.length > 0) {
            return React.createElement(
                "div",
                { className: "sl-actions" },
                React.createElement(ContextualActions, { operationList: this.props.operationList, operationParam: this.props.data })
            );
        }
    },

    /**
     * Render line in list.
     * @returns {*}
     */
    render: function renderLine() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                "li",
                { className: "sl-line" },
                this._renderSelectionBox(),
                React.createElement(
                    "div",
                    { className: "sl-content", onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

module.exports = { mixin: lineMixin };

},{"../../common/i18n":26,"../../common/input/checkbox":31,"../../common/mixin/definition":41,"../../common/mixin/reference-property":45,"../action-contextual":57,"../mixin/built-in-components":59}],64:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var React = window.React;
var Line = require("./line").mixin;
var Button = require("../../common/button/action").component;
var type = window.Focus.component.types;
var translationMixin = require("../../common/i18n").mixin;
var infiniteScrollMixin = require("../mixin/infinite-scroll").mixin;
var referenceMixin = require("../../common/mixin/reference-property");
var checkIsNotNull = window.Focus.util.object.checkIsNotNull;

var listMixin = {
    /**
     * Display name.
     */
    displayName: "selection-list",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
     * Default properties for the list.
     * @returns {{isSelection: boolean}} the default properties
     */
    getDefaultProps: function getListDefaultProps() {
        return {
            data: [],
            isSelection: true,
            selectionStatus: "partial",
            isLoading: false,
            operationList: [],
            idField: "id"
        };
    },

    /**
     * list property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("array"),
        isSelection: type("bool"),
        onSelection: type("func"),
        onLineClick: type("func"),
        isLoading: type("bool"),
        loader: type("func"),
        operationList: type("array"),
        idField: type("string"),
        lineComponent: type("func", true),
        selectionStatus: type("string")
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount() {
        checkIsNotNull("lineComponent", this.props.lineComponent);
    },

    /**
     * Return selected items in the list.
     * @return {Array} selected items
     */
    getSelectedItems: function getListSelectedItems() {
        var selected = [];
        for (var i = 1; i < this.props.data.length + 1; i++) {
            var lineName = "line" + i;
            var lineValue = this.refs[lineName].getValue();
            if (lineValue.isSelected) {
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
     * Render lines of the list.
     * @returns {*} DOM for lines
     */
    _renderLines: function renderLines() {
        var _this = this;

        var lineCount = 1;
        var LineComponent = this.props.lineComponent;
        return this.props.data.map(function (line) {
            var isSelected;
            switch (_this.props.selectionStatus) {
                case "none":
                    isSelected = false;
                    break;
                case "selected":
                    isSelected = true;
                    break;
                case "partial":
                    isSelected = undefined;
                    break;
                default:
                    isSelected = false;
            }
            return React.createElement(LineComponent, {
                key: line[_this.props.idField],
                data: line,
                ref: "line" + lineCount++,
                isSelection: _this.props.isSelection,
                isSelected: isSelected,
                onSelection: _this.props.onSelection,
                onLineClick: _this.props.onLineClick,
                operationList: _this.props.operationList,
                reference: _this._getReference()
            });
        });
    },
    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                "li",
                { className: "sl-loading" },
                this.i18n("list.loading"),
                " ..."
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: "primary" };
            return React.createElement(
                "li",
                { className: "sl-button" },
                React.createElement(Button, { label: "list.button.showMore",
                    type: "button",
                    handleOnClick: this.handleShowMore,
                    style: style })
            );
        }
    },

    /**
     * Render the list.
     * @returns {XML} DOM of the component
     */
    render: function renderList() {
        return React.createElement(
            "ul",
            { className: "selection-list" },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);

},{"../../common/button/action":13,"../../common/i18n":26,"../../common/mixin/reference-property":45,"../mixin/infinite-scroll":60,"./line":63}],65:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var TopicDisplayer = require("../../common/topic-displayer").component;
var Button = require("../../common/button/action").component;

var listSummaryMixin = {
    mixins: [require("../../common/i18n/mixin")],
    /**
     * Display name.
     */
    displayName: "list-summary",

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            nb: undefined,
            queryText: undefined,
            scopeList: {},
            scopeClickAction: function scopeClickAction(scopeKey) {},
            exportAction: function exportAction() {}
        };
    },

    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render: function renderActionBar() {
        if (this.props.nb) {
            var nbResult = React.createElement(
                "div",
                { className: "nb-result" },
                React.createElement(
                    "b",
                    null,
                    this.props.nb
                ),
                " ",
                this.i18n("result.for"),
                " \"",
                this.props.queryText,
                "\""
            );
        } else {
            var nbResult = React.createElement("div", { className: "nb-result" });
        }
        return React.createElement(
            "div",
            { className: "list-summary" },
            nbResult,
            React.createElement(
                "div",
                { className: "scope" },
                React.createElement(TopicDisplayer, { topicList: this.props.scopeList, topicClickAction: this.props.scopeClickAction })
            ),
            React.createElement(
                "div",
                { className: "print" },
                React.createElement(Button, { imgSrc: "print", handleOnClick: this.props.exportAction })
            )
        );
    }
};

module.exports = builder(listSummaryMixin);

},{"../../common/button/action":13,"../../common/i18n/mixin":27,"../../common/topic-displayer":55}],66:[function(require,module,exports){
"use strict";

module.exports = {
    line: require("./line"),
    list: require("./list")
};

},{"./line":67,"./list":68}],67:[function(require,module,exports){
"use strict";

var React = window.React;
var type = window.Focus.component.types;
var translationMixin = require("../../common/i18n").mixin;
var referenceMixin = require("../../common/mixin/reference-property");
var definitionMixin = require("../../common/mixin/definition");
var builtInComponentsMixin = require("../mixin/built-in-components");

var lineMixin = {
    /**
     * React component name.
     */
    displayName: "table-line",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**@inheritDoc**/
    getDefaultProps: function getLineDefaultProps() {
        return {};
    },

    /**@inheritDoc**/
    getInitialState: function getInitialSate() {
        return {};
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        saveAction: type("func"),
        deleteAction: type("func"),
        onLineClick: type("func"),
        onSelection: type("func")
    },

    /**
     * Render line Actions.
     */
    renderActions: function renderLineActions() {},

    render: function renderLine() {
        return this.renderLineContent();
    }
};

module.exports = { mixin: lineMixin };

//TODO ajouter les actions sur une ligne : edit save et delete

},{"../../common/i18n":26,"../../common/mixin/definition":41,"../../common/mixin/reference-property":45,"../mixin/built-in-components":59}],68:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var infiniteScrollMixin = require("../mixin/infinite-scroll").mixin;
var translationMixin = require("../../common/i18n").mixin;
var referenceMixin = require("../../common/mixin/reference-property");
var checkIsNotNull = window.Focus.util.object.checkIsNotNull;
var Button = require("../../common/button/action").component;

var tableMixin = {
    /**
     * React tag name.
     */
    displayName: "table-list",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    getDefaultProps: function getListDefaultProps() {
        return {
            data: [],
            idField: "id",
            isLoading: false
        };
    },

    proptypes: {
        data: type("array"),
        onLineClick: type("func"),
        idField: type("string"),
        lineComponent: type("func", true),
        columns: type("object"),
        sortColumn: type("func"),
        isloading: type("bool"),
        loader: type("func")
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount() {
        checkIsNotNull("lineComponent", this.props.lineComponent);
    },

    _renderTableHeader: function renderTableHeader() {
        var headerCols = [];
        for (var field in this.props.columns) {
            headerCols.push(this._renderColumnHeader(field));
        }
        return React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                headerCols
            )
        );
    },

    _sortColumnAction: function sortColumnAction(column, order) {
        var currentComponent = this;
        return function (event) {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },

    _renderColumnHeader: function _renderColumnHeader(name) {
        var colProperties = this.props.columns[name];
        var sort;
        if (!this.props.isEdit && !colProperties.noSort) {
            var order = colProperties.sort ? colProperties.sort : "asc";
            var iconClass = "fa fa-sort-" + order;
            var icon = React.createElement("i", { className: iconClass });
            sort = React.createElement(
                "a",
                { className: "sort", href: "#", "data-name": name, onClick: this._sortColumnAction(name, order == "asc" ? "desc" : "asc") },
                icon
            );
        }
        return React.createElement(
            "th",
            null,
            this.i18n(colProperties.label),
            sort
        );
    },

    _renderTableBody: function renderTableBody() {
        var _this = this;

        var lineCount = 1;
        var lineComponent = this.props.lineComponent;
        return this.props.data.map(function (line) {
            return React.createElement(lineComponent, {
                key: line[_this.props.idField],
                data: line,
                ref: "line" + lineCount++,
                reference: _this._getReference(),
                onSelection: _this.props.onSelection
            });
        });
    },

    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                "tbody",
                { className: "timeline-loading" },
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        this.i18n("list.loading"),
                        " ..."
                    )
                )
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: "primary" };
            return React.createElement(
                "tbody",
                { className: "timeline-manualFetch" },
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement(Button, { label: "list.button.showMore",
                            type: "button",
                            handleOnClick: this.handleShowMore,
                            style: style })
                    )
                )
            );
        }
    },

    /**
     * Render the list.
     * @return {XML} the render of the table list.
     */
    render: function render() {
        return React.createElement(
            "table",
            { className: "table-list" },
            this._renderTableHeader(),
            this._renderTableBody(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }

};

module.exports = builder(tableMixin);

},{"../../common/button/action":13,"../../common/i18n":26,"../../common/mixin/reference-property":45,"../mixin/infinite-scroll":60}],69:[function(require,module,exports){
"use strict";

module.exports = {
    line: require("./line"),
    list: require("./list")
};

},{"./line":70,"./list":71}],70:[function(require,module,exports){
"use strict";

/**@jsx*/
var React = window.React;
var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
var translationMixin = require("../../common/i18n").mixin;
var referenceMixin = require("../../common/mixin/reference-property");
var definitionMixin = require("../../common/mixin/definition");
var builtInComponentsMixin = require("../mixin/built-in-components");

var lineMixin = {
    /**
     * React component name.
     */
    displayName: "timeline-line",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    getInitialState: function getInitialSate() {
        return {};
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("object"),
        dateField: type("string"),
        dateComponent: type("object"),
        onLineClick: type("func")
    },

    /**
     * Get the line value.
     * @returns {object} - the data od the line.
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data
        };
    },

    /**
     * Line Click handler.
     * @param {object} event - the event
     */
    _handleLineClick: function handleLineClick(event) {
        if (this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * render content for a line.
     * @returns {XML} the line content
     */
    _renderLineContent: function renderLineContent() {
        if (this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        } else {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "timeline-heading" },
                    React.createElement(
                        "h4",
                        { className: "timeline-title" },
                        this.props.data.title
                    )
                ),
                React.createElement(
                    "div",
                    { className: "timeline-body" },
                    React.createElement(
                        "p",
                        null,
                        this.props.data.body
                    )
                )
            );
        }
    },

    /**
     * Render line in list.
     * @returns {XML} - the render of the line
     */
    render: function renderLine() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                "li",
                null,
                React.createElement(
                    "div",
                    { className: "timeline-date" },
                    this.textFor(this.props.dateField, {})
                ),
                React.createElement("div", { className: "timeline-badge" }),
                React.createElement(
                    "div",
                    { className: "timeline-panel", onClick: this._handleLineClick },
                    this._renderLineContent()
                )
            );
        }
    }
};

module.exports = { mixin: lineMixin };

},{"../../common/i18n":26,"../../common/mixin/definition":41,"../../common/mixin/reference-property":45,"../mixin/built-in-components":59}],71:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var type = window.Focus.component.types;
var Line = require("./line").mixin;
var uuid = require("uuid");
var translationMixin = require("../../common/i18n").mixin;
var infiniteScrollMixin = require("../mixin/infinite-scroll").mixin;
var referenceMixin = require("../../common/mixin/reference-property");
var checkIsNotNull = window.Focus.util.object.checkIsNotNull;
var Button = require("../../common/button/action").component;

var listMixin = {
    /**
     * Tag name
     */
    displayName: "timeline",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
     * Default properties for the list.
     * @return {object} default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            idField: "id",
            dateField: "date",
            isLoading: false
        };
    },

    /**
     * list property validation.
     */
    propTypes: {
        data: type("array"),
        idField: type("string"),
        dateField: type("string"),
        dateComponent: type("object"),
        lineComponent: type("func", true),
        isloading: type("bool"),
        loader: type("func"),
        onLineClick: type("func")
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount() {
        checkIsNotNull("lineComponent", this.props.lineComponent);
    },

    /**
     * Render lines of the list.
     * @returns {*} the lines
     */
    _renderLines: function renderLines() {
        var _this = this;

        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map(function (line) {
            return React.createElement(LineComponent, {
                key: line[_this.props.idField] || uuid.v4(),
                data: line,
                ref: "line" + lineCount++,
                dateField: _this.props.dateField,
                onLineClick: _this.props.onLineClick
            });
        });
    },

    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                "li",
                { className: "timeline-loading" },
                this.i18n("list.loading"),
                " ..."
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: "primary" };
            return React.createElement(
                "li",
                { className: "timeline-button" },
                React.createElement(Button, { label: "list.button.showMore",
                    type: "button",
                    handleOnClick: this.handleShowMore,
                    style: style })
            );
        }
    },

    /**
     * Render the list.
     * @returns {XML} the list component
     */
    render: function renderList() {
        return React.createElement(
            "ul",
            { className: "timeline" },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);

},{"../../common/button/action":13,"../../common/i18n":26,"../../common/mixin/reference-property":45,"../mixin/infinite-scroll":60,"./line":70,"uuid":255}],72:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
var messageMixin = {
  /** @inheritedDoc */
  getDefaultProps: function getMessageDefaultProps() {
    return {
      title: undefined,
      content: undefined,
      type: "info",
      ttl: undefined,
      style: {}
    };
  },
  /** @inheritedDoc */
  propTypes: {
    title: type("string"),
    content: type("string"),
    type: type("string"),
    ttl: type("number"),
    style: type("object")
  },
  /**
   * Handle click on the dismiss button.
   * @param {Event} event - Sanitize event.
   */
  _handleOnClick: function handleOnClickMessageDismiss(event) {
    if (this.props.handleOnClick) {
      this.props.handleOnClick(this.props.id);
    }
    //Maybe it is not the best way to do it.
    //React.unmountComponentAtNode(this.getDOMNode().parentNode);
  },
  _renderTitle: function renderMessageTitle() {
    if (this.props.title) {
      return React.createElement(
        "h4",
        null,
        this.props.title
      );
    }
    return undefined;
  },
  /**
   * Render an alert.
   * @return {JSX} The jsx.
   */
  render: function renderAlert() {
    var cssClass = "alert alert-dismissable alert-" + this.props.type + " " + this.props.style.className;
    return React.createElement(
      "div",
      { className: cssClass, "data-id": this.props.id },
      React.createElement(
        "button",
        { type: "button", className: "close", "data-dismiss": "alert", onClick: this._handleOnClick },
        "×"
      ),
      this._renderTitle(),
      React.createElement(
        "p",
        null,
        this.props.content
      )
    );
  }
};
module.exports = builder(messageMixin);

},{}],73:[function(require,module,exports){
"use strict";

var type = window.Focus.component.types;
module.exports = {
  /** @inheritedDocs */
  getDefaultProps: function getStyllableDefaultProps() {
    return {
      style: { className: "" }
    };
  },
  /**
   * Get the className from the style.className props
   * @returns {string} - the className.
   */
  _getStyleClassName: function getStyleClassName() {
    if (this.props.style && this.props.style.className) {
      return this.props.className;
    }
    return "";
  }
};

},{}],74:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],75:[function(require,module,exports){
module.exports = {
  'all': require('./collection/all'),
  'any': require('./collection/any'),
  'at': require('./collection/at'),
  'collect': require('./collection/collect'),
  'contains': require('./collection/contains'),
  'countBy': require('./collection/countBy'),
  'detect': require('./collection/detect'),
  'each': require('./collection/each'),
  'eachRight': require('./collection/eachRight'),
  'every': require('./collection/every'),
  'filter': require('./collection/filter'),
  'find': require('./collection/find'),
  'findLast': require('./collection/findLast'),
  'findWhere': require('./collection/findWhere'),
  'foldl': require('./collection/foldl'),
  'foldr': require('./collection/foldr'),
  'forEach': require('./collection/forEach'),
  'forEachRight': require('./collection/forEachRight'),
  'groupBy': require('./collection/groupBy'),
  'include': require('./collection/include'),
  'includes': require('./collection/includes'),
  'indexBy': require('./collection/indexBy'),
  'inject': require('./collection/inject'),
  'invoke': require('./collection/invoke'),
  'map': require('./collection/map'),
  'max': require('./math/max'),
  'min': require('./math/min'),
  'partition': require('./collection/partition'),
  'pluck': require('./collection/pluck'),
  'reduce': require('./collection/reduce'),
  'reduceRight': require('./collection/reduceRight'),
  'reject': require('./collection/reject'),
  'sample': require('./collection/sample'),
  'select': require('./collection/select'),
  'shuffle': require('./collection/shuffle'),
  'size': require('./collection/size'),
  'some': require('./collection/some'),
  'sortBy': require('./collection/sortBy'),
  'sortByAll': require('./collection/sortByAll'),
  'sortByOrder': require('./collection/sortByOrder'),
  'sum': require('./math/sum'),
  'where': require('./collection/where')
};

},{"./collection/all":76,"./collection/any":77,"./collection/at":78,"./collection/collect":79,"./collection/contains":80,"./collection/countBy":81,"./collection/detect":82,"./collection/each":83,"./collection/eachRight":84,"./collection/every":85,"./collection/filter":86,"./collection/find":87,"./collection/findLast":88,"./collection/findWhere":89,"./collection/foldl":90,"./collection/foldr":91,"./collection/forEach":92,"./collection/forEachRight":93,"./collection/groupBy":94,"./collection/include":95,"./collection/includes":96,"./collection/indexBy":97,"./collection/inject":98,"./collection/invoke":99,"./collection/map":100,"./collection/partition":101,"./collection/pluck":102,"./collection/reduce":103,"./collection/reduceRight":104,"./collection/reject":105,"./collection/sample":106,"./collection/select":107,"./collection/shuffle":108,"./collection/size":109,"./collection/some":110,"./collection/sortBy":111,"./collection/sortByAll":112,"./collection/sortByOrder":113,"./collection/where":114,"./math/max":238,"./math/min":239,"./math/sum":240}],76:[function(require,module,exports){
module.exports = require('./every');

},{"./every":85}],77:[function(require,module,exports){
module.exports = require('./some');

},{"./some":110}],78:[function(require,module,exports){
var baseAt = require('../internal/baseAt'),
    baseFlatten = require('../internal/baseFlatten'),
    restParam = require('../function/restParam');

/**
 * Creates an array of elements corresponding to the given keys, or indexes,
 * of `collection`. Keys may be specified as individual arguments or as arrays
 * of keys.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {...(number|number[]|string|string[])} [props] The property names
 *  or indexes of elements to pick, specified individually or in arrays.
 * @returns {Array} Returns the new array of picked elements.
 * @example
 *
 * _.at(['a', 'b', 'c'], [0, 2]);
 * // => ['a', 'c']
 *
 * _.at(['barney', 'fred', 'pebbles'], 0, 2);
 * // => ['barney', 'pebbles']
 */
var at = restParam(function(collection, props) {
  return baseAt(collection, baseFlatten(props));
});

module.exports = at;

},{"../function/restParam":115,"../internal/baseAt":129,"../internal/baseFlatten":142}],79:[function(require,module,exports){
module.exports = require('./map');

},{"./map":100}],80:[function(require,module,exports){
module.exports = require('./includes');

},{"./includes":96}],81:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is the number of times the key was returned by `iteratee`.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.countBy([4.3, 6.1, 6.4], function(n) {
 *   return Math.floor(n);
 * });
 * // => { '4': 1, '6': 2 }
 *
 * _.countBy([4.3, 6.1, 6.4], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => { '4': 1, '6': 2 }
 *
 * _.countBy(['one', 'two', 'three'], 'length');
 * // => { '3': 2, '5': 1 }
 */
var countBy = createAggregator(function(result, value, key) {
  hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
});

module.exports = countBy;

},{"../internal/createAggregator":174}],82:[function(require,module,exports){
module.exports = require('./find');

},{"./find":87}],83:[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":92}],84:[function(require,module,exports){
module.exports = require('./forEachRight');

},{"./forEachRight":93}],85:[function(require,module,exports){
var arrayEvery = require('../internal/arrayEvery'),
    baseCallback = require('../internal/baseCallback'),
    baseEvery = require('../internal/baseEvery'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * The predicate is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias all
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'active': false },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.every(users, 'active', false);
 * // => true
 *
 * // using the `_.property` callback shorthand
 * _.every(users, 'active');
 * // => false
 */
function every(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayEvery : baseEvery;
  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
    predicate = null;
  }
  if (typeof predicate != 'function' || thisArg !== undefined) {
    predicate = baseCallback(predicate, thisArg, 3);
  }
  return func(collection, predicate);
}

module.exports = every;

},{"../internal/arrayEvery":120,"../internal/baseCallback":130,"../internal/baseEvery":137,"../internal/isIterateeCall":195,"../lang/isArray":214}],86:[function(require,module,exports){
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filter([4, 5, 6], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [4, 6]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.filter(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.filter(users, 'active'), 'user');
 * // => ['barney']
 */
function filter(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, predicate);
}

module.exports = filter;

},{"../internal/arrayFilter":122,"../internal/baseCallback":130,"../internal/baseFilter":139,"../lang/isArray":214}],87:[function(require,module,exports){
var baseEach = require('../internal/baseEach'),
    createFind = require('../internal/createFind');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"../internal/baseEach":135,"../internal/createFind":179}],88:[function(require,module,exports){
var baseEachRight = require('../internal/baseEachRight'),
    createFind = require('../internal/createFind');

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) {
 *   return n % 2 == 1;
 * });
 * // => 3
 */
var findLast = createFind(baseEachRight, true);

module.exports = findLast;

},{"../internal/baseEachRight":136,"../internal/createFind":179}],89:[function(require,module,exports){
var baseMatches = require('../internal/baseMatches'),
    find = require('./find');

/**
 * Performs a deep comparison between each element in `collection` and the
 * source object, returning the first element that has equivalent property
 * values.
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. For comparing a single
 * own or inherited property value see `_.matchesProperty`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Object} source The object of property values to match.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
 * // => 'barney'
 *
 * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
 * // => 'fred'
 */
function findWhere(collection, source) {
  return find(collection, baseMatches(source));
}

module.exports = findWhere;

},{"../internal/baseMatches":155,"./find":87}],90:[function(require,module,exports){
module.exports = require('./reduce');

},{"./reduce":103}],91:[function(require,module,exports){
module.exports = require('./reduceRight');

},{"./reduceRight":104}],92:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    createForEach = require('../internal/createForEach');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iteratee functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"../internal/arrayEach":118,"../internal/baseEach":135,"../internal/createForEach":180}],93:[function(require,module,exports){
var arrayEachRight = require('../internal/arrayEachRight'),
    baseEachRight = require('../internal/baseEachRight'),
    createForEach = require('../internal/createForEach');

/**
 * This method is like `_.forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @alias eachRight
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEachRight(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from right to left and returns the array
 */
var forEachRight = createForEach(arrayEachRight, baseEachRight);

module.exports = forEachRight;

},{"../internal/arrayEachRight":119,"../internal/baseEachRight":136,"../internal/createForEach":180}],94:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is an array of the elements responsible for generating the key.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.groupBy([4.2, 6.1, 6.4], function(n) {
 *   return Math.floor(n);
 * });
 * // => { '4': [4.2], '6': [6.1, 6.4] }
 *
 * _.groupBy([4.2, 6.1, 6.4], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => { '4': [4.2], '6': [6.1, 6.4] }
 *
 * // using the `_.property` callback shorthand
 * _.groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 */
var groupBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    result[key] = [value];
  }
});

module.exports = groupBy;

},{"../internal/createAggregator":174}],95:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"./includes":96,"dup":80}],96:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    getLength = require('../internal/getLength'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall'),
    isLength = require('../internal/isLength'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection` using
 * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it is used as the offset
 * from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex, guard) {
  var length = collection ? getLength(collection) : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (!length) {
    return false;
  }
  if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
    fromIndex = 0;
  } else {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
    : (baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = includes;

},{"../internal/baseIndexOf":149,"../internal/getLength":185,"../internal/isIterateeCall":195,"../internal/isLength":197,"../lang/isArray":214,"../lang/isString":231,"../object/values":245}],97:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is the last element responsible for generating the key. The
 * iteratee function is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var keyData = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.indexBy(keyData, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return String.fromCharCode(object.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return this.fromCharCode(object.code);
 * }, String);
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
var indexBy = createAggregator(function(result, value, key) {
  result[key] = value;
});

module.exports = indexBy;

},{"../internal/createAggregator":174}],98:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./reduce":103,"dup":90}],99:[function(require,module,exports){
var baseEach = require('../internal/baseEach'),
    invokePath = require('../internal/invokePath'),
    isArrayLike = require('../internal/isArrayLike'),
    isKey = require('../internal/isKey'),
    restParam = require('../function/restParam');

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `methodName` is a function it is
 * invoked for, and `this` bound to, each element in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invoke([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
var invoke = restParam(function(collection, path, args) {
  var index = -1,
      isFunc = typeof path == 'function',
      isProp = isKey(path),
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value) {
    var func = isFunc ? path : ((isProp && value != null) ? value[path] : null);
    result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
  });
  return result;
});

module.exports = invoke;

},{"../function/restParam":115,"../internal/baseEach":135,"../internal/invokePath":192,"../internal/isArrayLike":193,"../internal/isKey":196}],100:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
 * `sum`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":123,"../internal/baseCallback":130,"../internal/baseMap":154,"../lang/isArray":214}],101:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, while the second of which
 * contains elements `predicate` returns falsey for. The predicate is bound
 * to `thisArg` and invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the array of grouped elements.
 * @example
 *
 * _.partition([1, 2, 3], function(n) {
 *   return n % 2;
 * });
 * // => [[1, 3], [2]]
 *
 * _.partition([1.2, 2.3, 3.4], function(n) {
 *   return this.floor(n) % 2;
 * }, Math);
 * // => [[1.2, 3.4], [2.3]]
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * var mapper = function(array) {
 *   return _.pluck(array, 'user');
 * };
 *
 * // using the `_.matches` callback shorthand
 * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
 * // => [['pebbles'], ['barney', 'fred']]
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.map(_.partition(users, 'active', false), mapper);
 * // => [['barney', 'pebbles'], ['fred']]
 *
 * // using the `_.property` callback shorthand
 * _.map(_.partition(users, 'active'), mapper);
 * // => [['fred'], ['barney', 'pebbles']]
 */
var partition = createAggregator(function(result, value, key) {
  result[key ? 0 : 1].push(value);
}, function() { return [[], []]; });

module.exports = partition;

},{"../internal/createAggregator":174}],102:[function(require,module,exports){
var map = require('./map'),
    property = require('../utility/property');

/**
 * Gets the property value of `path` from all elements in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Array|string} path The path of the property to pluck.
 * @returns {Array} Returns the property values.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.pluck(users, 'user');
 * // => ['barney', 'fred']
 *
 * var userIndex = _.indexBy(users, 'user');
 * _.pluck(userIndex, 'age');
 * // => [36, 40] (iteration order is not guaranteed)
 */
function pluck(collection, path) {
  return map(collection, property(path));
}

module.exports = pluck;

},{"../utility/property":252,"./map":100}],103:[function(require,module,exports){
var arrayReduce = require('../internal/arrayReduce'),
    baseEach = require('../internal/baseEach'),
    createReduce = require('../internal/createReduce');

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` through `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not provided the first element of `collection` is used as the initial
 * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `includes`, `merge`, `sortByAll`, and `sortByOrder`
 *
 * @static
 * @memberOf _
 * @alias foldl, inject
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.reduce([1, 2], function(total, n) {
 *   return total + n;
 * });
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
 *   result[key] = n * 3;
 *   return result;
 * }, {});
 * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
 */
var reduce = createReduce(arrayReduce, baseEach);

module.exports = reduce;

},{"../internal/arrayReduce":124,"../internal/baseEach":135,"../internal/createReduce":181}],104:[function(require,module,exports){
var arrayReduceRight = require('../internal/arrayReduceRight'),
    baseEachRight = require('../internal/baseEachRight'),
    createReduce = require('../internal/createReduce');

/**
 * This method is like `_.reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @alias foldr
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var array = [[0, 1], [2, 3], [4, 5]];
 *
 * _.reduceRight(array, function(flattened, other) {
 *   return flattened.concat(other);
 * }, []);
 * // => [4, 5, 2, 3, 0, 1]
 */
var reduceRight = createReduce(arrayReduceRight, baseEachRight);

module.exports = reduceRight;

},{"../internal/arrayReduceRight":125,"../internal/baseEachRight":136,"../internal/createReduce":181}],105:[function(require,module,exports){
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * The opposite of `_.filter`; this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.reject([1, 2, 3, 4], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [1, 3]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': true }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.reject(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.reject(users, 'active'), 'user');
 * // => ['barney']
 */
function reject(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, function(value, index, collection) {
    return !predicate(value, index, collection);
  });
}

module.exports = reject;

},{"../internal/arrayFilter":122,"../internal/baseCallback":130,"../internal/baseFilter":139,"../lang/isArray":214}],106:[function(require,module,exports){
var baseRandom = require('../internal/baseRandom'),
    isIterateeCall = require('../internal/isIterateeCall'),
    shuffle = require('./shuffle'),
    toIterable = require('../internal/toIterable');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Gets a random element or `n` random elements from a collection.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to sample.
 * @param {number} [n] The number of elements to sample.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {*} Returns the random sample(s).
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 *
 * _.sample([1, 2, 3, 4], 2);
 * // => [3, 1]
 */
function sample(collection, n, guard) {
  if (guard ? isIterateeCall(collection, n, guard) : n == null) {
    collection = toIterable(collection);
    var length = collection.length;
    return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
  }
  var result = shuffle(collection);
  result.length = nativeMin(n < 0 ? 0 : (+n || 0), result.length);
  return result;
}

module.exports = sample;

},{"../internal/baseRandom":159,"../internal/isIterateeCall":195,"../internal/toIterable":204,"./shuffle":108}],107:[function(require,module,exports){
module.exports = require('./filter');

},{"./filter":86}],108:[function(require,module,exports){
var baseRandom = require('../internal/baseRandom'),
    toIterable = require('../internal/toIterable');

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  collection = toIterable(collection);

  var index = -1,
      length = collection.length,
      result = Array(length);

  while (++index < length) {
    var rand = baseRandom(0, index);
    if (index != rand) {
      result[index] = result[rand];
    }
    result[rand] = collection[index];
  }
  return result;
}

module.exports = shuffle;

},{"../internal/baseRandom":159,"../internal/toIterable":204}],109:[function(require,module,exports){
var getLength = require('../internal/getLength'),
    isLength = require('../internal/isLength'),
    keys = require('../object/keys');

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable properties for objects.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the size of `collection`.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  var length = collection ? getLength(collection) : 0;
  return isLength(length) ? length : keys(collection).length;
}

module.exports = size;

},{"../internal/getLength":185,"../internal/isLength":197,"../object/keys":241}],110:[function(require,module,exports){
var arraySome = require('../internal/arraySome'),
    baseCallback = require('../internal/baseCallback'),
    baseSome = require('../internal/baseSome'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * The function returns as soon as it finds a passing value and does not iterate
 * over the entire collection. The predicate is bound to `thisArg` and invoked
 * with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias any
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.some(users, 'active', false);
 * // => true
 *
 * // using the `_.property` callback shorthand
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, thisArg) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
    predicate = null;
  }
  if (typeof predicate != 'function' || thisArg !== undefined) {
    predicate = baseCallback(predicate, thisArg, 3);
  }
  return func(collection, predicate);
}

module.exports = some;

},{"../internal/arraySome":126,"../internal/baseCallback":130,"../internal/baseSome":162,"../internal/isIterateeCall":195,"../lang/isArray":214}],111:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    baseSortBy = require('../internal/baseSortBy'),
    compareAscending = require('../internal/compareAscending'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection through `iteratee`. This method performs
 * a stable sort, that is, it preserves the original sort order of equal elements.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * _.sortBy([1, 2, 3], function(n) {
 *   return Math.sin(n);
 * });
 * // => [3, 1, 2]
 *
 * _.sortBy([1, 2, 3], function(n) {
 *   return this.sin(n);
 * }, Math);
 * // => [3, 1, 2]
 *
 * var users = [
 *   { 'user': 'fred' },
 *   { 'user': 'pebbles' },
 *   { 'user': 'barney' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.sortBy(users, 'user'), 'user');
 * // => ['barney', 'fred', 'pebbles']
 */
function sortBy(collection, iteratee, thisArg) {
  if (collection == null) {
    return [];
  }
  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
    iteratee = null;
  }
  var index = -1;
  iteratee = baseCallback(iteratee, thisArg, 3);

  var result = baseMap(collection, function(value, key, collection) {
    return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
  });
  return baseSortBy(result, compareAscending);
}

module.exports = sortBy;

},{"../internal/baseCallback":130,"../internal/baseMap":154,"../internal/baseSortBy":163,"../internal/compareAscending":172,"../internal/isIterateeCall":195}],112:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    baseSortByOrder = require('../internal/baseSortByOrder'),
    isIterateeCall = require('../internal/isIterateeCall'),
    restParam = require('../function/restParam');

/**
 * This method is like `_.sortBy` except that it can sort by multiple iteratees
 * or property names.
 *
 * If a property name is provided for an iteratee the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If an object is provided for an iteratee the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
 *  The iteratees to sort by, specified as individual values or arrays of values.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 42 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.map(_.sortByAll(users, ['user', 'age']), _.values);
 * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
 *
 * _.map(_.sortByAll(users, 'user', function(chr) {
 *   return Math.floor(chr.age / 10);
 * }), _.values);
 * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
 */
var sortByAll = restParam(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var guard = iteratees[2];
  if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
    iteratees.length = 1;
  }
  return baseSortByOrder(collection, baseFlatten(iteratees), []);
});

module.exports = sortByAll;

},{"../function/restParam":115,"../internal/baseFlatten":142,"../internal/baseSortByOrder":164,"../internal/isIterateeCall":195}],113:[function(require,module,exports){
var baseSortByOrder = require('../internal/baseSortByOrder'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * This method is like `_.sortByAll` except that it allows specifying the
 * sort orders of the iteratees to sort by. A truthy value in `orders` will
 * sort the corresponding property name in ascending order while a falsey
 * value will sort it in descending order.
 *
 * If a property name is provided for an iteratee the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If an object is provided for an iteratee the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {boolean[]} orders The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 42 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // sort by `user` in ascending order and by `age` in descending order
 * _.map(_.sortByOrder(users, ['user', 'age'], [true, false]), _.values);
 * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
 */
function sortByOrder(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (guard && isIterateeCall(iteratees, orders, guard)) {
    orders = null;
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseSortByOrder(collection, iteratees, orders);
}

module.exports = sortByOrder;

},{"../internal/baseSortByOrder":164,"../internal/isIterateeCall":195,"../lang/isArray":214}],114:[function(require,module,exports){
var baseMatches = require('../internal/baseMatches'),
    filter = require('./filter');

/**
 * Performs a deep comparison between each element in `collection` and the
 * source object, returning an array of all elements that have equivalent
 * property values.
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. For comparing a single
 * own or inherited property value see `_.matchesProperty`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Object} source The object of property values to match.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
 *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
 * ];
 *
 * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
 * // => ['barney']
 *
 * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
 * // => ['fred']
 */
function where(collection, source) {
  return filter(collection, baseMatches(source));
}

module.exports = where;

},{"../internal/baseMatches":155,"./filter":86}],115:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],116:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cachePush":171,"./getNative":187}],117:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],118:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],119:[function(require,module,exports){
/**
 * A specialized version of `_.forEachRight` for arrays without support for
 * callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEachRight(array, iteratee) {
  var length = array.length;

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEachRight;

},{}],120:[function(require,module,exports){
/**
 * A specialized version of `_.every` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */
function arrayEvery(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

module.exports = arrayEvery;

},{}],121:[function(require,module,exports){
/**
 * A specialized version of `baseExtremum` for arrays whichs invokes `iteratee`
 * with one argument: (value).
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {*} Returns the extremum value.
 */
function arrayExtremum(array, iteratee, comparator, exValue) {
  var index = -1,
      length = array.length,
      computed = exValue,
      result = computed;

  while (++index < length) {
    var value = array[index],
        current = +iteratee(value);

    if (comparator(current, computed)) {
      computed = current;
      result = value;
    }
  }
  return result;
}

module.exports = arrayExtremum;

},{}],122:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],123:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],124:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initFromArray] Specify using the first element of `array`
 *  as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initFromArray) {
  var index = -1,
      length = array.length;

  if (initFromArray && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],125:[function(require,module,exports){
/**
 * A specialized version of `_.reduceRight` for arrays without support for
 * callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initFromArray] Specify using the last element of `array`
 *  as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
  var length = array.length;
  if (initFromArray && length) {
    accumulator = array[--length];
  }
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length, array);
  }
  return accumulator;
}

module.exports = arrayReduceRight;

},{}],126:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],127:[function(require,module,exports){
/**
 * A specialized version of `_.sum` for arrays without support for iteratees.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 */
function arraySum(array) {
  var length = array.length,
      result = 0;

  while (length--) {
    result += +array[length] || 0;
  }
  return result;
}

module.exports = arraySum;

},{}],128:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":241,"./baseCopy":133}],129:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex');

/**
 * The base implementation of `_.at` without support for string collections
 * and individual key arguments.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {number[]|string[]} props The property names or indexes of elements to pick.
 * @returns {Array} Returns the new array of picked elements.
 */
function baseAt(collection, props) {
  var index = -1,
      isNil = collection == null,
      isArr = !isNil && isArrayLike(collection),
      length = isArr ? collection.length : 0,
      propsLength = props.length,
      result = Array(propsLength);

  while(++index < propsLength) {
    var key = props[index];
    if (isArr) {
      result[index] = isIndex(key, length) ? collection[key] : undefined;
    } else {
      result[index] = isNil ? undefined : collection[key];
    }
  }
  return result;
}

module.exports = baseAt;

},{"./isArrayLike":193,"./isIndex":194}],130:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    property = require('../utility/property');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":251,"../utility/property":252,"./baseMatches":155,"./baseMatchesProperty":156,"./bindCallback":168}],131:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseAssign = require('./baseAssign'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseAssign(result, value);
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":214,"../lang/isObject":228,"./arrayCopy":117,"./arrayEach":118,"./baseAssign":128,"./baseForOwn":145,"./initCloneArray":189,"./initCloneByTag":190,"./initCloneObject":191}],132:[function(require,module,exports){
/**
 * The base implementation of `compareAscending` which compares values and
 * sorts them in ascending order without guaranteeing a stable sort.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function baseCompareAscending(value, other) {
  if (value !== other) {
    var valIsNull = value === null,
        valIsUndef = value === undefined,
        valIsReflexive = value === value;

    var othIsNull = other === null,
        othIsUndef = other === undefined,
        othIsReflexive = other === other;

    if ((value > other && !othIsNull) || !valIsReflexive ||
        (valIsNull && !othIsUndef && othIsReflexive) ||
        (valIsUndef && othIsReflexive)) {
      return 1;
    }
    if ((value < other && !valIsNull) || !othIsReflexive ||
        (othIsNull && !valIsUndef && valIsReflexive) ||
        (othIsUndef && valIsReflexive)) {
      return -1;
    }
  }
  return 0;
}

module.exports = baseCompareAscending;

},{}],133:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],134:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= 200) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value, 0) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":149,"./cacheIndexOf":170,"./createCache":177}],135:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":145,"./createBaseEach":175}],136:[function(require,module,exports){
var baseForOwnRight = require('./baseForOwnRight'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEachRight` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEachRight = createBaseEach(baseForOwnRight, true);

module.exports = baseEachRight;

},{"./baseForOwnRight":146,"./createBaseEach":175}],137:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.every` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;
  baseEach(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

module.exports = baseEvery;

},{"./baseEach":135}],138:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * Gets the extremum value of `collection` invoking `iteratee` for each value
 * in `collection` to generate the criterion by which the value is ranked.
 * The `iteratee` is invoked with three arguments: (value, index|key, collection).
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(collection, iteratee, comparator, exValue) {
  var computed = exValue,
      result = computed;

  baseEach(collection, function(value, index, collection) {
    var current = +iteratee(value, index, collection);
    if (comparator(current, computed) || (current === exValue && current === result)) {
      computed = current;
      result = value;
    }
  });
  return result;
}

module.exports = baseExtremum;

},{"./baseEach":135}],139:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":135}],140:[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],141:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],142:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":213,"../lang/isArray":214,"./isArrayLike":193,"./isObjectLike":198}],143:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":176}],144:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":242,"./baseFor":143}],145:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":241,"./baseFor":143}],146:[function(require,module,exports){
var baseForRight = require('./baseForRight'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwnRight` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return baseForRight(object, iteratee, keys);
}

module.exports = baseForOwnRight;

},{"../object/keys":241,"./baseForRight":147}],147:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * This function is like `baseFor` except that it iterates over properties
 * in the opposite order.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseForRight = createBaseFor(true);

module.exports = baseForRight;

},{"./createBaseFor":176}],148:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":205}],149:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":188}],150:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep'),
    isObject = require('../lang/isObject');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObject(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":228,"./baseIsEqualDeep":151}],151:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":214,"../lang/isTypedArray":232,"./equalArrays":182,"./equalByTag":183,"./equalObjects":184}],152:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],153:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":150,"./toObject":205}],154:[function(require,module,exports){
var baseEach = require('./baseEach'),
    isArrayLike = require('./isArrayLike');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":135,"./isArrayLike":193}],155:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    getMatchData = require('./getMatchData'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

module.exports = baseMatches;

},{"./baseIsMatch":153,"./getMatchData":186,"./toObject":205}],156:[function(require,module,exports){
var baseGet = require('./baseGet'),
    baseIsEqual = require('./baseIsEqual'),
    baseSlice = require('./baseSlice'),
    isArray = require('../lang/isArray'),
    isKey = require('./isKey'),
    isStrictComparable = require('./isStrictComparable'),
    last = require('../array/last'),
    toObject = require('./toObject'),
    toPath = require('./toPath');

/**
 * The base implementation of `_.matchesProperty` which does not which does
 * not clone `value`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

module.exports = baseMatchesProperty;

},{"../array/last":74,"../lang/isArray":214,"./baseGet":148,"./baseIsEqual":150,"./baseSlice":161,"./isKey":196,"./isStrictComparable":199,"./toObject":205,"./toPath":206}],157:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],158:[function(require,module,exports){
var baseGet = require('./baseGet'),
    toPath = require('./toPath');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

module.exports = basePropertyDeep;

},{"./baseGet":148,"./toPath":206}],159:[function(require,module,exports){
/** Native method references. */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for argument juggling
 * and returning floating-point numbers.
 *
 * @private
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number} Returns the random number.
 */
function baseRandom(min, max) {
  return min + floor(nativeRandom() * (max - min + 1));
}

module.exports = baseRandom;

},{}],160:[function(require,module,exports){
/**
 * The base implementation of `_.reduce` and `_.reduceRight` without support
 * for callback shorthands and `this` binding, which iterates over `collection`
 * using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initFromCollection Specify using the first or last element
 *  of `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initFromCollection
      ? (initFromCollection = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

module.exports = baseReduce;

},{}],161:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],162:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.some` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

module.exports = baseSome;

},{"./baseEach":135}],163:[function(require,module,exports){
/**
 * The base implementation of `_.sortBy` which uses `comparer` to define
 * the sort order of `array` and replaces criteria objects with their
 * corresponding values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;

},{}],164:[function(require,module,exports){
var arrayMap = require('./arrayMap'),
    baseCallback = require('./baseCallback'),
    baseMap = require('./baseMap'),
    baseSortBy = require('./baseSortBy'),
    compareMultiple = require('./compareMultiple');

/**
 * The base implementation of `_.sortByOrder` without param guards.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {boolean[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseSortByOrder(collection, iteratees, orders) {
  var index = -1;

  iteratees = arrayMap(iteratees, function(iteratee) { return baseCallback(iteratee); });

  var result = baseMap(collection, function(value) {
    var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseSortByOrder;

},{"./arrayMap":123,"./baseCallback":130,"./baseMap":154,"./baseSortBy":163,"./compareMultiple":173}],165:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.sum` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(collection, iteratee) {
  var result = 0;
  baseEach(collection, function(value, index, collection) {
    result += +iteratee(value, index, collection) || 0;
  });
  return result;
}

module.exports = baseSum;

},{"./baseEach":135}],166:[function(require,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],167:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],168:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":251}],169:[function(require,module,exports){
(function (global){
var constant = require('../utility/constant'),
    getNative = require('./getNative');

/** Native method references. */
var ArrayBuffer = getNative(global, 'ArrayBuffer'),
    bufferSlice = getNative(ArrayBuffer && new ArrayBuffer(0), 'slice'),
    floor = Math.floor,
    Uint8Array = getNative(global, 'Uint8Array');

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = getNative(global, 'Float64Array'),
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result || null;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utility/constant":250,"./getNative":187}],170:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":228}],171:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":228}],172:[function(require,module,exports){
var baseCompareAscending = require('./baseCompareAscending');

/**
 * Used by `_.sortBy` to compare transformed elements of a collection and stable
 * sort them in ascending order.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareAscending(object, other) {
  return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
}

module.exports = compareAscending;

},{"./baseCompareAscending":132}],173:[function(require,module,exports){
var baseCompareAscending = require('./baseCompareAscending');

/**
 * Used by `_.sortByOrder` to compare multiple properties of each element
 * in a collection and stable sort them in the following order:
 *
 * If `orders` is unspecified, sort in ascending order for all properties.
 * Otherwise, for each property, sort in ascending order if its corresponding value in
 * orders is true, and descending order if false.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @param {boolean[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      return result * (orders[index] ? 1 : -1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;

},{"./baseCompareAscending":132}],174:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseEach = require('./baseEach'),
    isArray = require('../lang/isArray');

/**
 * Creates a function that aggregates a collection, creating an accumulator
 * object composed from the results of running each element in the collection
 * through an iteratee.
 *
 * **Note:** This function is used to create `_.countBy`, `_.groupBy`, `_.indexBy`,
 * and `_.partition`.
 *
 * @private
 * @param {Function} setter The function to set keys and values of the accumulator object.
 * @param {Function} [initializer] The function to initialize the accumulator object.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee, thisArg) {
    var result = initializer ? initializer() : {};
    iteratee = baseCallback(iteratee, thisArg, 3);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        setter(result, value, iteratee(value, index, collection), collection);
      }
    } else {
      baseEach(collection, function(value, key, collection) {
        setter(result, value, iteratee(value, key, collection), collection);
      });
    }
    return result;
  };
}

module.exports = createAggregator;

},{"../lang/isArray":214,"./baseCallback":130,"./baseEach":135}],175:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./getLength":185,"./isLength":197,"./toObject":205}],176:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":205}],177:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    constant = require('../utility/constant'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utility/constant":250,"./SetCache":116,"./getNative":187}],178:[function(require,module,exports){
var arrayExtremum = require('./arrayExtremum'),
    baseCallback = require('./baseCallback'),
    baseExtremum = require('./baseExtremum'),
    isIterateeCall = require('./isIterateeCall'),
    toIterable = require('./toIterable');

/**
 * Creates a `_.max` or `_.min` function.
 *
 * @private
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {Function} Returns the new extremum function.
 */
function createExtremum(comparator, exValue) {
  return function(collection, iteratee, thisArg) {
    if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
      iteratee = null;
    }
    iteratee = baseCallback(iteratee, thisArg, 3);
    if (iteratee.length == 1) {
      collection = toIterable(collection);
      var result = arrayExtremum(collection, iteratee, comparator, exValue);
      if (!(collection.length && result === exValue)) {
        return result;
      }
    }
    return baseExtremum(collection, iteratee, comparator, exValue);
  };
}

module.exports = createExtremum;

},{"./arrayExtremum":121,"./baseCallback":130,"./baseExtremum":138,"./isIterateeCall":195,"./toIterable":204}],179:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseFind = require('./baseFind'),
    baseFindIndex = require('./baseFindIndex'),
    isArray = require('../lang/isArray');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  };
}

module.exports = createFind;

},{"../lang/isArray":214,"./baseCallback":130,"./baseFind":140,"./baseFindIndex":141}],180:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

module.exports = createForEach;

},{"../lang/isArray":214,"./bindCallback":168}],181:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseReduce = require('./baseReduce'),
    isArray = require('../lang/isArray');

/**
 * Creates a function for `_.reduce` or `_.reduceRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createReduce(arrayFunc, eachFunc) {
  return function(collection, iteratee, accumulator, thisArg) {
    var initFromArray = arguments.length < 3;
    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
      ? arrayFunc(collection, iteratee, accumulator, initFromArray)
      : baseReduce(collection, baseCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
  };
}

module.exports = createReduce;

},{"../lang/isArray":214,"./baseCallback":130,"./baseReduce":160}],182:[function(require,module,exports){
var arraySome = require('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":126}],183:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],184:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":241}],185:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":157}],186:[function(require,module,exports){
var isStrictComparable = require('./isStrictComparable'),
    pairs = require('../object/pairs');

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"../object/pairs":244,"./isStrictComparable":199}],187:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":225}],188:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],189:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],190:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":169}],191:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],192:[function(require,module,exports){
var baseGet = require('./baseGet'),
    baseSlice = require('./baseSlice'),
    isKey = require('./isKey'),
    last = require('../array/last'),
    toPath = require('./toPath');

/**
 * Invokes the method at `path` on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} args The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 */
function invokePath(object, path, args) {
  if (object != null && !isKey(path, object)) {
    path = toPath(path);
    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
    path = last(path);
  }
  var func = object == null ? object : object[path];
  return func == null ? undefined : func.apply(object, args);
}

module.exports = invokePath;

},{"../array/last":74,"./baseGet":148,"./baseSlice":161,"./isKey":196,"./toPath":206}],193:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":185,"./isLength":197}],194:[function(require,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = typeof value == 'number' ? value : parseFloat(value);
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],195:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":228,"./isArrayLike":193,"./isIndex":194}],196:[function(require,module,exports){
var isArray = require('../lang/isArray'),
    toObject = require('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":214,"./toObject":205}],197:[function(require,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],198:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],199:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"../lang/isObject":228}],200:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * A specialized version of `_.pick` which picks `object` properties specified
 * by `props`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{"./toObject":205}],201:[function(require,module,exports){
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` which picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":144}],202:[function(require,module,exports){
var baseForIn = require('./baseForIn'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A fallback implementation of `_.isPlainObject` which checks if `value`
 * is an object created by the `Object` constructor or has a `[[Prototype]]`
 * of `null`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
      (!hasOwnProperty.call(value, 'constructor') &&
        (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = shimIsPlainObject;

},{"./baseForIn":144,"./isObjectLike":198}],203:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":213,"../lang/isArray":214,"../object/keysIn":242,"./isIndex":194,"./isLength":197}],204:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObject = require('../lang/isObject'),
    values = require('../object/values');

/**
 * Converts `value` to an array-like object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array|Object} Returns the array-like object.
 */
function toIterable(value) {
  if (value == null) {
    return [];
  }
  if (!isArrayLike(value)) {
    return values(value);
  }
  return isObject(value) ? value : Object(value);
}

module.exports = toIterable;

},{"../lang/isObject":228,"../object/values":245,"./isArrayLike":193}],205:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":228}],206:[function(require,module,exports){
var baseToString = require('./baseToString'),
    isArray = require('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":214,"./baseToString":166}],207:[function(require,module,exports){
module.exports = {
  'clone': require('./lang/clone'),
  'cloneDeep': require('./lang/cloneDeep'),
  'eq': require('./lang/eq'),
  'gt': require('./lang/gt'),
  'gte': require('./lang/gte'),
  'isArguments': require('./lang/isArguments'),
  'isArray': require('./lang/isArray'),
  'isBoolean': require('./lang/isBoolean'),
  'isDate': require('./lang/isDate'),
  'isElement': require('./lang/isElement'),
  'isEmpty': require('./lang/isEmpty'),
  'isEqual': require('./lang/isEqual'),
  'isError': require('./lang/isError'),
  'isFinite': require('./lang/isFinite'),
  'isFunction': require('./lang/isFunction'),
  'isMatch': require('./lang/isMatch'),
  'isNaN': require('./lang/isNaN'),
  'isNative': require('./lang/isNative'),
  'isNull': require('./lang/isNull'),
  'isNumber': require('./lang/isNumber'),
  'isObject': require('./lang/isObject'),
  'isPlainObject': require('./lang/isPlainObject'),
  'isRegExp': require('./lang/isRegExp'),
  'isString': require('./lang/isString'),
  'isTypedArray': require('./lang/isTypedArray'),
  'isUndefined': require('./lang/isUndefined'),
  'lt': require('./lang/lt'),
  'lte': require('./lang/lte'),
  'toArray': require('./lang/toArray'),
  'toPlainObject': require('./lang/toPlainObject')
};

},{"./lang/clone":208,"./lang/cloneDeep":209,"./lang/eq":210,"./lang/gt":211,"./lang/gte":212,"./lang/isArguments":213,"./lang/isArray":214,"./lang/isBoolean":215,"./lang/isDate":216,"./lang/isElement":217,"./lang/isEmpty":218,"./lang/isEqual":219,"./lang/isError":220,"./lang/isFinite":221,"./lang/isFunction":222,"./lang/isMatch":223,"./lang/isNaN":224,"./lang/isNative":225,"./lang/isNull":226,"./lang/isNumber":227,"./lang/isObject":228,"./lang/isPlainObject":229,"./lang/isRegExp":230,"./lang/isString":231,"./lang/isTypedArray":232,"./lang/isUndefined":233,"./lang/lt":234,"./lang/lte":235,"./lang/toArray":236,"./lang/toPlainObject":237}],208:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it is
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  return typeof customizer == 'function'
    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
    : baseClone(value, isDeep);
}

module.exports = clone;

},{"../internal/baseClone":131,"../internal/bindCallback":168,"../internal/isIterateeCall":195}],209:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback');

/**
 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var deep = _.cloneDeep(users);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.cloneDeep(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 20
 */
function cloneDeep(value, customizer, thisArg) {
  return typeof customizer == 'function'
    ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
    : baseClone(value, true);
}

module.exports = cloneDeep;

},{"../internal/baseClone":131,"../internal/bindCallback":168}],210:[function(require,module,exports){
module.exports = require('./isEqual');

},{"./isEqual":219}],211:[function(require,module,exports){
/**
 * Checks if `value` is greater than `other`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
 * @example
 *
 * _.gt(3, 1);
 * // => true
 *
 * _.gt(3, 3);
 * // => false
 *
 * _.gt(1, 3);
 * // => false
 */
function gt(value, other) {
  return value > other;
}

module.exports = gt;

},{}],212:[function(require,module,exports){
/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
 * @example
 *
 * _.gte(3, 1);
 * // => true
 *
 * _.gte(3, 3);
 * // => true
 *
 * _.gte(1, 3);
 * // => false
 */
function gte(value, other) {
  return value >= other;
}

module.exports = gte;

},{}],213:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{"../internal/isArrayLike":193,"../internal/isObjectLike":198}],214:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":187,"../internal/isLength":197,"../internal/isObjectLike":198}],215:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
}

module.exports = isBoolean;

},{"../internal/isObjectLike":198}],216:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var dateTag = '[object Date]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */
function isDate(value) {
  return isObjectLike(value) && objToString.call(value) == dateTag;
}

module.exports = isDate;

},{"../internal/isObjectLike":198}],217:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike'),
    isPlainObject = require('./isPlainObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return !!value && value.nodeType === 1 && isObjectLike(value) &&
    (objToString.call(value).indexOf('Element') > -1);
}
// Fallback for environments without DOM support.
if (!support.dom) {
  isElement = function(value) {
    return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
  };
}

module.exports = isElement;

},{"../internal/isObjectLike":198,"../support":249,"./isPlainObject":229}],218:[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('../internal/isArrayLike'),
    isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike'),
    isString = require('./isString'),
    keys = require('../object/keys');

/**
 * Checks if `value` is empty. A value is considered empty unless it is an
 * `arguments` object, array, string, or jQuery-like collection with a length
 * greater than `0` or an object with own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
      (isObjectLike(value) && isFunction(value.splice)))) {
    return !value.length;
  }
  return !keys(value).length;
}

module.exports = isEmpty;

},{"../internal/isArrayLike":193,"../internal/isObjectLike":198,"../object/keys":241,"./isArguments":213,"./isArray":214,"./isFunction":222,"./isString":231}],219:[function(require,module,exports){
var baseIsEqual = require('../internal/baseIsEqual'),
    bindCallback = require('../internal/bindCallback');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments: (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @alias eq
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize value comparisons.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"../internal/baseIsEqual":150,"../internal/bindCallback":168}],220:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var errorTag = '[object Error]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
}

module.exports = isError;

},{"../internal/isObjectLike":198}],221:[function(require,module,exports){
(function (global){
var getNative = require('../internal/getNative');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = global.isFinite,
    nativeNumIsFinite = getNative(Number, 'isFinite');

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(10);
 * // => true
 *
 * _.isFinite('10');
 * // => false
 *
 * _.isFinite(true);
 * // => false
 *
 * _.isFinite(Object(10));
 * // => false
 *
 * _.isFinite(Infinity);
 * // => false
 */
var isFinite = nativeNumIsFinite || function(value) {
  return typeof value == 'number' && nativeIsFinite(value);
};

module.exports = isFinite;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/getNative":187}],222:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    getNative = require('../internal/getNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = getNative(global, 'Uint8Array');

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":152,"../internal/getNative":187}],223:[function(require,module,exports){
var baseIsMatch = require('../internal/baseIsMatch'),
    bindCallback = require('../internal/bindCallback'),
    getMatchData = require('../internal/getMatchData');

/**
 * Performs a deep comparison between `object` and `source` to determine if
 * `object` contains equivalent property values. If `customizer` is provided
 * it is invoked to compare values. If `customizer` returns `undefined`
 * comparisons are handled by the method instead. The `customizer` is bound
 * to `thisArg` and invoked with three arguments: (value, other, index|key).
 *
 * **Note:** This method supports comparing properties of arrays, booleans,
 * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
 * and DOM nodes are **not** supported. Provide a customizer function to extend
 * support for comparing other values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Function} [customizer] The function to customize value comparisons.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.isMatch(object, { 'age': 40 });
 * // => true
 *
 * _.isMatch(object, { 'age': 36 });
 * // => false
 *
 * // using a customizer callback
 * var object = { 'greeting': 'hello' };
 * var source = { 'greeting': 'hi' };
 *
 * _.isMatch(object, source, function(value, other) {
 *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
 * });
 * // => true
 */
function isMatch(object, source, customizer, thisArg) {
  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
  return baseIsMatch(object, getMatchData(source), customizer);
}

module.exports = isMatch;

},{"../internal/baseIsMatch":153,"../internal/bindCallback":168,"../internal/getMatchData":186}],224:[function(require,module,exports){
var isNumber = require('./isNumber');

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
 * which returns `true` for `undefined` and other non-numeric values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * _.isNaN(NaN);
 * // => true
 *
 * _.isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * _.isNaN(undefined);
 * // => false
 */
function isNaN(value) {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
  return isNumber(value) && value != +value;
}

module.exports = isNaN;

},{"./isNumber":227}],225:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(fnToString.call(hasOwnProperty))
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":198,"../string/escapeRegExp":247}],226:[function(require,module,exports){
/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],227:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(8.4);
 * // => true
 *
 * _.isNumber(NaN);
 * // => true
 *
 * _.isNumber('8.4');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
}

module.exports = isNumber;

},{"../internal/isObjectLike":198}],228:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],229:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    shimIsPlainObject = require('../internal/shimIsPlainObject');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var getPrototypeOf = getNative(Object, 'getPrototypeOf');

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && objToString.call(value) == objectTag)) {
    return false;
  }
  var valueOf = getNative(value, 'valueOf'),
      objProto = valueOf && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

module.exports = isPlainObject;

},{"../internal/getNative":187,"../internal/shimIsPlainObject":202}],230:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var regexpTag = '[object RegExp]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
function isRegExp(value) {
  return isObjectLike(value) && objToString.call(value) == regexpTag;
}

module.exports = isRegExp;

},{"../internal/isObjectLike":198}],231:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":198}],232:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":197,"../internal/isObjectLike":198}],233:[function(require,module,exports){
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],234:[function(require,module,exports){
/**
 * Checks if `value` is less than `other`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
 * @example
 *
 * _.lt(1, 3);
 * // => true
 *
 * _.lt(3, 3);
 * // => false
 *
 * _.lt(3, 1);
 * // => false
 */
function lt(value, other) {
  return value < other;
}

module.exports = lt;

},{}],235:[function(require,module,exports){
/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
 * @example
 *
 * _.lte(1, 3);
 * // => true
 *
 * _.lte(3, 3);
 * // => true
 *
 * _.lte(3, 1);
 * // => false
 */
function lte(value, other) {
  return value <= other;
}

module.exports = lte;

},{}],236:[function(require,module,exports){
var arrayCopy = require('../internal/arrayCopy'),
    getLength = require('../internal/getLength'),
    isLength = require('../internal/isLength'),
    values = require('../object/values');

/**
 * Converts `value` to an array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * (function() {
 *   return _.toArray(arguments).slice(1);
 * }(1, 2, 3));
 * // => [2, 3]
 */
function toArray(value) {
  var length = value ? getLength(value) : 0;
  if (!isLength(length)) {
    return values(value);
  }
  if (!length) {
    return [];
  }
  return arrayCopy(value);
}

module.exports = toArray;

},{"../internal/arrayCopy":117,"../internal/getLength":185,"../internal/isLength":197,"../object/values":245}],237:[function(require,module,exports){
var baseCopy = require('../internal/baseCopy'),
    keysIn = require('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":133,"../object/keysIn":242}],238:[function(require,module,exports){
var createExtremum = require('../internal/createExtremum'),
    gt = require('../lang/gt');

/**
 * Gets the maximum value of `collection`. If `collection` is empty or falsey
 * `-Infinity` is returned. If an iteratee function is provided it is invoked
 * for each value in `collection` to generate the criterion by which the value
 * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => -Infinity
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.max(users, function(chr) {
 *   return chr.age;
 * });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using the `_.property` callback shorthand
 * _.max(users, 'age');
 * // => { 'user': 'fred', 'age': 40 }
 */
var max = createExtremum(gt, -Infinity);

module.exports = max;

},{"../internal/createExtremum":178,"../lang/gt":211}],239:[function(require,module,exports){
var createExtremum = require('../internal/createExtremum'),
    lt = require('../lang/lt');

/**
 * Gets the minimum value of `collection`. If `collection` is empty or falsey
 * `Infinity` is returned. If an iteratee function is provided it is invoked
 * for each value in `collection` to generate the criterion by which the value
 * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => Infinity
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.min(users, function(chr) {
 *   return chr.age;
 * });
 * // => { 'user': 'barney', 'age': 36 }
 *
 * // using the `_.property` callback shorthand
 * _.min(users, 'age');
 * // => { 'user': 'barney', 'age': 36 }
 */
var min = createExtremum(lt, Infinity);

module.exports = min;

},{"../internal/createExtremum":178,"../lang/lt":234}],240:[function(require,module,exports){
var arraySum = require('../internal/arraySum'),
    baseCallback = require('../internal/baseCallback'),
    baseSum = require('../internal/baseSum'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall'),
    toIterable = require('../internal/toIterable');

/**
 * Gets the sum of the values in `collection`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 6]);
 * // => 10
 *
 * _.sum({ 'a': 4, 'b': 6 });
 * // => 10
 *
 * var objects = [
 *   { 'n': 4 },
 *   { 'n': 6 }
 * ];
 *
 * _.sum(objects, function(object) {
 *   return object.n;
 * });
 * // => 10
 *
 * // using the `_.property` callback shorthand
 * _.sum(objects, 'n');
 * // => 10
 */
function sum(collection, iteratee, thisArg) {
  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
    iteratee = null;
  }
  var noIteratee = iteratee == null;

  iteratee = noIteratee ? iteratee : baseCallback(iteratee, thisArg, 3);
  return noIteratee
    ? arraySum(isArray(collection) ? collection : toIterable(collection))
    : baseSum(collection, iteratee);
}

module.exports = sum;

},{"../internal/arraySum":127,"../internal/baseCallback":130,"../internal/baseSum":165,"../internal/isIterateeCall":195,"../internal/toIterable":204,"../lang/isArray":214}],241:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? null : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":187,"../internal/isArrayLike":193,"../internal/shimKeys":203,"../lang/isObject":228}],242:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":194,"../internal/isLength":197,"../lang/isArguments":213,"../lang/isArray":214,"../lang/isObject":228}],243:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseDifference = require('../internal/baseDifference'),
    baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    keysIn = require('./keysIn'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback'),
    restParam = require('../function/restParam');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to omit, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.omit(object, 'age');
 * // => { 'user': 'fred' }
 *
 * _.omit(object, _.isNumber);
 * // => { 'user': 'fred' }
 */
var omit = restParam(function(object, props) {
  if (object == null) {
    return {};
  }
  if (typeof props[0] != 'function') {
    var props = arrayMap(baseFlatten(props), String);
    return pickByArray(object, baseDifference(keysIn(object), props));
  }
  var predicate = bindCallback(props[0], props[1], 3);
  return pickByCallback(object, function(value, key, object) {
    return !predicate(value, key, object);
  });
});

module.exports = omit;

},{"../function/restParam":115,"../internal/arrayMap":123,"../internal/baseDifference":134,"../internal/baseFlatten":142,"../internal/bindCallback":168,"../internal/pickByArray":200,"../internal/pickByCallback":201,"./keysIn":242}],244:[function(require,module,exports){
var keys = require('./keys'),
    toObject = require('../internal/toObject');

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"../internal/toObject":205,"./keys":241}],245:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":167,"./keys":241}],246:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Capitalizes the first character of `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('fred');
 * // => 'Fred'
 */
function capitalize(string) {
  string = baseToString(string);
  return string && (string.charAt(0).toUpperCase() + string.slice(1));
}

module.exports = capitalize;

},{"../internal/baseToString":166}],247:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":166}],248:[function(require,module,exports){
var baseToString = require('../internal/baseToString'),
    isIterateeCall = require('../internal/isIterateeCall');

/** Used to match words to create compound words. */
var reWords = (function() {
  var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
      lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

  return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
}());

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  if (guard && isIterateeCall(string, pattern, guard)) {
    pattern = null;
  }
  string = baseToString(string);
  return string.match(pattern || reWords) || [];
}

module.exports = words;

},{"../internal/baseToString":166,"../internal/isIterateeCall":195}],249:[function(require,module,exports){
(function (global){
/** Used to detect DOM support. */
var document = (document = global.window) ? document.document : null;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {
  var Ctor = function() { this.x = x; },
      object = { '0': x, 'length': x },
      props = [];

  Ctor.prototype = { 'valueOf': x, 'y': x };
  for (var key in new Ctor) { props.push(key); }

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }
}(1, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],250:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],251:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],252:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    basePropertyDeep = require('../internal/basePropertyDeep'),
    isKey = require('../internal/isKey');

/**
 * Creates a function which returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"../internal/baseProperty":157,"../internal/basePropertyDeep":158,"../internal/isKey":196}],253:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],254:[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],255:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":254}],256:[function(require,module,exports){
module.exports={
  "name": "focusjs-components",
  "version": "0.1.9",
  "description": "Focus component repository.",
  "main": "index.js",
  "scripts": {
    "test": "iojs jest",
    "example": "node static-server.js",
    "build": "gulp browserify",
    "watch": "gulp watchify",
    "prepublish": "gulp build"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/KleeGroup/focus-components.git"
  },
  "keywords": [
    "react",
    "focus"
  ],
  "author": "DT KLEE <direction.technique@kleegroup.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/KleeGroup/focus-components/issues"
  },
  "components": [
    {
      "name": "menu",
      "path": "application/menu"
    },
    {
      "name": "bar",
      "path": "application/bar"
    },
    {
      "name": "message-center",
      "path": "application/message-center"
    },
    {
      "name": "header",
      "path": "application/header"
    },
    {
      "name": "cartridge",
      "path": "application/cartridge"
    },
    {
      "name": "quick-search",
      "path": "search/quick-search"
    },
    {
      "name": "block",
      "path": "common/block"
    },
    {
      "name": "panel",
      "path": "common/panel"
    },
    {
      "name": "field",
      "path": "common/field"
    },
    {
      "name": "icon",
      "path": "common/icon"
    },
    {
      "name": "display-checkbox",
      "path": "common/display/checkbox"
    },
    {
      "name": "detail",
      "path": "common/detail"
    },
    {
      "name": "input-text",
      "path": "common/input/text"
    },
    {
      "name": "input-checkbox",
      "path": "common/input/checkbox"
    },
    {
      "name": "input-markdown",
      "path": "common/input/markdown"
    },
    {
      "name": "input-toggle",
      "path": "common/input/toggle"
    },
    {
      "name": "input-date",
      "path": "common/input/date"
    },
    {
      "name": "input-textarea",
      "path": "common/input/textarea"
    },
    {
      "name": "select-classic",
      "path": "common/select/classic"
    },
    {
      "name": "select-radio",
      "path": "common/select/radio"
    },
    {
      "name": "select-checkbox",
      "path": "common/select/checkbox"
    },
    {
      "name": "title",
      "path": "common/title"
    },
    {
      "name": "topic-displayer",
      "path": "common/topic-displayer"
    },
    {
      "name": "label",
      "path": "common/label"
    },
    {
      "name": "form",
      "path": "common/form"
    },
    {
      "name": "img",
      "path": "common/img"
    },
    {
      "name": "select-action",
      "path": "common/select-action"
    },
    {
      "name": "sticky-navigation",
      "path": "common/sticky-navigation"
    },
    {
      "name": "live-filter",
      "path": "search/live-filter"
    },
    {
      "name": "selection-list",
      "path": "list/selection"
    },
    {
      "name": "list-action-bar",
      "path": "list/action-bar"
    },
    {
      "name": "list-action-contextual",
      "path": "list/action-contextual"
    },
    {
      "name": "list-summary",
      "path": "list/summary"
    },
    {
      "name": "button-action",
      "path": "common/button/action"
    },
    {
      "name": "block",
      "path": "common/block"
    },
    {
      "name": "search-filter-result",
      "path": "page/search/filter-result"
    },
    {
      "name": "search-result",
      "path": "page/search/search-result"
    },
    {
      "name": "popin",
      "path": "application/popin"
    },
    {
      "name": "confirmation-popin",
      "path": "application/confirmation-popin"
    },
    {
      "name": "message",
      "path": "message"
    },
    {
      "name": "timeline",
      "path": "list/timeline"
    },
    {
      "name": "table",
      "path": "list/table"
    }
  ],
  "homepage": "https://github.com/KleeGroup/focus-components",
  "dependencies": {
    "focusjs": "^0.5.5",
    "immutable": "^3.7.3",
    "lodash": "^3.9.1",
    "object-assign": "^2.0.0",
    "react": "^0.13.3",
    "uuid": "^2.0.1"
  },
  "devDependencies": {
    "babel-jest": "^4.0.0",
    "babelify": "^5.0.3",
    "bootstrap-material": "^0.1.5",
    "browser-sync": "^2.2.1",
    "browserify": "^9.0.3",
    "eslint": "^0.17.1",
    "express": "^4.12.0",
    "gulp": "^3.8.11",
    "gulp-babel": "^4.0.0",
    "gulp-concat": "^2.5.2",
    "gulp-if": "^1.2.5",
    "gulp-react": "^3.0.0",
    "gulp-sass": "^1.3.3",
    "jest": "^0.1.37",
    "jest-cli": "^0.4.0",
    "literalify": "^0.4.0",
    "react-tools": "^0.12.2",
    "reactify": "^1.0.0",
    "vinyl-source-stream": "^1.0.0",
    "watchify": "^2.4.0"
  },
  "jest": {
    "scriptPreprocessor": "./node_modules/babel-jest",
    "testFileExtensions": [
      "es6",
      "js"
    ],
    "moduleFileExtensions": [
      "js",
      "json",
      "es6"
    ],
    "unmockedModulePathPatterns": [
      "react",
      "lodash",
      "uuid"
    ]
  }
}

},{}],257:[function(require,module,exports){
"use strict";

var dispatcher = window.Focus.dispatcher;

var detailMixin = {
  /**
   * Register the cartridge.
   */
  _registerCartridge: function registerCartridge() {
    if (!this.cartridgeConfiguration) {
      this.cartridgeConfiguration = {};
      console.warn("\n        Your detail page does not have any cartrige configuration, this is not mandarory but recommended.\n        It should be a component attribute.\n        cartridgeConfiguration = {\n          summary: {component: \"A React Component\"},\n          cartridge: {component: \"A React Component\"}\n        };\n      ");
    }
    dispatcher.handleViewAction({
      data: {
        cartridgeComponent: this.cartridgeConfiguration.cartridge,
        summaryComponent: this.cartridgeConfiguration.summary
      },
      type: "update"
    });
  },
  componentWillMount: function pageMixinWillMount() {
    this._registerCartridge();
  }

};
module.exports = { mixin: detailMixin };

},{}],258:[function(require,module,exports){
"use strict";

//Dependency
var React = window.React;
var detailMixin = require("./detail").mixin;

//Function to help page creation.
module.exports = {
  detail: detailMixin,
  search: require("./search"),
  /**
   * Helper to creates a detail page.
   * @param {object} config - The page configtration.
   * @returns {object} - The react component associated to the page.
   */
  createDetail: function createDetail(config) {
    config = config || {};
    if (config.mixins !== undefined) {
      config.mixins.push(detailMixin);
    } else {
      config.mixins = [detailMixin];
    }
    return React.createClass(config);
  }
};

},{"./detail":257,"./search":263}],259:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;

var groupByComponent = {

    /**
     * Display name.
     */
    displayName: "group-by",

    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            renderGroupBy: function renderGroupBy(groupKey, list, maxRows) {
                console.error("Implement renderGroupBy() function");
            },
            list: undefined,
            groupKey: undefined,
            maxRows: 3
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState: function getInitialState() {
        return {
            maxRows: this.props.maxRows
        };
    },
    /**
     * Change the number of maxRows dispalyed.
     * @param {int} maxRows New value.
     */
    changeGroupByMaxRows: function changeGroupByMaxRows(maxRows) {
        this.setState({ maxRows: maxRows });
    },
    /**
     * Render the group by block.
     * @returns {JSX} Content.
     */
    render: function renderGroupBy() {
        return this.props.renderGroupBy(this.props.groupKey, this.props.list, this.state.maxRows);
    }
};

module.exports = builder(groupByComponent);

},{}],260:[function(require,module,exports){
"use strict";

var isArray = require("lodash/lang/isArray");
var GroupBy = require("./group-by-component").component;

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var GroupByMixin = {

    getDefaultProps: function getDefaultProps() {
        return {
            groupMaxRows: undefined
        };
    },

    /**
     * @returns {boolean} Returns true if list is a simple list, false if grouped.
     * @private
     */
    isSimpleList: function isSimpleList() {
        return isArray(this.state.list);
    },

    /**
     * Change the max rows of a group.
     * @param {string} groupKey Key of the group.
     * @param {int} maxRows Number of needed rows.
     * @returns {Function} The function wich will change the max rows of the group.
     */
    changeGroupByMaxRows: function changeGroupByMaxRows(groupKey, maxRows) {
        var _this = this;

        return function (event) {
            _this.refs[groupKey].changeGroupByMaxRows(maxRows);
        };
    },

    groupByListComponent: function groupByListComponent() {
        var groupList = [];
        for (var groupKey in this.state.list) {
            groupList.push(React.createElement(GroupBy, { key: groupKey, ref: groupKey,
                renderGroupBy: this.renderGroupByBlock,
                list: this.state.list[groupKey],
                groupKey: groupKey,
                maxRows: this.props.groupMaxRows }));
        }
        return groupList;
    }
};

module.exports = { mixin: GroupByMixin };

},{"./group-by-component":259,"lodash/lang/isArray":214}],261:[function(require,module,exports){
"use strict";

var assign = require("object-assign");

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var InfiniteScrollPageMixin = {

    /**
     * intial state for a scrolling page.
     * @returns {*} the initial state
     */
    getInitialState: function getInfiniteScrollInitialState() {
        //var additionalStateData = this.getAdditionalStateData ? this.getAdditionalStateData() : {};
        return assign({
            hasMoreData: false,
            currentPage: 1
        }, this.getScrollState());
    },

    /**
     * current state of the scrolling list.
     * @returns {*} the scroll state
     */
    getScrollState: function _getScrollState() {
        if (this.store) {
            var data = this.store.get();
            var hasMoreData = data.pageInfos && data.pageInfos.totalPages && data.pageInfos.currentPage < data.pageInfos.totalPages;
            var totalRecords = data.pageInfos && data.pageInfos.totalRecords !== undefined ? data.pageInfos.totalRecords : undefined;
            return {
                list: data.list || [],
                hasMoreData: hasMoreData,
                totalRecords: totalRecords,
                isLoading: false
            };
        }
        return {};
    },

    /**
     * State for a no fetch search.
     * @returns {object} currentpage set to 1.
     */
    getNoFetchState: function getNoFetchState() {
        return {
            currentPage: 1
        };
    },

    /**
     * Next page fetch action handler.
     */
    fetchNextPage: function fetchNextPage() {
        this.setState({
            isLoading: true,
            currentPage: this.state.currentPage + 1
        }, this.search);
    },
    /**
     * Returns the search criteria sended to the store.
     * @param {string} scope Current scope.
     * @param {string} query Current query.
     * @param {object} facets Selected facets.
     * @returns {object} Formatted criteria {criteria:{}, pagesInfos:{}, facets:{}}.
     */
    getSearchCriteria: function getSearchCriteria(scope, query, facets) {
        return {
            criteria: {
                scope: scope,
                query: query
            },
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets: facets
        };
    }
};

module.exports = { mixin: InfiniteScrollPageMixin };

},{"object-assign":253}],262:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var React = window.React;
var LiveFilter = require("../../../search/live-filter/index").component;
var ListActionBar = require("../../../list/action-bar/index").component;
var ListSummary = require("../../../list/summary/index").component;
var ListSelection = require("../../../list/selection").list.component;
var SearchStore = window.Focus.store.SearchStore;
var assign = require("object-assign");
var InfiniteScrollPageMixin = require("../common-mixin/infinite-scroll-page-mixin").mixin;
var GroupByMixin = require("../common-mixin/group-by-mixin").mixin;
var checkIsNotNull = window.Focus.util.object.checkIsNotNull;

var searchFilterResultMixin = {
    mixins: [InfiniteScrollPageMixin, GroupByMixin],

    /**
     * Display name.
     */
    displayName: "search-filter-result",

    /**
     * Component intialization
     */
    componentDidMount: function componentDidMount() {
        this._registerListeners();
        this.search();
    },
    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount: function SearchComponentWillUnmount() {
        this._unRegisterListeners();
    },
    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facetConfig: {},
            openedFacetList: {},
            orderableColumnList: {},
            operationList: {},
            lineComponent: undefined,
            isSelection: true,
            lineOperationList: [],
            criteria: {
                scope: undefined,
                searchText: undefined
            },
            idField: undefined,
            exportAction: function exportAction() {},
            unselectedScopeAction: function unselectedScopeAction() {}
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState: function getInitialState() {
        return assign({
            facetList: {},
            selectedFacetList: {},
            openedFacetList: this.props.openedFacetList,
            selectionStatus: "none",
            orderSelected: undefined,
            groupSelectedKey: undefined
        });
    },
    /**
     * Get the state from store.
     * @returns {object} Dtat to update store.
     */
    _getStateFromStore: function _getStateFromStore() {
        if (this.store) {
            var data = this.store.get();
            return assign({
                facetList: data.facet
            }, this.getScrollState());
        }
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerListeners() {
        if (this.store) {
            this.store.addSearchChangeListener(this.onSearchChange);
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners: function unRegisterSearchListeners() {
        if (this.store) {
            this.store.removeSearchChangeListener(this.onSearchChange);
        }
    },

    /**
     * Handler when store emit a change event.
     */
    onSearchChange: function onSearchChange() {
        this.setState(this._getStateFromStore());
    },

    /**
     * Search function.
     */
    search: function search(event) {
        if (event) {
            event.preventDefault();
        }

        var facets = [];
        for (var selectedFacet in this.state.selectedFacetList) {
            facets.push({ key: selectedFacet, value: this.state.selectedFacetList[selectedFacet].key });
        }

        this.actions.search(this.getSearchCriteria(this.props.criteria.scope, this.props.criteria.searchText, facets));
    },
    /**
     * Get the list of facet to print into the top bar..
     * @returns {{}} Facets object : [facet1: 'Label of facet1', facet2: 'Label of facet2'}.
     * @private
     */
    _getFacetListForBar: function _getFacetListForBar() {
        var facetList = {};
        for (var key in this.state.selectedFacetList) {
            var facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },
    /**
     * Click on bar facet action handler.
     * @param key [string}  Key of the clicked facet.
     * @private
     */
    _facetBarClick: function _facetBarClick(key) {
        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        this.state.selectedFacetList = selectedFacetList;
        this.setState(assign({ selectedFacetList: selectedFacetList }, this.getNoFetchState()), this.search);
    },
    /**
     * Group action click handler.
     * @param {string} key Name of the column to group (if null => ungroup action).
     * @private
     */
    _groupClick: function _groupClick(key) {
        console.log("Group by : " + key);

        this.setState(assign({ groupSelectedKey: key }, this.getNoFetchState()), this.search);
    },
    /**
     * Order action click handler.
     * @param {string} key Column to order.
     * @param {string} order Order  asc/desc
     * @private
     */
    _orderClick: function _orderClick(key, order) {
        console.log("Order : " + key + " - " + order);
        this.setState(assign({ orderSelected: { key: key, order: order } }, this.getNoFetchState()), this.search);
    },
    /**
     * Selection action handler.
     * @param selectionStatus Current selection status.
     * @private
     */
    _selectionGroupLineClick: function _selectionGroupLineClick(selectionStatus) {
        console.log("Selection status : " + selectionStatus);
        this.setState({
            selectionStatus: selectionStatus
        });
    },
    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    _facetSelectionClick: function _facetSelectionClick(facetComponentData, isDisableGroup) {
        console.warn("Facet selection ");
        console.log(facetComponentData.selectedFacetList);

        var newState = {
            selectedFacetList: facetComponentData.selectedFacetList,
            openedFacetList: facetComponentData.openedFacetList
        };
        if (isDisableGroup) {
            newState.groupSelectedKey = undefined;
        }

        this.setState(assign(newState, this.getNoFetchState()), this.search);
    },
    /**
     * Line selection handler.
     * @param item Line checked/unchecked.
     */
    _selectItem: function selectItem(item) {
        this.setState({ selectionStatus: "partial" });
    },
    /**
     * Export action handler.
     */
    _exportHandler: function exportHandler() {
        this.props.exportAction();
    },
    /**
     * Click on scope action handler.
     */
    _scopeClick: function scopeClick() {
        this.props.unselectedScopeAction();
    },
    /**
     * Render the show all button  seect the group corresponding facet.
     * @param groupKey Group key.
     * @returns {Function} Function to select the facet.
     */
    showAllGroupListHandler: function showAllGroupListHandler(groupKey) {
        var _this = this;

        return function (event) {
            var selectedFacetList = _this.state.selectedFacetList;

            var facet = _this.store.getFacet();
            selectedFacetList[_this.state.groupSelectedKey] = {
                data: facet[_this.state.groupSelectedKey][groupKey],
                key: groupKey
            };
            _this._facetSelectionClick({
                selectedFacetList: selectedFacetList,
                facetComponentData: _this.state.openedFacetList
            }, true);
        };
    },

    /**
     * Render the liveFilter.
     * @returns {JSX} Render the liveFilter.
     */
    liveFilterComponent: function liveFilterComponent() {
        return React.createElement(
            "div",
            { className: "liveFilterContainer" },
            React.createElement(LiveFilter, { ref: "liveFilter",
                facetList: this.state.facetList,
                selectedFacetList: this.state.selectedFacetList,
                openedFacetList: this.state.openedFacetList,
                config: this.props.facetConfig,
                dataSelectionHandler: this._facetSelectionClick })
        );
    },
    /**
     * Render the list summary component.
     * @returns {JSX} Htm code.
     */
    listSummaryComponent: function listSummaryComponent() {
        var scopeList = { scope: this.props.criteria.scope };
        return React.createElement(
            "div",
            { className: "listSummaryContainer panel" },
            React.createElement(ListSummary, {
                nb: this.state.totalRecords,
                queryText: this.props.criteria.searchText,
                scopeList: scopeList,
                scopeClickAction: this._scopeClick,
                exportAction: this._exportHandler })
        );
    },
    /**
     * Render the action bar.
     * @returns {JSX} Rendering of the action bar.
     */
    actionBarComponent: function actionBarComponent() {
        var groupableColumnList = {};
        for (var facetKey in this.state.facetList) {
            groupableColumnList[facetKey] = facetKey;
        }
        return React.createElement(
            "div",
            { className: "listActionBarContainer panel" },
            React.createElement(ListActionBar, { selectionStatus: this.state.selectionStatus,
                selectionAction: this._selectionGroupLineClick,
                orderableColumnList: this.props.orderableColumnList,
                orderAction: this._orderClick,
                orderSelected: this.state.orderSelected,
                groupableColumnList: groupableColumnList,
                groupAction: this._groupClick,
                groupSelectedKey: this.state.groupSelectedKey,
                facetList: this._getFacetListForBar(),
                facetClickAction: this._facetBarClick,
                operationList: this.props.operationList })
        );
    },

    /**
     * Render a simple list.
     * @param {object} options - map of parameters.
     * @returns {XML} Html rendering.
     */
    simpleListComponent: function simpleListComponent(options) {
        checkIsNotNull("options", options);
        checkIsNotNull("options.type", options.type);
        var newList = options.list || this.state.list;
        if (options.maxRows) {
            newList = newList.slice(0, options.maxRows);
        }
        return React.createElement(ListSelection, { data: newList,
            ref: options.type,
            idField: this.props.idField,
            isSelection: this.props.isSelection,
            onSelection: this._selectItem,
            onLineClick: this.props.onLineClick,
            fetchNextPage: this.fetchNextPage,
            operationList: this.props.lineOperationList,
            hasMoreData: this.state.hasMoreData,
            isLoading: this.state.isLoading,
            lineComponent: this.props.lineMap[options.type],
            selectionStatus: this.state.selectionStatus });
    }
};

module.exports = builder(searchFilterResultMixin, true);

},{"../../../list/action-bar/index":56,"../../../list/selection":62,"../../../list/summary/index":65,"../../../search/live-filter/index":266,"../common-mixin/group-by-mixin":260,"../common-mixin/infinite-scroll-page-mixin":261,"object-assign":253}],263:[function(require,module,exports){
"use strict";

module.exports = {
    filterResult: require("./filter-result"),
    searchResult: require("./search-result")
};

},{"./filter-result":262,"./search-result":264}],264:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var React = window.React;
var QuickSearch = require("../../../search/quick-search").component;
var List = require("../../../list/selection").list.component;
var assign = require("object-assign");
var type = window.Focus.component.types;
var InfiniteScrollPageMixin = require("../common-mixin/infinite-scroll-page-mixin").mixin;
var GroupByMixin = require("../common-mixin/group-by-mixin").mixin;
var checkIsNotNull = window.Focus.util.object.checkIsNotNull;

var searchMixin = {
    mixins: [InfiniteScrollPageMixin, GroupByMixin],

    /**
     * Tag name.
     */
    displayName: "search-panel",

    /**
     * Component intialization
     */
    componentDidMount: function searchComponentDidMount() {
        this._registerListeners();
    },

    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount: function SearchComponentWillUnmount() {
        this._unRegisterListeners();
    },

    getDefaultProps: function getDefaultProps() {
        return {
            lineMap: undefined,
            isSelection: false,
            lineOperationList: [],
            idField: "id",
            SearchComponent: QuickSearch,
            groupMaxRows: 3
        };
    },

    /**
     * properties validation
     */
    propTypes: {
        lineMap: type("object"),
        isSelection: type("bool"),
        lineOperationList: type("array"),
        idField: type("string"),
        SearchComponent: type("func"),
        groupMaxRows: type("number")
    },

    /**
     * Initial state of the list component.
     * @returns {{list: (*|Array)}} the state
     */
    getInitialState: function getInitialState() {
        return {
            isAllSelected: false,
            selected: []
        };
    },

    getCriteria: function getCriteria() {
        if (!this.refs.quickSearch) {
            return {};
        }
        return this.refs.quickSearch.getValue();
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerSearchListeners() {
        if (this.store) {
            this.store.addSearchChangeListener(this.onSearchChange);
        }
    },

    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners: function unRegisterSearchListeners() {
        if (this.store) {
            this.store.removeSearchChangeListener(this.onSearchChange);
        }
    },

    /**
     * Handler when store emit a change event.
     */
    onSearchChange: function onSearchChange() {
        this.setState(assign({ isLoadingSearch: false }, this.getScrollState()));
    },

    /**
     * Action on item selection.
     * @param {object} item selected
     */
    _selectItem: function selectItem(item) {
        var selected = this.state.selected;
        var index = selected.indexOf(item);
        if (index) {
            selected.splice(index, index);
        } else {
            selected.push(item);
        }
        this.setState({ selected: selected });
    },

    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClick: function lineClick(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },

    /**
     * Run search action.
     */
    search: function search() {
        this.actions.search(this.getSearchCriteria(this.state.scope, this.state.query));
    },

    _quickSearch: function quickSearch(searchValues) {
        this.setState(assign({ isLoadingSearch: true }, searchValues, this.getNoFetchState()), this.search);
    },

    /**
     * return a quickSearchComponent
     * @returns {XML} the component
     */
    quickSearchComponent: function quickSearchComponent() {
        return React.createElement(this.props.SearchComponent, { handleChange: this._quickSearch,
            ref: "quickSearch",
            scope: this.props.scope,
            scopes: this.props.scopeList,
            loading: this.state.isLoadingSearch
        });
    },

    /**
     * Render a list based on a single entity.
     * @param {object} options - map of parameters
     * @return {XML} the List component.
     */
    simpleListComponent: function simpleListComponent(options) {
        checkIsNotNull("options", options);
        checkIsNotNull("options.type", options.type);
        var newList = options.list || this.state.list;
        if (options.maxRows) {
            newList = newList.slice(0, options.maxRows);
        }
        return React.createElement(List, { data: newList,
            ref: options.type,
            idField: this.props.idField,
            isSelection: this.props.isSelection,
            onSelection: this._selectItem,
            onLineClick: this._lineClick,
            fetchNextPage: this.fetchNextPage,
            hasMoreData: this.state.hasMoreData,
            isLoading: this.state.isLoading,
            operationList: this.props.operationList,
            lineComponent: this.props.lineMap[options.type],
            parentSelector: this.props.parentSelector
        });
    }
};

module.exports = builder(searchMixin, true);

},{"../../../list/selection":62,"../../../search/quick-search":269,"../common-mixin/group-by-mixin":260,"../common-mixin/infinite-scroll-page-mixin":261,"object-assign":253}],265:[function(require,module,exports){
"use strict";

module.exports = {
  liveFilter: require("./live-filter"),
  quickSearch: require("./quick-search")
};

},{"./live-filter":266,"./quick-search":269}],266:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

/**@jsx*/
var builder = window.Focus.component.builder;
var React = window.React;
var LiveFilterFacet = require("./live-filter-facet").component;
var type = window.Focus.component.types;
var assign = require("object-assign");
var omit = require("lodash/object/omit");
var Img = require("../../common/img").component;

var liveFilterMixin = {
    /**
     * Component's mixins
     */
    mixins: [require("../../common/i18n/mixin")],
    /**
     * Display name.
     */
    displayName: "live-filter",
    /**
     * Init the default properties
     * @returns {object} Initial properties.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            config: {},
            dataSelectionHandler: undefined
        };
    },
    /**
     * List property validation.
     */
    propTypes: {
        facetList: type("object"),
        selectedFacetList: type("object"),
        openedFacetList: type("object"),
        config: type("object"),
        dataSelectionHandler: type("func")
    },
    /**
     * Init the state of the component.
     * @returns {object} Iitial state.
     */
    getInitialState: function getInitialState() {
        var openedFacetList = this.props.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            Object.keys(this.props.facetList).reduce(function (list, facetKey) {
                list[facetKey] = true;
                return list;
            }, {});
        }
        return {
            isExpanded: true,
            openedFacetList: openedFacetList
        };
    },
    /**
     * New properties set event handle
     * @param {Object} nextProps
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var openedFacetList = nextProps.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            openedFacetList = Object.keys(nextProps.facetList).reduce(function (list, facetKey) {
                list[facetKey] = true;
                return list;
            }, {});
        }
        this.setState({
            openedFacetList: openedFacetList
        });
    },
    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render: function renderLiverFilter() {
        var className = "panel live-filter";
        if (this.state.isExpanded) {
            className += " expanded";
        } else {
            className += " collapsed";
        }

        return React.createElement(
            "div",
            { className: className },
            this.renderLiveFacetTitle(),
            this.renderFilterFacetList()
        );
    },
    /**
     * Render the div title of the component.
     * @returns {XML} Hatml content.
     */
    renderLiveFacetTitle: function renderLiveFacetTitle() {
        var title = this.state.isExpanded ? this.i18n("live.filter.title") : "";
        var img = this.state.isExpanded ? "chevron-thin-left" : "chevron-thin-right";
        return React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
                "span",
                null,
                title
            ),
            React.createElement(Img, { src: img, onClick: this.liveFilterTitleClick })
        );
    },
    /**
     * Render the list of the facets.
     * @returns {XML} Html content.
     */
    renderFilterFacetList: function renderFilterFacetList() {
        if (!this.state.isExpanded) {
            return "";
        }
        var facets = [];
        for (var key in this.props.facetList) {
            var facet = this.props.facetList[key];
            var selectedDataKey = this.props.selectedFacetList[key] ? this.props.selectedFacetList[key].key : undefined;
            if (selectedDataKey || Object.keys(facet).length > 1) {
                facets.push(React.createElement(LiveFilterFacet, { facetKey: key, key: key,
                    facet: facet,
                    selectedDataKey: selectedDataKey,
                    isExpanded: this.state.openedFacetList[key],
                    expandHandler: this.expandFacetHandler,
                    selectHandler: this.selectHandler,
                    type: this.props.config[key]
                }));
            }
        }
        return React.createElement(
            "div",
            { className: "panel-body" },
            facets
        );
    },

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    liveFilterTitleClick: function liveFilterTitleClick() {
        this.setState({ isExpanded: !this.state.isExpanded });
    },

    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    selectHandler: function selectLiverFilterHandler(facetKey, dataKey, data) {
        var result = { openedFacetList: this.state.openedFacetList };
        if (dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(this.props.selectedFacetList, _defineProperty({}, facetKey, { key: dataKey, data: data }));
        }
        this.props.dataSelectionHandler(result);
    },

    /**
     * Expand facet action handler.
     * @param {string} facetKey Key of the facet.
     * @param {string} isExpanded true if expand action, false if collapse action.
     */
    expandFacetHandler: function expandFacetHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({ openedFacetList: openedFacetList });
    }
};

module.exports = builder(liveFilterMixin);

},{"../../common/i18n/mixin":27,"../../common/img":29,"./live-filter-facet":268,"lodash/object/omit":243,"object-assign":253}],267:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var React = window.React;

var liveFilterDataMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter-data",

    /**
     * Render the component.
     * @returns {XML} Html code of the component.
     */
    render: function renderFacet() {
        return React.createElement(
            "div",
            { className: "lf-data", onClick: this.selectFacetData },
            this.renderData(),
            " "
        );
    },

    /**
     * Render the data.
     * @returns {string} Html generated code.
     */
    renderData: function renderData() {
        if (this.props.type == "text") {
            return this.props.data.label + " (" + this.props.data.count + ")";
        }
        throw new Error("Unknown property type : " + this.props.type);
    },
    /**
     * Facet selection action handler.
     * @returns {object} Fsfssd.
     */
    selectFacetData: function selectFacetDetail() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
};

module.exports = builder(liveFilterDataMixin);

},{}],268:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = window.Focus.component.builder;
var React = window.React;
var Data = require("./live-filter-data").component;

var liveFilterFacetMixin = {
    /**
     * Component's mixins
     */
    mixins: [require("../../common/i18n/mixin")],
    /**
     * Display name.
     */
    displayName: "live-filter-facet",

    /**
     * Init the component state.
     * @returns {object} Initial state.
     */
    getInitialState: function getInitialState() {
        return {
            isShowAll: false
        };
    },

    /**
     * Init the default props.
     * @returns {object} Initial state.
     */
    getDefaultProps: function getLiveFilterFacetDefaultProperties() {
        return {
            nbDefaultDataList: 6
        };
    },

    /**
     * Render the component.
     * @returns {XML} Html component code.
     */
    render: function renderLiverFilterFacet() {
        var className = "panel panel-primary facet";
        if (this.props.selectedDataKey) {
            className += "-selected";
        } else if (this.props.isExpanded) {
            className += "-expanded";
        } else {
            className += "-collapsed";
        }
        return React.createElement(
            "div",
            { className: className },
            this.renderLiveFilterFacetTitle(),
            this.renderLiveFilterDataList()
        );
    },

    /**
     * Render the component title.
     * @returns {XML} Html component code.
     */
    renderLiveFilterFacetTitle: function renderLiveFilterFacetTitle() {
        var title = this.i18n("live.filter.facets." + this.props.facetKey); // Default facet translation path is live.filter.facets.
        var className = "panel-heading";
        if (this.props.selectedDataKey) {
            title += " : " + this.props.facet[this.props.selectedDataKey].label;
        }
        return React.createElement(
            "div",
            { className: className, onClick: this.liveFilterFacetTitleClick },
            title
        );
    },

    /**
     * Action on facet title click.
     */
    liveFilterFacetTitleClick: function liveFilterFacetTitleClick() {
        this.props.expandHandler(this.props.facetKey, !this.props.isExpanded);
        if (this.props.selectedDataKey) {
            this.props.selectHandler(this.props.facetKey, undefined, undefined);
        }
        this.setState({ isExpanded: !this.props.isExpanded, isShowAll: false });
    },

    /**
     * Render the list of data of the facet.
     * @returns {XML} Html component code.
     */
    renderLiveFilterDataList: function renderLiveFilterDataList() {
        if (!this.props.isExpanded || this.props.selectedDataKey) {
            return "";
        }
        var facetDetailList = [];
        var i = 0;
        for (var key in this.props.facet) {
            if (!this.state.isShowAll && i >= this.props.nbDefaultDataList) {
                break;
            }
            facetDetailList.push(React.createElement(
                "li",
                null,
                React.createElement(Data, { dataKey: key, data: this.props.facet[key], selectHandler: this.selectHandler, type: this.props.type })
            ));
            i++;
        }
        return React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(
                "ul",
                null,
                facetDetailList
            ),
            " ",
            this.renderShowAllDataList()
        );
    },

    /**
     * Action on facet data selection.
     * @param {string} dataKey Key of the selected data.
     * @param {string} data Selected data.
     */
    selectHandler: function selectHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },

    /**
     * Render all the data facets.
     * @returns {XML} Html component code.
     */
    renderShowAllDataList: function renderShowAllDataList() {
        if (!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return React.createElement(
                "a",
                { href: "javascript:void(0);", onClick: this.showAllHandler },
                " show.alls "
            );
        }
    },

    /**
     * Action on "show all" action.
     */
    showAllHandler: function showAllHandler() {
        this.setState({ isShowAll: !this.state.isShowAll });
    }
};

module.exports = builder(liveFilterFacetMixin);

},{"../../common/i18n/mixin":27,"./live-filter-data":267}],269:[function(require,module,exports){
"use strict";

module.exports = require("./input");

},{"./input":270}],270:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
var React = window.React;
var Scope = require("./scope").component;
//var Icon = require('../common/icon').component;
var words = require("lodash/string/words");
var SearchInputMixin = {
  displayName: "SearchInput",
  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: "",
      value: "defaultValue",
      scope: undefined,
      scopes: [],
      minChar: 0,
      loading: false
    };
  },
  propTypes: {
    placeholder: type("string"),
    value: type("string"),
    scope: type(["string", "number"]),
    scopes: type("array"),
    minChar: type("number"),
    loading: type("bool")
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value,
      scope: this.props.scope,
      loading: this.props.loading
    };
  },
  getValue: function getQuickSearchValue() {
    return {
      scope: this.refs.scope.getValue(),
      query: this.refs.query.getDOMNode().value
    };
  },
  _handleChange: function _handleChange() {
    if (this.props.handleChange) {
      return this.props.handleChange(this.getValue());
    }
  },
  handleKeyUp: function handleKeyUpInputSearch(event) {
    var val = event.target.value;
    if (val.length >= this.props.minChar) {
      if (this.props.handleKeyUp) {
        this.props.handleKeyUp(event);
      }
      this._handleChange();
    }
  },
  _handleChangeScope: function handleChangeScope(event) {
    this.focusQuery();
    //If query not empty
    var query = this.getValue().query;
    if (!query || 0 === query.length) {
      return;
    }
    if (this.props.handleChangeScope) {
      this.props.handleChangeScope(event);
    }
    this._handleChange();
  },
  handleOnClickScope: function handleOnClickScope() {
    this.setState({ scope: this.refs.scope.getValue() }, this._handleChangeScope(event));
  },
  renderHelp: function renderHelp() {
    /*if(this.state.scope){
      return;
    }*/
    return React.createElement(
      "div",
      { className: "qs-help", ref: "help" },
      React.createElement("span", { name: "share" }),
      React.createElement(
        "span",
        null,
        "Define the scope of research"
      )
    );
  },
  /** @inheritdoc */
  componentWillReceiveProps: function fieldWillReceiveProps(newProps) {
    if (newProps && newProps.loading !== undefined) {
      this.setState({ loading: newProps.loading });
    }
  },
  focusQuery: function focusQuery() {
    this.refs.query.getDOMNode().focus();
  },
  setStateFromSubComponent: function setStateFromSubComponent() {
    return this.setState(this.getValue(), this.focusQuery);
  },
  render: function renderSearchInput() {
    var loadingClassName = this.props.loading ? "qs-loading" : "";
    return React.createElement(
      "div",
      { className: "qs-quick-search" },
      React.createElement(Scope, { ref: "scope", list: this.props.scopes, value: this.state.scope, handleOnClick: this.handleOnClickScope }),
      React.createElement("input", { ref: "query", onKeyUp: this.handleKeyUp, type: "search", className: loadingClassName }),
      this.renderHelp()
    );
  }
};

module.exports = builder(SearchInputMixin);

},{"./scope":271,"lodash/string/words":248}],271:[function(require,module,exports){
"use strict";

var builder = window.Focus.component.builder;
var type = window.Focus.component.types;
var React = window.React;

//var type = require('../../core/validation/types');
var find = require("lodash/collection/find");
var uuid = require("uuid");
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
  propTypes: {
    list: type("array"),
    isDeployed: type("bool"),
    value: type(["string", "number"])
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
  getValue: function getValue() {
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
  _handleOnClick: function _handleOnClick(event) {
    var val = event.target.hasAttribute("value") ? event.target.getAttribute("value") : undefined;
    this.setState({
      value: val,
      isDeployed: false
    }, this.props.handleOnClick);
  },
  /**
   * Handle the click on the scope element.
   */
  handleDeployClick: function handleDeployClick() {
    this.setState({
      isDeployed: !this.state.isDeployed
    });
  },
  /**
   * Get the current active scope.
   */
  getActiveScope: function getActiveScope() {
    var _this = this;

    return find(this.props.list, function (scope) {
      return scope.code === _this.state.value;
    });
  },
  /**
   * Return the css class for the scope.
   */
  scopeStyle: function scopeStyle() {
    var activeScope = this.getActiveScope();
    if (!activeScope) {
      return "qs-scope-none";
    }
    return activeScope.style || "qs-scope-" + activeScope.code;
  },
  renderScopeList: function renderScopeList() {
    var _this = this;

    if (!this.state.isDeployed) {
      return;
    }
    var scopes = this.props.list.map(function (scope) {
      var selectedValue = _this.state.value === scope.code ? "active" : "";
      //Add defaut Style to scope if not define
      var scopeCss = scope.style;
      if (!scopeCss) {
        scopeCss = "qs-scope-" + scope.code;
      }
      scope.style = scopeCss;

      return React.createElement(
        "li",
        { key: scope.code || uuid.v4(),
          value: scope.code,
          className: "" + selectedValue + " " + scope.style,
          onClick: _this._handleOnClick },
        scope.label
      );
    });
    return React.createElement(
      "ul",
      { className: "qs-scope-list" },
      " ",
      scopes,
      " "
    );
  },
  /**
   * Render the complete scope element.
   * @return {object} - The jsx element.
   */
  render: function renderScopeComponent() {
    var cssClass = "qs-icon qs-scope-deploy-" + (this.state.isDeployed ? "up" : "down");
    return React.createElement(
      "div",
      { className: this.props.className + " qs-scope" },
      React.createElement(
        "div",
        { className: cssClass,
          onClick: this.handleDeployClick },
        React.createElement(
          "div",
          { className: this.scopeStyle() },
          " ",
          this.scopeLabel(),
          " "
        )
      ),
      " ",
      this.renderScopeList(),
      " "
    );
  }
};

module.exports = builder(scopeMixin);

},{"lodash/collection/find":87,"uuid":255}]},{},[1])(1)
});