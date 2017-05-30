'use strict';

var React = require('react');
var fielBehaviourMixin = require('../../common/mixin/field-component-behaviour');
var assign = require('object-assign');
var Field = require('../../common/field').component;
var DisplayText = require('../../components/display/text');

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
            style: { className: 'form-list' }
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
            style: { className: 'form-list' }
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
        return React.createElement(DisplayText, {
            name: options.name || this.definitionPath + '.' + name,
            style: options.style,
            FieldComponent: def.FieldComponent,
            formatter: options.formatter || def.formatter,
            value: this.props.data[name]
        });
    }
};

module.exports = builtInComponentsMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJmaWVsQmVoYXZpb3VyTWl4aW4iLCJhc3NpZ24iLCJGaWVsZCIsImNvbXBvbmVudCIsIkRpc3BsYXlUZXh0IiwiYnVpbHRJbkNvbXBvbmVudHNNaXhpbiIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImdldGJ1aWx0SW5Db21wb25lbnRzTWl4aW5EZWZhdWx0UHJvcHMiLCJpc0VkaXQiLCJmaWVsZEZvciIsImZpZWxkRm9ySW5MaW5lIiwibmFtZSIsIm9wdGlvbnMiLCJwcm9wcyIsImhhc0xhYmVsIiwidmFsdWUiLCJkYXRhIiwicmVmQ29udGFpbmVyIiwicmVmZXJlbmNlIiwic3R5bGUiLCJjbGFzc05hbWUiLCJmaWVsZFByb3BzIiwiX2J1aWxkRmllbGRQcm9wcyIsImNyZWF0ZUVsZW1lbnQiLCJzZWxlY3RGb3IiLCJzZWxlY3RGb3JJbkxpbmUiLCJyZWZlcmVuY2VLZXkiLCJsaXN0TmFtZSIsImRpc3BsYXlGb3IiLCJkaXNwbGF5Rm9ySW5MaW5lIiwidGV4dEZvciIsImRlZiIsImRlZmluaXRpb24iLCJkZWZpbml0aW9uUGF0aCIsIkZpZWxkQ29tcG9uZW50IiwiZm9ybWF0dGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUlDLHFCQUFxQkQsUUFBUSw4Q0FBUixDQUF6QjtBQUNBLElBQUlFLFNBQVNGLFFBQVEsZUFBUixDQUFiO0FBQ0EsSUFBSUcsUUFBUUgsUUFBUSxvQkFBUixFQUE4QkksU0FBMUM7QUFDQSxJQUFJQyxjQUFjTCxRQUFRLCtCQUFSLENBQWxCOztBQUVBLElBQUlNLHlCQUF5QjtBQUN6Qjs7O0FBR0FDLFlBQVEsQ0FBQ04sa0JBQUQsQ0FKaUI7O0FBTXpCOzs7QUFHQU8scUJBQWlCLFNBQVNDLHFDQUFULEdBQWlEO0FBQzlELGVBQU87QUFDSEMsb0JBQVE7QUFETCxTQUFQO0FBR0gsS0Fid0I7O0FBZXpCOzs7Ozs7QUFNQUMsY0FBVSxTQUFTQyxjQUFULENBQXdCQyxJQUF4QixFQUE4QkMsT0FBOUIsRUFBdUM7QUFDN0NBLGtCQUFVWixPQUFPLEVBQVAsRUFBVztBQUNqQlEsb0JBQVEsS0FBS0ssS0FBTCxDQUFXTCxNQURGO0FBRWpCTSxzQkFBVSxLQUZPO0FBR2pCQyxtQkFBTyxLQUFLRixLQUFMLENBQVdHLElBQVgsQ0FBZ0JMLElBQWhCLENBSFU7QUFJakJNLDBCQUFjLEtBQUtKLEtBQUwsQ0FBV0ssU0FKUjtBQUtqQkMsbUJBQU8sRUFBQ0MsV0FBVyxXQUFaO0FBTFUsU0FBWCxFQU1QUixPQU5PLENBQVY7O0FBUUEsWUFBSVMsYUFBYSxLQUFLQyxnQkFBTCxDQUFzQlgsSUFBdEIsRUFBNEJDLE9BQTVCLEVBQXFDLElBQXJDLENBQWpCO0FBQ0EsZUFBT2YsTUFBTTBCLGFBQU4sQ0FBb0J0QixLQUFwQixFQUEyQm9CLFVBQTNCLENBQVA7QUFDSCxLQWhDd0I7QUFpQ3pCOzs7Ozs7O0FBT0FHLGVBQVcsU0FBU0MsZUFBVCxDQUF5QmQsSUFBekIsRUFBK0JlLFlBQS9CLEVBQTZDZCxPQUE3QyxFQUFzRDtBQUM3REEsa0JBQVVBLFdBQVcsRUFBckI7QUFDQUEsZ0JBQVFlLFFBQVIsR0FBbUJELFlBQW5CO0FBQ0EsZUFBTyxLQUFLakIsUUFBTCxDQUFjRSxJQUFkLEVBQW9CQyxPQUFwQixDQUFQO0FBQ0gsS0E1Q3dCO0FBNkN6Qjs7Ozs7O0FBTUFnQixnQkFBWSxTQUFTQyxnQkFBVCxDQUEwQmxCLElBQTFCLEVBQWdDQyxPQUFoQyxFQUF5QztBQUNqREEsa0JBQVVaLE9BQU8sRUFBUCxFQUFXO0FBQ2pCUSxvQkFBUSxLQURTO0FBRWpCTSxzQkFBVSxLQUZPO0FBR2pCQyxtQkFBTyxLQUFLRixLQUFMLENBQVdHLElBQVgsQ0FBZ0JMLElBQWhCLENBSFU7QUFJakJNLDBCQUFjLEtBQUtKLEtBQUwsQ0FBV0ssU0FKUjtBQUtqQkMsbUJBQU8sRUFBQ0MsV0FBVyxXQUFaO0FBTFUsU0FBWCxFQU1QUixPQU5PLENBQVY7O0FBUUEsWUFBSVMsYUFBYSxLQUFLQyxnQkFBTCxDQUFzQlgsSUFBdEIsRUFBNEJDLE9BQTVCLEVBQXFDLElBQXJDLENBQWpCO0FBQ0EsZUFBT2YsTUFBTTBCLGFBQU4sQ0FBb0J0QixLQUFwQixFQUEyQm9CLFVBQTNCLENBQVA7QUFDSCxLQTlEd0I7O0FBZ0V6Qjs7Ozs7O0FBTUFTLGFBQVMsU0FBU0EsT0FBVCxDQUFpQm5CLElBQWpCLEVBQXVCQyxPQUF2QixFQUFnQztBQUNyQ0Esa0JBQVVBLFdBQVcsRUFBckI7QUFDQSxZQUFJbUIsTUFBTyxLQUFLQyxVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JyQixJQUFoQixDQUFwQixHQUE2QyxLQUFLcUIsVUFBTCxDQUFnQnJCLElBQWhCLENBQTdDLEdBQXFFLEVBQS9FO0FBQ0EsZUFBT2QsTUFBTTBCLGFBQU4sQ0FBb0JwQixXQUFwQixFQUFpQztBQUNwQ1Esa0JBQU1DLFFBQVFELElBQVIsSUFBbUIsS0FBS3NCLGNBQXhCLFNBQTBDdEIsSUFEWjtBQUVwQ1EsbUJBQU9QLFFBQVFPLEtBRnFCO0FBR3BDZSw0QkFBZ0JILElBQUlHLGNBSGdCO0FBSXBDQyx1QkFBV3ZCLFFBQVF1QixTQUFSLElBQXFCSixJQUFJSSxTQUpBO0FBS3BDcEIsbUJBQU8sS0FBS0YsS0FBTCxDQUFXRyxJQUFYLENBQWdCTCxJQUFoQjtBQUw2QixTQUFqQyxDQUFQO0FBT0g7QUFoRndCLENBQTdCOztBQW1GQXlCLE9BQU9DLE9BQVAsR0FBaUJqQyxzQkFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIGZpZWxCZWhhdmlvdXJNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9taXhpbi9maWVsZC1jb21wb25lbnQtYmVoYXZpb3VyJyk7XHJcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbnZhciBGaWVsZCA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9maWVsZCcpLmNvbXBvbmVudDtcclxudmFyIERpc3BsYXlUZXh0ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kaXNwbGF5L3RleHQnKTtcclxuXHJcbnZhciBidWlsdEluQ29tcG9uZW50c01peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBpbmhlcml0ZWQgbWlueGluc1xyXG4gICAgICovXHJcbiAgICBtaXhpbnM6IFtmaWVsQmVoYXZpb3VyTWl4aW5dLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXREb2NcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXRidWlsdEluQ29tcG9uZW50c01peGluRGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzRWRpdDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhbiBlZGl0IGZpZWxkIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgbWV0YWRhdGEuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhlIGZpZWxkLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBBbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgYWxsIG9wdGlvbnMgZm9yIHRoZSBidWlsdCBvZiB0aGUgZmllbGQuXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgUmVhY3QgRmllbGQuXHJcbiAgICAgKi9cclxuICAgIGZpZWxkRm9yOiBmdW5jdGlvbiBmaWVsZEZvckluTGluZShuYW1lLCBvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICBpc0VkaXQ6IHRoaXMucHJvcHMuaXNFZGl0LFxyXG4gICAgICAgICAgICBoYXNMYWJlbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmRhdGFbbmFtZV0sXHJcbiAgICAgICAgICAgIHJlZkNvbnRhaW5lcjogdGhpcy5wcm9wcy5yZWZlcmVuY2UsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7Y2xhc3NOYW1lOiAnZm9ybS1saXN0J31cclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkUHJvcHMgPSB0aGlzLl9idWlsZEZpZWxkUHJvcHMobmFtZSwgb3B0aW9ucywgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGQsIGZpZWxkUHJvcHMpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgc2VsZWN0IHdpdGggYSBsaXN0IG5hbWUgY29tcG9uZW50IEl0IGlzIGEgc2hvcnRjdXQgZm9yIHRoZSBmaWVsZENvbXBvbmVudC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lICAgICAgICAgLSBUaGUgcHJvcGVydHkgbmFtZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWZlcmVuY2VLZXkgLSBUaGUgbGlzdCBuYW1lIGluIHRoZSByZWZlcmVuY2VzLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBBbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgYWxsIG9wdGlvbnMgZm9yIHRoZSBidWlsdCBvZiB0aGUgZmllbGQuXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgUmVhY3QgRmllbGQuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdEZvcjogZnVuY3Rpb24gc2VsZWN0Rm9ySW5MaW5lKG5hbWUsIHJlZmVyZW5jZUtleSwgb3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIG9wdGlvbnMubGlzdE5hbWUgPSByZWZlcmVuY2VLZXk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRGb3IobmFtZSwgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5IGEgZmllbGQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHByb3BlcnR5IG5hbWUuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge29iamVjdH0gLSBBIFJlYWN0IEZpZWxkIGluIGRpc3BsYXkgbW9kZS5cclxuICAgICAqL1xyXG4gICAgZGlzcGxheUZvcjogZnVuY3Rpb24gZGlzcGxheUZvckluTGluZShuYW1lLCBvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICBpc0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoYXNMYWJlbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmRhdGFbbmFtZV0sXHJcbiAgICAgICAgICAgIHJlZkNvbnRhaW5lcjogdGhpcy5wcm9wcy5yZWZlcmVuY2UsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7Y2xhc3NOYW1lOiAnZm9ybS1saXN0J31cclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkUHJvcHMgPSB0aGlzLl9idWlsZEZpZWxkUHJvcHMobmFtZSwgb3B0aW9ucywgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGQsIGZpZWxkUHJvcHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgdGhlIHRleHQgZm9yIGEgZ2l2ZW4gcHJvcGVydHkuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgLSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBPcHRpb24gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgUmVhY3QgY29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICB0ZXh0Rm9yOiBmdW5jdGlvbiB0ZXh0Rm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICB2YXIgZGVmID0gKHRoaXMuZGVmaW5pdGlvbiAmJiB0aGlzLmRlZmluaXRpb25bbmFtZV0pID8gdGhpcy5kZWZpbml0aW9uW25hbWVdIDoge307XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGlzcGxheVRleHQsIHtcclxuICAgICAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lIHx8IGAke3RoaXMuZGVmaW5pdGlvblBhdGh9LiR7bmFtZX1gLFxyXG4gICAgICAgICAgICBzdHlsZTogb3B0aW9ucy5zdHlsZSxcclxuICAgICAgICAgICAgRmllbGRDb21wb25lbnQ6IGRlZi5GaWVsZENvbXBvbmVudCxcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBvcHRpb25zLmZvcm1hdHRlciB8fCBkZWYuZm9ybWF0dGVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5kYXRhW25hbWVdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWx0SW5Db21wb25lbnRzTWl4aW47XHJcbiJdfQ==