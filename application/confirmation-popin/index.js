'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins

// Dependencies

var i18nMixin = require('../../common/i18n/mixin');

// Components

var Popin = require('../popin').component;


var ConfirmationPopin = {
    /**
    * Display name.
    */
    displayName: 'confirmation-popin',
    mixins: [i18nMixin],
    getDefaultProps: function getDefaultProps() {
        return {
            open: false,
            cancelButtonLabel: 'popin.confirmation.cancel',
            confirmButtonLabel: 'popin.confirmation.confirm'
        };
    },
    getInitialState: function getInitialState() {
        return {
            fromButtonClick: false
        };
    },


    propTypes: {
        cancelButtonLabel: (0, _types2.default)('string'),
        cancelHandler: (0, _types2.default)(['func', 'object']),
        confirmButtonLabel: (0, _types2.default)('string'),
        confirmHandler: (0, _types2.default)(['func', 'object'])
    },

    /**
    * Confirmation action handler
    */
    _handleConfirm: function _handleConfirm() {
        this.toggleOpen();
        if (this.props.confirmHandler) {
            this.props.confirmHandler();
        }
    },


    /**
    * Cancel action handler
    */
    _handleCancel: function _handleCancel() {
        this.toggleOpen();
        if (this.props.cancelHandler) {
            this.props.cancelHandler();
        }
    },
    _handlePopinClose: function _handlePopinClose() {
        if (this.props.cancelHandler && !this.state.fromButtonClick) {
            this.props.cancelHandler();
        }
        this.setState({ fromButtonClick: false });
    },
    toggleOpen: function toggleOpen() {
        var _this = this;

        this.setState({
            fromButtonClick: true
        }, function () {
            _this.refs.popin.toggleOpen();
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'confirmation-popin' },
            _react2.default.createElement(
                Popin,
                { onPopinClose: this._handlePopinClose, open: this.props.open, ref: 'popin' },
                this.props.children,
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'button-stack' },
                    _react2.default.createElement(_button2.default, { handleOnClick: this._handleCancel, label: this.i18n(this.props.cancelButtonLabel) }),
                    _react2.default.createElement(_button2.default, { handleOnClick: this._handleConfirm, label: this.i18n(this.props.confirmButtonLabel), option: 'primary' })
                )
            )
        );
    }
};

