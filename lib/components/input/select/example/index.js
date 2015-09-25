"use strict";

var SelectInput = FocusComponents.components.input.Select;

var valuesExample = [{ code: "A", label: "aaaa" }, { code: "B", label: "bbbbb" }, { code: "C", label: "ccccc" }, { code: "D", label: "DDDD" }];
var valuesCustomExample = [{ id: "custom", name: "aaaaCustom" }, { id: "BCustom", name: "bbbbbCustom" }, { id: "CCustom", name: "cccccCustom" }];
var valuesInt = [{ code: 1, label: "aInt" }, { code: 2, label: "bInt" }, { code: 3, label: "cInt" }];
function _capitalize(string) {
    return string && string.charAt(0).toUpperCase() + string.slice(1);
}

var SelectSample = React.createClass({
    displayName: "SelectSample",

    onChangeSelect: function onChangeSelect(name) {
        var _this = this;

        return function (value) {
            var _setState;

            console.log('change', name, value);
            _this.setState((_setState = {}, _setState[name] = value, _setState["error" + _capitalize(name)] = null, _setState));
        };
    },
    getInitialState: function getInitialState() {
        return {
            valueHasUndefined: 'B',
            valueNonRequis: 'B',
            valueRequis: 'B',
            valueWithoutValue: null,
            valueCodeRedefined: null,
            valueIntValues: 1,
            valueListDesactive: 1,
            valueError: '1111',
            errorValueError: 'Erreur sur le champ select'
        };
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        var _state = this.state;
        var valueHasUndefined = _state.valueHasUndefined;
        var valueNonRequis = _state.valueNonRequis;
        var valueRequis = _state.valueRequis;
        var valueWithoutValue = _state.valueWithoutValue;
        var valueCodeRedefined = _state.valueCodeRedefined;
        var valueIntValues = _state.valueIntValues;
        var valueListDesactive = _state.valueListDesactive;
        var valueError = _state.valueError;
        var errorValueError = _state.errorValueError;

        return React.createElement(
            "div",
            null,
            React.createElement(
                "pre",
                null,
                JSON.stringify(this.state)
            ),
            React.createElement(
                "h3",
                null,
                "Liste simple avec valeur préselectionnée"
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "span",
                    null,
                    "hasUndefined forcé"
                ),
                React.createElement(SelectInput, { hasUndefined: false, name: "valueHasUndefined", onChange: this.onChangeSelect('valueHasUndefined'), values: valuesExample, value: valueHasUndefined })
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "span",
                    null,
                    "Non requis"
                ),
                React.createElement(SelectInput, { isRequired: false, name: "valueNonRequis", onChange: this.onChangeSelect('valueNonRequis'), value: valueNonRequis, values: valuesExample })
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "span",
                    null,
                    "Requis"
                ),
                React.createElement(SelectInput, { name: "valueRequis", onChange: this.onChangeSelect('valueRequis'), isRequired: true, value: valueRequis, values: valuesExample })
            ),
            React.createElement(
                "h3",
                null,
                "Liste simple sans valeur préselectionnée"
            ),
            React.createElement(SelectInput, { name: "valueWithoutValue", onChange: this.onChangeSelect('valueWithoutValue'), value: valueWithoutValue, values: valuesExample }),
            React.createElement(
                "h3",
                null,
                "Liste simple avec redéfinition des code /value"
            ),
            React.createElement(SelectInput, { name: "valueCodeRedefined", labelKey: "name", onChange: this.onChangeSelect('valueCodeRedefined'), valueKey: "id", value: valueCodeRedefined, values: valuesCustomExample }),
            React.createElement(
                "h3",
                null,
                "Select avec une erreur"
            ),
            React.createElement(
                "h3",
                null,
                "Liste simple avec redéfinition des code /value"
            ),
            React.createElement(SelectInput, { error: errorValueError, name: "valueError", onChange: this.onChangeSelect('valueError'), value: valueError, values: valuesExample }),
            React.createElement(
                "h3",
                null,
                "Liste simple avec valeurs entières"
            ),
            React.createElement(SelectInput, { name: "valueIntValues", onChange: this.onChangeSelect('valueIntValues'), value: valueIntValues, values: valuesInt }),
            React.createElement(
                "h3",
                null,
                "Liste désactivée"
            ),
            React.createElement(SelectInput, { disabled: true, name: "valueListDesactive", onChange: this.onChangeSelect('valueListDesactive'), value: valueListDesactive, values: valuesInt })
        );
    }
});

return React.createElement(SelectSample, null);