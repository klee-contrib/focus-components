'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins

// Dependencies

var stylableBehaviour = require('../../mixin/stylable');

// Components

// Stores

var Dropdown = require('../../common/select-action').component;

var ContentActions = {
    mixins: [stylableBehaviour],
    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },

    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        _builtInStore2.default.addActionsChangeListener(this._handleComponentChange);
    },

    /** @inheriteddoc */
    componentWillUnmount: function componentWillUnmount() {
        _builtInStore2.default.removeActionsChangeListener(this._handleComponentChange);
    },

    /**
     * Get state from store
     * @return {Object} actions extracted from the store
     */
    _getStateFromStore: function _getStateFromStore() {
        return {
            actions: _builtInStore2.default.getActions() || { primary: [], secondary: [] } };
    },

    /**
     * Component change handler
     */
    _handleComponentChange: function _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },

    /** @inheriteddoc */
    render: function render() {
        var actions = this.state.actions;

        return React.createElement(
            'div',
            { className: this._getStyleClassName(), 'data-focus': 'content-actions' },
            actions.primary.map(function (primary) {
                if (Array.isArray(primary.action)) {
                    return React.createElement(Dropdown, { iconProps: { name: primary.icon }, operationList: primary.action, shape: 'fab' });
                } else {
                    return React.createElement(_button2.default, { handleOnClick: primary.action, icon: primary.icon, label: primary.label, shape: 'fab', style: { className: primary.className }, type: 'button' });
                }
            }),
            React.createElement(Dropdown, { iconProps: { name: 'more_vert' }, operationList: actions.secondary, shape: 'fab' })
        );
    }
};