module.exports = (0, _builder2.default)(ConfirmationPopin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpMThuTWl4aW4iLCJyZXF1aXJlIiwiUG9waW4iLCJjb21wb25lbnQiLCJDb25maXJtYXRpb25Qb3BpbiIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwib3BlbiIsImNhbmNlbEJ1dHRvbkxhYmVsIiwiY29uZmlybUJ1dHRvbkxhYmVsIiwiZ2V0SW5pdGlhbFN0YXRlIiwiZnJvbUJ1dHRvbkNsaWNrIiwicHJvcFR5cGVzIiwiY2FuY2VsSGFuZGxlciIsImNvbmZpcm1IYW5kbGVyIiwiX2hhbmRsZUNvbmZpcm0iLCJ0b2dnbGVPcGVuIiwicHJvcHMiLCJfaGFuZGxlQ2FuY2VsIiwiX2hhbmRsZVBvcGluQ2xvc2UiLCJzdGF0ZSIsInNldFN0YXRlIiwicmVmcyIsInBvcGluIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJpMThuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFTQTs7Ozs7O0FBUEE7O0FBTEE7O0FBT0EsSUFBSUEsWUFBWUMsUUFBUSx5QkFBUixDQUFoQjs7QUFFQTs7QUFFQSxJQUFJQyxRQUFRRCxRQUFRLFVBQVIsRUFBb0JFLFNBQWhDOzs7QUFHQSxJQUFJQyxvQkFBb0I7QUFDcEI7OztBQUdBQyxpQkFBYSxvQkFKTztBQUtwQkMsWUFBUSxDQUFDTixTQUFELENBTFk7QUFNcEJPLG1CQU5vQiw2QkFNRjtBQUNkLGVBQU87QUFDSEMsa0JBQU0sS0FESDtBQUVIQywrQkFBbUIsMkJBRmhCO0FBR0hDLGdDQUFvQjtBQUhqQixTQUFQO0FBS0gsS0FabUI7QUFjcEJDLG1CQWRvQiw2QkFjRjtBQUNkLGVBQVE7QUFDSkMsNkJBQWlCO0FBRGIsU0FBUjtBQUdILEtBbEJtQjs7O0FBb0JwQkMsZUFBVztBQUNQSiwyQkFBbUIscUJBQUssUUFBTCxDQURaO0FBRVBLLHVCQUFlLHFCQUFLLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FBTCxDQUZSO0FBR1BKLDRCQUFvQixxQkFBSyxRQUFMLENBSGI7QUFJUEssd0JBQWdCLHFCQUFLLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FBTDtBQUpULEtBcEJTOztBQTJCcEI7OztBQUdBQyxrQkE5Qm9CLDRCQThCSDtBQUNiLGFBQUtDLFVBQUw7QUFDQSxZQUFJLEtBQUtDLEtBQUwsQ0FBV0gsY0FBZixFQUErQjtBQUMzQixpQkFBS0csS0FBTCxDQUFXSCxjQUFYO0FBQ0g7QUFDSixLQW5DbUI7OztBQXFDcEI7OztBQUdBSSxpQkF4Q29CLDJCQXdDSjtBQUNaLGFBQUtGLFVBQUw7QUFDQSxZQUFJLEtBQUtDLEtBQUwsQ0FBV0osYUFBZixFQUE4QjtBQUMxQixpQkFBS0ksS0FBTCxDQUFXSixhQUFYO0FBQ0g7QUFDSixLQTdDbUI7QUErQ3BCTSxxQkEvQ29CLCtCQStDQTtBQUNoQixZQUFJLEtBQUtGLEtBQUwsQ0FBV0osYUFBWCxJQUE0QixDQUFDLEtBQUtPLEtBQUwsQ0FBV1QsZUFBNUMsRUFBNkQ7QUFDekQsaUJBQUtNLEtBQUwsQ0FBV0osYUFBWDtBQUNIO0FBQ0QsYUFBS1EsUUFBTCxDQUFjLEVBQUNWLGlCQUFpQixLQUFsQixFQUFkO0FBQ0gsS0FwRG1CO0FBc0RwQkssY0F0RG9CLHdCQXNEUDtBQUFBOztBQUNULGFBQUtLLFFBQUwsQ0FBYztBQUNWViw2QkFBaUI7QUFEUCxTQUFkLEVBRUcsWUFBTTtBQUNMLGtCQUFLVyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JQLFVBQWhCO0FBQ0gsU0FKRDtBQUtILEtBNURtQjtBQThEcEJRLFVBOURvQixvQkE4RFg7QUFDTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsb0JBQWhCO0FBQ0k7QUFBQyxxQkFBRDtBQUFBLGtCQUFPLGNBQWMsS0FBS0wsaUJBQTFCLEVBQTZDLE1BQU0sS0FBS0YsS0FBTCxDQUFXVixJQUE5RCxFQUFvRSxLQUFJLE9BQXhFO0FBQ0sscUJBQUtVLEtBQUwsQ0FBV1EsUUFEaEI7QUFFSTtBQUFBO0FBQUEsc0JBQUssY0FBVyxjQUFoQjtBQUNJLHNFQUFRLGVBQWUsS0FBS1AsYUFBNUIsRUFBMkMsT0FBTyxLQUFLUSxJQUFMLENBQVUsS0FBS1QsS0FBTCxDQUFXVCxpQkFBckIsQ0FBbEQsR0FESjtBQUVJLHNFQUFRLGVBQWUsS0FBS08sY0FBNUIsRUFBNEMsT0FBTyxLQUFLVyxJQUFMLENBQVUsS0FBS1QsS0FBTCxDQUFXUixrQkFBckIsQ0FBbkQsRUFBNkYsUUFBTyxTQUFwRztBQUZKO0FBRko7QUFESixTQURKO0FBV0g7QUExRW1CLENBQXhCOztBQTZFQWtCLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVF6QixpQkFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG4vLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmxldCBpMThuTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vaTE4bi9taXhpbicpO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxubGV0IFBvcGluID0gcmVxdWlyZSgnLi4vcG9waW4nKS5jb21wb25lbnQ7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxubGV0IENvbmZpcm1hdGlvblBvcGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgbmFtZS5cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ2NvbmZpcm1hdGlvbi1wb3BpbicsXHJcbiAgICBtaXhpbnM6IFtpMThuTWl4aW5dLFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25MYWJlbDogJ3BvcGluLmNvbmZpcm1hdGlvbi5jYW5jZWwnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdwb3Bpbi5jb25maXJtYXRpb24uY29uZmlybSdcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIGZyb21CdXR0b25DbGljazogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgY2FuY2VsQnV0dG9uTGFiZWw6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIGNhbmNlbEhhbmRsZXI6IHR5cGUoWydmdW5jJywgJ29iamVjdCddKSxcclxuICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIGNvbmZpcm1IYW5kbGVyOiB0eXBlKFsnZnVuYycsICdvYmplY3QnXSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENvbmZpcm1hdGlvbiBhY3Rpb24gaGFuZGxlclxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVDb25maXJtKCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlT3BlbigpO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbmZpcm1IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY29uZmlybUhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYW5jZWwgYWN0aW9uIGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfaGFuZGxlQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlT3BlbigpO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhbmNlbEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jYW5jZWxIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfaGFuZGxlUG9waW5DbG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYW5jZWxIYW5kbGVyICYmICF0aGlzLnN0YXRlLmZyb21CdXR0b25DbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNhbmNlbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJvbUJ1dHRvbkNsaWNrOiBmYWxzZX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b2dnbGVPcGVuKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBmcm9tQnV0dG9uQ2xpY2s6IHRydWVcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5wb3Bpbi50b2dnbGVPcGVuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvbmZpcm1hdGlvbi1wb3Bpbic+XHJcbiAgICAgICAgICAgICAgICA8UG9waW4gb25Qb3BpbkNsb3NlPXt0aGlzLl9oYW5kbGVQb3BpbkNsb3NlfSBvcGVuPXt0aGlzLnByb3BzLm9wZW59IHJlZj0ncG9waW4nPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nYnV0dG9uLXN0YWNrJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXt0aGlzLl9oYW5kbGVDYW5jZWx9IGxhYmVsPXt0aGlzLmkxOG4odGhpcy5wcm9wcy5jYW5jZWxCdXR0b25MYWJlbCl9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXt0aGlzLl9oYW5kbGVDb25maXJtfSBsYWJlbD17dGhpcy5pMThuKHRoaXMucHJvcHMuY29uZmlybUJ1dHRvbkxhYmVsKX0gb3B0aW9uPSdwcmltYXJ5Jy8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1BvcGluPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKENvbmZpcm1hdGlvblBvcGluKTtcclxuIl19