var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', { value: true });
exports.ViewPropTypes = void 0;
var _propTypes = _interopRequireDefault(require('prop-types'));
var ViewPropTypes = {
  style: _propTypes.default.oneOfType([
    _propTypes.default.object,
    _propTypes.default.array,
  ]),
};
exports.ViewPropTypes = ViewPropTypes;