module.exports = (0, _builder2.default)(ContentActions);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdHlsYWJsZUJlaGF2aW91ciIsInJlcXVpcmUiLCJEcm9wZG93biIsImNvbXBvbmVudCIsIkNvbnRlbnRBY3Rpb25zIiwibWl4aW5zIiwiZ2V0SW5pdGlhbFN0YXRlIiwiX2dldFN0YXRlRnJvbVN0b3JlIiwiY29tcG9uZW50V2lsbE1vdW50IiwiYWRkQWN0aW9uc0NoYW5nZUxpc3RlbmVyIiwiX2hhbmRsZUNvbXBvbmVudENoYW5nZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQWN0aW9uc0NoYW5nZUxpc3RlbmVyIiwiYWN0aW9ucyIsImdldEFjdGlvbnMiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5Iiwic2V0U3RhdGUiLCJyZW5kZXIiLCJzdGF0ZSIsIl9nZXRTdHlsZUNsYXNzTmFtZSIsIm1hcCIsIkFycmF5IiwiaXNBcnJheSIsImFjdGlvbiIsIm5hbWUiLCJpY29uIiwibGFiZWwiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBSUE7Ozs7QUFRQTs7Ozs7O0FBTkE7O0FBUkE7O0FBVUEsSUFBTUEsb0JBQW9CQyxRQUFRLHNCQUFSLENBQTFCOztBQUVBOztBQVJBOztBQVdBLElBQU1DLFdBQVdELFFBQVEsNEJBQVIsRUFBc0NFLFNBQXZEOztBQUVBLElBQU1DLGlCQUFpQjtBQUNuQkMsWUFBUSxDQUFDTCxpQkFBRCxDQURXO0FBRW5CO0FBQ0FNLG1CQUhtQiw2QkFHRDtBQUNkLGVBQU8sS0FBS0Msa0JBQUwsRUFBUDtBQUNILEtBTGtCOztBQU1uQjtBQUNBQyxzQkFQbUIsZ0NBT0U7QUFDakIsK0JBQWlCQyx3QkFBakIsQ0FBMEMsS0FBS0Msc0JBQS9DO0FBQ0gsS0FUa0I7O0FBVW5CO0FBQ0FDLHdCQVhtQixrQ0FXSTtBQUNuQiwrQkFBaUJDLDJCQUFqQixDQUE2QyxLQUFLRixzQkFBbEQ7QUFDSCxLQWJrQjs7QUFjbkI7Ozs7QUFJQUgsc0JBbEJtQixnQ0FrQkU7QUFDakIsZUFBTztBQUNITSxxQkFBUyx1QkFBaUJDLFVBQWpCLE1BQWlDLEVBQUNDLFNBQVMsRUFBVixFQUFjQyxXQUFXLEVBQXpCLEVBRHZDLEVBQVA7QUFFSCxLQXJCa0I7O0FBc0JuQjs7O0FBR0FOLDBCQXpCbUIsb0NBeUJNO0FBQ3JCLGFBQUtPLFFBQUwsQ0FBYyxLQUFLVixrQkFBTCxFQUFkO0FBQ0gsS0EzQmtCOztBQTRCbkI7QUFDQVcsVUE3Qm1CLG9CQTZCVjtBQUFBLFlBQ0VMLE9BREYsR0FDYSxLQUFLTSxLQURsQixDQUNFTixPQURGOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVyxLQUFLTyxrQkFBTCxFQUFoQixFQUEyQyxjQUFXLGlCQUF0RDtBQUNLUCxvQkFBUUUsT0FBUixDQUFnQk0sR0FBaEIsQ0FBb0IsVUFBQ04sT0FBRCxFQUFhO0FBQzlCLG9CQUFHTyxNQUFNQyxPQUFOLENBQWNSLFFBQVFTLE1BQXRCLENBQUgsRUFBa0M7QUFDOUIsMkJBQU8sb0JBQUMsUUFBRCxJQUFVLFdBQVcsRUFBQ0MsTUFBTVYsUUFBUVcsSUFBZixFQUFyQixFQUEyQyxlQUFlWCxRQUFRUyxNQUFsRSxFQUEwRSxPQUFNLEtBQWhGLEdBQVA7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsMkJBQ0ksd0NBQVEsZUFBZVQsUUFBUVMsTUFBL0IsRUFBdUMsTUFBTVQsUUFBUVcsSUFBckQsRUFBMkQsT0FBT1gsUUFBUVksS0FBMUUsRUFBaUYsT0FBTSxLQUF2RixFQUE2RixPQUFPLEVBQUNDLFdBQVdiLFFBQVFhLFNBQXBCLEVBQXBHLEVBQW9JLE1BQUssUUFBekksR0FESjtBQUdIO0FBQ0osYUFSQSxDQURMO0FBVUksZ0NBQUMsUUFBRCxJQUFVLFdBQVcsRUFBQ0gsTUFBTSxXQUFQLEVBQXJCLEVBQTBDLGVBQWVaLFFBQVFHLFNBQWpFLEVBQTRFLE9BQU0sS0FBbEY7QUFWSixTQURKO0FBY0g7QUE3Q2tCLENBQXZCOztBQWdEQWEsT0FBT0MsT0FBUCxHQUFpQix1QkFBUTFCLGNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuXHJcbi8vIFN0b3Jlc1xyXG5cclxuaW1wb3J0IGFwcGxpY2F0aW9uU3RvcmUgZnJvbSAnZm9jdXMtY29yZS9hcHBsaWNhdGlvbi9idWlsdC1pbi1zdG9yZSc7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmNvbnN0IHN0eWxhYmxlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5jb25zdCBEcm9wZG93biA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9zZWxlY3QtYWN0aW9uJykuY29tcG9uZW50O1xyXG5cclxuY29uc3QgQ29udGVudEFjdGlvbnMgPSB7XHJcbiAgICBtaXhpbnM6IFtzdHlsYWJsZUJlaGF2aW91cl0sXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTdGF0ZUZyb21TdG9yZSgpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5hZGRBY3Rpb25zQ2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5yZW1vdmVBY3Rpb25zQ2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzdGF0ZSBmcm9tIHN0b3JlXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGFjdGlvbnMgZXh0cmFjdGVkIGZyb20gdGhlIHN0b3JlXHJcbiAgICAgKi9cclxuICAgIF9nZXRTdGF0ZUZyb21TdG9yZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhY3Rpb25zOiBhcHBsaWNhdGlvblN0b3JlLmdldEFjdGlvbnMoKSB8fCB7cHJpbWFyeTogW10sIHNlY29uZGFyeTogW119fTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENvbXBvbmVudCBjaGFuZ2UgaGFuZGxlclxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlQ29tcG9uZW50Q2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKSk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7YWN0aW9uc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLl9nZXRTdHlsZUNsYXNzTmFtZSgpfSBkYXRhLWZvY3VzPSdjb250ZW50LWFjdGlvbnMnPlxyXG4gICAgICAgICAgICAgICAge2FjdGlvbnMucHJpbWFyeS5tYXAoKHByaW1hcnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHByaW1hcnkuYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPERyb3Bkb3duIGljb25Qcm9wcz17e25hbWU6IHByaW1hcnkuaWNvbn19IG9wZXJhdGlvbkxpc3Q9e3ByaW1hcnkuYWN0aW9ufSBzaGFwZT0nZmFiJy8+O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGhhbmRsZU9uQ2xpY2s9e3ByaW1hcnkuYWN0aW9ufSBpY29uPXtwcmltYXJ5Lmljb259IGxhYmVsPXtwcmltYXJ5LmxhYmVsfSBzaGFwZT0nZmFiJyBzdHlsZT17e2NsYXNzTmFtZTogcHJpbWFyeS5jbGFzc05hbWV9fSB0eXBlPSdidXR0b24nLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDxEcm9wZG93biBpY29uUHJvcHM9e3tuYW1lOiAnbW9yZV92ZXJ0J319IG9wZXJhdGlvbkxpc3Q9e2FjdGlvbnMuc2Vjb25kYXJ5fSBzaGFwZT0nZmFiJy8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoQ29udGVudEFjdGlvbnMpO1xyXG4iXX0=