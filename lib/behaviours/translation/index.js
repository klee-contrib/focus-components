'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _i18nextClient = require('i18next-client');

var Translation = function Translation(Component) {
    return (function (_Component) {
        _inherits(TranslatedComponent, _Component);

        function TranslatedComponent(props) {
            _classCallCheck(this, TranslatedComponent);

            _Component.call(this, props);
            this.i18n = _i18nextClient.t;
        }

        return TranslatedComponent;
    })(Component);
};

exports['default'] = Translation;
module.exports = exports['default'];