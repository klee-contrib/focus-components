'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutocompleteFor = FocusComponents.common.autocomplete.field.component;

var listLoader = function listLoader(text) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([{
                code: 'RIRI',
                value: 'Riri'
            }, {
                code: 'FIFI',
                value: 'Fifi'
            }, {
                code: 'LOULOU',
                value: 'Loulou'
            }]);
        }, 500);
    });
};

var AutocompleteSample = (function (_React$Component) {
    _inherits(AutocompleteSample, _React$Component);

    function AutocompleteSample() {
        _classCallCheck(this, AutocompleteSample);

        _React$Component.apply(this, arguments);
    }

    AutocompleteSample.prototype.render = function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(AutocompleteFor, {
                isEdit: true,
                loader: listLoader
            }),
            React.createElement(AutocompleteFor, {
                isEdit: true,
                loader: listLoader,
                value: 'RIRI'
            })
        );
    };

    return AutocompleteSample;
})(React.Component);

return React.createElement(AutocompleteSample, null);