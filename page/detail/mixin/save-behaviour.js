'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isFunction = require('lodash/lang/isFunction');
var assign = require('object-assign');
module.exports = {
    _getDetail: function getDetail() {
        var detailJSON = {};
        for (var blockKey in this.refs) {
            if (isFunction(this.refs[blockKey]._getEntity)) {
                var blockJSON = this.refs[blockKey]._getEntity();
                assign(detailJSON, _defineProperty({}, blockKey, blockJSON));
            }
        }
        return detailJSON;
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc0Z1bmN0aW9uIiwicmVxdWlyZSIsImFzc2lnbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZ2V0RGV0YWlsIiwiZ2V0RGV0YWlsIiwiZGV0YWlsSlNPTiIsImJsb2NrS2V5IiwicmVmcyIsIl9nZXRFbnRpdHkiLCJibG9ja0pTT04iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLHdCQUFSLENBQWpCO0FBQ0EsSUFBSUMsU0FBU0QsUUFBUSxlQUFSLENBQWI7QUFDQUUsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxnQkFBWSxTQUFTQyxTQUFULEdBQXFCO0FBQzdCLFlBQUlDLGFBQWEsRUFBakI7QUFDQSxhQUFLLElBQUlDLFFBQVQsSUFBcUIsS0FBS0MsSUFBMUIsRUFBZ0M7QUFDNUIsZ0JBQUdULFdBQVcsS0FBS1MsSUFBTCxDQUFVRCxRQUFWLEVBQW9CRSxVQUEvQixDQUFILEVBQStDO0FBQzNDLG9CQUFJQyxZQUFZLEtBQUtGLElBQUwsQ0FBVUQsUUFBVixFQUFvQkUsVUFBcEIsRUFBaEI7QUFDQVIsdUJBQU9LLFVBQVAsc0JBQ0dDLFFBREgsRUFDY0csU0FEZDtBQUdIO0FBQ0o7QUFDRCxlQUFPSixVQUFQO0FBQ0g7QUFaWSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nKTtcclxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBfZ2V0RGV0YWlsOiBmdW5jdGlvbiBnZXREZXRhaWwoKSB7XHJcbiAgICAgICAgdmFyIGRldGFpbEpTT04gPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBibG9ja0tleSBpbiB0aGlzLnJlZnMpIHtcclxuICAgICAgICAgICAgaWYoaXNGdW5jdGlvbih0aGlzLnJlZnNbYmxvY2tLZXldLl9nZXRFbnRpdHkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmxvY2tKU09OID0gdGhpcy5yZWZzW2Jsb2NrS2V5XS5fZ2V0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICBhc3NpZ24oZGV0YWlsSlNPTiwge1xyXG4gICAgICAgICAgICAgICAgICBbYmxvY2tLZXldOiBibG9ja0pTT05cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGV0YWlsSlNPTjtcclxuICAgIH1cclxufTtcclxuIl19