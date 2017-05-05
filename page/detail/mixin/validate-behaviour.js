'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('lodash/lang'),
    isFunction = _require.isFunction,
    isEmpty = _require.isEmpty;

var assign = require('object-assign');
module.exports = {
    validate: function validateDetail() {
        var validationMap = {};
        for (var blockKey in this.refs) {
            //validate only the reference elements which have valide function
            // todo: @pierr see if it is sufficient
            if (isFunction(this.refs[blockKey].validate)) {
                var validationRes = this.refs[blockKey].validate();
                if (validationRes !== undefined) {
                    assign(validationMap, _defineProperty({}, blockKey, validationRes));
                }
            }
        }
        if (isEmpty(validationMap)) {
            return true;
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaXNGdW5jdGlvbiIsImlzRW1wdHkiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIiwidmFsaWRhdGUiLCJ2YWxpZGF0ZURldGFpbCIsInZhbGlkYXRpb25NYXAiLCJibG9ja0tleSIsInJlZnMiLCJ2YWxpZGF0aW9uUmVzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7O2VBQTRCQSxRQUFRLGFBQVIsQztJQUF2QkMsVSxZQUFBQSxVO0lBQVlDLE8sWUFBQUEsTzs7QUFDakIsSUFBSUMsU0FBU0gsUUFBUSxlQUFSLENBQWI7QUFDQUksT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxjQUFVLFNBQVNDLGNBQVQsR0FBMEI7QUFDaEMsWUFBSUMsZ0JBQWdCLEVBQXBCO0FBQ0EsYUFBSyxJQUFJQyxRQUFULElBQXFCLEtBQUtDLElBQTFCLEVBQWdDO0FBQ2xDO0FBQ0E7QUFDTSxnQkFBR1QsV0FBVyxLQUFLUyxJQUFMLENBQVVELFFBQVYsRUFBb0JILFFBQS9CLENBQUgsRUFBNkM7QUFDekMsb0JBQUlLLGdCQUFnQixLQUFLRCxJQUFMLENBQVVELFFBQVYsRUFBb0JILFFBQXBCLEVBQXBCO0FBQ0Esb0JBQUdLLGtCQUFrQkMsU0FBckIsRUFBZ0M7QUFDOUJULDJCQUFPSyxhQUFQLHNCQUNHQyxRQURILEVBQ2NFLGFBRGQ7QUFHSDtBQUNGO0FBRUo7QUFDRCxZQUFHVCxRQUFRTSxhQUFSLENBQUgsRUFBMkI7QUFDdkIsbUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFuQlksQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtpc0Z1bmN0aW9uLCBpc0VtcHR5fSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlRGV0YWlsKCkge1xyXG4gICAgICAgIHZhciB2YWxpZGF0aW9uTWFwID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgYmxvY2tLZXkgaW4gdGhpcy5yZWZzKSB7XHJcbiAgICAgIC8vdmFsaWRhdGUgb25seSB0aGUgcmVmZXJlbmNlIGVsZW1lbnRzIHdoaWNoIGhhdmUgdmFsaWRlIGZ1bmN0aW9uXHJcbiAgICAgIC8vIHRvZG86IEBwaWVyciBzZWUgaWYgaXQgaXMgc3VmZmljaWVudFxyXG4gICAgICAgICAgICBpZihpc0Z1bmN0aW9uKHRoaXMucmVmc1tibG9ja0tleV0udmFsaWRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdGlvblJlcyA9IHRoaXMucmVmc1tibG9ja0tleV0udmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICBhc3NpZ24odmFsaWRhdGlvbk1hcCwge1xyXG4gICAgICAgICAgICAgICAgICAgIFtibG9ja0tleV06IHZhbGlkYXRpb25SZXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNFbXB0eSh2YWxpZGF0aW9uTWFwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==