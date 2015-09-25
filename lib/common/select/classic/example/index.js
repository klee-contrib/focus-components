"use strict";

var SelectInput = FocusComponents.common.select.classic.component;

var valuesExample = [{ code: "A", label: "aaaa" }, { code: "B", label: "bbbbb" }, { code: "C", label: "ccccc" }, { code: "D", label: "DDDD" }];
var valuesCustomExample = [{ id: "custom", name: "aaaaCustom" }, { id: "BCustom", name: "bbbbbCustom" }, { id: "CCustom", name: "cccccCustom" }];
var valuesInt = [{ code: 1, label: "aInt" }, { code: 2, label: "bInt" }, { code: 3, label: "cInt" }];

var SelectInputSample = React.createClass({
    displayName: "SelectInputSample",

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Liste simple sans valeur préselectionnée"
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "span",
                    null,
                    "hasUndefined forcé"
                ),
                React.createElement(SelectInput, { value: "B", hasUndefined: false, values: valuesExample })
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "span",
                    null,
                    "Non requis"
                ),
                React.createElement(SelectInput, { value: "B", isRequired: false, values: valuesExample })
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "span",
                    null,
                    "Requis"
                ),
                React.createElement(SelectInput, { value: "B", isRequired: true, values: valuesExample })
            ),
            React.createElement(
                "h3",
                null,
                "Liste simple avec valeur préselectionnée"
            ),
            React.createElement(SelectInput, { values: valuesExample }),
            React.createElement(
                "h3",
                null,
                "Liste simple avec redéfinition des code /value"
            ),
            React.createElement(SelectInput, { values: valuesCustomExample, valueKey: "id", labelKey: "name" }),
            React.createElement(
                "h3",
                null,
                "Liste simple sans valeur préselectionnée"
            ),
            React.createElement(SelectInput, { value: ['B', 'C'], multiple: true, values: valuesExample }),
            React.createElement(
                "h3",
                null,
                "Liste simple avec valeurs entières"
            ),
            React.createElement(SelectInput, { value: 1, values: valuesInt }),
            React.createElement(
                "h3",
                null,
                "Liste désactivée"
            ),
            React.createElement(SelectInput, { value: 1, values: valuesInt, disabled: true })
        );
    }
});

return React.createElement(SelectInputSample, null);